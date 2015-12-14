'use strict';

exports.BattleScripts = {
	gen: 6,
	runMove: function (move, pokemon, target, sourceEffect) {
		if (!sourceEffect && toId(move) !== 'struggle') {
			let changedMove = this.runEvent('OverrideDecision', pokemon, target, move);
			if (changedMove && changedMove !== true) {
				move = changedMove;
				target = null;
			}
		}
		move = this.getMove(move);
		if (!target && target !== false) target = this.resolveTarget(pokemon, move);

		this.setActiveMove(move, pokemon, target);

		if (pokemon.moveThisTurn) {
			// THIS IS PURELY A SANITY CHECK
			// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
			// USE this.cancelMove INSTEAD
			this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
			this.clearActiveMove(true);
			return;
		}
		if (!this.runEvent('BeforeMove', pokemon, target, move)) {
			// Prevent invulnerability from persisting until the turn ends
			pokemon.removeVolatile('twoturnmove');
			// Prevent Pursuit from running again against a slower U-turn/Volt Switch/Parting Shot
			pokemon.moveThisTurn = true;
			this.clearActiveMove(true);
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				return;
			}
		}
		pokemon.lastDamage = 0;
		let lockedMove = this.runEvent('LockMove', pokemon);
		if (lockedMove === true) lockedMove = false;
		if (!lockedMove) {
			if (!pokemon.deductPP(move, null, target) && (move.id !== 'struggle')) {
				this.add('cant', pokemon, 'nopp', move);
				this.clearActiveMove(true);
				return;
			}
		} else {
			sourceEffect = this.getEffect('lockedmove');
		}
		pokemon.moveUsed(move);
		this.useMove(move, pokemon, target, sourceEffect);
		this.singleEvent('AfterMove', move, null, pokemon, target, move);
	},
	useMove: function (move, pokemon, target, sourceEffect) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		move = this.getMoveCopy(move);
		if (this.activeMove) move.priority = this.activeMove.priority;
		let baseTarget = move.target;
		if (!target && target !== false) target = this.resolveTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) move.sourceEffect = sourceEffect.id;
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.resolveTarget(pokemon, move);
		}
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.resolveTarget(pokemon, move);
		}
		if (!move) return false;

		let attrs = '';
		if (pokemon.fainted) {
			return false;
		}

		if (move.flags['charge'] && !pokemon.volatiles[move.id]) {
			attrs = '|[still]'; // suppress the default move animation
		}

		let movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
		this.addMove('move', pokemon, movename, target + attrs);

		if (target === false) {
			this.attrLastMove('[notarget]');
			this.add('-notarget');
			if (move.target === 'normal') pokemon.isStaleCon = 0;
			return true;
		}

		let targets = pokemon.getMoveTargets(move, target);
		let extraPP = 0;
		for (let i = 0; i < targets.length; i++) {
			let ppDrop = this.singleEvent('DeductPP', targets[i].getAbility(), targets[i].abilityData, targets[i], pokemon, move);
			if (ppDrop !== true) {
				extraPP += ppDrop || 0;
			}
		}
		if (extraPP > 0) {
			pokemon.deductPP(move, extraPP);
		}

		if (!this.runEvent('TryMove', pokemon, target, move)) {
			return true;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		let damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
			if (move.selfdestruct) {
				this.faint(pokemon, pokemon, move);
			}
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add('-notarget');
				return true;
			}
			if (targets.length > 1) move.spreadHit = true;
			damage = 0;
			for (let i = 0; i < targets.length; i++) {
				let hitResult = this.tryMoveHit(targets[i], pokemon, move, true);
				if (hitResult || hitResult === 0 || hitResult === undefined) moveResult = true;
				damage += hitResult || 0;
			}
			if (!pokemon.hp) pokemon.faint();
		} else {
			target = targets[0];
			let lacksTarget = target.fainted;
			if (!lacksTarget) {
				if (move.target === 'adjacentFoe' || move.target === 'adjacentAlly' || move.target === 'normal' || move.target === 'randomNormal') {
					lacksTarget = !this.isAdjacent(target, pokemon);
				}
			}
			if (lacksTarget) {
				this.attrLastMove('[notarget]');
				this.add('-notarget');
				if (move.target === 'normal') pokemon.isStaleCon = 0;
				return true;
			}
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		}
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return true;
		}

		if (move.selfdestruct) {
			this.faint(pokemon, pokemon, move);
		}

		if (!move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforce'])) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}
		return true;
	},
	tryMoveHit: function (target, pokemon, move, spreadHit) {
		if (move.selfdestruct && spreadHit) pokemon.hp = 0;

		this.setActiveMove(move, pokemon, target);
		let hitResult = true;

		hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}
		this.runEvent('PrepareHit', pokemon, target, move);

		if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
			return false;
		}

		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			if (move.target === 'all') {
				hitResult = this.runEvent('TryHitField', target, pokemon, move);
			} else {
				hitResult = this.runEvent('TryHitSide', target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) this.add('-fail', target);
				return true;
			}
			return this.moveHit(target, pokemon, move);
		}

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type] && !target.runImmunity(move.type, true)) {
			return false;
		}

		hitResult = this.runEvent('TryHit', target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}

		let boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

		// calculate true accuracy
		let accuracy = move.accuracy;
		let boosts, boost;
		if (accuracy !== true) {
			if (!move.ignoreAccuracy) {
				boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.clone(pokemon.boosts));
				boost = this.clampIntRange(boosts['accuracy'], -6, 6);
				if (boost > 0) {
					accuracy *= boostTable[boost];
				} else {
					accuracy /= boostTable[-boost];
				}
			}
			if (!move.ignoreEvasion) {
				boosts = this.runEvent('ModifyBoost', target, null, null, Object.clone(target.boosts));
				boost = this.clampIntRange(boosts['evasion'], -6, 6);
				if (boost > 0) {
					accuracy /= boostTable[boost];
				} else if (boost < 0) {
					accuracy *= boostTable[-boost];
				}
			}
		}
		if (move.ohko) { // bypasses accuracy modifiers
			if (!target.isSemiInvulnerable()) {
				accuracy = 30;
				if (pokemon.level >= target.level) {
					accuracy += (pokemon.level - target.level);
				} else {
					this.add('-immune', target, '[ohko]');
					return false;
				}
			}
		} else {
			accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
		}
		if (move.alwaysHit) {
			accuracy = true; // bypasses ohko accuracy modifiers
		} else {
			accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
		}
		if (accuracy !== true && this.random(100) >= accuracy) {
			if (!move.spreadHit) this.attrLastMove('[miss]');
			this.add('-miss', pokemon, target);
			return false;
		}

		if (move.breaksProtect) {
			let broke = false;
			for (let i in {kingsshield:1, protect:1, spikyshield:1}) {
				if (target.removeVolatile(i)) broke = true;
			}
			if (this.gen >= 6 || target.side !== pokemon.side) {
				for (let i in {craftyshield:1, matblock:1, quickguard:1, wideguard:1}) {
					if (target.side.removeSideCondition(i)) broke = true;
				}
			}
			if (broke) {
				if (move.id === 'feint') {
					this.add('-activate', target, 'move: Feint');
				} else {
					this.add('-activate', target, 'move: ' + move.name, '[broken]');
				}
			}
		}

		let totalDamage = 0;
		let damage = 0;
		pokemon.lastDamage = 0;
		if (move.multihit) {
			let hits = move.multihit;
			if (hits.length) {
				// yes, it's hardcoded... meh
				if (hits[0] === 2 && hits[1] === 5) {
					if (this.gen >= 5) {
						hits = [2, 2, 3, 3, 4, 5][this.random(6)];
					} else {
						hits = [2, 2, 2, 3, 3, 3, 4, 5][this.random(8)];
					}
				} else {
					hits = this.random(hits[0], hits[1] + 1);
				}
			}
			hits = Math.floor(hits);
			let nullDamage = true;
			let moveDamage;
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			let isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
			let i;
			for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
				if (pokemon.status === 'slp' && !isSleepUsable) break;

				moveDamage = this.moveHit(target, pokemon, move);
				if (moveDamage === false) break;
				if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage = (moveDamage || 0);
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				totalDamage += damage;
				this.eachEvent('Update');
			}
			if (i === 0) return true;
			if (nullDamage) damage = false;
			this.add('-hitcount', target, i);
		} else {
			damage = this.moveHit(target, pokemon, move);
			totalDamage = damage;
		}

		if (move.recoil && totalDamage) {
			this.damage(this.clampIntRange(Math.round(totalDamage * move.recoil[0] / move.recoil[1]), 1), pokemon, target, 'recoil');
		}

		if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

		if (move.ohko) this.add('-ohko');

		if (!damage && damage !== 0) return damage;

		if (target && !move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforce'])) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
		}

		return damage;
	},
	moveHit: function (target, pokemon, move, moveData, isSecondary, isSelf) {
		let damage;
		move = this.getMoveCopy(move);

		if (!moveData) moveData = move;
		if (!moveData.flags) moveData.flags = {};
		let hitResult = true;

		// TryHit events:
		//   STEP 1: we see if the move will succeed at all:
		//   - TryHit, TryHitSide, or TryHitField are run on the move,
		//     depending on move target (these events happen in useMove
		//     or tryMoveHit, not below)
		//   == primary hit line ==
		//   Everything after this only happens on the primary hit (not on
		//   secondary or self-hits)
		//   STEP 2: we see if anything blocks the move from hitting:
		//   - TryFieldHit is run on the target
		//   STEP 3: we see if anything blocks the move from hitting the target:
		//   - If the move's target is a pokemon, TryHit is run on that pokemon

		// Note:
		//   If the move target is `foeSide`:
		//     event target = pokemon 0 on the target side
		//   If the move target is `allySide` or `all`:
		//     event target = the move user
		//
		//   This is because events can't accept actual sides or fields as
		//   targets. Choosing these event targets ensures that the correct
		//   side or field is hit.
		//
		//   It is the `TryHitField` event handler's responsibility to never
		//   use `target`.
		//   It is the `TryFieldHit` event handler's responsibility to read
		//   move.target and react accordingly.
		//   An exception is `TryHitSide` as a single event (but not as a normal
		//   event), which is passed the target side.

		if (move.target === 'all' && !isSelf) {
			hitResult = this.singleEvent('TryHitField', moveData, {}, target, pokemon, move);
		} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
			hitResult = this.singleEvent('TryHitSide', moveData, {}, target.side, pokemon, move);
		} else if (target) {
			hitResult = this.singleEvent('TryHit', moveData, {}, target, pokemon, move);
		}
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}

		if (target && !isSecondary && !isSelf) {
			if (move.target !== 'all' && move.target !== 'allySide' && move.target !== 'foeSide') {
				hitResult = this.runEvent('TryPrimaryHit', target, pokemon, moveData);
				if (hitResult === 0) {
					// special Substitute flag
					hitResult = true;
					target = null;
				}
			}
		}
		if (target && isSecondary && !moveData.self) {
			hitResult = true;
		}
		if (!hitResult) {
			return false;
		}

		if (target) {
			let didSomething = false;

			damage = this.getDamage(pokemon, target, moveData);

			// getDamage has several possible return values:
			//
			//   a number:
			//     means that much damage is dealt (0 damage still counts as dealing
			//     damage for the purposes of things like Static)
			//   false:
			//     gives error message: "But it failed!" and move ends
			//   null:
			//     the move ends, with no message (usually, a custom fail message
			//     was already output by an event handler)
			//   undefined:
			//     means no damage is dealt and the move continues
			//
			// basically, these values have the same meanings as they do for event
			// handlers.

			if ((damage || damage === 0) && !target.fainted) {
				if (move.noFaint && damage >= target.hp) {
					damage = target.hp - 1;
				}
				damage = this.damage(damage, target, pokemon, move);
				if (!(damage || damage === 0)) {
					this.debug('damage interrupted');
					return false;
				}
				didSomething = true;
			}
			if (damage === false || damage === null) {
				if (damage === false && !isSecondary && !isSelf) {
					this.add('-fail', target);
				}
				this.debug('damage calculation interrupted');
				return false;
			}

			if (moveData.boosts && !target.fainted) {
				hitResult = this.boost(moveData.boosts, target, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.heal && !target.fainted) {
				let d = target.heal((this.gen < 5 ? Math.floor : Math.round)(target.maxhp * moveData.heal[0] / moveData.heal[1]));
				if (!d && d !== 0) {
					this.add('-fail', target);
					this.debug('heal interrupted');
					return false;
				}
				this.add('-heal', target, target.getHealth);
				didSomething = true;
			}
			if (moveData.status) {
				if (!target.status) {
					hitResult = target.setStatus(moveData.status, pokemon, move);
					if (!hitResult && move.status) {
						this.add('-immune', target, '[msg]');
						return false;
					}
					didSomething = didSomething || hitResult;
				} else if (!isSecondary) {
					if (target.status === moveData.status) {
						this.add('-fail', target, target.status);
					} else {
						this.add('-fail', target);
					}
					return false;
				}
			}
			if (moveData.forceStatus) {
				hitResult = target.setStatus(moveData.forceStatus, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.volatileStatus) {
				hitResult = target.addVolatile(moveData.volatileStatus, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.sideCondition) {
				hitResult = target.side.addSideCondition(moveData.sideCondition, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.weather) {
				hitResult = this.setWeather(moveData.weather, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.terrain) {
				hitResult = this.setTerrain(moveData.terrain, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.pseudoWeather) {
				hitResult = this.addPseudoWeather(moveData.pseudoWeather, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.forceSwitch) {
				if (this.canSwitch(target.side)) didSomething = true; // at least defer the fail message to later
			}
			if (moveData.selfSwitch) {
				if (this.canSwitch(pokemon.side)) didSomething = true; // at least defer the fail message to later
			}
			// Hit events
			//   These are like the TryHit events, except we don't need a FieldHit event.
			//   Scroll up for the TryHit event documentation, and just ignore the "Try" part. ;)
			hitResult = null;
			if (move.target === 'all' && !isSelf) {
				if (moveData.onHitField) hitResult = this.singleEvent('HitField', moveData, {}, target, pokemon, move);
			} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
				if (moveData.onHitSide) hitResult = this.singleEvent('HitSide', moveData, {}, target.side, pokemon, move);
			} else {
				if (moveData.onHit) hitResult = this.singleEvent('Hit', moveData, {}, target, pokemon, move);
				if (!isSelf && !isSecondary) {
					this.runEvent('Hit', target, pokemon, move);
				}
				if (moveData.onAfterHit) hitResult = this.singleEvent('AfterHit', moveData, {}, target, pokemon, move);
			}

			if (!hitResult && !didSomething && !moveData.self && !moveData.selfdestruct) {
				if (!isSelf && !isSecondary) {
					if (hitResult === false || didSomething === false) this.add('-fail', target);
				}
				this.debug('move failed because it did nothing');
				return false;
			}
		}
		if (moveData.self) {
			let selfRoll;
			if (!isSecondary && moveData.self.boosts) selfRoll = this.random(100);
			// This is done solely to mimic in-game RNG behaviour. All self drops have a 100% chance of happening but still grab a random number.
			if (typeof moveData.self.chance === 'undefined' || selfRoll < moveData.self.chance) {
				this.moveHit(pokemon, pokemon, move, moveData.self, isSecondary, true);
			}
		}
		if (moveData.secondaries) {
			let secondaryRoll;
			let secondaries = this.runEvent('ModifySecondaries', target, pokemon, moveData, moveData.secondaries.slice());
			for (let i = 0; i < secondaries.length; i++) {
				secondaryRoll = this.random(100);
				if (typeof secondaries[i].chance === 'undefined' || secondaryRoll < secondaries[i].chance) {
					this.moveHit(target, pokemon, move, secondaries[i], true, isSelf);
				}
			}
		}
		if (target && target.hp > 0 && pokemon.hp > 0 && moveData.forceSwitch && this.canSwitch(target.side)) {
			hitResult = this.runEvent('DragOut', target, pokemon, move);
			if (hitResult) {
				target.forceSwitchFlag = true;
			} else if (hitResult === false && move.category === 'Status') {
				this.add('-fail', target);
			}
		}
		if (move.selfSwitch && pokemon.hp) {
			pokemon.switchFlag = move.selfSwitch;
		}
		return damage;
	},

	canMegaEvo: function (pokemon) {
		let altForme = pokemon.baseTemplate.otherFormes && this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
		if (altForme && altForme.isMega && altForme.requiredMove && pokemon.moves.indexOf(toId(altForme.requiredMove)) >= 0) return altForme.species;
		let item = pokemon.getItem();
		if (item.megaEvolves !== pokemon.baseTemplate.baseSpecies || item.megaStone === pokemon.species) return false;
		return item.megaStone;
	},

	runMegaEvo: function (pokemon) {
		let template = this.getTemplate(pokemon.canMegaEvo);
		let side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		let foeActive = side.foe.active;
		for (let i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;

		// Limit one mega evolution
		for (let i = 0; i < side.pokemon.length; i++) {
			side.pokemon[i].canMegaEvo = false;
		}
		return true;
	},

	isAdjacent: function (pokemon1, pokemon2) {
		if (pokemon1.fainted || pokemon2.fainted) return false;
		if (pokemon1.side === pokemon2.side) return Math.abs(pokemon1.position - pokemon2.position) === 1;
		return Math.abs(pokemon1.position + pokemon2.position + 1 - pokemon1.side.active.length) <= 1;
	},
	checkAbilities: function (selectedAbilities, defaultAbilities) {
		if (!selectedAbilities.length) return true;
		let selectedAbility = selectedAbilities.pop();
		let isValid = false;
		for (let i = 0; i < defaultAbilities.length; i++) {
			let defaultAbility = defaultAbilities[i];
			if (!defaultAbility) break;
			if (defaultAbility.indexOf(selectedAbility) >= 0) {
				defaultAbilities.splice(i, 1);
				isValid = this.checkAbilities(selectedAbilities, defaultAbilities);
				if (isValid) break;
				defaultAbilities.splice(i, 0, defaultAbility);
			}
		}
		if (!isValid) selectedAbilities.push(selectedAbility);
		return isValid;
	},
	sampleNoReplace: function (list) {
		let length = list.length;
		let index = this.random(length);
		let element = list[index];
		for (let nextIndex = index + 1; nextIndex < length; index += 1, nextIndex += 1) {
			list[index] = list[nextIndex];
		}
		list.pop();
		return element;
	},
	checkBattleForme: function (template) {
		// If the Pokémon has a Mega or Primal alt forme, that's its preferred battle forme.
		// No randomization, no choice. We are just checking its existence.
		// Returns a Pokémon template for further details.
		if (!template.otherFormes) return null;
		let firstForme = this.getTemplate(template.otherFormes[0]);
		if (firstForme.isMega || firstForme.isPrimal) return firstForme;
		return null;
	},
	hasMegaEvo: function (template) {
		if (!template.otherFormes) return false;
		let firstForme = this.getTemplate(template.otherFormes[0]);
		return !!firstForme.isMega;
	},
	getTeam: function (side, team) {
		let format = side.battle.getFormat();
		if (typeof format.team === 'string' && format.team.substr(0, 6) === 'random') {
			return this[format.team + 'Team'](side);
		} else if (team) {
			return team;
		} else {
			return this.randomTeam(side);
		}
	},
	randomCCTeam: function (side) {
		let team = [];

		let natures = Object.keys(this.data.Natures);
		let items = Object.keys(this.data.Items);

		let hasDexNumber = {};
		let formes = [[], [], [], [], [], []];

		// Pick six random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP

		let num;
		for (let i = 0; i < 6; i++) {
			do {
				num = this.random(721) + 1;
			} while (num in hasDexNumber);
			hasDexNumber[num] = i;
		}

		for (let id in this.data.Pokedex) {
			if (!(this.data.Pokedex[id].num in hasDexNumber)) continue;
			let template = this.getTemplate(id);
			if (template.species !== 'Pichu-Spiky-eared') {
				formes[hasDexNumber[template.num]].push(template.species);
			}
		}

		for (let i = 0; i < 6; i++) {
			let poke = formes[i][this.random(formes[i].length)];
			let template = this.getTemplate(poke);

			// Random item
			let item = items[this.random(items.length)];

			// Make sure forme is legal
			if (template.battleOnly || template.requiredItem && item !== template.requiredItem) {
				template = this.getTemplate(template.baseSpecies);
				poke = template.name;
			}

			// Make sure forme/item combo is correct
			while ((poke === 'Arceus' && item.substr(-5) === 'plate') ||
					(poke === 'Giratina' && item === 'griseousorb') ||
					(poke === 'Genesect' && item.substr(-5) === 'drive')) {
				item = items[this.random(items.length)];
			}

			// Random ability
			let abilities = [template.abilities['0']];
			if (template.abilities['1']) {
				abilities.push(template.abilities['1']);
			}
			if (template.abilities['H']) {
				abilities.push(template.abilities['H']);
			}
			let ability = abilities[this.random(abilities.length)];

			// Four random unique moves from the movepool
			let moves;
			let pool = ['struggle'];
			if (poke === 'Smeargle') {
				pool = Object.keys(this.data.Movedex).exclude('chatter', 'struggle', 'magikarpsrevenge');
			} else if (template.learnset) {
				pool = Object.keys(template.learnset);
			} else {
				pool = Object.keys(this.getTemplate(template.baseSpecies).learnset);
			}
			if (pool.length <= 4) {
				moves = pool;
			} else {
				moves = [this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool)];
			}

			// Random EVs
			let evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			let s = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				let x = s[this.random(s.length)];
				let y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			let ivs = {hp: this.random(32), atk: this.random(32), def: this.random(32), spa: this.random(32), spd: this.random(32), spe: this.random(32)};

			// Random nature
			let nature = natures[this.random(natures.length)];

			// Level balance--calculate directly from stats rather than using some silly lookup table
			let mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = template.baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

			while (level < 100) {
				mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100); // Since damage is roughly proportional to level
				mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

				if (mbst >= mbstmin) break;
				level++;
			}

			// Random gender--already handled by PS

			// Random happiness
			let happiness = this.random(256);

			// Random shininess
			let shiny = !this.random(1024);

			team.push({
				name: poke,
				item: item,
				ability: ability,
				moves: moves,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny
			});
		}

		return team;
	},
	randomHCTeam: function (side) {
		let team = [];

		let itemPool = Object.keys(this.data.Items);
		let abilityPool = Object.keys(this.data.Abilities);
		let movePool = Object.keys(this.data.Movedex);
		let naturePool = Object.keys(this.data.Natures);

		let hasDexNumber = {};
		let formes = [[], [], [], [], [], []];

		// Pick six random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP

		let num;
		for (let i = 0; i < 6; i++) {
			do {
				num = this.random(721) + 1;
			} while (num in hasDexNumber);
			hasDexNumber[num] = i;
		}

		for (let id in this.data.Pokedex) {
			if (!(this.data.Pokedex[id].num in hasDexNumber)) continue;
			let template = this.getTemplate(id);
			if (template.learnset && template.species !== 'Pichu-Spiky-eared') {
				formes[hasDexNumber[template.num]].push(template.species);
			}
		}

		for (let i = 0; i < 6; i++) {
			// Choose forme
			let pokemon = formes[i][this.random(formes[i].length)];
			let template = this.getTemplate(pokemon);

			// Random unique item
			let item = '';
			do {
				item = this.sampleNoReplace(itemPool);
			} while (this.data.Items[item].isNonstandard);

			// Genesect forms are a sprite difference based on its Drives
			if (template.species.substr(0, 9) === 'Genesect-' && item !== toId(template.requiredItem)) pokemon = 'Genesect';

			// Random unique ability
			let ability = '';
			do {
				ability = this.sampleNoReplace(abilityPool);
			} while (this.data.Abilities[ability].isNonstandard);

			// Random unique moves
			let m = [];
			while (true) {
				let moveid = this.sampleNoReplace(movePool);
				if (!this.data.Movedex[moveid].isNonstandard && (moveid === 'hiddenpower' || moveid.substr(0, 11) !== 'hiddenpower')) {
					if (m.push(moveid) >= 4) break;
				}
			}

			// Random EVs
			let evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			let s = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			let evpool = 510;
			do {
				let x = s[this.random(s.length)];
				let y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			let ivs = {hp: this.random(32), atk: this.random(32), def: this.random(32), spa: this.random(32), spd: this.random(32), spe: this.random(32)};

			// Random nature
			let nature = naturePool[this.random(naturePool.length)];

			// Level balance
			let mbstmin = 1307;
			let stats = template.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;
			let level = Math.floor(100 * mbstmin / mbst);
			while (level < 100) {
				mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				if (mbst >= mbstmin) break;
				level++;
			}

			// Random happiness
			let happiness = this.random(256);

			// Random shininess
			let shiny = !this.random(1024);

			team.push({
				name: pokemon,
				item: item,
				ability: ability,
				moves: m,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny
			});
		}

		return team;
	},
	queryMoves: function (moves, hasType, hasAbility, movePool) {
		// This is primarily a helper function for random setbuilder functions.
		let counter = {
			Physical: 0, Special: 0, Status: 0, damage: 0, recovery: 0, stab: 0, inaccurate: 0, priority: 0, recoil: 0, drain: 0,
			adaptability: 0, bite: 0, contrary: 0, hustle: 0, ironfist: 0, serenegrace: 0, sheerforce: 0, skilllink: 0, technician: 0,
			physicalsetup: 0, specialsetup: 0, mixedsetup: 0, speedsetup: 0, physicalpool: 0, specialpool: 0,
			damagingMoves: [],
			damagingMoveIndex: {},
			setupType: ''
		};

		for (let type in Tools.data.TypeChart) {
			counter[type] = 0;
		}

		if (!moves || !moves.length) return counter;
		if (!hasType) hasType = {};
		if (!hasAbility) hasAbility = {};
		if (!movePool) movePool = [];

		// Moves that heal a fixed amount:
		let RecoveryMove = {
			milkdrink: 1, recover: 1, roost: 1, slackoff: 1, softboiled: 1
		};
		// Moves which drop stats:
		let ContraryMove = {
			closecombat: 1, leafstorm: 1, overheat: 1, superpower: 1, vcreate: 1
		};
		// Moves that boost Attack:
		let PhysicalSetup = {
			bellydrum:1, bulkup:1, coil:1, curse:1, dragondance:1, honeclaws:1, howl:1, poweruppunch:1, shiftgear:1, swordsdance:1
		};
		// Moves which boost Special Attack:
		let SpecialSetup = {
			calmmind:1, chargebeam:1, geomancy:1, nastyplot:1, quiverdance:1, tailglow:1
		};
		// Moves which boost Attack AND Special Attack:
		let MixedSetup = {
			growth:1, shellsmash:1, workup:1
		};
		// Moves which boost Speed:
		let SpeedSetup = {
			agility:1, autotomize:1, rockpolish:1
		};
		// Moves that shouldn't be the only STAB moves:
		let NoStab = {
			aquajet:1, bounce:1, fakeout:1, flamecharge:1, iceshard:1, pursuit:1, quickattack:1, skyattack:1,
			chargebeam:1, clearsmog:1, eruption:1, vacuumwave:1, waterspout:1
		};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (let k = 0; k < moves.length; k++) {
			let move = this.getMove(moves[k]);
			let moveid = move.id;
			let movetype = move.type;
			if (moveid === 'judgment') movetype = Object.keys(hasType)[0];
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter['damage']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			} else {
				// Are Physical/Special/Status moves:
				counter[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) counter['technician']++;
			// Moves that hit up to 5 times:
			if (move.multihit && move.multihit[1] === 5) counter['skilllink']++;
			if (move.recoil) counter['recoil']++;
			if (move.drain) counter['drain']++;
			// Moves which have a base power, but aren't super-weak like Rapid Spin:
			if (move.basePower > 30 || move.multihit || move.basePowerCallback || moveid === 'naturepower') {
				counter[movetype]++;
				if (hasType[movetype]) {
					counter['adaptability']++;
					// STAB:
					// Certain moves aren't acceptable as a Pokemon's only STAB attack
					if (!(moveid in NoStab) && (moveid !== 'hiddenpower' || Object.keys(hasType).length === 1)) counter['stab']++;
				}
				if (move.priority === 0 && hasAbility['Protean'] && !(moveid in NoStab)) counter['stab']++;
				if (move.category === 'Physical') counter['hustle']++;
				if (movetype === 'Normal') {
					if ((hasAbility['Aerilate'] || hasAbility['Pixilate'] || hasAbility['Refrigerate']) && !(moveid in NoStab)) counter['stab']++;
				}
				if (move.flags['bite']) counter['bite']++;
				if (move.flags['punch']) counter['ironfist']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			}
			// Moves with secondary effects:
			if (move.secondary) {
				counter['sheerforce']++;
				if (move.secondary.chance >= 20) {
					counter['serenegrace']++;
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter['inaccurate']++;
			// Moves with non-zero priority:
			if (move.priority !== 0) counter['priority']++;

			// Moves that change stats:
			if (RecoveryMove[moveid]) counter['recovery']++;
			if (ContraryMove[moveid]) counter['contrary']++;
			if (PhysicalSetup[moveid]) counter['physicalsetup']++;
			if (SpecialSetup[moveid]) counter['specialsetup']++;
			if (MixedSetup[moveid]) counter['mixedsetup']++;
			if (SpeedSetup[moveid]) counter['speedsetup']++;
		}

		// Keep track of the available moves
		for (let i = 0; i < movePool.length; i++) {
			let move = this.getMove(movePool[i]);
			if (move.category === 'Physical') counter['physicalpool']++;
			if (move.category === 'Special') counter['specialpool']++;
		}

		// Choose a setup type:
		if (counter['mixedsetup']) {
			counter.setupType = 'Mixed';
		} else if (counter['physicalsetup'] || counter['specialsetup']) {
			let physical = counter.Physical + counter['physicalpool'];
			let special = counter.Special + counter['specialpool'];
			if (counter['physicalsetup'] && counter['specialsetup']) {
				if (physical === special) {
					counter.setupType = counter.Physical > counter.Special ? 'Physical' : 'Special';
				} else {
					counter.setupType = physical > special ? 'Physical' : 'Special';
				}
			} else if (counter['physicalsetup'] && physical >= 1) {
				if (physical >= 2 || moves.indexOf('rest') >= 0 && moves.indexOf('sleeptalk') >= 0) {
					counter.setupType = 'Physical';
				}
			} else if (counter['specialsetup'] && special >= 1) {
				if (special >= 2 || moves.indexOf('rest') >= 0 && moves.indexOf('sleeptalk') >= 0) {
					counter.setupType = 'Special';
				}
			}
		}

		return counter;
	},
	randomSet: function (template, slot, teamDetails) {
		if (slot === undefined) slot = 1;
		let baseTemplate = (template = this.getTemplate(template));
		let name = template.name;

		if (!template.exists || (!template.randomBattleMoves && !template.learnset)) {
			// GET IT? UNOWN? BECAUSE WE CAN'T TELL WHAT THE POKEMON IS
			template = this.getTemplate('unown');

			let stack = 'Template incompatible with random battles: ' + name;
			let fakeErr = {stack: stack};
			require('../crashlogger.js')(fakeErr, 'The randbat set generator');
		}

		if (typeof teamDetails !== 'object') teamDetails = {megaCount: teamDetails};

		if (template.battleOnly) {
			// Only change the species. The template has custom moves, and may have different typing and requirements.
			name = template.baseSpecies;
		}
		let battleForme = this.checkBattleForme(template);
		if (battleForme && (battleForme.isMega ? !teamDetails.megaCount : this.random(2))) {
			template = this.getTemplate(template.otherFormes.length >= 2 ? template.otherFormes[this.random(template.otherFormes.length)] : template.otherFormes[0]);
		}

		let movePool = (template.randomBattleMoves ? template.randomBattleMoves.slice() : Object.keys(template.learnset));
		let moves = [];
		let ability = '';
		let item = '';
		let evs = {
			hp: 85,
			atk: 85,
			def: 85,
			spa: 85,
			spd: 85,
			spe: 85
		};
		let ivs = {
			hp: 31,
			atk: 31,
			def: 31,
			spa: 31,
			spd: 31,
			spe: 31
		};
		let hasType = {};
		hasType[template.types[0]] = true;
		if (template.types[1]) {
			hasType[template.types[1]] = true;
		}
		let hasAbility = {};
		hasAbility[template.abilities[0]] = true;
		if (template.abilities[1]) {
			hasAbility[template.abilities[1]] = true;
		}
		if (template.abilities['H']) {
			hasAbility[template.abilities['H']] = true;
		}
		let availableHP = 0;
		for (let i = 0, len = movePool.length; i < len; i++) {
			if (movePool[i].substr(0, 11) === 'hiddenpower') availableHP++;
		}

		// These moves can be used even if we aren't setting up to use them:
		let SetupException = {
			extremespeed:1, suckerpunch:1, superpower:1,
			dracometeor:1, leafstorm:1, overheat:1
		};
		let counterAbilities = {
			'Adaptability':1, 'Contrary':1, 'Hustle':1, 'Iron Fist':1, 'Sheer Force':1, 'Skill Link':1
		};
		let ateAbilities = {
			'Aerilate':1, 'Pixilate':1, 'Refrigerate':1
		};

		let hasMove, counter;

		do {
			// Keep track of all moves we have:
			hasMove = {};
			for (let k = 0; k < moves.length; k++) {
				if (moves[k].substr(0, 11) === 'hiddenpower') {
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moves[k]] = true;
				}
			}

			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.length < 4 && movePool.length) {
				let moveid = this.sampleNoReplace(movePool);
				if (moveid.substr(0, 11) === 'hiddenpower') {
					availableHP--;
					if (hasMove['hiddenpower']) continue;
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moveid] = true;
				}
				moves.push(moveid);
			}

			counter = this.queryMoves(moves, hasType, hasAbility, movePool);

			// Iterate through the moves again, this time to cull them:
			for (let k = 0; k < moves.length; k++) {
				let moveid = moves[k];
				let move = this.getMove(moveid);
				let rejected = false;
				let isSetup = false;

				switch (moveid) {

				// Not very useful without their supporting moves
				case 'batonpass':
					if (!counter.setupType && !counter['speedsetup'] && !hasMove['substitute'] && !hasMove['wish'] && !hasAbility['Speed Boost']) rejected = true;
					break;
				case 'focuspunch':
					if (!hasMove['substitute'] || counter.damagingMoves.length < 2) rejected = true;
					break;
				case 'perishsong':
					if (!hasMove['protect']) rejected = true;
					break;
				case 'rest': {
					let sleepTalk = movePool.indexOf('sleeptalk');
					if (sleepTalk >= 0) {
						movePool.splice(sleepTalk, 1);
						rejected = true;
					}
					break;
				}
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					break;
				case 'storedpower':
					if (!counter.setupType && !hasMove['cosmicpower']) rejected = true;
					break;

				// Set up once and only if we have the moves for it
				case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
					if (counter.setupType !== 'Physical' || counter['physicalsetup'] > 1) rejected = true;
					if (counter.Physical + counter['physicalpool'] < 2 && !hasMove['batonpass'] && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					isSetup = true;
					break;
				case 'calmmind': case 'geomancy': case 'nastyplot': case 'quiverdance': case 'tailglow':
					if (counter.setupType !== 'Special' || counter['specialsetup'] > 1) rejected = true;
					if (counter.Special + counter['specialpool'] < 2 && !hasMove['batonpass'] && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					isSetup = true;
					break;
				case 'growth': case 'shellsmash': case 'workup':
					if (counter.setupType !== 'Mixed' || counter['mixedsetup'] > 1) rejected = true;
					if (counter.damagingMoves.length + counter['physicalpool'] + counter['specialpool'] < 2 && !hasMove['batonpass']) rejected = true;
					if (moveid === 'growth' && !hasMove['sunnyday']) rejected = true;
					isSetup = true;
					break;
				case 'agility': case 'autotomize': case 'rockpolish':
					if (counter.damagingMoves.length < 2 && !counter.setupType && !hasMove['batonpass']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (!counter.setupType) isSetup = true;
					break;
				case 'flamecharge':
					if (counter.damagingMoves.length < 3 && !counter.setupType && !hasMove['batonpass']) rejected = true;
					if (hasMove['dracometeor'] || hasMove['overheat']) rejected = true;
					break;

				// Bad after setup
				case 'circlethrow': case 'dragontail':
					if (counter.setupType && ((!hasMove['rest'] && !hasMove['sleeptalk']) || hasMove['stormthrow'])) rejected = true;
					if (!!counter['speedsetup'] || hasMove['encore'] || hasMove['raindance'] || hasMove['roar'] || hasMove['whirlwind']) rejected = true;
					break;
				case 'defog': case 'rapidspin':
					if (counter.setupType || !!counter['speedsetup'] || (hasMove['rest'] && hasMove['sleeptalk']) || teamDetails.hazardClear >= 1) rejected = true;
					break;
				case 'fakeout': case 'superfang':
					if (counter.setupType || hasMove['substitute'] || hasMove['switcheroo'] || hasMove['trick']) rejected = true;
					break;
				case 'foulplay':
					if (counter.setupType || !!counter['speedsetup'] || counter['Dark'] > 2 || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'haze': case 'pursuit': case 'spikes': case 'waterspout':
					if (counter.setupType || !!counter['speedsetup'] || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'healbell':
					if (!!counter['speedsetup']) rejected = true;
					break;
				case 'healingwish': case 'memento':
					if (counter.setupType || !!counter['recovery'] || hasMove['substitute']) rejected = true;
					break;
				case 'nightshade': case 'seismictoss':
					if (counter.stab || counter.setupType || counter.damagingMoves.length > 2) rejected = true;
					break;
				case 'protect':
					if (counter.setupType && (hasAbility['Guts'] || hasAbility['Speed Boost']) && !hasMove['batonpass']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'roar':
					if (counter.setupType || hasMove['dragontail']) rejected = true;
					break;
				case 'stealthrock':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['rest'] || teamDetails.stealthRock >= 1) rejected = true;
					break;
				case 'switcheroo': case 'trick':
					if (counter.Physical + counter.Special < 3) rejected = true;
					if (hasMove['acrobatics'] || hasMove['lightscreen'] || hasMove['reflect'] || hasMove['trickroom']) rejected = true;
					break;
				case 'toxicspikes':
					if (counter.setupType || teamDetails.toxicSpikes >= 1) rejected = true;
					break;
				case 'trickroom':
					if (counter.setupType || !!counter['speedsetup'] || counter.damagingMoves.length < 2) rejected = true;
					if (hasMove['lightscreen'] || hasMove['reflect']) rejected = true;
					break;
				case 'uturn':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['batonpass']) rejected = true;
					if (hasType['Bug'] && counter.stab < 2 && counter.damagingMoves.length > 2 && !hasAbility['Adaptability'] && !hasMove['technoblast']) rejected = true;
					break;
				case 'voltswitch':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['batonpass'] || hasMove['magnetrise'] || hasMove['uturn']) rejected = true;
					break;

				// Bit redundant to have both
				// Attacks:
				case 'bugbite': case 'bugbuzz':
					if (hasMove['uturn'] && !counter.setupType) rejected = true;
					break;
				case 'darkpulse':
					if ((hasMove['crunch'] || hasMove['hyperspacefury']) && counter.setupType !== 'Special') rejected = true;
					break;
				case 'suckerpunch':
					if (counter['Dark'] > 2 || (counter.setupType === 'Special' && hasType['Dark'] && counter.stab < 2)) rejected = true;
					if (counter['Dark'] > 1 && !hasType['Dark']) rejected = true;
					if (counter.damagingMoves.length < 2 || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'dragonclaw':
					if (hasMove['outrage'] || hasMove['dragontail']) rejected = true;
					break;
				case 'dragonpulse': case 'spacialrend':
					if (hasMove['dracometeor']) rejected = true;
					break;
				case 'outrage':
					if (hasMove['dracometeor'] && counter.damagingMoves.length < 3) rejected = true;
					break;
				case 'chargebeam':
					if (hasMove['thunderbolt'] && counter.Special < 3) rejected = true;
					break;
				case 'thunder':
					if (hasMove['thunderbolt'] && !hasMove['raindance']) rejected = true;
					break;
				case 'thunderbolt':
					if (hasMove['discharge'] || (hasMove['thunder'] && hasMove['raindance']) || (hasMove['voltswitch'] && hasMove['wildcharge'])) rejected = true;
					break;
				case 'dazzlinggleam':
					if (hasMove['playrough'] && counter.setupType !== 'Special') rejected = true;
					break;
				case 'drainingkiss':
					if (hasMove['dazzlinggleam'] || counter.setupType !== 'Special') rejected = true;
					break;
				case 'aurasphere':
					if (hasMove['closecombat'] && counter.setupType !== 'Special') rejected = true;
					break;
				case 'drainpunch':
					if (!hasMove['bulkup'] && (hasMove['closecombat'] || hasMove['highjumpkick'])) rejected = true;
					if (hasMove['focusblast'] || hasMove['superpower']) rejected = true;
					break;
				case 'closecombat': case 'highjumpkick':
					if (hasMove['bulkup'] && hasMove['drainpunch']) rejected = true;
					break;
				case 'focusblast':
					if (!counter.setupType && (hasMove['closecombat'] || hasMove['superpower'])) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'machpunch':
					if (hasType['Fighting'] && counter.stab < 2 && !hasAbility['Technician']) rejected = true;
					break;
				case 'stormthrow':
					if (hasMove['circlethrow'] && hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'superpower':
					if (counter.setupType && (hasMove['drainpunch'] || hasMove['focusblast'])) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'vacuumwave':
					if (counter.setupType !== 'Special' && (hasMove['closecombat'] || hasMove['machpunch'])) rejected = true;
					break;
				case 'blazekick':
					if (hasMove['flamethrower'] && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'fierydance': case 'firefang': case 'flamethrower':
					if ((hasMove['fireblast'] && counter.setupType !== 'Physical') || hasMove['overheat']) rejected = true;
					break;
				case 'fireblast':
					if ((hasMove['flareblitz'] || hasMove['lavaplume']) && !counter.setupType && !counter['speedsetup']) rejected = true;
					break;
				case 'firepunch': case 'sacredfire':
					if (hasMove['fireblast'] || hasMove['flareblitz']) rejected = true;
					break;
				case 'lavaplume':
					if (hasMove['fireblast'] && (counter.setupType || !!counter['speedsetup'])) rejected = true;
					break;
				case 'overheat':
					if (hasMove['lavaplume'] || counter.setupType === 'Special') rejected = true;
					break;
				case 'acrobatics':
					if (hasMove['hurricane'] && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'airslash': case 'oblivionwing':
					if (hasMove['acrobatics'] || hasMove['bravebird'] || hasMove['hurricane']) rejected = true;
					break;
				case 'shadowclaw':
					if (hasMove['phantomforce'] || (hasMove['shadowball'] && counter.setupType !== 'Physical') || hasMove['shadowsneak']) rejected = true;
					break;
				case 'shadowsneak':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (hasType['Ghost'] && counter.stab < 2 && template.types.length > 1) rejected = true;
					break;
				case 'solarbeam':
					if ((!hasAbility['Drought'] && !hasMove['sunnyday']) || hasMove['gigadrain'] || hasMove['leafstorm']) rejected = true;
					break;
				case 'gigadrain':
					if (hasMove['petaldance'] || !counter.setupType && hasMove['leafstorm']) rejected = true;
					break;
				case 'leafblade': case 'seedbomb': case 'woodhammer':
					if (hasMove['gigadrain'] && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'leafstorm':
					if (counter.setupType && hasMove['gigadrain']) rejected = true;
					break;
				case 'bonemerang': case 'precipiceblades':
					if (hasMove['earthquake']) rejected = true;
					break;
				case 'earthpower':
					if (hasMove['earthquake'] && counter.setupType !== 'Special') rejected = true;
					break;
				case 'icebeam':
					if (hasMove['blizzard'] || hasMove['freezedry']) rejected = true;
					break;
				case 'iceshard':
					if (hasMove['freezedry']) rejected = true;
					break;
				case 'bodyslam':
					if (hasMove['glare']) rejected = true;
					break;
				case 'endeavor':
					if (slot > 0) rejected = true;
					break;
				case 'explosion':
					if (counter.setupType || (hasAbility['Refrigerate'] && hasMove['freezedry']) || hasMove['wish']) rejected = true;
					break;
				case 'hiddenpower':
					if ((counter.damagingMoves.length < 2 && !counter.stab) || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'hypervoice':
					if (hasMove['naturepower'] || hasMove['return']) rejected = true;
					break;
				case 'judgment':
					if (counter.setupType !== 'Special' && counter.stab > 1) rejected = true;
					break;
				case 'return': case 'rockclimb':
					if (hasMove['bodyslam'] || hasMove['doubleedge']) rejected = true;
					break;
				case 'weatherball':
					if (!hasMove['raindance'] && !hasMove['sunnyday']) rejected = true;
					break;
				case 'acidspray':
					if (hasMove['sludgebomb'] || counter.Special < 2) rejected = true;
					break;
				case 'poisonjab':
					if (hasMove['gunkshot'] || hasMove['sludgewave'] && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'psychic':
					if (hasMove['psyshock'] || hasMove['storedpower']) rejected = true;
					break;
				case 'zenheadbutt':
					if ((hasMove['psychic'] || hasMove['psyshock']) && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'headsmash':
					if (hasMove['stoneedge']) rejected = true;
					break;
				case 'rockblast': case 'rockslide':
					if (hasMove['headsmash'] || hasMove['stoneedge']) rejected = true;
					break;
				case 'bulletpunch':
					if (hasType['Steel'] && counter.stab < 2 && !hasAbility['Adaptability'] && !hasAbility['Technician']) rejected = true;
					break;
				case 'flashcannon':
					if (hasMove['ironhead']) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['razorshell'] || hasMove['scald'] || hasMove['waterfall'] || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'originpulse': case 'surf':
					if (hasMove['hydropump'] || hasMove['scald']) rejected = true;
					break;
				case 'scald':
					if (hasMove['waterfall'] || hasMove['waterpulse']) rejected = true;
					break;

				// Status:
				case 'raindance':
					if (counter.Physical + counter.Special < 2 || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (!hasType['Water'] && !hasMove['thunder']) rejected = true;
					break;
				case 'sunnyday':
					if (counter.Physical + counter.Special < 2 || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (!hasAbility['Chlorophyll'] && !hasAbility['Flower Gift'] && !hasMove['solarbeam']) rejected = true;
					break;
				case 'stunspore': case 'thunderwave':
					if (counter.setupType || !!counter['speedsetup'] || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					if (hasMove['discharge'] || hasMove['gyroball'] || hasMove['spore'] || hasMove['toxic'] || hasMove['trickroom'] || hasMove['yawn']) rejected = true;
					break;
				case 'toxic':
					if (hasMove['flamecharge'] || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					if (hasMove['hypnosis'] || hasMove['sleeppowder'] || hasMove['willowisp'] || hasMove['yawn']) rejected = true;
					break;
				case 'willowisp':
					if (hasMove['lavaplume'] || hasMove['sacredfire'] || hasMove['scald'] || hasMove['spore']) rejected = true;
					break;
				case 'moonlight': case 'painsplit': case 'recover': case 'roost': case 'softboiled': case 'synthesis':
					if (hasMove['rest'] || hasMove['wish']) rejected = true;
					break;
				case 'safeguard':
					if (hasMove['destinybond']) rejected = true;
					break;
				case 'substitute':
					if (hasMove['dracometeor'] || (hasMove['leafstorm'] && !hasAbility['Contrary']) || hasMove['pursuit'] || hasMove['rest'] || hasMove['taunt'] || hasMove['uturn'] || hasMove['voltswitch']) rejected = true;
					break;
				}

				// Increased/decreased priority moves are unneeded with moves that boost only speed
				if (move.priority !== 0 && (!!counter['speedsetup'] || hasMove['copycat'])) {
					rejected = true;
				}

				// Certain Pokemon should always have a recovery move
				if (!counter.recovery && template.baseStats.hp >= 165 && movePool.indexOf('wish') >= 0) {
					if (move.category === 'Status' || !hasType[move.type] && !move.damage) rejected = true;
				}

				// This move doesn't satisfy our setup requirements:
				if ((move.category === 'Physical' && counter.setupType === 'Special') || (move.category === 'Special' && counter.setupType === 'Physical')) {
					// Reject STABs last in case the setup type changes later on
					if (!SetupException[move.id] && (!hasType[move.type] || counter.stab > 1 || counter[move.category] < 2)) rejected = true;
				}
				if (counter.setupType && !isSetup && counter.setupType !== 'Mixed' && move.category !== counter.setupType && counter[counter.setupType] < 2 && !hasMove['batonpass'] && moveid !== 'rest' && moveid !== 'sleeptalk') {
					// Mono-attacking with setup and RestTalk is allowed
					// Reject Status moves only if there is nothing else to reject
					if (move.category !== 'Status' || counter[counter.setupType] + counter.Status > 3 && counter['physicalsetup'] + counter['specialsetup'] < 2) rejected = true;
				}
				if (counter.setupType === 'Special' && move.id === 'hiddenpower' && counter['Special'] <= 2 && !hasType[move.type] && !counter['Physical'] && counter['specialpool']) {
					// Hidden Power isn't good enough
					if ((!hasType['Ghost'] || !counter['Ghost'] || move.type !== 'Fighting') && (!hasType['Electric'] || move.type !== 'Ice')) rejected = true;
				}

				// Pokemon should have moves that benefit their Ability/Type/Weather, as well as moves required by its forme
				if (((hasAbility['Adaptability'] && template.types.length > 1 && (!counter[template.types[0]] || !counter[template.types[1]])) ||
					((hasAbility['Aerilate'] || hasAbility['Pixilate'] || hasAbility['Refrigerate']) && !counter['Normal']) ||
					(hasAbility['Bad Dreams'] && movePool.indexOf('darkvoid') >= 0) ||
					(hasAbility['Contrary'] && !counter['contrary'] && template.species !== 'Shuckle') ||
					(hasAbility['Dark Aura'] && !counter['Dark']) ||
					(hasAbility['Gale Wings'] && !counter['Flying']) ||
					(hasType['Dark'] && hasMove['suckerpunch'] && counter.stab < template.types.length) ||
					(hasType['Dragon'] && !counter['Dragon'] && !hasAbility['Aerilate'] && !hasAbility['Pixilate'] && !hasMove['rest'] && !hasMove['sleeptalk']) ||
					(hasType['Electric'] && !counter['Electric']) ||
					(hasType['Fire'] && !counter['Fire']) ||
					(hasType['Ground'] && !counter['Ground'] && (counter.setupType || counter['speedsetup'])) ||
					(hasType['Ice'] && !counter['Ice']) ||
					(hasType['Psychic'] && !!counter['Psychic'] && !hasType['Flying'] && !hasAbility['Pixilate'] && template.types.length > 1 && counter.stab < 2) ||
					(hasMove['raindance'] && hasType['Water'] && !counter['Water']) ||
					(movePool.indexOf('technoblast') >= 0 || template.requiredMove && movePool.indexOf(toId(template.requiredMove)) >= 0)) &&
					(counter['physicalsetup'] + counter['specialsetup'] < 2 && (!counter.setupType || counter.setupType === 'Mixed' || (move.category !== counter.setupType && move.category !== 'Status') || counter[counter.setupType] + counter.Status > 3))) {
					// Reject Status or non-STAB
					if (!isSetup && !move.weather && (move.category === 'Status' || !hasType[move.type])) rejected = true;
				}

				// Remove rejected moves from the move list
				if (rejected && (movePool.length - availableHP || availableHP && (move.id === 'hiddenpower' || !hasMove['hiddenpower']))) {
					moves.splice(k, 1);
					break;
				}

				// Handle Hidden Power IVs
				if (move.id === 'hiddenpower') {
					let HPivs = this.getType(move.type).HPivs;
					for (let iv in HPivs) {
						ivs[iv] = HPivs[iv];
					}
				}
			}
			if (moves.length === 4 && !counter.stab && !hasMove['metalburst'] && (counter['physicalpool'] || counter['specialpool'])) {
				// Move post-processing:
				if (counter.damagingMoves.length === 0) {
					// A set shouldn't have no attacking moves
					moves.splice(this.random(moves.length), 1);
				} else if (counter.damagingMoves.length === 1) {
					let damagingid = counter.damagingMoves[0].id;
					if (movePool.length - availableHP || availableHP && (damagingid === 'hiddenpower' || !hasMove['hiddenpower'])) {
						let replace = false;
						if (!counter.damagingMoves[0].damage && template.species !== 'Porygon2') {
							let damagingType = counter.damagingMoves[0].type;
							if (damagingType === 'Fairy') {
								// Mono-Fairy is acceptable for Psychic types
								if (counter.setupType !== 'Special' || template.types.length > 1 || !hasType['Psychic']) replace = true;
							} else {
								replace = true;
							}
						}
						if (replace) moves.splice(counter.damagingMoveIndex[damagingid], 1);
					}
				} else if (!counter.damagingMoves[0].damage && !counter.damagingMoves[1].damage && template.species !== 'Porygon2') {
					// If you have three or more attacks, and none of them are STAB, reject one of them at random.
					let rejectableMoves = [];
					let baseDiff = movePool.length - availableHP;
					for (let l = 0; l < counter.damagingMoves.length; l++) {
						if (counter.damagingMoves[l].id === 'technoblast') continue;
						if (baseDiff || availableHP && (!hasMove['hiddenpower'] || counter.damagingMoves[l].id === 'hiddenpower')) {
							rejectableMoves.push(counter.damagingMoveIndex[counter.damagingMoves[l].id]);
						}
					}
					if (rejectableMoves.length) {
						moves.splice(rejectableMoves[this.random(rejectableMoves.length)], 1);
					}
				}
			}
		} while (moves.length < 4 && movePool.length);

		// If Hidden Power has been removed, reset the IVs
		if (!hasMove['hiddenpower']) {
			ivs = {
				hp: 31,
				atk: 31,
				def: 31,
				spa: 31,
				spd: 31,
				spe: 31
			};
		}

		let abilities = Object.values(baseTemplate.abilities).sort(function (a, b) {
			return this.getAbility(b).rating - this.getAbility(a).rating;
		}.bind(this));
		let ability0 = this.getAbility(abilities[0]);
		let ability1 = this.getAbility(abilities[1]);
		let ability2 = this.getAbility(abilities[2]);
		ability = ability0.name;
		if (abilities[1]) {
			if (abilities[2] && ability2.rating === ability1.rating) {
				if (this.random(2)) ability1 = ability2;
			}
			if (ability0.rating <= ability1.rating) {
				if (this.random(2)) ability = ability1.name;
			} else if (ability0.rating - 0.6 <= ability1.rating) {
				if (!this.random(3)) ability = ability1.name;
			}

			let rejectAbility = false;
			if (ability in counterAbilities) {
				// Adaptability, Contrary, Hustle, Iron Fist, Sheer Force, Skill Link
				rejectAbility = !counter[toId(ability)];
			} else if (ability in ateAbilities) {
				rejectAbility = !counter['Normal'];
			} else if (ability === 'Blaze') {
				rejectAbility = !counter['Fire'];
			} else if (ability === 'Chlorophyll') {
				rejectAbility = !hasMove['sunnyday'];
			} else if (ability === 'Compound Eyes' || ability === 'No Guard') {
				rejectAbility = !counter['inaccurate'];
			} else if (ability === 'Defiant' || ability === 'Moxie') {
				rejectAbility = !counter['Physical'] && !hasMove['batonpass'];
			} else if (ability === 'Gluttony') {
				rejectAbility = true;
			} else if (ability === 'Limber') {
				rejectAbility = template.types.indexOf('Electric') >= 0;
			} else if (ability === 'Lightning Rod') {
				rejectAbility = template.types.indexOf('Ground') >= 0;
			} else if (ability === 'Moody') {
				rejectAbility = template.id !== 'bidoof';
			} else if (ability === 'Overgrow') {
				rejectAbility = !counter['Grass'];
			} else if (ability === 'Poison Heal') {
				rejectAbility = abilities.indexOf('Technician') >= 0 && !!counter['technician'];
			} else if (ability === 'Prankster') {
				rejectAbility = !counter['Status'];
			} else if (ability === 'Reckless' || ability === 'Rock Head') {
				rejectAbility = !counter['recoil'];
			} else if (ability === 'Sand Veil') {
				rejectAbility = !teamDetails['sand'];
			} else if (ability === 'Serene Grace') {
				rejectAbility = !counter['serenegrace'] || template.id === 'chansey' || template.id === 'blissey';
			} else if (ability === 'Simple') {
				rejectAbility = !counter.setupType && !hasMove['cosmicpower'] && !hasMove['flamecharge'];
			} else if (ability === 'Snow Cloak') {
				rejectAbility = !teamDetails['hail'];
			} else if (ability === 'Solar Power') {
				rejectAbility = !counter['Special'] || template.isMega;
			} else if (ability === 'Strong Jaw') {
				rejectAbility = !counter['bite'];
			} else if (ability === 'Sturdy') {
				rejectAbility = !!counter['recoil'] && !counter['recovery'];
			} else if (ability === 'Swift Swim') {
				rejectAbility = !hasMove['raindance'] && !teamDetails['rain'];
			} else if (ability === 'Swarm') {
				rejectAbility = !counter['Bug'];
			} else if (ability === 'Technician') {
				rejectAbility = !counter['technician'] || (abilities.indexOf('Skill Link') >= 0 && counter['skilllink'] >= counter['technician']);
			} else if (ability === 'Torrent') {
				rejectAbility = !counter['Water'];
			} else if (ability === 'Unburden') {
				rejectAbility = template.baseStats.spe > 120 || (template.id === 'slurpuff' && !counter.setupType);
			}

			if (rejectAbility) {
				if (ability === ability1.name) { // or not
					ability = ability0.name;
				} else if (ability1.rating > 1) { // only switch if the alternative doesn't suck
					ability = ability1.name;
				}
			}
			if (abilities.indexOf('Chlorophyll') >= 0 && ability !== 'Solar Power' && hasMove['sunnyday']) {
				ability = 'Chlorophyll';
			}
			if (abilities.indexOf('Guts') >= 0 && ability !== 'Quick Feet' && (hasMove['facade'] || hasMove['protect'] || (hasMove['rest'] && hasMove['sleeptalk']))) {
				ability = 'Guts';
			}
			if (abilities.indexOf('Marvel Scale') >= 0 && hasMove['rest'] && hasMove['sleeptalk']) {
				ability = 'Marvel Scale';
			}
			if (abilities.indexOf('Swift Swim') >= 0 && hasMove['raindance']) {
				ability = 'Swift Swim';
			}
			if (abilities.indexOf('Unburden') >= 0 && hasMove['acrobatics']) {
				ability = 'Unburden';
			}
			if (template.id === 'ambipom' && !counter['technician']) {
				// If it doesn't qualify for Technician, Skill Link is useless on it
				// Might as well give it Pickup just in case
				ability = 'Pickup';
			} else if (template.id === 'aurorus' && ability === 'Snow Warning' && hasMove['hypervoice']) {
				for (let i = 0; i < moves.length; i++) {
					if (moves[i] === 'hypervoice') {
						moves[i] = 'blizzard';
						counter['Normal'] = 0;
						break;
					}
				}
			} else if (template.baseSpecies === 'Basculin') {
				ability = 'Adaptability';
			} else if (template.id === 'combee') {
				// Combee always gets Hustle but its only physical move is Endeavor, which loses accuracy
				ability = 'Honey Gather';
			} else if (template.id === 'lilligant' && hasMove['petaldance']) {
				ability = 'Own Tempo';
			} else if (template.id === 'lopunny' && hasMove['switcheroo'] && this.random(3)) {
				ability = 'Klutz';
			} else if (template.id === 'mawilemega') {
				// Mega Mawile only needs Intimidate for a starting ability
				ability = 'Intimidate';
			} else if (template.id === 'rampardos' && !hasMove['headsmash']) {
				ability = 'Sheer Force';
			} else if (template.id === 'rhyperior') {
				ability = 'Solid Rock';
			} else if (template.id === 'sigilyph') {
				ability = 'Magic Guard';
			} else if (template.id === 'unfezant') {
				ability = 'Super Luck';
			} else if (template.id === 'venusaurmega') {
				ability = 'Chlorophyll';
			}
		}

		if (hasMove['rockclimb'] && ability !== 'Sheer Force') {
			moves[moves.indexOf('rockclimb')] = 'doubleedge';
		}

		if (hasMove['gyroball'] || hasMove['trickroom']) {
			ivs.spe = 0;
			evs.spe = 0;
		}

		item = 'Leftovers';
		if (template.requiredItem) {
			item = template.requiredItem;
		} else if (hasMove['magikarpsrevenge']) {
			// PoTD Magikarp
			item = 'Choice Band';
		} else if (template.species === 'Rotom-Fan') {
			// This is just to amuse Zarel
			item = 'Air Balloon';

		// First, the extra high-priority items
		} else if (template.species === 'Clamperl' && !hasMove['shellsmash']) {
			item = 'DeepSeaTooth';
		} else if (template.species === 'Cubone' || template.species === 'Marowak') {
			item = 'Thick Club';
		} else if (template.species === 'Dedenne') {
			item = 'Petaya Berry';
		} else if (template.species === 'Deoxys-Attack') {
			item = (slot === 0 && hasMove['stealthrock']) ? 'Focus Sash' : 'Life Orb';
		} else if (template.species === 'Farfetch\'d') {
			item = 'Stick';
		} else if (template.baseSpecies === 'Pikachu') {
			item = 'Light Ball';
		} else if (template.species === 'Shedinja' || template.species === 'Smeargle') {
			item = 'Focus Sash';
		} else if (template.species === 'Unfezant' && counter['Physical'] >= 2) {
			item = 'Scope Lens';
		} else if (template.species === 'Unown') {
			item = 'Choice Specs';
		} else if (template.species === 'Wobbuffet') {
			item = hasMove['destinybond'] ? 'Custap Berry' : ['Leftovers', 'Sitrus Berry'][this.random(2)];
		} else if (ability === 'Imposter') {
			item = 'Choice Scarf';
		} else if (ability === 'Klutz' && hasMove['switcheroo']) {
			// To perma-taunt a Pokemon by giving it Assault Vest
			item = 'Assault Vest';
		} else if (hasMove['geomancy']) {
			item = 'Power Herb';
		} else if (ability === 'Magic Guard' && hasMove['psychoshift']) {
			item = 'Flame Orb';
		} else if (hasMove['switcheroo'] || hasMove['trick']) {
			let randomNum = this.random(2);
			if (counter.Physical >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Band';
			} else if (counter.Special >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Specs';
			} else {
				item = 'Choice Scarf';
			}
		} else if (template.evos.length) {
			item = 'Eviolite';
		} else if (hasMove['shellsmash']) {
			if (ability === 'Solid Rock' && counter['priority']) {
				item = 'Weakness Policy';
			} else {
				item = 'White Herb';
			}
		} else if (ability === 'Magic Guard' || ability === 'Sheer Force') {
			item = 'Life Orb';
		} else if (hasMove['bellydrum']) {
			item = 'Sitrus Berry';
		} else if (ability === 'Poison Heal' || ability === 'Toxic Boost' || hasMove['facade']) {
			item = 'Toxic Orb';
		} else if (ability === 'Harvest') {
			item = hasMove['rest'] ? 'Lum Berry' : 'Sitrus Berry';
		} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			item = (hasMove['raindance'] && ability === 'Hydration') ? 'Damp Rock' : 'Chesto Berry';
		} else if (hasMove['raindance']) {
			item = 'Damp Rock';
		} else if (hasMove['sandstorm']) {
			item = 'Smooth Rock';
		} else if (hasMove['sunnyday']) {
			item = 'Heat Rock';
		} else if (hasMove['lightscreen'] && hasMove['reflect']) {
			item = 'Light Clay';
		} else if (hasMove['acrobatics']) {
			item = 'Flying Gem';
		} else if (ability === 'Unburden') {
			if (hasMove['fakeout']) {
				item = 'Normal Gem';
			} else if (hasMove['dracometeor'] || hasMove['leafstorm'] || hasMove['overheat']) {
				item = 'White Herb';
			} else if (hasMove['substitute'] || counter.setupType) {
				item = 'Sitrus Berry';
			} else {
				item = 'Red Card';
				for (let m in moves) {
					let move = this.getMove(moves[m]);
					if (hasType[move.type] && move.basePower >= 90) {
						item = move.type + ' Gem';
						break;
					}
				}
			}

		// Medium priority
		} else if (ability === 'Guts' && !hasMove['sleeptalk']) {
			item = hasMove['drainpunch'] ? 'Flame Orb' : 'Toxic Orb';
		} else if (((ability === 'Speed Boost' && !hasMove['substitute']) || (ability === 'Stance Change')) && counter.Physical + counter.Special > 2) {
			item = 'Life Orb';
		} else if (counter.Physical >= 4 && !hasMove['bodyslam'] && !hasMove['dragontail'] && !hasMove['fakeout'] && !hasMove['flamecharge'] && !hasMove['rapidspin'] && !hasMove['suckerpunch']) {
			item = template.baseStats.spe > 82 && template.baseStats.spe < 109 && !counter['priority'] && this.random(3) ? 'Choice Scarf' : 'Choice Band';
		} else if (counter.Special >= 4 && !hasMove['acidspray'] && !hasMove['chargebeam'] && !hasMove['fierydance']) {
			item = template.baseStats.spe > 82 && template.baseStats.spe < 109 && !counter['priority'] && this.random(3) ? 'Choice Scarf' : 'Choice Specs';
		} else if (counter.Special >= 3 && hasMove['uturn'] && template.baseStats.spe > 82 && template.baseStats.spe < 109 && !counter['priority'] && this.random(3)) {
			item = 'Choice Scarf';
		} else if (hasMove['eruption'] || hasMove['waterspout']) {
			item = counter.Status <= 1 ? 'Expert Belt' : 'Leftovers';
		} else if ((hasMove['endeavor'] || hasMove['flail'] || hasMove['reversal']) && ability !== 'Sturdy') {
			item = 'Focus Sash';
		} else if (this.getEffectiveness('Ground', template) >= 2 && ability !== 'Levitate' && !hasMove['magnetrise']) {
			item = 'Air Balloon';
		} else if (hasMove['outrage'] && (counter.setupType || ability === 'Multiscale')) {
			item = 'Lum Berry';
		} else if (ability === 'Moody' || hasMove['clearsmog'] || hasMove['detect'] || hasMove['protect'] || hasMove['sleeptalk']) {
			item = 'Leftovers';
		} else if (hasMove['substitute']) {
			item = !counter['drain'] ? 'Leftovers' : 'Life Orb';
		} else if (hasMove['lightscreen'] || hasMove['reflect']) {
			item = 'Light Clay';
		} else if (ability === 'Iron Barbs' || ability === 'Rough Skin') {
			item = 'Rocky Helmet';
		} else if (counter.Physical + counter.Special >= 4 && (template.baseStats.def + template.baseStats.spd > 189 || hasMove['rapidspin'])) {
			item = 'Assault Vest';
		} else if (counter.damagingMoves.length >= 4) {
			item = (!!counter['Normal'] || (hasMove['suckerpunch'] && !hasType['Dark'])) ? 'Life Orb' : 'Expert Belt';
		} else if (counter.damagingMoves.length >= 3 && !!counter['speedsetup'] && template.baseStats.hp + template.baseStats.def + template.baseStats.spd >= 300) {
			item = 'Weakness Policy';
		} else if (counter.damagingMoves.length >= 3 && ability !== 'Sturdy' && !hasMove['dragontail'] && !hasMove['superfang']) {
			item = (template.baseStats.hp + template.baseStats.def + template.baseStats.spd < 285 || !!counter['speedsetup'] || hasMove['trickroom']) ? 'Life Orb' : 'Leftovers';
		} else if (template.species === 'Palkia' && (hasMove['dracometeor'] || hasMove['spacialrend']) && hasMove['hydropump']) {
			item = 'Lustrous Orb';
		} else if (slot === 0 && ability !== 'Regenerator' && ability !== 'Sturdy' && !counter['recoil'] && !counter['recovery'] && template.baseStats.hp + template.baseStats.def + template.baseStats.spd < 285) {
			item = 'Focus Sash';

		// This is the "REALLY can't think of a good item" cutoff
		} else if (ability === 'Super Luck') {
			item = 'Scope Lens';
		} else if (ability === 'Sturdy' && hasMove['explosion'] && !counter['speedsetup']) {
			item = 'Custap Berry';
		} else if (hasType['Poison']) {
			item = 'Black Sludge';
		} else if (ability === 'Gale Wings' && hasMove['bravebird']) {
			item = 'Sharp Beak';
		} else if (this.getEffectiveness('Rock', template) >= 1 || hasMove['dragontail']) {
			item = 'Leftovers';
		} else if (this.getImmunity('Ground', template) && this.getEffectiveness('Ground', template) >= 1 && ability !== 'Levitate' && ability !== 'Solid Rock' && !hasMove['magnetrise'] && !hasMove['sleeptalk']) {
			item = 'Air Balloon';
		} else if (counter.Status <= 1 && ability !== 'Sturdy' && !hasMove['rapidspin']) {
			item = 'Life Orb';
		} else {
			item = 'Leftovers';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && hasType['Poison']) {
			item = 'Black Sludge';
		}

		let levelScale = {
			LC: 87,
			'LC Uber': 86,
			NFE: 84,
			PU: 83,
			BL4: 82,
			NU: 81,
			BL3: 80,
			RU: 79,
			BL2: 78,
			UU: 77,
			BL: 76,
			OU: 75,
			CAP: 75,
			Unreleased: 75,
			Uber: 73,
			AG: 71
		};
		let customScale = {
			// Between OU and Uber
			Aegislash: 74, Blaziken: 74, 'Blaziken-Mega': 74, Genesect: 74, 'Genesect-Burn': 74, 'Genesect-Chill': 74, 'Genesect-Douse': 74, 'Genesect-Shock': 74, Greninja: 74, 'Kangaskhan-Mega': 74, 'Lucario-Mega': 74, 'Mawile-Mega': 74,

			// Banned Ability
			Gothitelle: 74, Ninetales: 77, Politoed: 77, Wobbuffet: 74,

			// Holistic judgement
			Unown: 85
		};
		let tier = template.tier;
		if (tier.charAt(0) === '(') {
			tier = tier.slice(1, -1);
		}
		let level = levelScale[tier] || 90;
		if (customScale[template.name]) level = customScale[template.name];

		if (template.name === 'Slurpuff' && !counter.setupType) level = 79;
		if (template.name === 'Xerneas' && hasMove['geomancy']) level = 71;

		// Prepare optimal HP
		let hp = Math.floor(Math.floor(2 * template.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
		if (hasMove['substitute'] && item === 'Sitrus Berry') {
			// Two substitutes should activate Sitrus Berry
			while (hp % 4 > 0) {
				evs.hp -= 4;
				hp = Math.floor(Math.floor(2 * template.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			}
		} else if (hasMove['bellydrum'] && item === 'Sitrus Berry') {
			// Belly Drum should activate Sitrus Berry
			if (hp % 2 > 0) evs.hp -= 4;
		} else {
			// Maximize number of Stealth Rock switch-ins
			if (this.getEffectiveness('Rock', template) === 1) {
				while (hp % 4 === 0) {
					evs.hp -= 4;
					hp = Math.floor(Math.floor(2 * template.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
				}
			}
			if (this.getEffectiveness('Rock', template) === 2) {
				while (hp % 2 === 0) {
					evs.hp -= 4;
					hp = Math.floor(Math.floor(2 * template.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
				}
			}
		}

		return {
			name: name,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: !this.random(1024)
		};
	},
	randomTeam: function (side) {
		let pokemonLeft = 0;
		let pokemon = [];

		let excludedTiers = {'LC':1, 'LC Uber':1, 'NFE':1};
		let allowedNFE = {'Chansey':1, 'Doublade':1, 'Gligar':1, 'Porygon2':1, 'Scyther':1};

		let pokemonPool = [];
		for (let id in this.data.FormatsData) {
			let template = this.getTemplate(id);
			if (!excludedTiers[template.tier] && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		// PotD stuff
		let potd;
		if (Config.potd && 'Rule:potd' in this.getBanlistTable(this.getFormat())) {
			potd = this.getTemplate(Config.potd);
		}

		let typeCount = {};
		let typeComboCount = {};
		let baseFormes = {};
		let uberCount = 0;
		let puCount = 0;
		let teamDetails = {megaCount: 0, stealthRock: 0, toxicSpikes: 0, hazardClear: 0};

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;

			// Not available on ORAS
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Useless in Random Battle without greatly lowering the levels of everything else
			if (template.species === 'Unown') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE[template.species]) continue;

			let tier = template.tier;
			switch (tier) {
			case 'AG':
				continue;
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(18) >= 1) continue;
				break;
			case 'Basculin':
				if (this.random(2) >= 1) continue;
				break;
			case 'Castform':
				if (this.random(2) >= 1) continue;
				break;
			case 'Cherrim':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Gourgeist':
				if (this.random(4) >= 1) continue;
				break;
			case 'Hoopa':
				if (this.random(2) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			case 'Pikachu':
				// Pikachu is not a viable NFE Pokemon
				continue;
			}

			// Limit 2 of any type
			let types = template.types;
			let skip = false;
			for (let t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && this.random(5) >= 1) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			if (potd && potd.exists) {
				// The Pokemon of the Day belongs in slot 2
				if (pokemon.length === 1) {
					template = potd;
					if (template.species === 'Magikarp') {
						template.randomBattleMoves = ['bounce', 'flail', 'splash', 'magikarpsrevenge'];
					} else if (template.species === 'Delibird') {
						template.randomBattleMoves = ['present', 'bestow'];
					}
				} else if (template.species === potd.species) {
					continue; // No, thanks, I've already got one
				}
			}

			let set = this.randomSet(template, pokemon.length, teamDetails);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			let typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Limit the number of Megas to one
			let forme = template.otherFormes && this.getTemplate(template.otherFormes[0]);
			let isMegaSet = this.getItem(set.item).megaStone || (forme && forme.isMega && forme.requiredMove && set.moves.indexOf(toId(forme.requiredMove)) >= 0);
			if (isMegaSet && teamDetails.megaCount > 0) continue;

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			pokemonLeft++;

			// Increment type counters
			for (let t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			// Increment Uber/NU counters
			if (tier === 'Uber' || tier === 'AG') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Increment Mega, weather, hazards, and base species counters
			if (isMegaSet) teamDetails.megaCount++;
			if (set.ability === 'Snow Warning') teamDetails['hail'] = 1;
			if (set.ability === 'Drizzle' || set.moves.indexOf('raindance') >= 0) teamDetails['rain'] = 1;
			if (set.ability === 'Sand Stream') teamDetails['sand'] = 1;
			if (set.moves.indexOf('stealthrock') >= 0) teamDetails.stealthRock++;
			if (set.moves.indexOf('toxicspikes') >= 0) teamDetails.toxicSpikes++;
			if (set.moves.indexOf('defog') >= 0 || set.moves.indexOf('rapidspin') >= 0) teamDetails.hazardClear++;
			baseFormes[template.baseSpecies] = 1;
		}
		return pokemon;
	},
	randomDoublesTeam: function (side) {
		let pokemonLeft = 0;
		let pokemon = [];

		let excludedTiers = {'LC':1, 'LC Uber':1, 'NFE':1};
		let allowedNFE = {'Chansey':1, 'Doublade':1, 'Porygon2':1, 'Scyther':1};

		let pokemonPool = [];
		for (let id in this.data.FormatsData) {
			let template = this.getTemplate(id);
			if (!excludedTiers[template.tier] && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		// PotD stuff
		let potd;
		if (Config.potd && 'Rule:potd' in this.getBanlistTable(this.getFormat())) {
			potd = this.getTemplate(Config.potd);
		}

		let typeCount = {};
		let typeComboCount = {};
		let baseFormes = {};
		let uberCount = 0;
		let puCount = 0;
		let teamDetails = {megaCount: 0, stealthRock: 0, hazardClear: 0};

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;

			// Not available on ORAS
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE[template.species]) continue;

			let tier = template.tier;
			switch (tier) {
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(18) >= 1) continue;
				break;
			case 'Basculin':
				if (this.random(2) >= 1) continue;
				break;
			case 'Castform':
				if (this.random(2) >= 1) continue;
				break;
			case 'Cherrim':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Gourgeist':
				if (this.random(4) >= 1) continue;
				break;
			case 'Hoopa':
				if (this.random(2) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			case 'Pikachu':
				// Pikachu is not a viable NFE Pokemon
				continue;
			}

			// Limit 2 of any type
			let types = template.types;
			let skip = false;
			for (let t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && this.random(5) >= 1) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			if (potd && potd.exists) {
				// The Pokemon of the Day belongs in slot 3
				if (pokemon.length === 2) {
					template = potd;
				} else if (template.species === potd.species) {
					continue; // No, thanks, I've already got one
				}
			}

			let set = this.randomDoublesSet(template, pokemon.length, teamDetails);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			let typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Limit the number of Megas to one
			let forme = template.otherFormes && this.getTemplate(template.otherFormes[0]);
			let isMegaSet = this.getItem(set.item).megaStone || (forme && forme.isMega && forme.requiredMove && set.moves.indexOf(toId(forme.requiredMove)) >= 0);
			if (isMegaSet && teamDetails.megaCount > 0) continue;

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			pokemonLeft++;

			// Increment type counters
			for (let t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			// Increment Uber/NU counters
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Increment mega, stealthrock, weather, and base species counters
			if (isMegaSet) teamDetails.megaCount++;
			if (set.ability === 'Snow Warning') teamDetails['hail'] = 1;
			if (set.ability === 'Drizzle' || set.moves.indexOf('raindance') >= 0) teamDetails['rain'] = 1;
			if (set.moves.indexOf('stealthrock') >= 0) teamDetails.stealthRock++;
			if (set.moves.indexOf('defog') >= 0 || set.moves.indexOf('rapidspin') >= 0) teamDetails.hazardClear++;
			baseFormes[template.baseSpecies] = 1;
		}
		return pokemon;
	},
	randomDoublesSet: function (template, slot, teamDetails) {
		let baseTemplate = (template = this.getTemplate(template));
		let name = template.name;

		if (!template.exists || (!template.randomDoubleBattleMoves && !template.randomBattleMoves && !template.learnset)) {
			template = this.getTemplate('unown');

			let stack = 'Template incompatible with random battles: ' + name;
			let fakeErr = {stack: stack};
			require('../crashlogger.js')(fakeErr, 'The doubles randbat set generator');
		}

		if (typeof teamDetails !== 'object') teamDetails = {megaCount: teamDetails};

		if (template.battleOnly) {
			// Only change the species. The template has custom moves, and may have different typing and requirements.
			name = template.baseSpecies;
		}
		let battleForme = this.checkBattleForme(template);
		if (battleForme && (battleForme.isMega ? !teamDetails.megaCount : this.random(2))) {
			template = this.getTemplate(template.otherFormes.length >= 2 ? template.otherFormes[this.random(template.otherFormes.length)] : template.otherFormes[0]);
		}

		let movePool = (template.randomDoubleBattleMoves || template.randomBattleMoves);
		movePool = movePool ? movePool.slice() : Object.keys(template.learnset);

		let moves = [];
		let ability = '';
		let item = '';
		let evs = {
			hp: 0,
			atk: 0,
			def: 0,
			spa: 0,
			spd: 0,
			spe: 0
		};
		let ivs = {
			hp: 31,
			atk: 31,
			def: 31,
			spa: 31,
			spd: 31,
			spe: 31
		};
		let hasType = {};
		hasType[template.types[0]] = true;
		if (template.types[1]) {
			hasType[template.types[1]] = true;
		}
		let hasAbility = {};
		hasAbility[template.abilities[0]] = true;
		if (template.abilities[1]) {
			hasAbility[template.abilities[1]] = true;
		}
		if (template.abilities['H']) {
			hasAbility[template.abilities['H']] = true;
		}
		let availableHP = 0;
		for (let i = 0, len = movePool.length; i < len; i++) {
			if (movePool[i].substr(0, 11) === 'hiddenpower') availableHP++;
		}

		// These moves can be used even if we aren't setting up to use them:
		let SetupException = {
			dracometeor:1, leafstorm:1, overheat:1,
			extremespeed:1, suckerpunch:1, superpower:1
		};
		let counterAbilities = {
			'Adaptability':1, 'Contrary':1, 'Hustle':1, 'Iron Fist':1, 'Skill Link':1
		};
		// -ate Abilities
		let ateAbilities = {
			'Aerilate':1, 'Pixilate':1, 'Refrigerate':1
		};

		let hasMove, counter;

		do {
			// Keep track of all moves we have:
			hasMove = {};
			for (let k = 0; k < moves.length; k++) {
				if (moves[k].substr(0, 11) === 'hiddenpower') {
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moves[k]] = true;
				}
			}

			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.length < 4 && movePool.length) {
				let moveid = toId(this.sampleNoReplace(movePool));
				if (moveid.substr(0, 11) === 'hiddenpower') {
					availableHP--;
					if (hasMove['hiddenpower']) continue;
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moveid] = true;
				}
				moves.push(moveid);
			}

			counter = this.queryMoves(moves, hasType, hasAbility);

			// Iterate through the moves again, this time to cull them:
			for (let k = 0; k < moves.length; k++) {
				let moveid = moves[k];
				let move = this.getMove(moveid);
				let rejected = false;
				let isSetup = false;

				switch (moveid) {
				// not very useful without their supporting moves
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					break;
				case 'endure':
					if (!hasMove['flail'] && !hasMove['endeavor'] && !hasMove['reversal']) rejected = true;
					break;
				case 'focuspunch':
					if (hasMove['sleeptalk'] || !hasMove['substitute']) rejected = true;
					break;
				case 'storedpower':
					if (!hasMove['cosmicpower'] && !counter.setupType) rejected = true;
					break;
				case 'batonpass':
					if (!counter.setupType && !hasMove['substitute'] && !hasMove['cosmicpower'] && !counter['speedsetup'] && !hasAbility['Speed Boost']) rejected = true;
					break;

				// we only need to set up once
				case 'swordsdance': case 'dragondance': case 'coil': case 'curse': case 'bulkup': case 'bellydrum':
					if (counter.Physical < 2 && !hasMove['batonpass']) rejected = true;
					if (counter.setupType !== 'Physical' || counter['physicalsetup'] > 1) rejected = true;
					isSetup = true;
					break;
				case 'nastyplot': case 'tailglow': case 'quiverdance': case 'calmmind': case 'geomancy':
					if (counter.Special < 2 && !hasMove['batonpass']) rejected = true;
					if (counter.setupType !== 'Special' || counter['specialsetup'] > 1) rejected = true;
					isSetup = true;
					break;
				case 'shellsmash': case 'growth': case 'workup':
					if (counter.Physical + counter.Special < 2 && !hasMove['batonpass']) rejected = true;
					if (counter.setupType !== 'Mixed' || counter['mixedsetup'] > 1) rejected = true;
					isSetup = true;
					break;

				// bad after setup
				case 'seismictoss': case 'nightshade': case 'superfang':
					if (counter.setupType) rejected = true;
					break;
				case 'rapidspin': case 'magiccoat': case 'spikes': case 'toxicspikes':
					if (counter.setupType) rejected = true;
					break;
				case 'uturn': case 'voltswitch':
					if (counter.setupType || hasMove['agility'] || hasMove['rockpolish'] || hasMove['magnetrise']) rejected = true;
					break;
				case 'perishsong':
					if (hasMove['roar'] || hasMove['whirlwind'] || hasMove['haze']) rejected = true;
					if (counter.setupType || hasMove['agility'] || hasMove['rockpolish'] || hasMove['magnetrise']) rejected = true;
					break;
				case 'relicsong':
					if (counter.setupType) rejected = true;
					break;
				case 'pursuit': case 'protect': case 'haze': case 'stealthrock':
					if (counter.setupType || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'trick': case 'switcheroo':
					if (counter.setupType || counter.Physical + counter.Special < 2) rejected = true;
					if ((hasMove['rest'] && hasMove['sleeptalk']) || hasMove['trickroom'] || hasMove['reflect'] || hasMove['lightscreen'] || hasMove['acrobatics']) rejected = true;
					break;
				case 'dragontail': case 'circlethrow':
					if (hasMove['agility'] || hasMove['rockpolish']) rejected = true;
					if (hasMove['whirlwind'] || hasMove['roar'] || hasMove['encore']) rejected = true;
					break;

				// bit redundant to have both
				// Attacks:
				case 'flamethrower': case 'fierydance':
					if (hasMove['heatwave'] || hasMove['overheat'] || hasMove['fireblast'] || hasMove['blueflare']) rejected = true;
					break;
				case 'overheat':
					if (counter.setupType === 'Special' || hasMove['fireblast']) rejected = true;
					break;
				case 'icebeam':
					if (hasMove['blizzard'] || hasMove['freezedry']) rejected = true;
					break;
				case 'iceshard':
					if (hasMove['freezedry']) rejected = true;
					break;
				case 'surf':
					if (hasMove['scald'] || hasMove['hydropump'] || hasMove['muddywater']) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['razorshell'] || hasMove['waterfall'] || hasMove['scald'] || hasMove['muddywater']) rejected = true;
					break;
				case 'waterfall':
					if (hasMove['aquatail']) rejected = true;
					break;
				case 'airslash':
					if (hasMove['hurricane']) rejected = true;
					break;
				case 'acrobatics': case 'pluck': case 'drillpeck':
					if (hasMove['bravebird']) rejected = true;
					break;
				case 'solarbeam':
					if ((!hasMove['sunnyday'] && !hasAbility['Drought']) || hasMove['gigadrain'] || hasMove['leafstorm']) rejected = true;
					break;
				case 'gigadrain':
					if ((!counter.setupType && hasMove['leafstorm']) || hasMove['petaldance']) rejected = true;
					break;
				case 'leafstorm':
					if (counter.setupType && hasMove['gigadrain']) rejected = true;
					break;
				case 'seedbomb': case 'woodhammer':
					if (hasMove['gigadrain']) rejected = true;
					break;
				case 'weatherball':
					if (!hasMove['sunnyday']) rejected = true;
					break;
				case 'firepunch':
					if (hasMove['flareblitz'] || hasMove['fireblast']) rejected = true;
					break;
				case 'crosschop': case 'highjumpkick':
					if (hasMove['closecombat']) rejected = true;
					break;
				case 'drainpunch':
					if (hasMove['closecombat'] || hasMove['crosschop']) rejected = true;
					break;
				case 'machpunch':
					if (hasType['Fighting'] && counter.stab < 2 && !hasAbility['Technician']) rejected = true;
					break;
				case 'thunder':
					if (hasMove['thunderbolt']) rejected = true;
					break;
				case 'thunderbolt': case 'electroweb':
					if (hasMove['discharge']) rejected = true;
					break;
				case 'stoneedge':
					if (hasMove['rockslide'] || hasMove['headsmash'] || hasMove['rockblast']) rejected = true;
					break;
				case 'headsmash':
					if (hasMove['rockslide']) rejected = true;
					break;
				case 'bonemerang': case 'earthpower':
					if (hasMove['earthquake']) rejected = true;
					break;
				case 'outrage':
					if (hasMove['dragonclaw'] || hasMove['dragontail']) rejected = true;
					break;
				case 'ancientpower':
					if (hasMove['paleowave']) rejected = true;
					break;
				case 'dragonpulse':
					if (hasMove['dracometeor']) rejected = true;
					break;
				case 'moonblast':
					if (hasMove['dazzlinggleam']) rejected = true;
					break;
				case 'acidspray':
					if (hasMove['sludgebomb']) rejected = true;
					break;
				case 'return':
					if (hasMove['bodyslam'] || hasMove['facade'] || hasMove['doubleedge'] || hasMove['tailslap'] || hasMove['doublehit']) rejected = true;
					break;
				case 'poisonjab':
					if (hasMove['gunkshot']) rejected = true;
					break;
				case 'psychic':
					if (hasMove['psyshock'] || hasMove['hyperspacehole']) rejected = true;
					break;
				case 'fusionbolt':
					if (counter.setupType && hasMove['boltstrike']) rejected = true;
					break;
				case 'boltstrike':
					if (!counter.setupType && hasMove['fusionbolt']) rejected = true;
					break;
				case 'darkpulse':
					if (hasMove['crunch'] && counter.setupType !== 'Special') rejected = true;
					break;
				case 'quickattack':
					if (hasMove['feint']) rejected = true;
					break;
				case 'bulletpunch':
					if (hasType['Steel'] && counter.stab < 2 && !hasAbility['Technician']) rejected = true;
					break;
				case 'flashcannon':
					if (hasMove['ironhead']) rejected = true;
					break;
				case 'wideguard':
					if (hasMove['protect']) rejected = true;
					break;
				case 'powersplit':
					if (hasMove['guardsplit']) rejected = true;
					break;

				// Status:
				case 'rest':
					if (hasMove['painsplit'] || hasMove['wish'] || hasMove['recover'] || hasMove['moonlight'] || hasMove['synthesis']) rejected = true;
					break;
				case 'softboiled': case 'roost':
					if (hasMove['wish'] || hasMove['recover']) rejected = true;
					break;
				case 'roar':
					// Whirlwind outclasses Roar because Soundproof
					if (hasMove['whirlwind'] || hasMove['dragontail'] || hasMove['haze'] || hasMove['circlethrow']) rejected = true;
					break;
				case 'substitute':
					if (hasMove['uturn'] || hasMove['voltswitch'] || hasMove['pursuit']) rejected = true;
					break;
				case 'fakeout':
					if (hasMove['trick'] || hasMove['switcheroo']) rejected = true;
					break;
				case 'feint':
					if (hasMove['fakeout']) rejected = true;
					break;
				case 'encore':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (hasMove['whirlwind'] || hasMove['dragontail'] || hasMove['roar'] || hasMove['circlethrow']) rejected = true;
					break;
				case 'suckerpunch':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'cottonguard':
					if (hasMove['reflect']) rejected = true;
					break;
				case 'lightscreen':
					if (hasMove['calmmind']) rejected = true;
					break;
				case 'rockpolish': case 'agility': case 'autotomize':
					if (!counter.setupType && !hasMove['batonpass'] && hasMove['thunderwave']) rejected = true;
					if ((hasMove['stealthrock'] || hasMove['spikes'] || hasMove['toxicspikes']) && !hasMove['batonpass']) rejected = true;
					break;
				case 'thunderwave':
					if (counter.setupType && (hasMove['rockpolish'] || hasMove['agility'])) rejected = true;
					if (hasMove['discharge'] || hasMove['trickroom']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder']) rejected = true;
					break;
				case 'lavaplume':
					if (hasMove['willowisp']) rejected = true;
					break;
				case 'trickroom':
					if (hasMove['rockpolish'] || hasMove['agility'] || hasMove['icywind']) rejected = true;
					break;
				case 'willowisp':
					if (hasMove['scald'] || hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder']) rejected = true;
					break;
				case 'toxic':
					if (hasMove['thunderwave'] || hasMove['willowisp'] || hasMove['scald'] || hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder']) rejected = true;
					break;
				}

				// Increased/decreased priority moves unneeded with moves that boost only speed
				if (move.priority !== 0 && (hasMove['rockpolish'] || hasMove['agility'])) {
					rejected = true;
				}

				if (move.category === 'Special' && counter.setupType === 'Physical' && !SetupException[move.id]) {
					rejected = true;
				}
				if (move.category === 'Physical' && (counter.setupType === 'Special' || hasMove['acidspray']) && !SetupException[move.id]) {
					rejected = true;
				}

				// This move doesn't satisfy our setup requirements:
				if (counter.setupType === 'Physical' && move.category !== 'Physical' && counter['Physical'] < 2) {
					rejected = true;
				}
				if (counter.setupType === 'Special' && move.category !== 'Special' && counter['Special'] < 2) {
					rejected = true;
				}

				// Hidden Power isn't good enough
				if (counter.setupType === 'Special' && move.id === 'hiddenpower' && counter['Special'] <= 2 && (!hasMove['shadowball'] || move.type !== 'Fighting')) {
					rejected = true;
				}

				// Adaptability, Contrary, and Drought should have moves that benefit
				if ((hasAbility['Adaptability'] && counter.stab < template.types.length) || (hasAbility['Contrary'] && !counter.contrary && template.species !== 'Shuckle') || ((hasAbility['Drought'] || hasMove['sunnyday']) && hasType['Fire'] && !counter['Fire'] && move.id !== 'solarbeam')) {
					// Reject Status or non-STAB
					if (move.category === 'Status' || !hasType[move.type]) rejected = true;
				}

				// Remove rejected moves from the move list.
				if (rejected && (movePool.length - availableHP || availableHP && (move.id === 'hiddenpower' || !hasMove['hiddenpower']))) {
					moves.splice(k, 1);
					break;
				}

				// Handle HP IVs
				if (move.id === 'hiddenpower') {
					let HPivs = this.getType(move.type).HPivs;
					for (let iv in HPivs) {
						ivs[iv] = HPivs[iv];
					}
				}
			}
			if (movePool.length && moves.length === 4 && !hasMove['judgment']) {
				// Move post-processing:
				if (counter.damagingMoves.length === 0) {
					// A set shouldn't have no attacking moves
					moves.splice(this.random(moves.length), 1);
				} else if (counter.damagingMoves.length === 1) {
					let damagingid = counter.damagingMoves[0].id;
					// Night Shade, Seismic Toss, etc. don't count:
					if (!counter.damagingMoves[0].damage && (movePool.length - availableHP || availableHP && (damagingid === 'hiddenpower' || !hasMove['hiddenpower']))) {
						let replace = false;
						if (damagingid in {counter:1, focuspunch:1, mirrorcoat:1, suckerpunch:1} || (damagingid === 'hiddenpower' && !counter.stab)) {
							// Unacceptable as the only attacking move
							replace = true;
						} else {
							if (!counter.stab) {
								let damagingType = counter.damagingMoves[0].type;
								if (damagingType === 'Fairy') {
									// Mono-Fairy is acceptable for Psychic types
									if (!hasType['Psychic']) replace = true;
								} else if (damagingType === 'Ice') {
									if (hasType['Normal'] && template.types.length === 1) {
										// Mono-Ice is acceptable for special attacking Normal types that lack Boomburst and Hyper Voice
										if (counter.Physical >= 2 || movePool.indexOf('boomburst') >= 0 || movePool.indexOf('hypervoice') >= 0) replace = true;
									} else {
										replace = true;
									}
								} else {
									replace = true;
								}
							}
						}
						if (replace) moves.splice(counter.damagingMoveIndex[damagingid], 1);
					}
				} else if (counter.damagingMoves.length === 2 && !counter.stab) {
					// If you have two attacks, neither is STAB, and the combo isn't Ice/Electric or Ghost/Fighting, reject one of them at random.
					let type1 = counter.damagingMoves[0].type, type2 = counter.damagingMoves[1].type;
					let typeCombo = [type1, type2].sort().join('/');
					if (typeCombo !== 'Electric/Ice' && typeCombo !== 'Fighting/Ghost') {
						let rejectableMoves = [];
						let baseDiff = movePool.length - availableHP;
						if (baseDiff || availableHP && (!hasMove['hiddenpower'] || counter.damagingMoves[0].id === 'hiddenpower')) {
							rejectableMoves.push(counter.damagingMoveIndex[counter.damagingMoves[0].id]);
						}
						if (baseDiff || availableHP && (!hasMove['hiddenpower'] || counter.damagingMoves[1].id === 'hiddenpower')) {
							rejectableMoves.push(counter.damagingMoveIndex[counter.damagingMoves[1].id]);
						}
						if (rejectableMoves.length) {
							moves.splice(rejectableMoves[this.random(rejectableMoves.length)], 1);
						}
					}
				} else if (!counter.stab || ((hasAbility['Aerilate'] || hasAbility['Pixilate'] || hasAbility['Refrigerate']) && !counter['Normal'])) {
					// If you have three or more attacks, and none of them are STAB, reject one of them at random.
					// Alternatively, if you have an -ate ability and no Normal moves, reject an attack move at random.
					let rejectableMoves = [];
					let baseDiff = movePool.length - availableHP;
					for (let l = 0; l < counter.damagingMoves.length; l++) {
						if (baseDiff || availableHP && (!hasMove['hiddenpower'] || counter.damagingMoves[l].id === 'hiddenpower')) {
							rejectableMoves.push(counter.damagingMoveIndex[counter.damagingMoves[l].id]);
						}
					}
					if (rejectableMoves.length) {
						moves.splice(rejectableMoves[this.random(rejectableMoves.length)], 1);
					}
				}
			}
		} while (moves.length < 4 && movePool.length);

		// any moveset modification goes here
		//moves[0] = 'safeguard';
		let changedMove = false;
		if (template.requiredItem && template.requiredItem.slice(-5) === 'Drive' && !hasMove['technoblast']) {
			delete hasMove[this.getMove(moves[3]).id];
			moves[3] = 'technoblast';
			hasMove['technoblast'] = true;
			changedMove = true;
		}
		if (template.id === 'meloettapirouette' && !hasMove['relicsong']) {
			delete hasMove[this.getMove(moves[3]).id];
			moves[3] = 'relicsong';
			hasMove['relicsong'] = true;
			changedMove = true;
		}
		if (template.requiredMove && !hasMove[toId(template.requiredMove)]) {
			delete hasMove[this.getMove(moves[3]).id];
			moves[3] = toId(template.requiredMove);
			hasMove[toId(template.requiredMove)] = true;
			changedMove = true;
		}

		// Re-query in case a moveset modification occurred
		if (changedMove) counter = this.queryMoves(moves, hasType, hasAbility);

		// If Hidden Power has been removed, reset the IVs
		if (!hasMove['hiddenpower']) {
			ivs = {
				hp: 31,
				atk: 31,
				def: 31,
				spa: 31,
				spd: 31,
				spe: 31
			};
		}

		let abilities = Object.values(baseTemplate.abilities).sort(function (a, b) {
			return this.getAbility(b).rating - this.getAbility(a).rating;
		}.bind(this));
		let ability0 = this.getAbility(abilities[0]);
		let ability1 = this.getAbility(abilities[1]);
		let ability2 = this.getAbility(abilities[2]);
		ability = ability0.name;
		if (abilities[1]) {
			if (abilities[2] && ability2.rating === ability1.rating) {
				if (this.random(2)) ability1 = ability2;
			}
			if (ability0.rating <= ability1.rating) {
				if (this.random(2)) ability = ability1.name;
			} else if (ability0.rating - 0.6 <= ability1.rating) {
				if (!this.random(3)) ability = ability1.name;
			}

			let rejectAbility = false;
			if (ability in counterAbilities) {
				rejectAbility = !counter[toId(ability)];
			} else if (ability in ateAbilities) {
				rejectAbility = !counter['Normal'];
			} else if (ability === 'Blaze') {
				rejectAbility = !counter['Fire'];
			} else if (ability === 'Chlorophyll') {
				rejectAbility = !hasMove['sunnyday'];
			} else if (ability === 'Compound Eyes' || ability === 'No Guard') {
				rejectAbility = !counter['inaccurate'];
			} else if (ability === 'Defiant' || ability === 'Moxie') {
				rejectAbility = !counter['Physical'] && !hasMove['batonpass'];
			} else if (ability === 'Gluttony') {
				rejectAbility = true;
			} else if (ability === 'Limber') {
				rejectAbility = template.types.indexOf('Electric') >= 0;
			} else if (ability === 'Lightning Rod') {
				rejectAbility = template.types.indexOf('Ground') >= 0;
			} else if (ability === 'Moody') {
				rejectAbility = template.id !== 'bidoof';
			} else if (ability === 'Overgrow') {
				rejectAbility = !counter['Grass'];
			} else if (ability === 'Poison Heal') {
				rejectAbility = abilities.indexOf('Technician') >= 0 && !!counter['technician'];
			} else if (ability === 'Prankster') {
				rejectAbility = !counter['Status'];
			} else if (ability === 'Reckless' || ability === 'Rock Head') {
				rejectAbility = !counter['recoil'];
			} else if (ability === 'Serene Grace') {
				rejectAbility = !counter['serenegrace'] || template.id === 'chansey' || template.id === 'blissey';
			} else if (ability === 'Sheer Force') {
				rejectAbility = !counter['sheerforce'] || hasMove['fakeout'];
			} else if (ability === 'Simple') {
				rejectAbility = !counter.setupType && !hasMove['cosmicpower'] && !hasMove['flamecharge'];
			} else if (ability === 'Snow Cloak') {
				rejectAbility = !teamDetails['hail'];
			} else if (ability === 'Solar Power') {
				rejectAbility = !counter['Special'] || template.isMega;
			} else if (ability === 'Strong Jaw') {
				rejectAbility = !counter['bite'];
			} else if (ability === 'Sturdy') {
				rejectAbility = !!counter['recoil'] && !counter['recovery'];
			} else if (ability === 'Swift Swim') {
				rejectAbility = !hasMove['raindance'] && !teamDetails['rain'];
			} else if (ability === 'Swarm') {
				rejectAbility = !counter['Bug'];
			} else if (ability === 'Technician') {
				rejectAbility = !counter['technician'] || (abilities.indexOf('Skill Link') >= 0 && counter['skilllink'] >= counter['technician']);
			} else if (ability === 'Torrent') {
				rejectAbility = !counter['Water'];
			} else if (ability === 'Unburden') {
				rejectAbility = template.baseStats.spe > 120 || (template.id === 'slurpuff' && !counter.setupType);
			}

			if (rejectAbility) {
				if (ability === ability1.name) { // or not
					ability = ability0.name;
				} else if (ability1.rating > 0) { // only switch if the alternative doesn't suck
					ability = ability1.name;
				}
			}
			if (abilities.indexOf('Chlorophyll') >= 0 && ability !== 'Solar Power') {
				ability = 'Chlorophyll';
			}
			if (abilities.indexOf('Guts') >= 0 && ability !== 'Quick Feet' && hasMove['facade']) {
				ability = 'Guts';
			}
			if (abilities.indexOf('Intimidate') >= 0 || template.id === 'mawilemega') {
				ability = 'Intimidate';
			}
			if (abilities.indexOf('Swift Swim') >= 0 && hasMove['raindance']) {
				ability = 'Swift Swim';
			}

			if (template.id === 'ambipom' && !counter['technician']) {
				// If it doesn't qualify for Technician, Skill Link is useless on it
				// Might as well give it Pickup just in case
				ability = 'Pickup';
			} else if (template.id === 'aurorus' && ability === 'Snow Warning' && hasMove['hypervoice']) {
				for (let i = 0; i < moves.length; i++) {
					if (moves[i] === 'hypervoice') {
						moves[i] = 'blizzard';
						counter['Normal'] = 0;
						break;
					}
				}
			} else if (template.baseSpecies === 'Basculin') {
				ability = 'Adaptability';
			} else if (template.id === 'gligar') {
				ability = 'Immunity';
			} else if (template.id === 'lilligant' && hasMove['petaldance']) {
				ability = 'Own Tempo';
			} else if (template.id === 'rampardos' && !hasMove['headsmash']) {
				ability = 'Sheer Force';
			} else if (template.id === 'rhyperior') {
				ability = 'Solid Rock';
			} else if (template.id === 'unfezant') {
				ability = 'Super Luck';
			} else if (template.id === 'venusaurmega') {
				ability = 'Chlorophyll';
			}
		}

		// Make EVs comply with the sets.
		// Quite simple right now, 252 attack, 252 hp if slow 252 speed if fast, 4 evs for the strong defense.
		// TO-DO: Make this more complex
		if (counter.Special >= 2) {
			evs.atk = 0;
			evs.spa = 252;
		} else if (counter.Physical >= 2) {
			evs.atk = 252;
			evs.spa = 0;
		} else {
			// Fallback in case a Pokémon lacks attacks... go by stats
			if (template.baseStats.spa >= template.baseStats.atk) {
				evs.atk = 0;
				evs.spa = 252;
			} else {
				evs.atk = 252;
				evs.spa = 0;
			}
		}
		if (template.baseStats.spe > 80 || template.species === 'Shedinja') {
			evs.spe = 252;
			evs.hp = 4;
		} else {
			evs.hp = 252;
			if (template.baseStats.def > template.baseStats.spd) {
				evs.def = 4;
			} else {
				evs.spd = 4;
			}
		}

		// Naturally slow mons already have the proper EVs, check IVs for Gyro Ball and TR
		if (hasMove['gyroball'] || hasMove['trickroom']) {
			ivs.spe = 0;
		}

		item = 'Sitrus Berry';
		if (template.requiredItem) {
			item = template.requiredItem;
		// First, the extra high-priority items
		} else if (ability === 'Imposter') {
			item = 'Choice Scarf';
		} else if (hasMove["magikarpsrevenge"]) {
			item = 'Mystic Water';
		} else if (ability === 'Wonder Guard') {
			item = 'Focus Sash';
		} else if (template.species === 'Unown') {
			item = 'Choice Specs';
		} else if (hasMove['trick'] || hasMove['switcheroo']) {
			let randomNum = this.random(2);
			if (counter.Physical >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Band';
			} else if (counter.Special >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Specs';
			} else {
				item = 'Choice Scarf';
			}
		} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			item = 'Chesto Berry';
		} else if (hasMove['naturalgift']) {
			item = 'Liechi Berry';
		} else if (hasMove['geomancy']) {
			item = 'Power Herb';
		} else if (ability === 'Harvest') {
			item = 'Sitrus Berry';
		} else if (template.species === 'Cubone' || template.species === 'Marowak') {
			item = 'Thick Club';
		} else if (template.baseSpecies === 'Pikachu') {
			item = 'Light Ball';
		} else if (template.species === 'Clamperl') {
			item = 'DeepSeaTooth';
		} else if (template.species === 'Spiritomb') {
			item = 'Leftovers';
		} else if (template.species === 'Scrafty' && counter['Status'] === 0) {
			item = 'Assault Vest';
		} else if (template.species === 'Farfetch\'d') {
			item = 'Stick';
		} else if (template.species === 'Amoonguss') {
			item = 'Black Sludge';
		} else if (template.species === 'Dedenne') {
			item = 'Petaya Berry';
		} else if (hasMove['focusenergy'] || (template.species === 'Unfezant' && counter['Physical'] >= 2)) {
			item = 'Scope Lens';
		} else if (template.evos.length) {
			item = 'Eviolite';
		} else if (hasMove['reflect'] && hasMove['lightscreen']) {
			item = 'Light Clay';
		} else if (hasMove['shellsmash']) {
			if (ability === 'Solid Rock' && counter['priority']) {
				item = 'Weakness Policy';
			} else {
				item = 'White Herb';
			}
		} else if (hasMove['facade'] || ability === 'Poison Heal' || ability === 'Toxic Boost') {
			item = 'Toxic Orb';
		} else if (hasMove['raindance']) {
			item = 'Damp Rock';
		} else if (hasMove['sunnyday']) {
			item = 'Heat Rock';
		} else if (hasMove['sandstorm']) {
			item = 'Smooth Rock';
		} else if (hasMove['hail']) {
			item = 'Icy Rock';
		} else if (ability === 'Magic Guard' && hasMove['psychoshift']) {
			item = 'Flame Orb';
		} else if (ability === 'Sheer Force' || ability === 'Magic Guard') {
			item = 'Life Orb';
		} else if (hasMove['acrobatics']) {
			item = 'Flying Gem';
		} else if (ability === 'Unburden') {
			if (hasMove['fakeout']) {
				item = 'Normal Gem';
			} else if (hasMove['dracometeor'] || hasMove['leafstorm'] || hasMove['overheat']) {
				item = 'White Herb';
			} else if (hasMove['substitute'] || counter.setupType) {
				item = 'Sitrus Berry';
			} else {
				item = 'Red Card';
				for (let m in moves) {
					let move = this.getMove(moves[m]);
					if (hasType[move.type] && move.basePower >= 90) {
						item = move.type + ' Gem';
						break;
					}
				}
			}

		// medium priority
		} else if (ability === 'Guts') {
			item = hasMove['drainpunch'] ? 'Flame Orb' : 'Toxic Orb';
			if ((hasMove['return'] || hasMove['hyperfang']) && !hasMove['facade']) {
				// lol no
				for (let j = 0; j < moves.length; j++) {
					if (moves[j] === 'Return' || moves[j] === 'Hyper Fang') {
						moves[j] = 'Facade';
						break;
					}
				}
			}
		} else if (ability === 'Marvel Scale' && hasMove['psychoshift']) {
			item = 'Flame Orb';
		} else if (counter.Physical >= 4 && template.baseStats.spe > 55 && !hasMove['fakeout'] && !hasMove['suckerpunch'] && !hasMove['flamecharge'] && !hasMove['rapidspin'] && ability !== 'Sturdy' && ability !== 'Multiscale') {
			item = 'Life Orb';
		} else if (counter.Special >= 4 && template.baseStats.spe > 55 && !hasMove['eruption'] && !hasMove['waterspout'] && ability !== 'Sturdy') {
			item = 'Life Orb';
		} else if (this.getImmunity('Ground', template) && this.getEffectiveness('Ground', template) >= 2 && ability !== 'Levitate' && !hasMove['magnetrise']) {
			item = 'Shuca Berry';
		} else if (this.getEffectiveness('Ice', template) >= 2) {
			item = 'Yache Berry';
		} else if (this.getEffectiveness('Rock', template) >= 2) {
			item = 'Charti Berry';
		} else if (this.getEffectiveness('Fire', template) >= 2) {
			item = 'Occa Berry';
		} else if (this.getImmunity('Fighting', template) && this.getEffectiveness('Fighting', template) >= 2) {
			item = 'Chople Berry';
		} else if (ability === 'Iron Barbs' || ability === 'Rough Skin') {
			item = 'Rocky Helmet';
		} else if (counter.Physical + counter.Special >= 4 && ability === 'Regenerator' && template.baseStats[counter.Special >= 2 ? 'atk' : 'spa'] > 99 && template.baseStats.spe <= 80) {
			item = 'Assault Vest';
		} else if ((template.baseStats.hp + 75) * (template.baseStats.def + template.baseStats.spd + 175) > 60000 || template.species === 'Skarmory' || template.species === 'Forretress') {
			// skarmory and forretress get exceptions for their typing
			item = 'Sitrus Berry';
		} else if (counter.Physical + counter.Special >= 3 && counter.setupType && ability !== 'Sturdy' && ability !== 'Multiscale') {
			item = 'Life Orb';
		} else if (counter.Special >= 3 && counter.setupType && ability !== 'Sturdy') {
			item = 'Life Orb';
		} else if (counter.Physical + counter.Special >= 4 && template.baseStats.def + template.baseStats.spd > 179) {
			item = 'Assault Vest';
		} else if (counter.Physical + counter.Special >= 4) {
			item = 'Expert Belt';
		} else if (hasMove['outrage']) {
			item = 'Lum Berry';
		} else if (hasMove['substitute'] || hasMove['detect'] || hasMove['protect'] || ability === 'Moody') {
			item = 'Leftovers';
		} else if (this.getImmunity('Ground', template) && this.getEffectiveness('Ground', template) >= 1 && ability !== 'Levitate' && !hasMove['magnetrise']) {
			item = 'Shuca Berry';
		} else if (this.getEffectiveness('Ice', template) >= 1) {
			item = 'Yache Berry';

		// this is the "REALLY can't think of a good item" cutoff
		} else if (counter.Physical + counter.Special >= 2 && template.baseStats.hp + template.baseStats.def + template.baseStats.spd > 315) {
			item = 'Weakness Policy';
		} else if (ability === 'Sturdy' && hasMove['explosion'] && !counter['speedsetup']) {
			item = 'Custap Berry';
		} else if (ability === 'Super Luck') {
			item = 'Scope Lens';
		} else if (hasType['Poison']) {
			item = 'Black Sludge';
		} else if (counter.Status <= 1 && ability !== 'Sturdy' && ability !== 'Multiscale') {
			item = 'Life Orb';
		} else {
			item = 'Sitrus Berry';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && hasType['Poison']) {
			item = 'Black Sludge';
		}

		// We choose level based on BST. Min level is 70, max level is 99. 600+ BST is 70, less than 300 is 99. Calculate with those values.
		// Every 10.34 BST adds a level from 70 up to 99. Results are floored. Uses the Mega's stats if holding a Mega Stone
		let bst = template.baseStats.hp + template.baseStats.atk + template.baseStats.def + template.baseStats.spa + template.baseStats.spd + template.baseStats.spe;
		// Adjust levels of mons based on abilities (Pure Power, Sheer Force, etc.) and also Eviolite
		// For the stat boosted, treat the Pokemon's base stat as if it were multiplied by the boost. (Actual effective base stats are higher.)
		let templateAbility = (baseTemplate === template ? ability : template.abilities[0]);
		if (templateAbility === 'Huge Power' || templateAbility === 'Pure Power') {
			bst += template.baseStats.atk;
		} else if (templateAbility === 'Parental Bond') {
			bst += 0.5 * (evs.atk > evs.spa ? template.baseStats.atk : template.baseStats.spa);
		} else if (templateAbility === 'Protean') {
			// Holistic judgment. Don't boost Protean as much as Parental Bond
			bst += 0.3 * (evs.atk > evs.spa ? template.baseStats.atk : template.baseStats.spa);
		} else if (templateAbility === 'Fur Coat') {
			bst += template.baseStats.def;
		}
		if (item === 'Eviolite') {
			bst += 0.5 * (template.baseStats.def + template.baseStats.spd);
		}
		let level = 70 + Math.floor(((600 - this.clampIntRange(bst, 300, 600)) / 10.34));

		return {
			name: name,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: !this.random(template.id === 'missingno' ? 4 : 1024)
		};
	},
	randomRainbowTeam: function () {
		var pokemonLeft = 0;
		var pokemon = [];

		var excludedTiers = {'LC':1, 'LC Uber':1, 'NFE':1};
		var allowedNFE = {'Chansey':1, 'Doublade':1, 'Gligar':1, 'Porygon2':1, 'Scyther':1};
		var excludedColors = {'Black':1, 'Brown':1, 'Gray':1, 'White':1};

		var pokemonPool = [];
		for (var id in this.data.FormatsData) {
			var template = this.getTemplate(id);
			if (!excludedTiers[template.tier] && !excludedColors[template.color] && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		var typeCount = {};
		var typeComboCount = {};
		var colorCount = {};
		var baseFormes = {};
		var uberCount = 0;
		var puCount = 0;
		var teamDetails = {megaCount: 0, stealthRock: 0};

		while (pokemonPool.length && pokemonLeft < 6) {
			var template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;

			// Not available on ORAS
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Useless in Random Battle without greatly lowering the levels of everything else
			if (template.species === 'Unown') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE[template.species]) continue;

			var tier = template.tier;
			switch (tier) {
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(18) >= 1) continue;
				break;
			case 'Basculin':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Gourgeist':
				if (this.random(4) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			case 'Castform':
				if (this.random(2) >= 1) continue;
				break;
			case 'Pikachu':
				// Pikachu is not a viable NFE Pokemon
				continue;
			}

			// Limit 2 of any type, 1 of any color
			var types = template.types;
			var colorGroups = {'Red': 'R', 'Pink': 'R', 'Yellow': 'G', 'Green': 'G', 'Blue': 'B', 'Purple': 'B'};
			var color = colorGroups[template.color];
			var skip = false;
			for (var t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && this.random(5) >= 1) {
					skip = true;
					break;
				}
			}
			if (colorCount[color] > 1 && this.random(8) >= 1) {
				skip = true;
			}
			if (skip) continue;

			var set = this.randomSet(template, pokemon.length, teamDetails);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			var typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Limit the number of Megas to one
			var forme = template.otherFormes && this.getTemplate(template.otherFormes[0]);
			var isMegaSet = this.getItem(set.item).megaStone || (forme && forme.isMega && forme.requiredMove && set.moves.indexOf(toId(forme.requiredMove)) >= 0);
			if (isMegaSet && teamDetails.megaCount > 0) continue;

			// Okay, the set passes, add it to our team
			if (template.species !== 'Ditto') set.moves.push('swift');
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			pokemonLeft++;

			// Increment type and color counters
			for (var t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;
			if (color in colorCount) {
				colorCount[color]++;
			} else {
				colorCount[color] = 1;
			}

			// Increment Uber/NU counters
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Increment mega, stealthrock, and base species counters
			if (isMegaSet) teamDetails.megaCount++;
			if (set.moves.indexOf('stealthrock') >= 0) teamDetails.stealthRock++;
			baseFormes[template.baseSpecies] = 1;
		}
		return pokemon;
	},
	randomSeasonalTeam: function (side) {
		var seasonalPokemonList = ['alakazam', 'machamp', 'hypno', 'hitmonlee', 'hitmonchan', 'mrmime', 'jynx', 'hitmontop', 'hariyama', 'sableye', 'medicham', 'toxicroak', 'electivire', 'magmortar', 'conkeldurr', 'throh', 'sawk', 'gothitelle', 'beheeyem', 'bisharp', 'volbeat', 'illumise', 'spinda', 'cacturne', 'infernape', 'lopunny', 'lucario', 'mienshao', 'pidgeot', 'fearow', 'dodrio', 'aerodactyl', 'noctowl', 'crobat', 'xatu', 'skarmory', 'swellow', 'staraptor', 'honchkrow', 'chatot', 'unfezant', 'sigilyph', 'braviary', 'mandibuzz', 'farfetchd', 'pelipper', 'altaria', 'togekiss', 'swoobat', 'archeops', 'swanna', 'weavile', 'gallade', 'gardevoir', 'ludicolo', 'snorlax', 'wobbuffet', 'meloetta', 'blissey', 'landorus', 'tornadus', 'golurk', 'bellossom', 'lilligant', 'probopass', 'roserade', 'leavanny', 'zapdos', 'moltres', 'articuno', 'delibird'];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		for (var i = 0; i < 6; i++) {
			var set = this.randomSet(seasonalPokemonList[i], i);
			set.level = 100;
			team.push(set);
		}
		return team;
	},
	randomSeasonalWWTeam: function (side) {
		var seasonalPokemonList = ['raichu', 'nidoqueen', 'nidoking', 'clefable', 'wigglytuff', 'rapidash', 'dewgong', 'cloyster', 'exeggutor', 'starmie', 'jynx', 'lapras', 'snorlax', 'articuno', 'azumarill', 'granbull', 'delibird', 'stantler', 'miltank', 'blissey', 'swalot', 'lunatone', 'castform', 'chimecho', 'glalie', 'walrein', 'regice', 'jirachi', 'bronzong', 'chatot', 'abomasnow', 'weavile', 'togekiss', 'glaceon', 'probopass', 'froslass', 'rotom-frost', 'uxie', 'mesprit', 'azelf', 'victini', 'vanilluxe', 'sawsbuck', 'beartic', 'cryogonal', 'chandelure'];
		var shouldHavePresent = {raichu:1, clefable:1, wigglytuff:1, azumarill:1, granbull:1, miltank:1, blissey:1, togekiss:1, delibird:1};
		seasonalPokemonList = seasonalPokemonList.randomize();

		var team = [];
		for (var i = 0; i < 6; i++) {
			var template = this.getTemplate(seasonalPokemonList[i]);

			// we're gonna modify the default template
			template = Object.clone(template, true);
			delete template.viableMoves.ironhead;
			delete template.viableMoves.fireblast;
			delete template.viableMoves.overheat;
			delete template.viableMoves.vcreate;
			delete template.viableMoves.blueflare;
			if (template.id === 'chandelure') {
				template.viableMoves.flameburst = 1;
				template.abilities.DW = 'Flash Fire';
			}

			var set = this.randomSet(template, i);
			if (template.id in shouldHavePresent) set.moves[0] = 'Present';
			set.level = 100;
			team.push(set);
		}

		return team;
	},
	randomSeasonalVVTeam: function (side) {
		var couples = ['nidoranf+nidoranm', 'nidorina+nidorino', 'nidoqueen+nidoking', 'gallade+gardevoir', 'plusle+minun', 'illumise+volbeat', 'latias+latios', 'skitty+wailord', 'tauros+miltank', 'rufflet+vullaby', 'braviary+mandibuzz', 'mew+mesprit', 'audino+chansey', 'lickilicky+blissey', 'purugly+beautifly', 'clefairy+wigglytuff', 'clefable+jigglypuff', 'cleffa+igglybuff', 'pichu+pachirisu', 'alomomola+luvdisc', 'gorebyss+huntail', 'kyuremb+kyuremw', 'cherrim+cherubi', 'slowbro+slowking', 'jynx+lickitung', 'milotic+gyarados', 'slowpoke+shellder', 'happiny+mimejr', 'mrmime+smoochum', 'woobat+munna', 'swoobat+musharna', 'delcatty+lopunny', 'skitty+buneary', 'togetic+shaymin', 'glameow+snubbull', 'whismur+wormadam', 'finneon+porygon', 'ditto+porygon2', 'porygonz+togekiss', 'hoppip+togepi', 'lumineon+corsola', 'exeggcute+flaaffy'];
		couples = couples.randomize();
		var shouldHaveAttract = {audino:1, beautifly:1, delcatty:1, finneon:1, glameow:1, lumineon:1, purugly:1, swoobat:1, woobat:1, wormadam:1, wormadamsandy:1, wormadamtrash:1};
		var shouldHaveKiss = {buneary:1, finneon:1, lopunny:1, lumineon:1, minun:1, pachirisu:1, pichu:1, plusle:1, shaymin:1, togekiss:1, togepi:1, togetic:1};
		var team = [];

		// First we get the first three couples and separate it in a list of Pokemon to deal with them
		var pokemons = [];
		for (var i = 0; i < 3; i++) {
			var couple = couples[i].split('+');
			pokemons.push(couple[0]);
			pokemons.push(couple[1]);
		}

		for (var i = 0; i < 6; i++) {
			var pokemon = pokemons[i];
			if (pokemon === 'wormadam') {
				var wormadams = ['wormadam', 'wormadamsandy', 'wormadamtrash'];
				wormadams = wormadams.randomize();
				pokemon = wormadams[0];
			}
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			// We set some arbitrary moves
			if (template.id === 'jynx' && set.moves.indexOf('lovelykiss') < 0) set.moves[0] = 'Lovely Kiss';
			if (template.id in shouldHaveAttract) set.moves[0] = 'Attract';
			if (template.id in shouldHaveKiss) set.moves[0] = 'Sweet Kiss';
			// We set some arbitrary levels to balance
			if (template.id === 'kyuremblack' || template.id === 'kyuremwhite') set.level = 60;
			if (template.id === 'magikarp') set.level = 100;
			team.push(set);
		}

		return team;
	},
	randomSeasonalSFTeam: function (side) {
		// This is the huge list of all the Pokemon in this seasonal
		var seasonalPokemonList = [
			'togepi', 'togetic', 'togekiss', 'happiny', 'chansey', 'blissey', 'exeggcute', 'exeggutor', 'lopunny', 'bunneary',
			'azumarill', 'bulbasaur', 'ivysaur', 'venusaur', 'caterpie', 'metapod', 'bellsprout', 'weepinbell', 'victreebel',
			'scyther', 'chikorita', 'bayleef', 'meganium', 'spinarak', 'natu', 'xatu', 'bellossom', 'politoed', 'skiploom',
			'larvitar', 'tyranitar', 'celebi', 'treecko', 'grovyle', 'sceptile', 'dustox', 'lotad', 'lombre', 'ludicolo',
			'breloom', 'electrike', 'roselia', 'gulpin', 'vibrava', 'flygon', 'cacnea', 'cacturne', 'cradily', 'keckleon',
			'tropius', 'rayquaza', 'turtwig', 'grotle', 'torterra', 'budew', 'roserade', 'carnivine', 'yanmega', 'leafeon',
			'shaymin', 'shayminsky', 'snivy', 'servine', 'serperior', 'pansage', 'simisage', 'swadloon', 'cottonee',
			'whimsicott', 'petilil', 'lilligant', 'basculin', 'maractus', 'trubbish', 'garbodor', 'solosis', 'duosion',
			'reuniclus', 'axew', 'fraxure', 'golett', 'golurk', 'virizion', 'tornadus', 'tornadustherian', 'burmy', 'wormadam',
			'kakuna', 'beedrill', 'sandshrew', 'nidoqueen', 'zubat', 'golbat', 'oddish', 'gloom', 'mankey', 'poliwrath',
			'machoke', 'machamp', 'doduo', 'dodrio', 'grimer', 'muk', 'kingler', 'cubone', 'marowak', 'hitmonlee', 'tangela',
			'mrmime', 'tauros', 'kabuto', 'dragonite', 'mewtwo', 'marill', 'hoppip', 'espeon', 'teddiursa', 'ursaring',
			'cascoon', 'taillow', 'swellow', 'pelipper', 'masquerain', 'azurill', 'minun', 'carvanha', 'huntail', 'bagon',
			'shelgon', 'salamence', 'latios', 'tangrowth', 'seismitoad', 'eelektross', 'druddigon', 'bronzor',
			'bronzong', 'murkrow', 'honchkrow', 'absol', 'pidove', 'tranquill', 'unfezant', 'dunsparce', 'jirachi',
			'deerling', 'sawsbuck', 'meloetta', 'cherrim', 'gloom', 'vileplume', 'bellossom', 'lileep', 'venusaur',
			'sunflora', 'gallade', 'vullaby'
        ];
		seasonalPokemonList = seasonalPokemonList.randomize();
		// Pokemon that must be shiny to be green
		var mustBeShiny = {
			kakuna:1, beedrill:1, sandshrew:1, nidoqueen:1, zubat:1, golbat:1, oddish:1, gloom:1, mankey:1, poliwrath:1,
			machoke:1, machamp:1, doduo:1, dodrio:1, grimer:1, muk:1, kingler:1, cubone:1, marowak:1, hitmonlee:1, tangela:1,
			mrmime:1, tauros:1, kabuto:1, dragonite:1, mewtwo:1, marill:1, hoppip:1, espeon:1, teddiursa:1, ursaring:1,
			cascoon:1, taillow:1, swellow:1, pelipper:1, masquerain:1, azurill:1, minun:1, carvanha:1, huntail:1, bagon:1,
			shelgon:1, salamence:1, latios:1, tangrowth:1, seismitoad:1, jellicent:1, elektross:1, druddigon:1,
			bronzor:1, bronzong:1, golett:1, golurk:1
		};
		// Pokemon that are in for their natural Super Luck ability
		var superLuckPokemon = {murkrow:1, honchkrow:1, absol:1, pidove:1, tranquill:1, unfezant:1};
		// Pokemon that are in for their natural Serene Grace ability
		var sereneGracePokemon = {dunsparce:1, jirachi:1, deerling:1, sawsbuck:1, meloetta:1};
		var team = [];

		// Now, let's make the team!
		for (var i = 0; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);

			// Everyone will have Metronome. EVERYONE. Luck everywhere!
			set.moves[0] = 'Metronome';
			// Also everyone will have either Softboiled, Barrage or Egg Bomb since easter!
			var secondMove = ['softboiled', 'barrage', 'eggbomb'].randomize();
			if (set.moves.indexOf(secondMove) === -1) {
				set.moves[1] = secondMove[0];
			}
			// Don't worry, both attacks are boosted for this seasonal!

			// Also Super Luck or Serene Grace as an ability. Yay luck!
			if (template.id in superLuckPokemon) {
				set.ability = 'Super Luck';
			} else if (template.id in sereneGracePokemon) {
				set.ability = 'Serene Grace';
			} else {
				var abilities = ['Serene Grace', 'Super Luck'].randomize();
				set.ability = abilities[0];
			}

			// These Pokemon must always be shiny to be green
			if (template.id in mustBeShiny) {
				set.shiny = true;
			}

			// We don't want choice items
			if (['Choice Scarf', 'Choice Band', 'Choice Specs'].indexOf(set.item) > -1) {
				set.item = 'Metronome';
			}
			// Avoid Toxic Orb Breloom
			if (template.id === 'breloom' && set.item === 'Toxic Orb') {
				set.item = 'Lum Berry';
			}
			// Change gems to Grass Gem
			if (set.item.indexOf('Gem') > -1) {
				if (set.moves.indexOf('barrage') > -1 || set.moves.indexOf('eggbomb') > -1 || set.moves.indexOf('gigadrain') > -1) {
					set.item = 'Grass Gem';
				} else {
					set.item = 'Metronome';
				}
			}
			team.push(set);
		}

		return team;
	},
	randomSeasonalFFYTeam: function (side) {
		// Seasonal Pokemon list
		var seasonalPokemonList = [
			'missingno', 'koffing', 'weezing', 'slowpoke', 'slowbro', 'slowking', 'psyduck', 'spinda', 'whimsicott', 'liepard', 'sableye',
			'thundurus', 'tornadus', 'illumise', 'murkrow', 'purrloin', 'riolu', 'volbeat', 'rotomheat', 'rotomfan', 'haunter',
			'gengar', 'gastly', 'gliscor', 'venusaur', 'serperior', 'sceptile', 'shiftry', 'torterra', 'meganium', 'leafeon', 'roserade',
			'amoonguss', 'parasect', 'breloom', 'abomasnow', 'rotommow', 'wormadam', 'tropius', 'lilligant', 'ludicolo', 'cacturne',
			'vileplume', 'bellossom', 'victreebel', 'jumpluff', 'carnivine', 'sawsbuck', 'virizion', 'shaymin', 'arceusgrass', 'shayminsky',
			'tangrowth', 'pansage', 'maractus', 'cradily', 'celebi', 'exeggutor', 'ferrothorn', 'zorua', 'zoroark', 'dialga'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		var mustHavePrankster = {whimsicott:1, liepard:1, sableye:1, thundurus:1, tornadus:1, illumise:1, volbeat:1, murkrow:1, purrloin:1, riolu:1, missingno:1};

		// Now, let's make the team!
		for (var i = 0; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			// Chance to have prankster or illusion
			var dice = this.random(100);
			if (dice < 20) {
				set.ability = 'Prankster';
			} else if (dice < 60) {
				set.ability = 'Illusion';
			}
			if (template.id in mustHavePrankster) {
				set.ability = 'Prankster';
			}
			// Let's make the movesets for some Pokemon
			if (template.id === 'missingno') {
				// Some serious missingno nerfing so it's just a fun annoying Poke
				set.item = 'Flame Orb';
				set.level = 255;
				set.moves = ['Trick', 'Stored Power', 'Thunder Wave', 'Taunt', 'Encore', 'Attract', 'Charm', 'Leech Seed'];
				set.evs = {hp: 4, def: 0, spd: 0, spa: 0, atk: 255, spe: 255};
				set.ivs = {hp: 0, def: 0, spd: 0, spa: 0, atk: 0, spe: 0};
				set.nature = 'Brave';
			} else if (template.id === 'rotomheat') {
				set.item = 'Flame Orb';
				set.moves = ['Overheat', 'Volt Switch', 'Pain Split', 'Trick'];
			} else if (template.id === 'riolu') {
				set.item = 'Eviolite';
				set.moves = ['Copycat', 'Roar', 'Drain Punch', 'Substitute'];
				set.evs = {hp: 248, def: 112, spd: 96, spa: 0, atk: 0, spe: 52};
				set.nature = 'Careful';
			} else if (template.id in {gastly:1, haunter:1, gengar:1}) {
				// Gengar line, troll SubDisable set
				set.item = 'Leftovers';
				set.moves = ['Substitute', 'Disable', 'Shadow Ball', 'Focus Blast'];
				set.evs = {hp: 4, def: 0, spd: 0, spa: 252, atk: 0, spe: 252};
				set.nature = 'Timid';
			} else if (template.id === 'gliscor') {
				set.item = 'Toxic Orb';
				set.ability = 'Poison Heal';
				set.moves = ['Substitute', 'Protect', 'Toxic', 'Earthquake'];
				set.evs = {hp: 252, def: 184, spd: 0, spa: 0, atk: 0, spe: 72};
				set.ivs = {hp: 31, def: 31, spd: 31, spa: 0, atk: 31, spe: 31};
				set.nature = 'Impish';
			} else if (template.id === 'purrloin') {
				set.item = 'Eviolite';
			} else if (template.id === 'dialga') {
				set.level = 60;
			} else if (template.id === 'sceptile') {
				var items = ['Lum Berry', 'Occa Berry', 'Yache Berry', 'Sitrus Berry'];
				items = items.randomize();
				set.item = items[0];
			} else if (template.id === 'breloom' && set.item === 'Toxic Orb' && set.ability !== 'Poison Heal') {
				set.item = 'Muscle Band';
			}

			// This is purely for the lulz
			if (set.ability === 'Prankster' && !('attract' in set.moves) && !('charm' in set.moves) && this.random(100) < 50) {
				var attractMoves = ['Attract', 'Charm'];
				attractMoves = attractMoves.randomize();
				set.moves[3] = attractMoves[0];
			}

			// For poison types with Illusion
			if (set.item === 'Black Sludge') {
				set.item = 'Leftovers';
			}

			team.push(set);
		}

		return team;
	},
	randomSeasonalMMTeam: function (side) {
		// Seasonal Pokemon list
		var seasonalPokemonList = [
			'cherrim', 'joltik', 'surskit', 'combee', 'kricketot', 'kricketune', 'ferrothorn', 'roserade', 'roselia', 'budew', 'clefairy', 'clefable',
			'deoxys', 'celebi', 'jirachi', 'meloetta', 'mareep', 'chatot', 'loudred', 'ludicolo', 'sudowoodo', 'yamask', 'chandelure', 'jellicent',
			'arceusghost', 'gengar', 'cofagrigus', 'giratina', 'rotom', 'kangaskhan', 'marowak', 'blissey', 'sawk', 'rhydon', 'rhyperior', 'rhyhorn',
			'politoed', 'gastrodon', 'magcargo', 'nidoking', 'espeon', 'muk', 'weezing', 'grimer', 'muk', 'swalot', 'crobat', 'hydreigon', 'arbok',
			'genesect', 'gliscor', 'aerodactyl', 'ambipom', 'drapion', 'drifblim', 'venomoth', 'spiritomb', 'rattata', 'grumpig', 'blaziken', 'mewtwo',
			'beautifly', 'skitty', 'venusaur', 'munchlax', 'wartortle', 'glaceon', 'manaphy', 'hitmonchan', 'liepard', 'sableye', 'zapdos', 'heatran',
			'treecko', 'piloswine', 'duskull', 'dusclops', 'dusknoir', 'spiritomb'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];

		// Now, let's make the team!
		for (var i = 0; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			// Use metronome because month of music
			if (set.item in {'Choice Scarf':1, 'Choice Band':1, 'Choice Specs':1, 'Life Orb':1}) {
				set.item = 'Metronome';
			// Berries over other items since spring
			} else if (set.item === 'Leftovers' || set.item === 'Black Sludge') {
				set.item = 'Sitrus Berry';
			} else if (template.id !== 'arceusghost' && set.item !== 'Chesto Berry') {
				if (this.getEffectiveness('Fire', template) >= 1) {
					set.item = 'Occa Berry';
				} else if (this.getEffectiveness('Ground', template) >= 1 && template.ability !== 'Levitate') {
					set.item = 'Shuca Berry';
				} else if (this.getEffectiveness('Ice', template) >= 1) {
					set.item = 'Yache Berry';
				} else if (this.getEffectiveness('Grass', template) >= 1) {
					set.item = 'Rindo Berry';
				} else if (this.getEffectiveness('Fighting', template) >= 1 && this.getImmunity('Fighting', template)) {
					set.item = 'Chople Berry';
				} else if (this.getEffectiveness('Rock', template) >= 1) {
					set.item = 'Charti Berry';
				} else if (this.getEffectiveness('Dark', template) >= 1) {
					set.item = 'Colbur Berry';
				} else if (this.getEffectiveness('Electric', template) >= 1 && this.getImmunity('Electric', template)) {
					set.item = 'Wacan Berry';
				} else if (this.getEffectiveness('Psychic', template) >= 1) {
					set.item = 'Payapa Berry';
				} else if (this.getEffectiveness('Flying', template) >= 1) {
					set.item = 'Coba Berry';
				} else if (this.getEffectiveness('Water', template) >= 1) {
					set.item = 'Passho Berry';
				} else {
					set.item = 'Enigma Berry';
				}
			}
			team.push(set);
		}

		return team;
	},
	randomSeasonalJJTeam: function (side) {
		// Seasonal Pokemon list
		var seasonalPokemonList = [
			'accelgor', 'aggron', 'arceusbug', 'ariados', 'armaldo', 'aurumoth', 'beautifly', 'beedrill', 'bellossom', 'blastoise',
			'butterfree', 'castform', 'charizard', 'cherrim', 'crawdaunt', 'crustle', 'delcatty', 'drifblim', 'durant',
			'dustox', 'escavalier', 'exeggutor', 'floatzel', 'forretress', 'galvantula', 'genesect', 'groudon', 'hariyama', 'heracross',
			'hooh', 'illumise', 'jumpluff', 'keldeo', 'kingler', 'krabby', 'kricketune', 'krillowatt', 'landorus', 'lapras',
			'leavanny', 'ledian', 'lilligant', 'ludicolo', 'lunatone', 'machamp', 'machoke', 'machop', 'magmar', 'magmortar',
			'malaconda', 'manaphy', 'maractus', 'masquerain', 'meganium', 'meloetta', 'moltres', 'mothim', 'ninetales',
			'ninjask', 'parasect', 'pelipper', 'pikachu', 'pinsir', 'politoed', 'raichu', 'rapidash', 'reshiram', 'rhydon',
			'rhyperior', 'roserade', 'rotomfan', 'rotomheat', 'rotommow', 'sawsbuck', 'scizor', 'scolipede', 'shedinja',
			'shuckle', 'slaking', 'snorlax', 'solrock', 'starmie', 'sudowoodo', 'sunflora', 'syclant', 'tentacool', 'tentacruel',
			'thundurus', 'tornadus', 'tropius', 'vanillish', 'vanillite', 'vanilluxe', 'venomoth', 'venusaur', 'vespiquen',
			'victreebel', 'vileplume', 'volbeat', 'volcarona', 'wailord', 'wormadam', 'wormadamsandy', 'wormadamtrash', 'yanmega', 'zapdos'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [this.randomSet(this.getTemplate('delibird'), 0)];

		// Now, let's make the team!
		for (var i = 1; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			if (template.id in {'vanilluxe':1, 'vanillite':1, 'vanillish':1}) {
				set.moves = ['icebeam', 'weatherball', 'autotomize', 'flashcannon'];
			}
			if (template.id in {'pikachu':1, 'raichu':1}) {
				set.moves = ['thunderbolt', 'surf', 'substitute', 'nastyplot'];
			}
			if (template.id in {'rhydon':1, 'rhyperior':1}) {
				set.moves = ['surf', 'megahorn', 'earthquake', 'rockblast'];
			}
			if (template.id === 'reshiram') {
				set.moves = ['tailwhip', 'dragontail', 'irontail', 'aquatail'];
			}
			if (template.id === 'aggron') {
				set.moves = ['surf', 'earthquake', 'bodyslam', 'rockslide'];
			}
			if (template.id === 'hariyama') {
				set.moves = ['surf', 'closecombat', 'facade', 'fakeout'];
			}
			team.push(set);
		}

		return team;
	},
	randomSeasonalJulyTeam: function (side) {
		// Seasonal Pokemon list
		var seasonalPokemonList = [
			'alomomola', 'arcanine', 'arceusfire', 'basculin', 'beautifly', 'beedrill', 'blastoise', 'blaziken', 'bouffalant',
			'braviary', 'camerupt', 'carracosta', 'castform', 'celebi', 'chandelure', 'charizard', 'charmander',
			'charmeleon', 'cherrim', 'chimchar', 'combusken', 'corsola', 'crawdaunt', 'crustle', 'cyndaquil', 'darmanitan',
			'darumaka', 'drifblim', 'emboar', 'entei', 'escavalier', 'exeggutor', 'fearow', 'ferrothorn',
			'flareon', 'galvantula', 'genesect', 'groudon', 'growlithe', 'hariyama', 'heatmor', 'heatran', 'heracross',
			'hitmonchan', 'hitmonlee', 'hitmontop', 'honchkrow', 'hooh', 'houndoom', 'houndour', 'infernape', 'jirachi',
			'jumpluff', 'kingler', 'kricketune', 'lampent', 'lanturn', 'lapras', 'larvesta', 'leafeon', 'leavanny', 'ledian',
			'lilligant', 'litwick', 'lunatone', 'magby', 'magcargo', 'magmar', 'magmortar', 'mantine', 'meganium', 'miltank',
			'moltres', 'monferno', 'murkrow', 'ninetales', 'numel', 'omastar', 'pansear', 'pignite', 'politoed', 'poliwrath',
			'ponyta', 'primeape', 'quilava', 'raikou', 'rapidash', 'reshiram', 'rotomfan', 'rotomheat', 'rotommow', 'rotomwash',
			'scizor', 'scyther', 'sharpedo', 'sigilyph', 'simisear', 'skarmory', 'slugma', 'solrock', 'stantler', 'staraptor',
			'stoutland', 'suicune', 'sunflora', 'swoobat', 'tauros', 'tepig', 'thundurus', 'thundurustherian', 'torchic',
			'torkoal', 'toxicroak', 'tropius', 'typhlosion', 'venomoth', 'venusaur', 'vespiquen', 'victini', 'victreebel',
			'vileplume', 'volcarona', 'vulpix', 'wailord', 'whimsicott', 'xatu', 'yanmega', 'zapdos', 'zebstrika', 'zoroark'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();

		// Create the specific Pokémon for the user
		var crypto = require('crypto');
		var hash = parseInt(crypto.createHash('md5').update(toId(side.name)).digest('hex').substr(0, 8), 16);
		var random = (5 * hash + 6) % 649;
		// Find the Pokemon. Castform by default because lol
		var pokeName = 'castform';
		for (var p in this.data.Pokedex) {
			if (this.data.Pokedex[p].num === random) {
				pokeName = p;
				break;
			}
		}
		var team = [this.randomSet(this.getTemplate(pokeName), 0)];

		// Now, let's make the team!
		for (var i = 1; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			team.push(set);
		}

		return team;
	},
	randomSeasonalAATeam: function (side) {
		// First we choose the lead
		var dice = this.random(100);
		var lead = (dice  < 50) ? 'groudon' : 'kyogre';
		var groudonsSailors = [
			'alakazam', 'arbok', 'arcanine', 'arceusfire', 'bibarel', 'bisharp', 'blaziken', 'blissey', 'cacturne',
			'chandelure', 'chansey', 'charizard', 'cloyster', 'conkeldurr', 'druddigon', 'electivire',
			'emboar', 'entei', 'exploud', 'gardevoir', 'genesect', 'golurk', 'hariyama', 'heatran', 'infernape',
			'jellicent', 'lilligant', 'lucario', 'luxray', 'machamp', 'machoke', 'machop', 'magmortar', 'meloetta',
			'onix', 'poliwrath', 'primeape', 'smeargle', 'snorlax', 'toxicroak', 'typhlosion', 'weezing'
		];
		var kyogresPirates = [
			'absol', 'arceusflying', 'cofagrigus', 'crobat', 'darkrai', 'delibird', 'dragonite', 'ducklett',
			'garchomp', 'gengar', 'golem', 'gothitelle', 'honchkrow', 'krookodile', 'landorus', 'ludicolo',
			'mandibuzz', 'pelipper', 'pidgeot', 'pidgey', 'sableye', 'scizor', 'scyther', 'sharpedo', 'shiftry',
			'skarmory', 'staraptor', 'swanna', 'thundurus', 'thundurustherian', 'tornadus', 'tornadustherian',
			'tyranitar', 'volcarona', 'wailord', 'weavile', 'whimsicott', 'wingull', 'zoroark'
		];
		groudonsSailors = groudonsSailors.randomize();
		kyogresPirates = kyogresPirates.randomize();

		// Add the lead.
		var team = [this.randomSet(this.getTemplate(lead), 0)];

		// Now, let's make the team. Each side has a different ability.
		var teamPool = [];
		var ability = 'Illuminate', moveToGet;
		if (lead === 'kyogre') {
			ability = 'Thick Fat';
			teamPool = kyogresPirates;
			moveToGet = 'hurricane';
		} else {
			var dice = this.random(100);
			ability = (dice < 33) ? 'Water Absorb' : 'Tinted Lens';
			teamPool = groudonsSailors;
			moveToGet = 'vcreate';
		}
		for (var i = 1; i < 6; i++) {
			var pokemon = teamPool[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			set.ability = (template.baseSpecies && template.baseSpecies === 'Arceus') ? 'Multitype' : ability;
			var hasMoves = {};
			for (var m in set.moves) {
				set.moves[m] = set.moves[m].toLowerCase();
				if (set.moves[m] === 'dynamicpunch') set.moves[m] = 'closecombat';
				hasMoves[set.moves[m]] = true;
			}
			if (!(moveToGet in hasMoves)) {
				set.moves[3] = moveToGet;
			}
			if (set.item === 'Damp Rock' && !('rain dance' in hasMoves)) set.item = 'Life Orb';
			if (set.item === 'Heat Rock' && !('sunny day' in hasMoves)) set.item = 'Life Orb';
			team.push(set);
		}

		return team;
	},
	randomSeasonalSSTeam: function (side) {
		var crypto = require('crypto');
		var hash = parseInt(crypto.createHash('md5').update(toId(side.name)).digest('hex').substr(0, 8), 16);
		var randNums = [
			(13 * hash + 11) % 649,
			(18 * hash + 66) % 649,
			(25 * hash + 73) % 649,
			(1 * hash + 16) % 649,
			(23 * hash + 132) % 649,
			(5 * hash + 6) % 649
		];
		var randoms = {};
		for (var i = 0; i < 6; i++) {
			if (randNums[i] < 1) randNums[i] = 1;
			randoms[randNums[i]] = true;
		}
		var team = [];
		var mons = 0;
		var fashion = [
			'Choice Scarf', 'Choice Specs', 'Silk Scarf', 'Wise Glasses', 'Choice Band', 'Wide Lens',
			'Zoom Lens', 'Destiny Knot', 'BlackGlasses', 'Expert Belt', 'Black Belt', 'Macho Brace',
			'Focus Sash', "King's Rock", 'Muscle Band', 'Mystic Water', 'Binding Band', 'Rocky Helmet'
		];
		for (var p in this.data.Pokedex) {
			if (this.data.Pokedex[p].num in randoms) {
				var set = this.randomSet(this.getTemplate(p), mons);
				fashion = fashion.randomize();
				if (fashion.indexOf(set.item) === -1) set.item = fashion[0];
				team.push(set);
				delete randoms[this.data.Pokedex[p].num];
				mons++;
			}
		}
		// Just in case the randoms generated the same number... highly unlikely
		var defaults = ['politoed', 'toxicroak', 'articuno', 'jirachi', 'tentacruel', 'liepard'].randomize();
		while (mons < 6) {
			var set = this.randomSet(this.getTemplate(defaults[mons]), mons);
			fashion = fashion.randomize();
			if (fashion.indexOf(set.item) === -1) set.item = fashion[0];
			team.push(set);
			mons++;
		}

		return team;
	},
	randomSeasonalOFTeam: function (side) {
		var seasonalPokemonList = [
			'absol', 'alakazam', 'banette', 'beheeyem', 'bellossom', 'bisharp', 'blissey', 'cacturne', 'carvanha', 'chandelure',
			'cofagrigus', 'conkeldurr', 'crawdaunt', 'darkrai', 'deino', 'drapion', 'drifblim', 'drifloon', 'dusclops',
			'dusknoir', 'duskull', 'electivire', 'frillish', 'froslass', 'gallade', 'gardevoir', 'gastly', 'gengar', 'giratina',
			'golett', 'golurk', 'gothitelle', 'hariyama', 'haunter', 'hitmonchan', 'hitmonlee', 'hitmontop', 'honchkrow', 'houndoom',
			'houndour', 'hydreigon', 'hypno', 'infernape', 'jellicent', 'jynx', 'krokorok', 'krookodile', 'lampent', 'leavanny',
			'liepard', 'lilligant', 'litwick', 'lopunny', 'lucario', 'ludicolo', 'machamp', 'magmortar', 'mandibuzz', 'medicham',
			'meloetta', 'mienshao', 'mightyena', 'misdreavus', 'mismagius', 'mrmime', 'murkrow', 'nuzleaf', 'pawniard', 'poochyena',
			'probopass', 'purrloin', 'roserade', 'rotom', 'sableye', 'sandile', 'sawk', 'scrafty', 'scraggy', 'sharpedo', 'shedinja',
			'shiftry', 'shuppet', 'skuntank', 'sneasel', 'snorlax', 'spiritomb', 'stunky', 'throh', 'toxicroak', 'tyranitar', 'umbreon',
			'vullaby', 'weavile', 'wobbuffet', 'yamask', 'zoroark', 'zorua', 'zweilous'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];

		for (var i = 0; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			var trickindex = -1;
			for (var j = 0, l = set.moves.length; j < l; j++) {
				if (set.moves[j].toLowerCase() === 'trick') {
					trickindex = j;
				}
			}
			if (trickindex === -1 || trickindex === 2) {
				set.moves[3] = 'trick';
			}
			set.moves[2] = 'Present';
			team.push(set);
		}

		return team;
	},
	randomSeasonalTTTeam: function (side) {
		var seasonalPokemonList = [
			'alakazam', 'machamp', 'hypno', 'hitmonlee', 'hitmonchan', 'mrmime', 'jynx', 'hitmontop', 'hariyama', 'sableye', 'medicham',
			'toxicroak', 'electivire', 'magmortar', 'conkeldurr', 'throh', 'sawk', 'gothitelle', 'beheeyem', 'bisharp', 'volbeat', 'illumise',
			'spinda', 'cacturne', 'infernape', 'lopunny', 'lucario', 'mienshao', 'pidgeot', 'fearow', 'dodrio', 'aerodactyl', 'noctowl',
			'crobat', 'xatu', 'skarmory', 'swellow', 'staraptor', 'honchkrow', 'chatot', 'unfezant', 'sigilyph', 'braviary', 'mandibuzz',
			'farfetchd', 'pelipper', 'altaria', 'togekiss', 'swoobat', 'archeops', 'swanna', 'weavile', 'gallade', 'gardevoir', 'ludicolo',
			'snorlax', 'wobbuffet', 'meloetta', 'blissey', 'landorus', 'tornadus', 'golurk', 'bellossom', 'lilligant', 'probopass', 'roserade',
			'leavanny', 'zapdos', 'moltres', 'articuno', 'delibird', 'pancham', 'pangoro', 'hawlucha', 'noibat', 'noivern', 'fletchling',
			'fletchinder', 'talonflame', 'vivillon', 'yveltal'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		for (var i = 0; i < 6; i++) {
			var set = this.randomSet(seasonalPokemonList[i], i);
			if (seasonalPokemonList[i] === 'talonflame') set.level = 74;
			team.push(set);
		}
		return team;
	},
	randomSeasonalCCTeam: function (side) {
		var seasonalPokemonList = [
			'raichu', 'nidoqueen', 'nidoking', 'clefable', 'wigglytuff', 'rapidash', 'dewgong', 'cloyster', 'exeggutor', 'starmie', 'jynx',
			'lapras', 'snorlax', 'articuno', 'azumarill', 'granbull', 'delibird', 'stantler', 'miltank', 'blissey', 'swalot', 'lunatone',
			'castform', 'chimecho', 'glalie', 'walrein', 'regice', 'jirachi', 'bronzong', 'chatot', 'abomasnow', 'weavile', 'togekiss',
			'glaceon', 'probopass', 'froslass', 'rotom-frost', 'uxie', 'mesprit', 'azelf', 'victini', 'vanilluxe', 'sawsbuck', 'beartic',
			'cryogonal', 'chandelure', 'gardevoir', 'amaura', 'aurorus', 'bergmite', 'avalugg'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		for (var i = 0; i < 6; i++) {
			var set = this.randomSet(seasonalPokemonList[i], i);
			set.moves[3] = 'Present';
			team.push(set);
		}
		return team;
	},
	randomSeasonalWinterTeam: function (side) {
		var seasonalPokemonList = [
			'raichu', 'nidoqueen', 'nidoking', 'clefable', 'wigglytuff', 'rapidash', 'dewgong', 'cloyster', 'exeggutor', 'starmie', 'jynx',
			'lapras', 'snorlax', 'articuno', 'azumarill', 'granbull', 'delibird', 'stantler', 'miltank', 'blissey', 'swalot', 'lunatone',
			'castform', 'chimecho', 'glalie', 'walrein', 'regice', 'jirachi', 'bronzong', 'chatot', 'abomasnow', 'weavile', 'togekiss',
			'glaceon', 'probopass', 'froslass', 'rotom-frost', 'uxie', 'mesprit', 'azelf', 'victini', 'vanilluxe', 'sawsbuck', 'beartic',
			'cryogonal', 'chandelure', 'gardevoir', 'amaura', 'aurorus', 'bergmite', 'avalugg', 'xerneas', 'kyogre', 'rotom-wash'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		for (var i = 0; i < 6; i++) {
			var set = this.randomSet(seasonalPokemonList[i], i);
			set.level *= 50;
			team.push(set);
		}
		return team;
	},
	randomSeasonalFFTeam: function (side) { // duplicate key.
		var seasonalPokemonList = [
			'charizard', 'ninetales', 'houndoom', 'arceusfire', 'arcanine', 'moltres', 'rapidash', 'magmar', 'quilava', 'typhlosion',
			'entei', 'hooh', 'blaziken', 'rotomheat', 'chandelure', 'magcargo', 'reshiram', 'zekrom', 'heatran', 'arceusdragon',
			'arceusfighting', 'seadra', 'kingdra', 'gyarados', 'dunsparce', 'milotic', 'drapion', 'growlithe', 'paras', 'parasect',
			'magikarp', 'suicune', 'raikou', 'absol', 'spiritomb', 'horsea', 'ponyta', 'blitzle', 'zebstrika'
		];
		seasonalPokemonList = seasonalPokemonList.randomize();
		var team = [];
		for (var i = 0; i < 6; i++) {
			var set = this.randomSet(seasonalPokemonList[i], i);
			if (seasonalPokemonList[i] === 'gyarados') set.shiny = true;
			set.moves[3] = 'Explosion';
			team.push(set);
		}
		return team;
	},
	randomSeasonalSBTeam: function (side) {
		var crypto = require('crypto');
		var date = new Date();
		var hash = parseInt(crypto.createHash('md5').update(toId(side.name)).digest('hex').substr(0, 8), 16) + date.getDate();
		var randNums = [
			(13 * hash + 6) % 721,
			(18 * hash + 12) % 721,
			(25 * hash + 24) % 721,
			(1 * hash + 48) % 721,
			(23 * hash + 96) % 721,
			(5 * hash + 192) % 721
		];
		var randoms = {};
		for (var i = 0; i < 6; i++) {
			if (randNums[i] < 1) randNums[i] = 1;
			randoms[randNums[i]] = true;
		}
		var team = [];
		var mons = 0;
		for (var p in this.data.Pokedex) {
			if (this.data.Pokedex[p].num in randoms) {
				var set = this.randomSet(this.getTemplate(p), mons);
				set.moves[3] = 'Present';
				team.push(set);
				delete randoms[this.data.Pokedex[p].num];
				mons++;
			}
		}

		// There is a very improbable chance in which two hashes collide, leaving the player with five Pokémon. Fix that.
		var defaults = ['zapdos', 'venusaur', 'aegislash', 'heatran', 'unown', 'liepard'].randomize();
		while (mons < 6) {
			var set = this.randomSet(this.getTemplate(defaults[mons]), mons);
			set.moves[3] = 'Present';
			team.push(set);
			mons++;
		}

		return team;
	},
	randomSeasonalSleighTeam: function (side) {
		// All Pokémon in this Seasonal. They are meant to pull the sleigh.
		var seasonalPokemonList = [
			'abomasnow', 'accelgor', 'aggron', 'arbok', 'arcanine', 'arceus', 'ariados', 'armaldo', 'audino', 'aurorus', 'avalugg',
			'barbaracle', 'bastiodon', 'beartic', 'bellossom', 'bibarel', 'bisharp', 'blastoise', 'blaziken', 'bouffalant', 'cacturne',
			'camerupt', 'carracosta', 'cherrim', 'cobalion', 'conkeldurr', 'crawdaunt', 'crustle', 'darmanitan', 'dedenne', 'delcatty',
			'delibird', 'dialga', 'dodrio', 'donphan', 'drapion', 'druddigon', 'dunsparce', 'durant', 'eevee', 'electivire', 'electrode',
			'emboar', 'entei', 'espeon', 'exeggutor', 'exploud', 'feraligatr', 'flareon', 'furfrou', 'furret', 'gallade', 'galvantula',
			'garbodor', 'garchomp', 'gastrodon', 'genesect', 'gigalith', 'girafarig', 'glaceon', 'glaceon', 'glalie', 'gogoat', 'golem',
			'golurk', 'granbull', 'groudon', 'grumpig', 'hariyama', 'haxorus', 'heatmor', 'heatran', 'heliolisk', 'hippowdon', 'hitmonchan',
			'hitmonlee', 'hitmontop', 'houndoom', 'hypno', 'infernape', 'jolteon', 'jynx', 'kabutops', 'kangaskhan', 'kecleon', 'keldeo',
			'kingler', 'krookodile', 'kyurem', 'kyuremblack', 'kyuremwhite', 'lapras', 'leafeon', 'leavanny', 'lickilicky', 'liepard',
			'lilligant', 'linoone', 'lopunny', 'lucario', 'ludicolo', 'luxray', 'machamp', 'magcargo', 'magmortar', 'malamar', 'mamoswine',
			'manectric', 'marowak', 'meganium', 'meowstic', 'metagross', 'mewtwo', 'mightyena', 'miltank', 'nidoking', 'nidoqueen',
			'ninetales', 'octillery', 'omastar', 'pachirisu', 'palkia', 'pangoro', 'parasect', 'persian', 'poliwrath', 'primeape', 'purugly',
			'pyroar', 'raichu', 'raikou', 'rampardos', 'rapidash', 'raticate', 'regice', 'regigigas', 'regirock', 'registeel', 'reshiram',
			'rhydon', 'rhyperior', 'samurott', 'sandslash', 'sawk', 'sawsbuck', 'sceptile', 'scolipede', 'seismitoad', 'shaymin', 'shiftry',
			'simipour', 'simisage', 'simisear', 'skuntank', 'slaking', 'slowbro', 'slowking', 'slurpuff', 'spinda', 'stantler', 'steelix',
			'stoutland', 'sudowoodo', 'suicune', 'sunflora', 'swampert', 'sylveon', 'tangrowth', 'tauros', 'terrakion', 'throh', 'torkoal',
			'torterra', 'typhlosion', 'tyrantrum', 'umbreon', 'ursaring', 'ursaring', 'vaporeon', 'venusaur', 'vileplume', 'virizion',
			'whimsicott', 'wobbuffet', 'xerneas', 'zangoose', 'zebstrika', 'zekrom', 'zoroark'
		].randomize();

		// We create the team now
		var team = [];
		for (var i = 0; i < 6; i++) {
			var pokemon = seasonalPokemonList[i];
			var template = this.getTemplate(pokemon);
			var set = this.randomSet(template, i);
			// We presserve top priority moves over the rest.
			if ((toId(set.item) === 'heatrock' && toId(set.moves[3]) === 'sunnyday') || toId(set.moves[3]) === 'geomancy' || (toId(set.moves[3]) === 'rest' && toId(set.item) === 'chestoberry') || (pokemon === 'haxorus' && toId(set.moves[3]) === 'dragondance') || (toId(set.ability) === 'guts' && toId(set.moves[3]) === 'facade')) {
				set.moves[2] = 'Present';
			} else {
				set.moves[3] = 'Present';
			}
			if (this.getItem(set.item).megaStone) set.item = 'Life Orb';
			team.push(set);
		}

		// Done, return the result.
		return team;
	},
	randomSeasonalSFTTeam: function (side) {
		// Let's get started!
		var lead = 'gallade';
		var team = [];
		var set = {};
		var megaCount = 0;

		// If the other team has been chosen, we get its opposing force.
		if (this.seasonal && this.seasonal.scenario) {
			lead = {'lotr':'reshiram', 'redblue':'pidgeot', 'terminator':'alakazam', 'gen1':'gengar', 'desert':'probopass', 'shipwreck':'machamp'}[this.seasonal.scenario];
		} else {
			// First team being generated, let's get one of the possibilities.
			// We need a fix lead for obvious reasons.
			lead = ['gallade', 'pikachu', 'genesect', 'gengar', 'groudon', 'kyogre'][this.random(6)];
			this.seasonal = {'scenario': {'gallade':'lotr', 'pikachu':'redblue', 'genesect':'terminator', 'gengar':'gen1', 'groudon':'desert', 'kyogre':'shipwreck'}[lead]};
		}

		// Gen 1 mons and blue/red teams have their own set maker.
		if (lead === 'pikachu') {
			// Add Red's team
			team = [
				{
					name: 'Pika',
					species: 'pikachu',
					moves: ['volttackle', 'brickbreak', 'irontail', 'fakeout'],
					evs: {hp:0, atk:252, def:0, spa:0, spd:0, spe:252},
					ivs: {hp:31, atk:31, def:31, spa:31, spd:31, spe:31},
					item: 'lightball',
					level: 90,
					shiny: false,
					nature: 'Jolly',
					ability: 'Lightning Rod'
				},
				{
					name: 'Lapras',
					moves: ['hydropump', 'icebeam', 'thunderbolt', 'iceshard'],
					evs: {hp:252, atk:4, def:0, spa:252, spd:0, spe:0},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'leftovers',
					level: 80,
					shiny: false,
					nature: 'Quiet',
					ability: 'Water Absorb'
				},
				{
					name: 'Snorlax',
					moves: ['bodyslam', 'crunch', 'earthquake', 'seedbomb'],
					evs: {hp:252, atk:252, def:4, spa:0, spd:0, spe:0},
					ivs: {hp:31, atk:31, def:31, spa:31, spd:31, spe:31},
					item: 'leftovers',
					level: 82,
					shiny: false,
					nature: 'Adamant',
					ability: 'Thick Fat'
				},
				{
					name: 'Venusaur',
					moves: ['leafstorm', 'earthquake', 'sludgebomb', 'sleeppowder'],
					evs: {hp:252, atk:4, def:0, spa:252, spd:0, spe:0},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'whiteherb',
					level: 84,
					shiny: false,
					nature: 'Quiet',
					ability: 'Overgrow'
				},
				{
					name: 'Charizard',
					moves: ['fireblast', 'focusblast', 'airslash', 'dragonpulse'],
					evs: {hp:4, atk:0, def:0, spa:252, spd:0, spe:252},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'charizarditey',
					level: 73,
					shiny: false,
					nature: 'Timid',
					ability: 'Solar Power'
				},
				{
					name: 'Blastoise',
					moves: ['waterspout', 'hydropump', 'flashcannon', 'focusblast'],
					evs: {hp:252, atk:0, def:4, spa:252, spd:0, spe:0},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'choicescarf',
					level: 84,
					shiny: false,
					nature: 'Modest',
					ability: 'Torrent'
				}
			];
		} else if (lead === 'pidgeot') {
			// Add Blue's team
			team = [
				{
					name: 'Pidgeot',
					moves: ['hurricane', 'heatwave', 'roost', 'hiddenpowerground'],
					evs: {hp:4, atk:0, def:0, spa:252, spd:0, spe:252},
					ivs: {hp:31, atk:31, def:31, spa:30, spd:30, spe:31},
					item: 'pidgeotite',
					level: 76,
					shiny: false,
					nature: 'Timid',
					ability: 'Keen Eye'
				},
				{
					name: 'Exeggutor',
					moves: ['gigadrain', 'sunnyday', 'leechseed', 'substitute'],
					evs: {hp:252, atk:0, def:4, spa:252, spd:0, spe:0},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'sitrusberry',
					level: 85,
					shiny: false,
					nature: 'Modest',
					ability: 'Harvest'
				},
				{
					name: 'Gyarados',
					moves: ['waterfall', 'earthquake', 'icefang', 'dragondance'],
					evs: {hp:4, atk:252, def:0, spa:0, spd:0, spe:252},
					ivs: {hp:31, atk:31, def:31, spa:31, spd:31, spe:31},
					item: 'leftovers',
					level: 80,
					shiny: false,
					nature: 'Adamant',
					ability: 'Intimidate'
				},
				{
					name: 'Alakazam',
					moves: ['psychic', 'focusblast', 'shadowball', 'reflect'],
					evs: {hp:4, atk:0, def:0, spa:252, spd:0, spe:252},
					ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31},
					item: 'lifeorb',
					level: 75,
					shiny: false,
					nature: 'Modest',
					ability: 'Magic Guard'
				},
				{
					name: 'Arcanine',
					moves: ['flareblitz', 'closecombat', 'wildcharge', 'extremespeed'],
					evs: {hp:4, atk:252, def:0, spa:0, spd:0, spe:252},
					ivs: {hp:31, atk:31, def:31, spa:31, spd:31, spe:31},
					item: 'expertbelt',
					level: 80,
					shiny: false,
					nature: 'Jolly',
					ability: 'Flash Fire'
				},
				{
					name: 'Machamp',
					moves: ['superpower', 'stoneedge', 'firepunch', 'bulletpunch'],
					evs: {hp:252, atk:252, def:4, spa:0, spd:0, spe:0},
					ivs: {hp:31, atk:31, def:31, spa:31, spd:31, spe:31},
					item: 'whiteherb',
					level: 86,
					shiny: false,
					nature: 'Adamant',
					ability: 'No Guard'
				}
			];
		} else if (lead === 'gengar') {
			// Add gen 1 team.
			this.gen = 1;

			// Pre-prepare sets.
			var sets = {
				gengar: {
					name: 'GENGAR',
					moves: ['hypnosis', 'explosion', 'thunderbolt', ['megadrain', 'psychic'][this.random(2)]]
				},
				tauros: {
					name: 'TAUROS',
					moves: ['bodyslam', 'hyperbeam', 'blizzard', 'earthquake']
				},
				alakazam: {
					name: 'ALAKAZAM',
					moves: ['psychic', 'recover', 'thunderwave', ['reflect', 'seismictoss'][this.random(2)]]
				},
				chansey: {
					name: 'CHANSEY',
					moves: ['softboiled', 'thunderwave', 'icebeam', ['thunderbolt', 'counter'][this.random(2)]]
				},
				exeggutor: {
					name: 'EXEGGUTOR',
					moves: ['sleeppowder', 'psychic', 'explosion', ['doubleedge', 'megadrain', 'stunspore'][this.random(3)]]
				},
				rhydon: {
					name: 'RHYDON',
					moves: ['earthquake', 'rockslide', 'substitute', 'bodyslam']
				},
				golem: {
					name: 'GOLEM',
					moves: ['bodyslam', 'earthquake', 'rockslide', 'explosion']
				},
				jynx: {
					name: 'JYNX',
					moves: ['psychic', 'lovelykiss', 'blizzard', 'mimic']
				},
				lapras: {
					name: 'LAPRAS',
					moves: ['confuseray', ['thunderbolt', 'rest'][this.random(2)], ['blizzard', 'icebeam'][this.random(2)], 'bodyslam']
				},
				zapdos: {
					name: 'ZAPDOS',
					moves: ['thunderbolt', 'thunderwave', 'drillpeck', 'agility']
				},
				slowbro: {
					name: 'SLOWBRO',
					moves: ['amnesia', 'rest', 'surf', 'thunderwave']
				},
				persian: {
					name: 'PERSIAN',
					moves: ['slash', 'bubblebeam', 'hyperbeam', ['bodyslam', 'screech', 'thunderbolt'][this.random(3)]]
				},
				cloyster: {
					name: 'CLOYSTER',
					moves: ['clamp', 'blizzard', 'hyperbeam', 'explosion']
				},
				starmie: {
					name: 'STARMIE',
					moves: ['blizzard', 'thunderbolt', 'recover', 'thunderwave']
				},
				snorlax: {
					name: 'SNORLAX',
					moves: [
						['amnesia', ['blizzard', 'icebeam'][this.random(2)], ['bodyslam', 'thunderbolt'][this.random(2)], ['rest', 'selfdestruct'][this.random(2)]],
						['bodyslam', 'hyperbeam', ['earthquake', 'surf'][this.random(2)], 'selfdestruct']
					][this.random(2)]
				},
				dragonite: {
					name: 'DRAGONITE',
					moves: ['agility', 'hyperbeam', 'wrap', ['blizzard', 'surf'][this.random(2)]]
				}
			};
			var leads = ['alakazam', 'jynx', 'gengar', 'exeggutor'].randomize();
			lead = leads.shift();
			var setsIndex = ['tauros', 'chansey', 'rhydon', 'golem', 'lapras', 'zapdos', 'slowbro', 'persian', 'cloyster', 'starmie', 'snorlax', 'dragonite'];
			setsIndex = setsIndex.concat(leads);
			setsIndex = setsIndex.randomize();
			setsIndex.unshift(lead);

			for (var i = 0; i < 6; i++) {
				set = sets[setsIndex[i]];
				set.ability = 'None';
				set.evs = {hp:255, atk:255, def:126, spa:255, spd:126, spe:255};
				set.ivs = {hp:30, atk:30, def:30, spa:30, spd:30, spe:30};
				set.item = '';
				set.level = 100;
				set.shiny = false;
				set.species = toId(set.name);
				team.push(set);
			}
		} else if (lead === 'gallade') {
			// This is the Aragorn team from the LOTR battle. Special set for Aragorn.
			set = this.randomSet(this.getTemplate(lead));
			set.species = toId(set.name);
			set.name = 'Aragorn';
			set.item = 'Galladite';
			set.moves = ['psychocut', 'bulkup', ['drainpunch', 'closecombat'][this.random(2)], ['nightslash', 'leafblade', 'xscissor', 'stoneedge', 'doubleedge', 'knockoff'][this.random(6)]];
			set.level = 72;
			team.push(set);

			// We get one elf or bard.
			var elf = ['jynx', 'azelf', 'celebi', 'victini', 'landorustherian'][this.random(5)];
			set = this.randomSet(this.getTemplate(elf));
			set.species = toId(set.name);
			set.name = {'jynx':'Galadriel', 'azelf':'Legolas', 'celebi':'Celeborn', 'victini':'Elrond', 'landorustherian':'Bard'}[elf];
			if (elf === 'landorustherian') {
				set.item = 'Earth Plate';
				set.moves = ['thousandarrows', 'thousandwaves', 'uturn', 'superpower'];
			}
			team.push(set);

			// Now we add some other characters from the fellowship.
			var fellowship = {'hoopa':'Gandalf', 'baltoy':'Frodo', 'munchlax':'Samwise'};
			for (var p in fellowship) {
				var template = this.getTemplate(p);
				set = this.randomSet(template);
				set.species = toId(set.name);
				set.name = fellowship[p];
				// Add a way to go around dark-types.
				var hasOrcKilling = false;
				for (var n = 0; n < 4; n++) {
					var move = this.getMove(set.moves[n]);
					if (move.type in {'Bug':1, 'Fighting':1}) {
						hasOrcKilling = true;
						break;
					}
				}
				if (!hasOrcKilling) set.moves[3] = (template.baseStats.atk > template.baseStats.spa)? 'closecombat' : 'aurasphere';
				if (p !== 'hoopa') {
					set.item = 'Eviolite';
					set.level = 90;
					set.evs = {hp:4, atk:126, def:126, spa:126, spd:126, spe:0};
					if (p === 'baltoy') set.moves[0] = 'Growl';
				}
				team.push(set);
			}

			// And now an extra good guy.
			var goodguy = [
				'primeape', 'aegislash', 'mimejr', 'timburr', 'lucario',
				['sudowoodo', 'trevenant', 'abomasnow', 'shiftry', 'cacturne', 'nuzleaf'][this.random(6)],
				['pidgeot', 'staraptor', 'braviary', 'aerodactyl', 'noivern', 'lugia', 'hooh', 'moltres', 'articuno', 'zapdos'][this.random(10)]
			][this.random(7)];
			set = this.randomSet(this.getTemplate(goodguy));
			set.species = toId(set.name);
			set.name = {
				'primeape':'Gimli', 'aegislash':'Faramir', 'mimejr':'Pippin', 'timburr':'Merry', 'lucario':'Boromir',
				'trevenant':'Treebeard', 'sudowoodo':'Birchseed', 'abomasnow':'Fimbrethil', 'shiftry':'Quickbeam',
				'cacturne':'Finglas', 'nuzleaf':'Lindenroot', 'pidgeot':'Great Eagle', 'staraptor':'Great Eagle',
				'braviary':'Great Eagle', 'aerodactyl':'Great Eagle', 'noivern':'Great Eagle', 'lugia':'Great Eagle',
				'hooh':'Great Eagle', 'moltres':'Great Eagle', 'articuno':'Great Eagle', 'zapdos':'Great Eagle'
			}[goodguy];
			team.push(set);
		} else if (lead === 'reshiram') {
			// This is the Mordor team from the LOTR battle.
			var mordor = {'reshiram':'Smaug', 'yveltal':'Nazgûl', 'hoopaunbound':'Saruman'};
			for (var p in mordor) {
				set = this.randomSet(this.getTemplate(p));
				set.species = toId(set.name);
				set.name = mordor[p];
				if (p === 'yveltal') {
					set.item = 'Choice Scarf';
					set.moves = ['oblivionwing', 'darkpulse', 'hurricane', 'uturn'];
					set.nature = 'Timid';
					set.evs = {hp:0, atk:4, def:0, spa:252, spd:0, spe:252};
					set.level = 70;
				}
				if (p === 'hoopaunbound') set.level = 70;
				team.push(set);
			}

			// This army has an orc, a troll, and a bad-guy human. Or Gollum instead any of those three.
			var addGollum = false;
			// 66% chance of getting an orc.
			if (this.random(3) < 2) {
				var orc = ['quilladin', 'chesnaught', 'granbull', 'drapion', 'pangoro', 'feraligatr', 'haxorus', 'garchomp'][this.random(8)];
				set = this.randomSet(this.getTemplate(orc));
				set.species = toId(set.name);
				set.name = 'Orc';
				team.push(set);
			} else {
				addGollum = true;
			}
			// If we got an orc, 66% chance of getting a troll. Otherwise, 100%.
			if (addGollum || this.random(3) < 2) {
				var troll = ['conkeldurr', 'drowzee', 'hypno', 'seismitoad', 'weavile', 'machamp'][this.random(6)];
				set = this.randomSet(this.getTemplate(troll));
				set.species = toId(set.name);
				set.name = 'Troll';
				team.push(set);
			} else {
				addGollum = true;
			}
			// If we got an orc and a troll, 66% chance of getting a Mordor man. Otherwise, 100%.
			if (addGollum || this.random(3) < 2) {
				var badhuman = ['bisharp', 'alakazam', 'medicham', 'mrmime', 'gardevoir', 'hitmonlee', 'hitmonchan', 'hitmontop', 'meloetta', 'sawk', 'throh', 'scrafty'][this.random(12)];
				set = this.randomSet(this.getTemplate(badhuman));
				set.species = toId(set.name);
				set.name = 'Mordor man';
				if (badhuman === 'bisharp') {
					set.moves = ['suckerpunch', 'brickbreak', 'knockoff', 'ironhead'];
					set.item = 'Life Orb';
				}
				if (set.level < 80) set.level = 80;
				team.push(set);
			} else {
				addGollum = true;
			}
			// If we did forfeit an orc, a troll, or a Mordor man, add Gollum in its stead.
			if (addGollum) {
				set = this.randomSet(this.getTemplate('sableye'));
				set.species = toId(set.name);
				set.name = 'Gollum';
				set.moves = ['fakeout', 'bind', 'soak', 'infestation'];
				set.item = 'Leftovers';
				set.leel = 99;
				team.push(set);
			}
		} else if (lead === 'genesect') {
			// Terminator team.
			set = this.randomSet(this.getTemplate(lead));
			set.species = toId(set.name);
			set.name = 'Terminator T-1000';
			set.item = 'Choice Band';
			set.moves = ['extremespeed', 'ironhead', 'blazekick', 'uturn'];
			set.nature = 'Jolly';
			set.evs.spe = 252;
			team.push(set);

			// The rest are just random botmons
			var bots = [
				'golurk', 'porygon', 'porygon2', 'porygonz', 'rotom', 'rotomheat', 'rotomwash', 'rotommow', 'rotomfan',
				'rotomfrost', 'regice', 'regirock', 'registeel', 'magnezone', 'magneton', 'magnemite', 'heatran', 'klinklang',
				'klang', 'klink', 'nosepass', 'probopass', 'electivire', 'metagross', 'armaldo', 'aggron', 'bronzong'
			].randomize();
			var names = ['T-850', 'E-3000', 'T-700', 'ISO-9001', 'WinME'];
			for (var i = 0; i < 5; i++) {
				var pokemon = bots[i];
				var template = this.getTemplate(pokemon);
				set = this.randomSet(template, i);
				set.species = toId(set.name);
				set.name = 'SkynetBot ' + names[i];
				if (bots[i] === 'rotomfan') set.item = 'Life Orb';
				set.ivs.spe = set.ivs.spe % 2;
				set.evs.spe = 0;
				team.push(set);
			}
		} else if (lead === 'alakazam') {
			// Human survival team.
			var humans = [
				'medicham', 'mrmime', 'gallade', 'gardevoir', 'lucario', 'hitmonlee', 'hitmonchan', 'hitmontop', 'tyrogue',
				'chansey', 'blissey', 'meloetta', 'sawk', 'throh', 'scrafty'
			].randomize();
			humans.unshift(lead);
			var names = ['John Connor', 'Sarah Connor', 'Terminator T-800', 'Kyle Reese', 'Miles Bennett Dyson', 'Dr. Silberman'];
			var hasMega = false;
			var makeZamSet = false;

			for (var i = 0; i < 6; i++) {
				var pokemon = humans[i];
				var template = this.getTemplate(pokemon);
				set = this.randomSet(template, i);
				set.species = toId(set.name);
				set.name = names[i];
				var hasBotKilling = false;
				// Give humans a way around robots
				for (var n = 0; n < 4; n++) {
					var move = this.getMove(set.moves[n]);
					if (move.type in {'Fire':1, 'Fighting':1}) {
						hasBotKilling = true;
						break;
					}
				}
				if (!hasBotKilling) {
					set.moves[3] = (template.baseStats.atk > template.baseStats.spa)? ['flareblitz', 'closecombat'][this.random(2)] : ['flamethrower', 'aurasphere'][this.random(2)];
					set.level += 5;
				}
				if (toId(set.ability) === 'unburden') set.ability = 'Reckless';
				// If we have Gardevoir, make it the mega. Then, Gallade.
				if (pokemon === 'gardevoir') {
					if (!hasMega) {
						set.item = 'Gardevoirite';
						hasMega = true;
						makeZamSet = true;
					} else {
						set.item = 'Life Orb';
					}
				}
				if (pokemon === 'gallade') {
					if (!hasMega) {
						set.item = 'Galladite';
						hasMega = true;
						makeZamSet = true;
					} else {
						set.item = 'Life Orb';
					}
				}
				if (pokemon === 'lucario') {
					if (!hasMega) {
						set.item = 'Lucarionite';
						hasMega = true;
						makeZamSet = true;
					} else {
						set.item = 'Life Orb';
					}
				}
				if (pokemon === 'chansey') {
					set.item = 'Eviolite';
					set.moves = ['softboiled', 'flamethrower', 'toxic', 'counter'];
				}
				if (pokemon === 'blissey') {
					set.item = 'Leftovers';
					set.moves = ['softboiled', 'flamethrower', 'barrier', 'counter'];
				}
				if (pokemon in {'hitmontop':1, 'scrafty':1}) {
					set.ability = 'Intimidate';
					set.item = 'Leftovers';
					set.moves = ['fakeout', 'drainpunch', 'knockoff', 'flareblitz'];
					set.evs = {hp:252, atk:252, def:4, spa:0, spd:0, spe:0};
					set.nature = 'Brave';
				}
				set.evs.spe = 0;
				set.ivs.spe = set.ivs.spe % 2;
				team.push(set);
			}
			if (makeZamSet) {
				team[0].item = 'Focus Sash';
				team[0].level = 90;
				team[0].moves = ['psychic', 'earthpower', 'shadowball', 'flamethrower'];
				team[0].ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:0};
				team[0].evs.hp += team[0].evs.spe;
				team[0].evs.spe = 0;
				team[0].nature = 'Quiet';
			}
		} else if (lead === 'groudon') {
			// Egyptians from the exodus battle.
			var egyptians = [
				'krookodile', 'tyranitar', 'rapidash', 'hippowdon', 'claydol', 'flygon', 'sandslash', 'torterra', 'darmanitan',
				'volcarona', 'arcanine', 'entei', 'aggron', 'armaldo', 'cradily', 'cacturne', 'exeggutor', 'tropius', 'yanmega',
				'muk', 'numel', 'camerupt', 'yamask', 'cofagrigus', 'glameow', 'purugly', 'skitty', 'delcatty', 'liepard',
				'solrock', 'lunatone', 'shinx', 'luxio', 'luxray', 'pidgeot', 'ampharos', 'unown', 'altaria', 'garchomp',
				'heliolisk', 'maractus', 'dugtrio', 'steelix', 'meowth', 'persian', 'gliscor', 'drapion'
			].randomize();
			var template = this.getTemplate(lead);
			set = this.randomSet(template, 0);
			set.species = toId(set.name);
			set.name = 'Ramesses II';
			set.ability = 'Rivalry';
			if (toId(set.item) === 'redorb') {
				set.item = 'Life Orb';
			}
			set.level = 67;
			team.push(set);

			for (var i = 1; i < 6; i++) {
				var pokemon = egyptians[i];
				template = this.getTemplate(pokemon);
				var set = this.randomSet(template, i, !!megaCount);
				if (this.getItem(set.item).megaStone) megaCount++;
				set.species = toId(set.name);
				set.name = 'Egyptian ' + template.species;
				team.push(set);
			}
		} else if (lead === 'probopass') {
			// Jews from the exodus battle.
			var jews = [
				'nosepass', ['arceus', 'arceusfire'][this.random(2)], 'flaaffy', 'tauros', 'miltank', 'gogoat', 'excadrill',
				'seismitoad', 'toxicroak', 'yanmega'
			].randomize();
			var template = this.getTemplate(lead);
			set = this.randomSet(template, 0);
			set.species = toId(set.name);
			set.name = 'Moses';
			team.push(set);

			for (var i = 1; i < 6; i++) {
				var pokemon = jews[i];
				template = this.getTemplate(pokemon);
				set = this.randomSet(template, i);
				set.species = toId(set.name);
				set.name = 'Hebrew ' + template.species;
				team.push(set);
			}
		} else {
			// Now the shipwreck battle, pretty straightforward.
			var	seasonalPokemonList = [];
			if (lead === 'kyogre') {
				seasonalPokemonList = [
					'sharpedo', 'malamar', 'octillery', 'gyarados', 'clawitzer', 'whiscash', 'relicanth', 'thundurus', 'thundurustherian',
					'thundurus', 'thundurustherian', 'tornadus', 'tornadustherian', 'pelipper', 'wailord', 'avalugg', 'milotic', 'crawdaunt'
				].randomize();
			} else if (lead === 'machamp') {
				seasonalPokemonList = [
					'chatot', 'feraligatr', 'poliwrath', 'swampert', 'barbaracle', 'carracosta', 'lucario', 'ursaring', 'vigoroth',
					'machoke', 'conkeldurr', 'gurdurr', 'seismitoad', 'chesnaught', 'electivire'
				].randomize();
			}
			seasonalPokemonList.unshift(lead);
			for (var i = 0; i < 6; i++) {
				var pokemon = seasonalPokemonList[i];
				var template = this.getTemplate(pokemon);
				var set = this.randomSet(template, i, !!megaCount);
				if (this.getItem(set.item).megaStone) megaCount++;

				// Sailor team is made of pretty bad mons, boost them a little.
				if (lead === 'machamp') {
					var isAtk = (template.baseStats.atk > template.baseStats.spa);
					if (pokemon === 'machamp') {
						set.item = 'Life Orb';
						set.ability = 'Technician';
						set.moves = ['aquajet', 'bulletpunch', 'machpunch', 'hiddenpowerelectric'];
						set.level = 75;
						set.ivs = {hp:31, atk:31, def:31, spa:30, spd:31, spe:31};
						set.nature = 'Brave';
						set.evs = {hp:0, atk:252, def:0, spa:252, spd:0, spe:4};
					} else {
						var shellSmashPos = -1;
						// Too much OP if all of them have an electric attack.
						if (this.random(3) < 2) {
							var hasFishKilling = false;
							for (var n = 0; n < 4; n++) {
								var move = this.getMove(set.moves[n]);
								if (move.type in {'Electric':1}) {
									hasFishKilling = true;
								} else if (move.id === 'raindance') { // useless, replace ASAP
									// Swampert is too OP for an electric move, so we give it another move
									set.moves[n] = (pokemon === 'swampert' ? 'doubleedge' : 'fusionbolt');
									hasFishKilling = true;
								} else if (move.id === 'shellsmash') { // don't replace this!
									shellSmashPos = n;
								}
							}
							if (!hasFishKilling && pokemon !== 'swampert') {
								var fishKillerPos = (shellSmashPos === 3 ? 2 : 3);
								set.moves[fishKillerPos] = isAtk ? 'thunderpunch' : 'thunderbolt';
							}
						}
						set.evs = {hp:252, atk:0, def:0, spa:0, spd:0, spe:0};
						if (shellSmashPos > -1 || toId(set.ability) === 'swiftswim' || (pokemon === 'swampert' && this.getItem(set.item).megaStone)) {
							// Give Shell Smashers and Mega Swampert a little bit of speed
							set.evs.atk = 200;
							set.evs.spe = 56;
							set.level -= 5;
						} else if (pokemon === 'lucario') {
							// Lucario has physical and special moves, so balance the attack EVs
							set.evs.atk = 128;
							set.evs.spa = 128;
						} else if (isAtk) {
							set.evs.atk = 252;
							set.evs.spd = 4;
						} else {
							set.evs.spa = 252;
							set.evs.spd = 4;
						}
					}
				} else if (pokemon === 'kyogre') {
					set.item = 'Choice Scarf';
					set.moves = ['waterspout', 'surf', 'thunder', 'icebeam'];
				} else if (pokemon === 'milotic') {
					set.level -= 5;
				}
				team.push(set);
			}
		}

		return team;
	},
	randomSeasonalMulanTeam: function (side) {
		var side = 'china';
		var team = [];
		var pokemon = '';
		var template = {};
		var set = {};
		var megaCount = 0;

		// If the other team has been chosen, we get its opposing force.
		if (this.seasonal && this.seasonal.side) {
			side = (this.seasonal.side === 'hun' ? 'china' : 'hun');
		} else {
			// First team being generated, pick a side at random.
			side = (Math.random() > 0.5 ? 'china' : 'hun');
			this.seasonal = {'side': side};
		}

		if (side === 'china') {
			var chinese = [
				'bisharp', 'gallade', 'hitmonchan', 'hitmonlee', 'hitmontop', 'infernape', 'machoke', 'medicham', 'mienshao',
				'pangoro', 'sawk', 'scrafty', 'scizor', 'throh', 'ursaring', 'vigoroth', 'weavile', 'zangoose'
			].randomize();

			// General Shang is a Lucario
			chinese.unshift('lucario');
			// Chien-Po is really, um, "round", so he samples from a different pool of Pokémon.
			chinese[4] = ['blastoise', 'snorlax', 'golem', 'lickilicky', 'poliwrath', 'hariyama'][this.random(6)];

			// Add the members of the army.
			var names = ["Li Shang", "Mulan", "Yao", "Ling", "Chien-Po"];
			for (var i = 0; i < 5; i++) {
				pokemon = chinese[i];
				template = this.getTemplate(pokemon);
				set = this.randomSet(template, i, !!megaCount);
				if (this.getItem(set.item).megaStone) megaCount++;
				set.species = toId(set.name);
				set.name = names[i];
				set.gender = (set.name === "Mulan" ? 'F' : 'M');
				set.moves[4] = 'sing';
				set.moves[5] = 'flameburst';
				team.push(set);
			}

			// Add Eddie Murphy-- I mean, Mushu, to the team as a Dragonair.
			template = this.getTemplate('dragonair');
			set = this.randomSet(template, 5);
			set.species = toId(set.name);
			set.name = "Mushu";
			set.gender = 'M';
			set.moves[4] = 'sing';
			set.moves[5] = 'flamethrower';
			team.push(set);
		} else {
			var huns = [
				'aggron', 'chesnaught', 'conkeldurr', 'electivire', 'emboar', 'excadrill', 'exploud', 'feraligatr', 'granbull',
				'haxorus', 'machamp', 'nidoking', 'rhyperior', 'swampert', 'tyranitar'
			].randomize();

			// The hun army has five huns.
			for (var i = 0; i < 5; i++) {
				pokemon = huns[i];
				template = this.getTemplate(pokemon);
				set = this.randomSet(template, i, !!megaCount);
				if (this.getItem(set.item).megaStone) megaCount++;
				if (i === 0) {
					set.species = toId(set.name);
					set.name = "Shan Yu";
				} else {
					set.species = toId(set.name);
					set.name = "Hun " + template.species;
				}
				set.gender = 'M';
				team.push(set);
			}

			// Now add Shan Yu's falcon. Might remove or nerf if it proves too OP against the fighting-heavy China team.
			pokemon = ['aerodactyl', 'braviary', 'fearow', 'honchkrow', 'mandibuzz', 'pidgeot', 'staraptor'][this.random(7)];
			template = this.getTemplate(pokemon);
			set = this.randomSet(template, i, !!megaCount);
			set.species = toId(set.name);
			set.name = "Shan Yu's Falcon";
			team.push(set);
		}

		return team;
	},
	randomSpoopyTeam: function () {
		var pool = [
			'ekans', 'arbok', 'golbat', 'parasect', 'muk', 'gengar', 'marowak', 'weezing', 'tangela', 'mr. mime', 'ditto',
			'kabutops', 'noctowl', 'ariados', 'crobat', 'umbreon', 'murkrow', 'misdreavus', 'gligar', 'granbull', 'sneasel',
			'houndoom', 'mightyena', 'dustox', 'shiftry', 'shedinja', 'exploud', 'sableye', 'mawile', 'swalot', 'carvanha',
			'sharpedo', 'cacturne', 'seviper', 'lunatone', 'claydol', 'shuppet', 'banette', 'duskull', 'dusclops', 'absol',
			'snorunt', 'glalie', 'drifloon', 'drifblim', 'mismagius', 'honchkrow', 'skuntank', 'spiritomb', 'drapion',
			'toxicroak', 'weavile', 'tangrowth', 'gliscor', 'dusknoir', 'froslass', 'rotom', 'rotom-wash', 'rotom-heat',
			'rotom-mow', 'purrloin', 'liepard', 'swoobat', 'whirlipede', 'scolipede', 'basculin', 'krookodile', 'sigilyph',
			'yamask', 'cofagrigus', 'garbodor', 'zorua', 'zoroark', 'gothita', 'gothorita', 'gothitelle', 'frillish',
			'jellicent', 'joltik', 'galvantula', 'elgyem', 'beheeyem', 'litwick', 'lampent', 'chandelure', 'golurk',
			'zweilous', 'hydreigon', 'volcarona', 'espurr', 'meowstic', 'honedge', 'doublade', 'aegislash', 'malamar',
			'phantump', 'trevenant', 'pumpkaboo', 'gourgeist', 'noibat', 'noivern', 'magikarp', 'farfetchd', 'machamp'
		];
		var team = [];

		for (var i = 0; i < 6; i++) {
			var mon = this.sampleNoReplace(pool);
			var template = this.getTemplate(mon);
			var set = this.randomSet(template, i, {megaCount: 1});
			set.species = mon;
			if (mon === 'magikarp') {
				set.name = 'ayy lmao';
				set.item = 'powerherb';
				set.ability = 'primordialsea';
				set.moves = ['hyperbeam', 'geomancy', 'originpulse', 'trickortreat'];
			} else {
				if (mon === 'golurk') {
					set.name = 'Spoopy Skilenton';
				} else if (mon === 'farfetchd') {
					set.name = 'Le Toucan of luck';
				} else if (mon === 'machamp') {
					set.name = 'John Cena';
				}
				set.moves[this.random(4)] = 'trickortreat';
			}
			team.push(set);
		}

		return team;
	},
	randomSeasonalHeroTeam: function () {
		let teams = [
			['Wolverine', 'Professor X', 'Cyclops', 'Nightcrawler', 'Phoenix', 'Emma Frost', 'Storm', 'Iceman'],
			['Magneto', 'Mystique', 'Quicksilver', 'Scarlet Witch', 'Blob', 'Pyro', 'Sabretooth', 'Juggernaut', 'Toad'],
			['Captain America', 'Hulk', 'Iron Man', 'Hawkeye', 'Black Widow', 'Thor', 'Nick Fury', 'Vision'],
			['Starlord', 'Gamora', 'Groot', 'Rocket Raccoon', 'Drax the Destroyer', 'Nova'],
			['Batman', 'Superman', 'Aquaman', 'Wonder Woman', 'Green Lantern', 'The Flash', 'Green Arrow', 'Firestorm'],
			['Robin', 'Starfire', 'Cyborg', 'Beast Boy', 'Raven', 'Jinx', 'Terra', 'Blue Beetle'],
			['Mr. Fantastic', 'Invisible Woman', 'Thing', 'Human Torch', 'Spiderman', 'Ant-Man'],
			['Baymax', 'Honey Lemon', 'GoGo Tomago', 'Wasabi-no-Ginger', 'Fredzilla', 'Silver Samurai', 'Sunfire'],
			['Joker', 'Deadshot', 'Harley Quinn', 'Boomerang', 'Killer Croc', 'Enchantress'],
			['Poison Ivy', 'Bane', 'Scarecrow', 'Two-Face', 'Penguin', 'Mr. Freeze', 'Catwoman']
		];
		let mons = {
			'Wolverine': {species: 'excadrill', ability: 'Regenerator', item: 'lifeorb', gender: 'M'},
			'Professor X': {species: 'beheeyem', moves: ['psystrike', 'thunderbolt', 'calmmind', 'aurasphere', 'signalbeam'], gender: 'M'},
			'Cyclops': {species: 'sigilyph', moves: ['icebeam', 'psybeam', 'signalbeam', 'chargebeam'], item: 'lifeorb',
				ability: 'tintedlens', gender: 'M'},
			'Nightcrawler': {species: 'sableye', gender: 'M'}, 'Phoenix': {species: 'Ho-oh', gender: 'F'},
			'Emma Frost': {species: 'dianciemega', gender: 'F'}, 'Storm': {species: 'tornadus', gender: 'F'},
			'Iceman': {species: 'regice', moves: ['freezedry', 'thunderbolt', 'focusblast', 'thunderwave'], gender: 'M'},
			'Magneto': {species: 'magnezone', required: 'flashcannon', gender: 'M'}, 'Quicksilver': {species: 'lucario', gender: 'M', required: 'extremespeed'}, 'Scarlet Witch': {species: 'delphox', gender: 'F'},
			'Blob': {species: 'snorlax', gender: 'M'}, 'Pyro': {species: 'magmortar', gender: 'M'}, 'Juggernaut': {species: 'conkeldurr', gender: 'M'}, 'Toad': {species: 'poliwrath', gender: 'M'},
			'Mystique': {species: 'mew', moves: ['knockoff', 'zenheadbutt', 'stormthrow', 'acrobatics', 'fakeout'], ability: 'Illusion', gender: 'F'},
			'Sabretooth': {species: 'zangoose', ability: 'Tough Claws', item: 'lifeorb',
				moves: ['swordsdance', 'quickattack', 'doubleedge', 'closecombat', 'knockoff'], gender: 'M'},
			'Captain America': {species: 'braviary', gender: 'M'}, 'Hulk': {species: 'machamp', shiny: true, gender: 'M'},
			'Iron Man': {species: 'magmortar', moves: ['fireblast', 'flashcannon', 'thunderbolt', 'energyball', 'focusblast', 'substitute'], gender: 'M'},
			'Hawkeye': {species: 'gliscor', item: 'flyinggem', moves: ['thousandarrows', 'acrobatics', 'stoneedge', 'knockoff'], ability: 'hypercutter', gender: 'M'},
			'Black Widow': {species: 'greninja', gender: 'F', shiny: true}, 'Thor': {species: 'ampharosmega', gender: (this.random(10) ? 'M' : 'F')}, 'Nick Fury': {species: 'primeape', gender: 'M'},
			'Vision': {species: 'genesectshock', shiny: true}, 'Starlord': {species: 'medicham', required: 'teeterdance', gender: 'M'},
			'Groot': {species: 'trevenant', moves: ['hornleech', 'shadowforce', 'hammerarm', 'icepunch'], item: 'assaultvest', gender: 'N'},
			'Rocket Raccoon': {species: 'linoone', gender: 'M'}, 'Gamora': {species: 'gardevoirmega', gender: 'F'},
			'Drax the Destroyer': {species: 'throh', gender: 'M'}, 'Nova': {species: 'electivire', gender: 'M'}, 'Batman': {species: 'crobat', gender: 'M'},
			'Superman': {species: 'deoxys', gender: 'M'}, 'Aquaman': {species: 'samurott', gender: 'M'}, 'Wonder Woman': {species: 'lopunnymega', gender: 'F'},
			'Green Lantern': {species: 'reuniclus', moves: ['psyshock', 'shadowball', 'aurasphere', 'recover'], gender: 'M'}, 'The Flash': {species: 'blaziken', gender: 'M'},
			'Green Arrow': {species: 'sceptilemega', moves: ['dragonpulse', 'thousandarrows', 'seedflare', 'flashcannon'], gender: 'M'},
			'Firestorm': {species: 'infernape', gender: 'M'}, 'Robin': {species: 'talonflame', gender: 'M'}, 'Starfire': {species: 'latias', gender: 'F'},
			'Cyborg': {species: 'golurk', gender: 'M'}, 'Raven': {species: 'absolmega', gender: 'F'}, 'Jinx': {species: 'mismagius', gender: 'F'},
			'Terra': {species: 'nidoqueen', gender: 'F'}, 'Blue Beetle': {species: 'heracross', gender: 'M'}, 'Beast Boy': {species: 'virizion', gender: 'M'},
			'Mr. Fantastic': {species: 'zygarde', gender: 'M'}, 'Invisible Woman': {species: 'cresselia', gender: 'F'}, 'Thing': {species: 'regirock', gender: 'M'},
			'Human Torch': {species: 'typhlosion', gender: 'M'}, 'Spiderman': {species: 'Ariados', gender: 'M'}, 'Ant-Man': {species: 'durant', gender: 'M'},
			'Baymax': {species: 'regigigas'}, 'Honey Lemon': {species: 'goodra', gender: 'F'}, 'GoGo Tomago': {species: 'heliolisk', gender: 'F'},
			'Wasabi-no-Ginger': {species: 'gallademega', gender: 'M'}, 'Fredzilla': {species: 'tyrantrum', gender: 'M'}, 'Silver Samurai': {species: 'cobalion', gender: 'M'},
			'Sunfire': {species: 'charizardmegay', gender: 'M'}, 'Joker': {species: 'mrmime', gender: 'M'}, 'Boomerang': {species: 'marowak', gender: 'M'},
			'Deadshot': {species: 'kingdra', ability: 'No Guard', item: 'scopelens', moves: ['dracometeor', 'hydropump', 'searingshot', 'aurasphere'], gender: 'M'},
			'Harley Quinn': {species: 'lopunny', gender: 'F'}, 'Killer Croc': {species: 'krookodile', gender: 'M'}, 'Enchantress': {species: 'mesprit', gender: 'F'},
			'Bane': {species: 'metagross', gender: 'M'}, 'Scarecrow': {species: 'cacturne', moves: ['gunkshot', 'seedbomb', 'knockoff', 'drainpunch'], shiny: true, gender: 'M'},
			'Penguin': {species: 'empoleon', gender: 'M'}, 'Two-Face': {species: 'zweilous', gender: 'M'}, 'Mr. Freeze': {species: 'beartic', gender: 'M'}, 'Catwoman': {species: 'persian', gender: 'F'},
			'Poison Ivy': {species: 'roserade', gender: 'F'}
		};

		if (!this.seasonal) this.seasonal = {};

		let teamDetails = {megaCount: 1, stealthRock: 0, hazardClear: 0};
		let sides = Object.keys(teams);
		let side;
		while (side === undefined || this.seasonal.side === side) {
			// You can't have both players have the same squad
			side = this.sampleNoReplace(sides);
		}
		if (this.seasonal.side === undefined) this.seasonal.side = side;

		let heroes = teams[side];
		let pokemonTeam = [];

		for (let i = 0; i < 6; i++) {
			let hero = this.sampleNoReplace(heroes);
			let heroTemplate = mons[hero];

			let template = {};
			if (heroTemplate.moves) template.randomBattleMoves = heroTemplate.moves;
			if (heroTemplate.required) template.requiredMove = heroTemplate.required;
			Object.merge(template, this.getTemplate(heroTemplate.species), false, false);

			let pokemon = this.randomSet(template, i, teamDetails);

			if (heroTemplate.ability) pokemon.ability = heroTemplate.ability;
			if (heroTemplate.gender) pokemon.gender = heroTemplate.gender;
			if (heroTemplate.item) pokemon.item = heroTemplate.item;
			pokemon.species = pokemon.name;
			pokemon.name = hero;
			pokemon.shiny = !!heroTemplate.shiny;

			pokemonTeam.push(pokemon);

			if (pokemon.ability === 'Snow Warning') teamDetails['hail'] = 1;
			if (pokemon.ability === 'Drizzle' || pokemon.moves.indexOf('raindance') >= 0) teamDetails['rain'] = 1;
			if (pokemon.moves.indexOf('stealthrock') >= 0) teamDetails.stealthRock++;
			if (pokemon.moves.indexOf('defog') >= 0 || pokemon.moves.indexOf('rapidspin') >= 0) teamDetails.hazardClear++;
		}

		return pokemonTeam;
	},
	randomFactorySets: require('./factory-sets.json'),
	randomFactorySet: function (template, slot, teamData, tier) {
		let speciesId = toId(template.species);
		// let flags = this.randomFactorySets[tier][speciesId].flags;
		let setList = this.randomFactorySets[tier][speciesId].sets;
		let effectivePool, priorityPool;

		let itemsMax = {'choicespecs':1, 'choiceband':1, 'choicescarf':1};
		let movesMax = {'rapidspin':1, 'batonpass':1, 'stealthrock':1, 'defog':1, 'spikes':1, 'toxicspikes':1};
		let requiredMoves = {'stealthrock': 'hazardSet', 'rapidspin': 'hazardClear', 'defog': 'hazardClear'};
		let weatherAbilitiesRequire = {
			'hydration': 'raindance', 'swiftswim': 'raindance',
			'leafguard': 'sunnyday', 'solarpower': 'sunnyday', 'chlorophyll': 'sunnyday',
			'sandforce': 'sandstorm', 'sandrush': 'sandstorm', 'sandveil': 'sandstorm',
			'snowcloak': 'hail'
		};
		let weatherAbilitiesSet = {'drizzle':1, 'drought':1, 'snowwarning':1, 'sandstream':1};

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		effectivePool = [];
		priorityPool = [];
		for (let i = 0, l = setList.length; i < l; i++) {
			let curSet = setList[i];
			let itemData = this.getItem(curSet.item);
			if (teamData.megaCount > 0 && itemData.megaStone) continue; // reject 2+ mega stones
			if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id]) continue;

			let abilityData = this.getAbility(curSet.ability);
			if (weatherAbilitiesRequire[abilityData.id] && teamData.weather !== weatherAbilitiesRequire[abilityData.id]) continue;
			if (teamData.weather && weatherAbilitiesSet[abilityData.id]) continue; // reject 2+ weather setters

			let reject = false;
			let hasRequiredMove = false;
			let curSetVariants = [];
			for (let j = 0, m = curSet.moves.length; j < m; j++) {
				let variantIndex = this.random(curSet.moves[j].length);
				let moveId = toId(curSet.moves[j][variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true;
					break;
				}
				if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
					hasRequiredMove = true;
				}
				curSetVariants.push(variantIndex);
			}
			if (reject) continue;
			effectivePool.push({set: curSet, moveVariants: curSetVariants});
			if (hasRequiredMove) priorityPool.push({set: curSet, moveVariants: curSetVariants});
		}
		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return false;
			for (let i = 0; i < setList.length; i++) {
				effectivePool.push({set: setList[i]});
			}
		}

		let setData = effectivePool[this.random(effectivePool.length)];
		let moves = [];
		for (let i = 0; i < setData.set.moves.length; i++) {
			let moveSlot = setData.set.moves[i];
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : moveSlot[this.random(moveSlot.length)]);
		}

		return {
			name: setData.set.name || setData.set.species,
			species: setData.set.species,
			gender: setData.set.gender || template.gender || (this.random() ? 'M' : 'F'),
			item: setData.set.item || '',
			ability: setData.set.ability || template.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? !this.random(1024) : setData.set.shiny,
			level: 100,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: setData.set.evs || {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
			ivs: setData.set.ivs || {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			nature: setData.set.nature || 'Serious',
			moves: moves
		};
	},
	randomFactoryTeam: function (side, depth) {
		if (!depth) depth = 0;
		let forceResult = (depth >= 4);

		let availableTiers = ['Uber', 'OU', 'UU', 'RU', 'NU', 'PU'];
		let chosenTier;

		let currentSeed = this.seed.slice();
		this.seed = this.startingSeed.slice();
		chosenTier = availableTiers[this.random(availableTiers.length)];
		this.seed = currentSeed;

		let pokemonLeft = 0;
		let pokemon = [];

		let pokemonPool = Object.keys(this.randomFactorySets[chosenTier]);

		let teamData = {typeCount: {}, typeComboCount: {}, baseFormes: {}, megaCount: 0, has: {}, forceResult: forceResult, weaknesses: {}, resistances: {}};
		let requiredMoveFamilies = {'hazardSet': 1, 'hazardClear':1};
		let requiredMoves = {'stealthrock': 'hazardSet', 'rapidspin': 'hazardClear', 'defog': 'hazardClear'};
		let weatherAbilitiesSet = {'drizzle': 'raindance', 'drought': 'sunnyday', 'snowwarning': 'hail', 'sandstream': 'sandstorm'};
		let resistanceAbilities = {
			'dryskin': ['Water'], 'waterabsorb': ['Water'], 'stormdrain': ['Water'],
			'flashfire': ['Fire'], 'heatproof': ['Fire'],
			'lightningrod': ['Electric'], 'motordrive': ['Electric'], 'voltabsorb': ['Electric'],
			'sapsipper': ['Grass'],
			'thickfat': ['Ice', 'Fire'],
			'levitate': ['Ground']
		};

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			let speciesFlags = this.randomFactorySets[chosenTier][template.speciesid].flags;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[template.baseSpecies]) continue;

			// Limit the number of Megas to one
			if (teamData.megaCount >= 1 && speciesFlags.megaOnly) continue;

			// Limit 2 of any type
			let types = template.types;
			let skip = false;
			for (let t = 0; t < types.length; t++) {
				if (teamData.typeCount[types[t]] > 1 && this.random(5)) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			let set = this.randomFactorySet(template, pokemon.length, teamData, chosenTier);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in teamData.typeComboCount) continue;

			// Okay, the set passes, add it to our team
			pokemon.push(set);
			pokemonLeft++;

			// Now that our Pokemon has passed all checks, we can update team data:
			for (let t = 0; t < types.length; t++) {
				if (types[t] in teamData.typeCount) {
					teamData.typeCount[types[t]]++;
				} else {
					teamData.typeCount[types[t]] = 1;
				}
			}
			teamData.typeComboCount[typeCombo] = 1;

			teamData.baseFormes[template.baseSpecies] = 1;

			let itemData = this.getItem(set.item);
			if (itemData.megaStone) teamData.megaCount++;
			if (itemData.id in teamData.has) {
				teamData.has[itemData.id]++;
			} else {
				teamData.has[itemData.id] = 1;
			}

			let abilityData = this.getAbility(set.ability);
			if (abilityData.id in weatherAbilitiesSet) {
				teamData.weather = weatherAbilitiesSet[abilityData.id];
			}

			for (let m = 0; m < set.moves.length; m++) {
				let moveId = toId(set.moves[m]);
				if (moveId in teamData.has) {
					teamData.has[moveId]++;
				} else {
					teamData.has[moveId] = 1;
				}
				if (moveId in requiredMoves) {
					teamData.has[requiredMoves[moveId]] = 1;
				}
			}

			for (let typeName in this.data.TypeChart) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityData.id] && resistanceAbilities[abilityData.id].indexOf(typeName) >= 0 || !this.getImmunity(typeName, types)) {
					// Heuristic: assume that Pokémon with these abilities don't have (too) negative typing.
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
					continue;
				}
				let typeMod = this.getEffectiveness(typeName, types);
				if (typeMod < 0) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
				} else if (typeMod > 0) {
					teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
				}
			}
		}
		if (pokemon.length < 6) return this.randomFactoryTeam(side, ++depth);

		// Quality control
		if (!teamData.forceResult) {
			for (let requiredFamily in requiredMoveFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (let type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3) return this.randomFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	},
	randomMonotypeTeam: function (side) {
		let pokemonLeft = 0;
		let pokemon = [];
		let excludedTiers = {'LC':1, 'LC Uber':1, 'NFE':1};
		let allowedNFE = {'Chansey':1, 'Doublade':1, 'Pikachu':1, 'Porygon2':1, 'Scyther':1};
		let typePool = Object.keys(this.data.TypeChart);
		let type = typePool[this.random(typePool.length)];

		let pokemonPool = [];
		for (let id in this.data.FormatsData) {
			let template = this.getTemplate(id);
			let types = template.types;
			if (template.baseSpecies === 'Castform') types = ['Normal'];
			if (template.speciesid === 'meloettapirouette') types = ['Normal', 'Psychic'];
			if (!excludedTiers[template.tier] && types.indexOf(type) >= 0 && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		let baseFormes = {};
		let uberCount = 0;
		let puCount = 0;
		let megaCount = 0;

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;

			// Not available on ORAS
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE[template.species]) continue;

			let tier = template.tier;
			switch (tier) {
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(18) >= 1) continue;
				break;
			case 'Basculin':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Gourgeist':
				if (this.random(4) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			case 'Pikachu':
				// Cosplay Pikachu formes have 20% the normal rate (1/30 the normal rate each)
				if (template.species !== 'Pikachu' && this.random(30) >= 1) continue;
			}

			let set = this.randomSet(template, pokemon.length, megaCount);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit the number of Megas to one
			let forme = template.otherFormes && this.getTemplate(template.otherFormes[0]);
			let isMegaSet = this.getItem(set.item).megaStone || (forme && forme.isMega && forme.requiredMove && set.moves.indexOf(toId(forme.requiredMove)) >= 0);
			if (isMegaSet && megaCount > 0) continue;

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			pokemonLeft++;

			// Increment Uber/NU counters
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Increment mega and base species counters
			if (isMegaSet) megaCount++;
			baseFormes[template.baseSpecies] = 1;
		}
		return pokemon;
	},
	randomFinalDestinationTeam: function (side) {
		return [{species: 'Xerneas', name: 'Fox', ability: 'Fairy Aura', item: '', evs: {hp:4, atk:252, spd:252}, nature: 'Brave', moves: ['Outrage']}];
	},
	randomSeasonalStaffTeam: function (side) {
		var team = [];
		var variant = this.random(2);
		// Hardcoded sets of the available Pokémon.
		var sets = {
			// Admins.
			'~Antar': {
				species: 'Quilava', ability: 'Turboblaze', item: 'Eviolite', gender: 'M',
				moves: ['blueflare', ['quiverdance', 'solarbeam', 'moonblast'][this.random(3)], 'sunnyday'],
				baseSignatureMove: 'spikes', signatureMove: "Firebomb",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'~chaos': {
				species: 'Bouffalant', ability: 'Fur Coat', item: 'Red Card', gender: 'M',
				moves: ['precipiceblades', ['recover', 'stockpile', 'swordsdance'][this.random(3)], 'extremespeed', 'explosion'],
				baseSignatureMove: 'embargo', signatureMove: "Forcewin",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'~haunter': {
				species: 'Landorus', ability: 'Sheer Force', item: 'Life Orb', gender: 'M',
				moves: ['hurricane', 'earthpower', 'fireblast', 'blizzard', 'thunder'],
				baseSignatureMove: 'quiverdance', signatureMove: "Genius Dance",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'~Jasmine': {
				species: 'Mew', ability: 'Speed Boost', item: 'Focus Sash', gender: 'F',
				moves: ['explosion', 'transform', 'milkdrink', 'storedpower'],
				baseSignatureMove: 'bellydrum', signatureMove: "Lockdown",
				evs: {hp:252, def:252, spd:4}, nature: 'Bold'
			},
			'~Joim': {
				species: 'Zapdos', ability: 'Download', item: 'Leftovers', gender: 'M', shiny: true,
				moves: ['thunderbolt', 'hurricane', ['earthpower', 'roost', 'flamethrower', 'worryseed', 'haze', 'spore'][this.random(6)]],
				baseSignatureMove: 'milkdrink', signatureMove: "Red Bull Drink",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'~The Immortal': {
				species: 'Blastoise', ability: 'Magic Bounce', item: 'Blastoisinite', gender: 'M', shiny: true,
				moves: ['shellsmash', 'steameruption', 'dragontail'],
				baseSignatureMove: 'sleeptalk', signatureMove: "Sleep Walk",
				evs: {hp:252, def:4, spd:252}, nature: 'Sassy'
			},
			'~V4': {
				species: 'Victini', ability: 'Desolate Land', item: (variant === 0 ? ['Life Orb', 'Charcoal', 'Leftovers'][this.random(3)] : ['Life Orb', 'Choice Scarf', 'Leftovers'][this.random(3)]), gender: 'M',
				moves: (variant === 0 ? ['thousandarrows', 'bolt strike', 'shiftgear', 'dragonascent', 'closecombat', 'substitute'] : ['thousandarrows', 'bolt strike', 'dragonascent', 'closecombat']),
				baseSignatureMove: 'vcreate', signatureMove: "V-Generate",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'~Zarel': {
				species: 'Meloetta', ability: 'Serene Grace', item: '', gender: 'F',
				moves: ['lunardance', 'fierydance', 'perishsong', 'petaldance', 'quiverdance'],
				baseSignatureMove: 'relicsong', signatureMove: "Relic Song Dance",
				evs: {hp:4, atk:252, spa:252}, nature: 'Quiet'
			},
			// Leaders.
			'&hollywood': {
				species: 'Mr. Mime', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['batonpass', ['substitute', 'milkdrink'][this.random(2)], 'encore'],
				baseSignatureMove: 'geomancy', signatureMove: "Meme Mime",
				evs: {hp:252, def:4, spe:252}, nature: 'Timid'
			},
			'&jdarden': {
				species: 'Dragonair', ability: 'Fur Coat', item: 'Eviolite', gender: 'M',
				moves: ['rest', 'sleeptalk', 'quiverdance'], name: 'jdarden',
				baseSignatureMove: 'dragontail', signatureMove: "Wyvern's Wind",
				evs: {hp:252, def:4, spd:252}, nature: 'Calm'
			},
			'&Okuu': {
				species: 'Honchkrow', ability: 'Drought', item: 'Life Orb', gender: 'F',
				moves: [['bravebird', 'sacredfire'][this.random(2)], ['suckerpunch', 'punishment'][this.random(2)], 'roost'],
				baseSignatureMove: 'firespin', signatureMove: "Blazing Star - Ten Evil Stars",
				evs: {atk:252, spa:4, spe:252}, nature: 'Quirky'
			},
			'&sirDonovan': {
				species: 'Togetic', ability: 'Gale Wings', item: 'Eviolite', gender: 'M',
				moves: ['roost', 'hurricane', 'afteryou', 'charm', 'dazzlinggleam'],
				baseSignatureMove: 'mefirst', signatureMove: "Ladies First",
				evs: {hp:252, spa:252, spe:4}, nature: 'Modest'
			},
			'&Slayer95': {
				species: 'Scizor', ability: 'Illusion', item: 'Scizorite', gender: 'M',
				moves: ['swordsdance', 'bulletpunch', 'uturn'],
				baseSignatureMove: 'allyswitch', signatureMove: "Spell Steal",
				evs: {atk:252, def:252, spd: 4}, nature: 'Brave'
			},
			'&Sweep': {
				species: 'Omastar', ability: 'Drizzle', item: ['Honey', 'Mail'][this.random(2)], gender: 'M',
				moves: ['shellsmash', 'originpulse', ['thunder', 'icebeam'][this.random(2)]],
				baseSignatureMove: 'kingsshield', signatureMove: "Sweep's Shield",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'&verbatim': {
				species: 'Archeops', ability: 'Reckless', item: 'Life Orb', gender: 'M',
				moves: ['headsmash', 'highjumpkick', 'flareblitz', 'volttackle', 'woodhammer'],
				baseSignatureMove: 'bravebird', signatureMove: "Glass Cannon",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			// Mods.
			'@Acedia': {
				species: 'Slakoth', ability: 'Magic Bounce', item: 'Quick Claw', gender: 'F',
				moves: ['metronome', 'sketch', 'assist', 'swagger', 'foulplay'],
				baseSignatureMove: 'worryseed', signatureMove: "Procrastination",
				evs: {hp:252, atk:252, def:4}, nature: 'Serious'
			},
			'@AM': {
				species: 'Tyranitar', ability: 'Adaptability', item: (variant === 1 ? 'Lum Berry' : 'Choice Scarf'), gender: 'M',
				moves: (variant === 1 ? ['earthquake', 'diamondstorm', 'swordsdance', 'meanlook'] : ['knockoff', 'diamondstorm', 'earthquake']),
				baseSignatureMove: 'pursuit', signatureMove: "Predator",
				evs: {atk:252, def:4, spe: 252}, nature: 'Jolly'
			},
			'@antemortem': {
				species: 'Clefable', ability: (variant === 1 ? 'Sheer Force' : 'Multiscale'), item: (variant === 1 ? 'Life Orb' : 'Leftovers'), gender: 'M',
				moves: ['earthpower', 'cosmicpower', 'recover', 'gigadrain'],
				baseSignatureMove: 'drainingkiss', signatureMove: "Postmortem",
				evs: {hp:252, spa:252, def:4}, nature: 'Modest'
			},
			'@Ascriptmaster': {
				species: 'Rotom', ability: 'Teravolt', item: 'Air Balloon', gender: 'M',
				moves: ['chargebeam', 'signalbeam', 'flamethrower', 'aurorabeam', 'dazzlinggleam'],
				baseSignatureMove: 'triattack', signatureMove: "Spectrum Beam",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'@asgdf': {
				species: 'Empoleon', ability: 'Filter', item: 'Rocky Helmet', gender: 'M',
				moves: ['scald', 'recover', 'calmmind', 'searingshot', 'encore'],
				baseSignatureMove: 'futuresight', signatureMove: "Obscure Pun",
				evs: {hp:252, spa:252, def:4}, nature: 'Modest'
			},
			'@Audiosurfer': {
				species: 'Audino', ability: 'Prankster', item: 'Audinite', gender: 'M',
				moves: ['boomburst', 'slackoff', 'glare'],
				baseSignatureMove: 'detect', signatureMove: "Audioshield",
				evs: {hp:252, spa:252, spe:4}, nature: 'Modest'
			},
			'@barton': {
				species: 'Piloswine', ability: 'Parental Bond', item: 'Eviolite', gender: 'M',
				moves: ['earthquake', 'iciclecrash', 'taunt'],
				baseSignatureMove: 'bulkup', signatureMove: "MDMA Huff",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'@bean': {
				species: 'Liepard', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['knockoff', 'encore', 'substitute', 'gastroacid', 'leechseed'],
				baseSignatureMove: 'glare', signatureMove: "Coin Toss",
				evs: {hp:252, def:252, spd:4}, nature: 'Calm'
			},
			'@Beowulf': {
				species: 'Beedrill', ability: 'Download', item: 'Beedrillite', gender: 'M',
				moves: ['spikyshield', 'gunkshot', ['sacredfire', 'boltstrike', 'diamondstorm'][this.random(3)]],
				baseSignatureMove: 'bugbuzz', signatureMove: "Buzzing of the Swarm",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'@BiGGiE': {
				species: 'Snorlax', ability: 'Fur Coat', item: 'Leftovers', gender: 'M',
				moves: ['drainpunch', 'diamondstorm', 'kingsshield', 'knockoff', 'precipiceblades'],
				baseSignatureMove: 'dragontail', signatureMove: "Food Rush",
				evs: {hp:4, atk:252, spd:252}, nature: 'Adamant'
			},
			'@Blitzamirin': {
				species: 'Chandelure', ability: 'Prankster', item: 'Red Card', gender: 'M',
				moves: ['heartswap', ['darkvoid', 'substitute'][this.random(2)], ['shadowball', 'blueflare'][this.random(2)]],
				baseSignatureMove: 'oblivionwing', signatureMove: "Pneuma Relinquish",
				evs: {def:4, spa:252, spe:252}, nature: 'Timid'
			},
			'@CoolStoryBrobat': {
				species: 'Crobat', ability: 'Gale Wings', item: 'Black Glasses', gender: 'M',
				moves: ['knockoff', 'bulkup', 'roost', 'closecombat', 'defog'],
				baseSignatureMove: 'bravebird', signatureMove: "Brave Bat",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'@Dell': {
				species: 'Lucario', ability: 'Simple', item: 'Lucarionite', gender: 'M',
				moves: ['jumpkick', ['flashcannon', 'bulletpunch'][this.random(2)], 'batonpass'],
				baseSignatureMove: 'detect', signatureMove: "Aura Parry",
				evs: {hp:4, atk:216, spa:36, spe:252}, nature: 'Naive'
			},
			'@Eevee General': {
				species: 'Eevee', ability: 'Magic Guard', item: 'Eviolite', gender: 'M',
				moves: ['shiftgear', 'healorder', 'crunch', 'sacredsword', 'doubleedge'],
				baseSignatureMove: 'quickattack', signatureMove: "War Crimes",
				evs: {hp:252, atk:252, def:4}, nature: 'Impish'
			},
			'@Electrolyte': {
				species: 'Elekid', ability: 'Pure Power', item: 'Life Orb', gender: 'M',
				moves: ['volttackle', 'earthquake', ['iciclecrash', 'diamondstorm'][this.random(2)]],
				baseSignatureMove: 'entrainment', signatureMove: "Study",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant'
			},
			'@Enguarde': {
				species: 'Gallade', ability: ['Intimidate', 'Hyper Cutter'][this.random(2)], item: 'Galladite', gender: 'M',
				moves: ['psychocut', 'sacredsword', ['nightslash', 'precipiceblades', 'leafblade'][this.random(3)]],
				baseSignatureMove: 'fakeout', signatureMove: "Ready Stance",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'@Eos': {
				species: 'Drifblim', ability: 'Fur Coat', item: 'Assault Vest', gender: 'M',
				moves: ['oblivionwing', 'paraboliccharge', 'gigadrain', 'drainingkiss'],
				baseSignatureMove: 'shadowball', signatureMove: "Shadow Curse",	//placeholder
				evs: {hp:248, spa:252, spd:8}, nature: 'Modest'
			},
			'@Former Hope': {
				species: 'Froslass', ability: 'Prankster', item: 'Focus Sash', gender: 'M',
				moves: [['icebeam', 'shadowball'][this.random(2)], 'destinybond', 'thunderwave'],
				baseSignatureMove: 'roleplay', signatureMove: "Role Play",
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'@Genesect': {
				species: 'Genesect', ability: 'Mold Breaker', item: 'Life Orb', gender: 'M',
				moves: ['bugbuzz', 'closecombat', 'extremespeed', 'thunderbolt', 'uturn'],
				baseSignatureMove: 'geargrind', signatureMove: "Grind you're mum",
				evs: {atk:252, spa:252, spe:4}, nature: 'Quiet'
			},
			'@Hippopotas': {
				species: 'Hippopotas', ability: 'Regenerator', item: 'Eviolite', gender: 'M',
				moves: ['haze', 'stealthrock', 'spikes', 'toxicspikes', 'stickyweb'],
				baseSignatureMove: 'partingshot', signatureMove: "Hazard Pass",
				evs: {hp:252, def:252, spd:4}, ivs: {atk:0, spa:0}, nature: 'Bold'
			},
			'@HYDRO IMPACT': {
				species: 'Charizard', ability: 'Rivalry', item: 'Life Orb', gender: 'M',
				moves: ['airslash', 'flamethrower', 'nobleroar', 'hydropump'],
				baseSignatureMove: 'hydrocannon', signatureMove: "HYDRO IMPACT",
				evs: {atk:4, spa:252, spe:252}, nature: 'Hasty'
			},
			'@innovamania': {
				species: 'Arceus', ability: 'Pick Up', item: 'Black Glasses', gender: 'M',
				moves: [['holdhands', 'trickortreat'][this.random(2)], ['swordsdance', 'agility'][this.random(2)], 'celebrate'],
				baseSignatureMove: 'splash', signatureMove: "Rage Quit",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'@jas61292': {
				species: 'Malaconda', ability: 'Analytic', item: 'Safety Goggles', gender: 'M',
				moves: ['coil', 'thunderwave', 'icefang', 'powerwhip', 'moonlight'],
				baseSignatureMove: 'crunch', signatureMove: "Minus One",
				evs: {hp:252, atk:252, spd:4}, nature: 'Adamant'
			},
			'@jin of the gale': {
				species: 'Starmie', ability: 'Drizzle', item: 'Damp Rock', gender: 'M',
				moves: ['steameruption', 'hurricane', 'recover', 'psystrike', 'quiverdance'],
				baseSignatureMove: 'rapidspin', signatureMove: "Beyblade",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'@Kostitsyn-Kun': {
				species: 'Gothorita', ability: 'Simple', item: 'Eviolite', gender: 'F', //requested
				moves: ['calmmind', 'psyshock', ['dazzlinggleam', 'secretsword'][this.random(2)]],
				baseSignatureMove: 'refresh', signatureMove: "Kawaii-desu uguu~",
				evs: {hp:252, def:136, spe:120}, nature: 'Bold'
			},
			'@kupo': {
				species: 'Pikachu', ability: 'Prankster', item: "Light Ball", gender: 'M',
				moves: ['substitute', 'spore', 'encore'],
				baseSignatureMove: 'transform', signatureMove: "Kupo Nuts",
				evs: {hp:252, def:4, spd:252}, nature: 'Jolly'
			},
			'@Lawrence III': {
				species: 'Lugia', ability: 'Trace', item: "Grip Claw", gender: 'M',
				moves: ['infestation', 'magmastorm', 'oblivionwing'],
				baseSignatureMove: 'gust', signatureMove: "Shadow Storm",
				evs: {hp:248, def:84, spa:92, spd:84}, nature: 'Modest'
			},
			'@Layell': {
				species: 'Sneasel', ability: 'Technician', item: "King's Rock", gender: 'M',
				moves: ['iceshard', 'iciclespear', ['machpunch', 'pursuit', 'knockoff'][this.random(3)]],
				baseSignatureMove: 'protect', signatureMove: "Pixel Protection",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'@LegitimateUsername': {
				species: 'Shuckle', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['leechseed', 'rest', 'foulplay'],
				baseSignatureMove: 'shellsmash', signatureMove: "Shell Fortress",
				evs: {hp:252, def:228, spd:28}, nature: 'Calm'
			},
			'@Level 51': {
				species: 'Togekiss', ability: 'Parental Bond', item: 'Leftovers', gender: 'M',
				moves: ['seismictoss', 'roost', ['cosmicpower', 'cottonguard'][this.random(2)]],
				baseSignatureMove: 'trumpcard', signatureMove: "Next Level Strats",
				evs: {hp:252, def:4, spd:252}, nature: 'Calm'
			},
			'@Lyto': {
				species: 'Lanturn', ability: 'Magic Bounce', item: 'Leftovers', gender: 'M',
				moves: ['originpulse', 'lightofruin', 'blueflare', 'recover', 'tailglow'],
				baseSignatureMove: 'thundershock', signatureMove: "Gravity Storm",
				evs: {hp:188, spa:252, spe:68}, nature: 'Modest'
			},
			'@Marty': {
				species: 'Houndoom', ability: 'Drought', item: 'Houndoominite', gender: 'M',
				moves: ['nightdaze', 'solarbeam', 'aurasphere', 'thunderbolt', 'earthpower'],
				baseSignatureMove: 'sacredfire', signatureMove: "Immolate",
				evs: {spa:252, spd:4, spe:252}, ivs: {atk:0}, nature: 'Timid'
			},
			'@Morfent': {
				species: 'Dusknoir', ability: 'Fur Coat', item: "Leftovers", gender: 'M',
				moves: [['recover', 'acidarmor', 'swordsdance', 'willowisp', 'trickroom'][this.random(5)], 'shadowclaw', ['earthquake', 'icepunch', 'thunderpunch'][this.random(3)]],
				baseSignatureMove: 'spikes', signatureMove: "Used Needles",
				evs: {hp:252, atk:4, def:252}, ivs: {spe:0}, nature: 'Impish'
			},
			'@Nani Man': {
				species: 'Gengar', ability: 'Desolate Land', item: 'Black Glasses', gender: 'M', shiny: true,
				moves: ['eruption', 'swagger', 'shadow ball', 'topsyturvy', 'dazzlinggleam'],
				baseSignatureMove: 'fireblast', signatureMove: "Tanned",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'@NixHex': {
				species: 'Porygon2', ability: 'No Guard', item: 'Eviolite', gender: 'M', shiny: true,
				moves: ['thunder', 'blizzard', 'overheat', 'triattack', 'recover'],
				baseSignatureMove: 'inferno', signatureMove: "Beautiful Disaster",
				evs: {hp:252, spa:252, spe:4}, nature: 'Modest'
			},
			'@Osiris': {
				species: 'Pumpkaboo-Super', ability: 'Bad Dreams', item: 'Eviolite', gender: 'M',
				moves: ['leechseed', 'recover', 'cosmicpower'],
				baseSignatureMove: 'hypnosis', signatureMove: "Restless Sleep",
				evs: {hp:252, def:216, spd:40}, ivs: {atk:0}, nature: 'bold'
			},
			'@phil': {
				species: 'Gastrodon', ability: 'Drizzle', item: 'Shell Bell', gender: 'M',
				moves: ['scald', 'recover', 'gastroacid', 'brine'],
				baseSignatureMove: 'whirlpool', signatureMove: "Slug Attack",
				evs: {hp:252, spa:252, def:4}, nature: 'Quirky'
			},
			'@qtrx': {
				species: 'Unown', ability: 'Levitate', item: 'Focus Sash', gender: 'M',
				moves: [],
				baseSignatureMove: 'meditate', signatureMove: "Hidden Power... Normal?",
				evs: {hp:252, def:4, spa:252}, ivs: {atk:0, spe:0}, nature: 'Quiet'
			},
			'@Queez': {
				species: 'Cubchoo', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['pound', 'fly', 'softboiled', 'thunderwave', 'waterpulse'],
				baseSignatureMove: 'leer', signatureMove: "Sneeze",
				evs: {hp:252, def:228, spd:28}, nature: 'Calm'
			},
			'@rekeri': {
				species: 'Tyrantrum', ability: 'Tough Claws', item: 'Life Orb', gender: 'M',
				moves: ['outrage', 'extremespeed', 'stoneedge', 'closecombat'],
				baseSignatureMove: 'headcharge', signatureMove: "Land Before Time",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'@Relados': {
				species: 'Terrakion', ability: 'Guts', item: 'Flame Orb', gender: 'M',
				moves: ['knockoff', 'diamondstorm', 'closecombat', 'iceshard', 'drainpunch'],
				baseSignatureMove: 'stockpile', signatureMove: "Loyalty",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant'
			},
			'@Reverb': {
				species: 'Slaking', ability: 'Scrappy', item: 'Assault Vest', gender: 'M',
				moves: ['feint', 'stormthrow', 'blazekick'], // Feint as a countermeasure to the abundance of Protect-based set-up moves.
				baseSignatureMove: 'eggbomb', signatureMove: "fat monkey",
				evs: {hp:252, spd:40, spe:216}, nature: 'Jolly' // EV-nerf.
			},
			'@RosieTheVenusaur': {
				species: 'Venusaur', ability: 'Moxie', item: 'Leftovers', gender: 'F',
				moves: ['flamethrower', 'extremespeed', 'sacredfire', 'knockoff', 'closecombat'],
				baseSignatureMove: 'frenzyplant', signatureMove: "Swag Plant",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'@scalarmotion': {
				species: 'Cryogonal', ability: 'Magic Guard', item: 'Focus Sash', gender: 'M',
				moves: ['rapidspin', 'willowisp', 'taunt', 'recover', 'voltswitch'],
				baseSignatureMove: 'icebeam', signatureMove: "Eroding Frost",
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid'
			},
			'@Scotteh': {
				species: 'Suicune', ability: 'Fur Coat', item: 'Leftovers', gender: 'M',
				moves: ['icebeam', 'steameruption', 'recover', 'nastyplot'],
				baseSignatureMove: 'boomburst', signatureMove: "Geomagnetic Storm",
				evs: {def:252, spa:4, spe:252}, nature: 'Bold'
			},
			'@Shame That': {
				species: 'Weavile', ability: 'Magic Guard', item: 'Focus Sash', gender: 'M',
				moves: ['substitute', 'captivate', 'reflect', 'rest', 'raindance', 'foresight'],
				baseSignatureMove: 'healingwish', signatureMove: "Extreme Compromise",
				evs: {hp:252, def:4, spe:252}, nature: 'Jolly'
			},
			'@shrang': {
				species: 'Latias', ability: 'Pixilate', item: ['Latiasite', 'Life Orb', 'Leftovers'][this.random(3)], gender: 'M',
				moves: ['dracometeor', 'roost', 'nastyplot', 'fireblast', 'aurasphere', 'psystrike'], //not QD again senpai >.<
				baseSignatureMove: 'judgment', signatureMove: "Pixilate",	//placeholder
				evs: {hp:160, spa:96, spe:252}, ivs: {atk:0}, nature: 'Timid'
			},
			'@Skitty': {
				species: 'Audino', ability: 'Intimidate', item: 'Audinite', gender: 'M',
				moves: ['acupressure', 'recover', ['taunt', 'cosmicpower', 'magiccoat'][this.random(3)]],
				baseSignatureMove: 'storedpower', signatureMove: "Ultimate Dismissal",
				evs: {hp:252, def:252, spd:4}, nature: 'Bold'
			},
			'@Snowflakes': {
				species: 'Celebi', ability: 'Filter', item: 'Leftovers', gender: 'M',
				moves: [
					['gigadrain', ['recover', 'quiverdance'][this.random(2)], ['icebeam', 'searingshot', 'psystrike', 'thunderbolt', 'aurasphere', 'moonblast'][this.random(6)]],
					['gigadrain', 'recover', [['uturn', 'voltswitch'][this.random(2)], 'thunderwave', 'leechseed', 'healbell', 'healingwish', 'reflect', 'lightscreen', 'stealthrock'][this.random(8)]],
					['gigadrain', 'perishsong', ['recover', ['uturn', 'voltswitch'][this.random(2)], 'leechseed', 'thunderwave', 'healbell'][this.random(5)]],
					['gigadrain', 'recover', ['thunderwave', 'icebeam', ['uturn', 'voltswitch'][this.random(2)], 'psystrike'][this.random(4)]]
				][this.random(4)],
				baseSignatureMove: 'thousandarrows', signatureMove: "Azalea Butt Slam",
				evs: {hp:252, spa:252, def:4}, nature: 'Modest'
			},
			'@Spydreigon': {
				species: 'Hydreigon', ability: 'Mega Launcher', item: 'Life Orb', gender: 'M',
				moves: ['dragonpulse', 'darkpulse', 'aurasphere', 'originpulse', 'shiftgear'],
				baseSignatureMove: 'waterpulse', signatureMove: "Mineral Pulse",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'@Steamroll': {
				species: 'Growlithe', ability: 'Adaptability', item: 'Life Orb', gender: 'M',
				moves: ['flareblitz', 'volttackle', 'closecombat'],
				baseSignatureMove: 'protect', signatureMove: "Conflagration",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant'
			},
			'@SteelEdges': {
				species: 'Alakazam', ability: 'Competitive', item: 'Alakazite', gender: 'M',
				moves: ['bugbuzz', 'hypervoice', 'psystrike', 'batonpass', 'focusblast'],
				baseSignatureMove: 'tailglow', signatureMove: "True Daily Double",
				evs: {hp:4, spa:252, spe:252}, nature: 'Serious'
			},
			'@Temporaryanonymous': {
				species: 'Doublade', ability: 'Tough Claws', item: 'Eviolite', gender: 'M',
				moves: ['swordsdance', ['xscissor', 'sacredsword', 'knockoff'][this.random(3)], 'geargrind'],
				baseSignatureMove: 'shadowsneak', signatureMove: "SPOOPY EDGE CUT",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'@Test2017': {
				species: "Farfetch'd", ability: 'Wonder Guard', item: 'Stick', gender: 'M',
				moves: ['foresight', 'gastroacid', 'nightslash', 'roost', 'thousandarrows'],
				baseSignatureMove: 'karatechop', signatureMove: "Ducktastic",
				evs: {hp:252, atk:252, spe:4}, nature: 'Adamant'
			},
			'@TFC': {
				species: 'Blastoise', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['quiverdance', 'cottonguard', 'storedpower', 'aurasphere', 'slackoff'],
				baseSignatureMove: 'drainpunch', signatureMove: "Chat Flood",
				evs: {atk:252, def:4, spe:252}, nature: 'Modest'
			},
			'@TGMD': {
				species: 'Stoutland', ability: 'Speed Boost', item: 'Life Orb', gender: 'M',
				moves: [['extremespeed', 'sacredsword'][this.random(2)], 'knockoff', 'protect'],
				baseSignatureMove: 'return', signatureMove: "Canine Carnage",
				evs: {hp:32, atk:252, spe:224}, nature: 'Adamant'
			},
			'@Timbuktu': {
				species: 'Heatmor', ability: 'Contrary', item: 'Life Orb', gender: 'M',
				moves: ['overheat', ['hammerarm', 'substitute'][this.random(2)], ['glaciate', 'thunderbolt'][this.random(2)]], // Curse didn't make sense at all so it was changed to Hammer Arm
				baseSignatureMove: 'rockthrow', signatureMove: "Geoblast",
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid'
			},
			'@Trickster': {
				species: 'Whimsicott', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['swagger', 'spore', 'seedflare', 'recover', 'nastyplot'],
				baseSignatureMove: 'naturepower', signatureMove: "Cometstorm",
				evs: {hp:252, spa:252, spe:4}
			},
			'@trinitrotoluene': {
				species: 'Metagross', ability: 'Levitate', item: 'Metagrossite', gender: 'M',
				moves: ['meteormash', 'zenheadbutt', 'hammerarm', 'grassknot', 'earthquake', 'thunderpunch', 'icepunch', 'shiftgear'],
				baseSignatureMove: 'explosion', signatureMove: "Get Haxed",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			'@WaterBomb': {
				species: 'Poliwrath', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['heartswap', 'softboiled', 'aromatherapy', 'highjumpkick'],
				baseSignatureMove: 'waterfall', signatureMove: "Water Bomb",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'@xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				baseSignatureMove: 'metronome', signatureMove: "(Super Glitch)",
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'@zdrup': {
				species: 'Slowking', ability: 'Slow Start', item: 'Leftovers', gender: 'M',
				moves: ['psystrike', 'futuresight', 'originpulse', 'slackoff', 'destinybond'],
				baseSignatureMove: 'wish', signatureMove: "Premonition",
				evs: {hp:252, def:4, spd:252}, nature: 'Quiet'
			},
			'@Zebraiken': {
				species: 'zebstrika', ability: 'Compound Eyes', item: 'Life Orb', gender: 'M',
				moves: ['thunder', ['fire blast', 'focusblast', 'highjumpkick', 'meteormash'][this.random(3)], ['blizzard', 'iciclecrash', 'sleeppowder'][this.random(3)]], // why on earth does he learn Meteor Mash?
				baseSignatureMove: 'detect', signatureMove: "bzzt",
				evs: {atk:4, spa:252, spe:252}, nature: 'Hasty'
			},
			// Drivers.
			'%Aelita': {
				species: 'Porygon-Z', ability: 'Protean', item: 'Life Orb', gender: 'F',
				moves: ['boomburst', 'quiverdance', 'chatter', 'blizzard', 'moonblast'],
				baseSignatureMove: 'thunder', signatureMove: "Energy Field",
				evs: {hp:4, spa:252, spd:252}, nature: 'Modest'
			},
			'%Arcticblast': {
				species: 'Cresselia', ability: 'Levitate', item: 'Sitrus Berry', gender: 'M',
				moves: [
					['fakeout', 'icywind', 'trickroom', 'safeguard', 'thunderwave', 'tailwind', 'knockoff'][this.random(7)],
					['sunnyday', 'moonlight', 'calmmind', 'protect', 'taunt'][this.random(5)],
					['originpulse', 'heatwave', 'hypervoice', 'icebeam', 'moonblast'][this.random(5)]
				],
				baseSignatureMove: 'psychoboost', signatureMove: "Doubles Purism",
				evs: {hp:252, def:120, spa:56, spd:80}, nature: 'Sassy'
			},
			'%Articuno': {
				species: 'Articuno', ability: 'Magic Guard', item: 'Sitrus Berry', gender: 'F',
				moves: ['roost', 'calmmind', ['psychic', 'airslash', 'icebeam', 'thunderwave'][this.random(4)]],
				baseSignatureMove: 'whirlwind', signatureMove: "True Support",
				evs: {hp:252, def:192, spa:64}, nature: 'Modest'
			},
			'%Ast☆arA': {
				species: 'Jirachi', ability: 'Cursed Body', item: ['Leftovers', 'Sitrus Berry'][this.random(2)], gender: 'F',
				moves: ['psychic', 'moonblast', 'nastyplot', 'recover', 'surf'],
				baseSignatureMove: 'psywave', signatureMove: "Star Bolt Desperation",
				evs: {hp:4, spa:252, spd:252}, nature: 'Modest'
			},
			'%Asty': {
				species: 'Seismitoad', ability: 'Sap Sipper', item: 'Red Card', gender: 'M',
				moves: ['earthquake', 'recover', 'icepunch'],
				baseSignatureMove: 'toxic', signatureMove: "Amphibian Toxin",
				evs: {atk:252, spd:252, spe:4}, nature: 'Adamant'
			},
			'%Birkal': {
				species: 'Rotom-Fan', ability: 'Magic Guard', item: 'Choice Scarf', gender: 'M',
				moves: ['trick', 'aeroblast', ['discharge', 'partingshot', 'recover', 'tailglow'][this.random(4)]],
				baseSignatureMove: 'quickattack', signatureMove: "Caw",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'%bloobblob': {
				species: 'Cinccino', ability: 'Skill Link', item: 'Life Orb', gender: 'M',
				moves: ['bulletseed', 'rockblast', 'uturn', 'tailslap', 'knockoff'],
				baseSignatureMove: 'spikecannon', signatureMove: "Lava Whip",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant'
			},
			'%Bumbadadabum': {
				species: 'Samurott', ability: 'Analytic', item: 'Safety Goggles', gender: 'M',
				moves: ['calmmind', 'originpulse', 'icebeam'],
				baseSignatureMove: 'hypervoice', signatureMove: "Open Source Software",
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'%Charles Carmichael': {
				species: 'Quagsire', ability: 'Sap Sipper', item: 'Liechi Berry', gender: 'M',
				moves: ['waterfall', 'earthquake', ['stoneedge', 'rockslide'][this.random(2)], 'icepunch'],
				baseSignatureMove: 'swagger', signatureMove: "Bad Pun",
				evs: {hp:248, atk:252, spe:8}, nature: 'Naughty'
			},
			'%Crestfall': {
				species: 'Darkrai', ability: 'Parental Bond', item: 'Lum Berry', gender: 'M',
				moves: ['darkpulse', 'icebeam', 'oblivionwing'],
				baseSignatureMove: 'protect', signatureMove: "Final Hour",
				evs: {spa:252, def:4, spe:252}, nature: 'Modest'
			},
			'%DTC': {
				species: 'Charizard', ability: 'Magic Guard', item: 'Charizardite X', gender: 'M',
				moves: ['shiftgear', 'blazekick', 'roost'],
				baseSignatureMove: 'dragonrush', signatureMove: "Dragon Smash",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'%Feliburn': {
				species: 'Infernape', ability: 'Adaptability', item: 'Expert Belt', gender: 'M',
				moves: ['highjumpkick', 'sacredfire', 'taunt', 'fusionbolt', 'machpunch'],
				baseSignatureMove: 'firepunch', signatureMove: "Falcon Punch",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			'%galbia': {
				species: 'Cobalion', ability: 'Serene Grace', item: 'Leftovers',
				moves: ['ironhead', 'taunt', 'swordsdance', 'thunderwave', 'substitute'],
				baseSignatureMove: 'highjumpkick', signatureMove: "Kibitz",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			'%Hugendugen': {
				species: 'Latios', ability: 'Prankster', item: 'Life Orb', gender: 'M',
				moves: ['taunt', 'dracometeor', 'surf', 'earthpower', 'recover', 'thunderbolt', 'icebeam'],
				baseSignatureMove: 'psychup', signatureMove: "Policy Decision",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'%Jellicent': {
				species: 'Jellicent', ability: 'Poison Heal', item: 'Toxic Orb', gender: 'M',
				moves: ['recover', 'freezedry', 'trick', 'substitute'],
				baseSignatureMove: 'surf', signatureMove: "Shot For Shot",
				evs: {hp:252, def:4, spd:252}, nature: 'Calm'
			},
			'%Kayo': {
				species: 'Gourgeist-Super', ability: 'Magic Bounce', item: 'Leftovers', gender: 'M', shiny: true,
				moves: ['leechseed', 'shadowforce', 'spore', 'recover'],
				baseSignatureMove: 'vinewhip', signatureMove: "Beard of Zeus Bomb",
				evs: {hp:252, def:252, spd:4}, nature: 'Impish'
			},
			'%LJDarkrai': {
				species: 'Garchomp', ability: 'Compound Eyes', item: 'Life Orb', gender: 'M',
				moves: ['dragondance', 'dragonrush', 'gunkshot', 'precipiceblades', 'sleeppowder', 'stoneedge'], name: '%LJDarkrai',
				baseSignatureMove: 'blazekick', signatureMove: "Blaze Blade",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'%Majorbling': {
				species: 'Dedenne', ability: 'Levitate', item: 'Expert Belt', gender: 'M',
				moves: ['moonblast', 'voltswitch', 'discharge', 'focusblast', 'taunt'],
				baseSignatureMove: 'bulletpunch', signatureMove: "Focus Laser",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'%QuoteCS': {
				species: 'Skarmory', ability: 'Adaptability', item: 'Life Orb', gender: 'M',
				moves: ['meteormash', 'bravebird', 'roost'],
				baseSignatureMove: 'spikes', signatureMove: "Diversify",
				evs: {hp:248, atk:252, spe:8}, nature: 'Adamant'
			},
			'%raseri': {
				species: 'Prinplup', ability: 'Regenerator', item: 'Eviolite', gender: 'M',
				moves: ['defog', 'stealthrock', 'toxic', 'roar', 'bravebird'],
				baseSignatureMove: 'scald', signatureMove: "Ban Scald",
				evs: {hp:252, def:228, spd:28}, nature: 'Bold'
			},
			'%uselesstrainer': {
				species: 'Scatterbug', ability: 'Skill Link', item: 'Mail', gender: 'M',
				moves: ['explosion', 'stringshot', 'stickyweb', 'spiderweb', 'mist'],
				baseSignatureMove: 'bulletpunch', signatureMove: "Ranting",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			'%Vacate': {
				species: 'Bibarel', ability: 'Adaptability', item: 'Leftovers', gender: 'M',
				moves: ['earthquake', 'smellingsalts', 'stockpile', 'zenheadbutt', 'waterfall'],
				baseSignatureMove: 'superfang', signatureMove: "Duper Fang",
				evs: {atk:252, def:4, spd:252}, nature: 'Quiet'
			},
			// Voices.
			'+Aldaron': {
				species: 'Conkeldurr', ability: 'Speed Boost', item: 'Assault Vest', gender: 'M',
				moves: ['drainpunch', 'machpunch', 'iciclecrash', 'closecombat', 'earthquake', 'shadowclaw'],
				baseSignatureMove: 'superpower', signatureMove: "Admin Decision",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'+bmelts': {
				species: 'Mewtwo', ability: 'Regenerator', item: 'Mewtwonite X', gender: 'M',
				moves: ['batonpass', 'uturn', 'voltswitch'],
				baseSignatureMove: 'partingshot', signatureMove: "Aaaannnd... he's gone",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'+Cathy': {
				species: 'Aegislash', ability: 'Stance Change', item: 'Life Orb', gender: 'F',
				moves: ['kingsshield', 'shadowsneak', ['calmmind', 'shadowball', 'shadowclaw', 'flashcannon', 'dragontail', 'hyperbeam'][this.random(5)]],
				baseSignatureMove: 'memento', signatureMove: "HP Display Policy",
				evs: {hp:4, atk:252, spa:252}, nature: 'Quiet'
			},
			'+Diatom': {
				species: 'Spiritomb', ability: 'Parental Bond', item: 'Custap Berry', gender: 'M',
				moves: ['psywave', ['poisonfang', 'shadowstrike'][this.random(2)], ['uturn', 'rapidspin'][this.random(2)]],
				baseSignatureMove: 'healingwish', signatureMove: "Be Thankful I Sacrificed Myself",
				evs: {hp:252, def:136, spd:120}, nature: 'Impish'
			},
			'+Limi': {
				species: 'Primeape', ability: 'Poison Heal', item: 'Leftovers', gender: 'M',
				moves: ['ingrain', 'doubleedge', 'leechseed'],
				baseSignatureMove: 'growl', signatureMove: "Resilience",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'+MattL': {
				species: 'Mandibuzz', ability: 'Poison Heal', item: 'Leftovers', gender: 'M',
				moves: ['oblivionwing', 'leechseed', 'quiverdance', 'topsyturvy', 'substitute'],
				baseSignatureMove: 'toxic', signatureMove: "Topology",
				evs: {hp:252, def:252, spd:4}, nature: 'Bold'
			},
			'+mikel': {
				species: 'Giratina', ability: 'Prankster', item: 'Lum Berry', gender: 'M',
				moves: ['rest', 'recycle', ['toxic', 'willowisp'][this.random(2)]],
				baseSignatureMove: 'swagger', signatureMove: "Trolling Lobby",
				evs: {hp:252, def:128, spd:128}, ivs: {atk:0}, nature: 'Calm'
			},
			'+Great Sage': {
				species: 'Shuckle', ability: 'Harvest', item: 'Leppa Berry', gender: '',
				moves: ['substitute', 'protect', 'batonpass'],
				baseSignatureMove: 'judgment', signatureMove: "Judgment",
				evs: {hp:252, def:28, spd:228}, ivs: {atk:0, def:0, spe:0}, nature: 'Bold'
			},
			'+Redew': {
				species: 'Minun', ability: 'Wonder Guard', item: 'Air Balloon', gender: 'M',
				moves: ['nastyplot', 'thunderbolt', 'icebeam'],
				baseSignatureMove: 'recover', signatureMove: "Recover",
				evs:{hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'+shaymin': {
				species: 'Shaymin-Sky', ability: 'Serene Grace', item: 'Expert Belt', gender: 'F',
				moves: ['seedflare', 'airslash', ['secretsword', 'earthpower', 'roost'][this.random(3)]],
				baseSignatureMove: 'detect', signatureMove: "Flower Garden",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'+SOMALIA': {
				species: 'Gastrodon', ability: 'Anger Point', item: 'Leftovers', gender: 'M',
				moves: ['recover', 'steameruption', 'earthpower', 'leafstorm', 'substitute'],
				baseSignatureMove: 'energyball', signatureMove: "Ban Everyone",
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'+TalkTakesTime': {
				species: 'Registeel', ability: 'Flash Fire', item: 'Leftovers', gender: 'M',
				moves: ['recover', 'ironhead', 'bellydrum'],
				baseSignatureMove: 'taunt', signatureMove: "Bot Mute",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			}
		};
		// Generate the team randomly.
		var pool = Object.keys(sets).randomize();
		var ranks = {'~':'admins', '&':'leaders', '@':'mods', '%':'drivers', '+':'voices'};
		var levels = {'~':99, '&':97, '@':96, '%':96, '+':95};
		for (var i = 0; i < 6; i++) {
			var rank = pool[i].charAt(0);
			var set = sets[pool[i]];
			set.level = levels[rank];
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.baseSignatureMove);
			team.push(set);
		}

		// Check for Illusion.
		if (team[5].name === '&Slayer95') {
			var temp = team[4];
			team[4] = team[5];
			team[5] = temp;
		}

		return team;
	},
	randomMrBonesWildRideTeam: function (mySides) {
		return [
			{species: 'Slowbro', name: 'Funbro #1', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']},
			{species: 'Slowbro', name: 'Funbro #2', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']},
			{species: 'Slowbro', name: 'Funbro #3', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']},
			{species: 'Slowbro', name: 'Funbro #4', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']},
			{species: 'Slowbro', name: 'Funbro #5', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']},
			{species: 'Slowbro', name: 'Funbro #6', ability: 'Harvest', item: 'Leppa Berry', evs: {hp:252, def:128, spd:128}, nature: 'Bold', moves: ['healpulse', 'slackoff', 'recycle', 'block']}
		];
	}
};
