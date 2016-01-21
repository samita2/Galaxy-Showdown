'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3553516/\">OU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew']
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: []
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557948/\">np: UU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541343/\">UU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought']
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557997/\">np: RU Stage 13</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538036/\">RU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2']
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557854/\">np: NU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545276/\">NU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3']
	},
	{
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560703/\">np: PU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter']
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>"
		],
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger']
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal']
	},
	{
		name: "CAP Crucibelle Playtest",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Allow CAP', 'Uber', 'Shadow Tag', 'Soul Dew',
			'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom',
			'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Volkraken', 'Plasmanta', 'Naviathan',
		],
	},
	{
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>"
		],
		section: "ORAS Singles",

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545903/\">np: Doubles OU Stage 3</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore',
		],
	},
	{
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void'],
	},
	{
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Aegislash', 'Amoonguss', 'Arcanine', 'Azumarill', 'Bisharp', 'Breloom', 'Chandelure', 'Charizard-Mega-Y', 'Charizardite Y',
			'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir-Mega', 'Gardevoirite',
			'Gengar', 'Greninja', 'Gyarados', 'Heatran', 'Hoopa-Unbound', 'Hydreigon', 'Jellicent', 'Jirachi', 'Kangaskhan-Mega', 'Kangaskhanite',
			'Keldeo', 'Kyurem-Black', 'Landorus', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mawile-Mega', 'Mawilite', 'Metagross-Mega', 'Metagrossite',
			'Mew', 'Milotic', 'Politoed', 'Rotom-Wash', 'Sableye', 'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon',
			'Talonflame', 'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcarona', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Abomasnow-Mega', 'Abomasite', 'Aerodactyl-Mega', 'Aerodactylite', 'Ambipom', 'Ampharos-Mega', 'Ampharosite',
			'Aromatisse', 'Aurorus', 'Banette-Mega', 'Banettite', 'Blastoise-Mega', 'Blastoisinite', 'Blaziken', 'Bronzong',
			'Camerupt-Mega', 'Cameruptite', 'Charizard', 'Clawitzer', 'Cofagrigus', 'Cradily', 'Crawdaunt', 'Crobat', 'Diancie', 'Doublade',
			'Dusclops', 'Empoleon', 'Escavalier', 'Espeon', 'Forretress', 'Galvantula', 'Gardevoir', 'Gastrodon', 'Genesect', 'Hariyama', 'Hitmontop',
			'Infernape', 'Jolteon', 'Kangaskhan', 'Kecleon', 'Klefki', 'Krookodile', 'Kyurem', 'Liepard', 'Lopunny-Mega', 'Lopunnite',
			'Lucario', 'Machamp', 'Mamoswine', 'Manaphy', 'Mawile', 'Medicham-Mega', 'Medichamite', 'Meowstic', 'Metagross', 'Murkrow',
			'Nidoking', 'Ninetales', 'Noivern', 'Pachirisu', 'Pangoro', 'Porygon2', 'Porygon-Z', 'Reuniclus', 'Rhyperior', 'Rotom-Heat',
			'Salamence', 'Sceptile-Mega', 'Sceptilite', 'Slowking', 'Snorlax', 'Swampert', 'Togetic', 'Tornadus', 'Vaporeon', 'Victini',
		],
	},
	{
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558929/\">VGC 2016 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3500650/\">VGC Learning Resources</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy',
			'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Soul Dew'
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		}
	},
	{
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3524352/\">VGC 2015 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3530547/\">VGC 2015 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526666/\">Sample Teams for VGC 2015</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true
	},
	{
		name: "Doubles Hackmons Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Smogon Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511522/\">Smogon Triples</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540390/\">Smogon Triples Viability Ranking</a>"
		],
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song'
		]
	},
	{
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>"
		],
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6]
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true
	},
	{
		name: "Triples Hackmons Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Gods and Followers",
		desc: [
			"The Pok&eacute;mon in the first slot is the God; the Followers must share a type with the God. If the God Pok&eacute;mon faints, the Followers are inflicted with Curse.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545230/\">Gods and Followers</a>",
		],
		section: "OM of the Month",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Baton Pass Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: [],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let template = this.getTemplate(team[0].species);
			let typeTable = template.types;
			for (let i = 1; i < team.length; i++) {
				template = this.getTemplate(team[i].species);
				if (template.tier === 'Uber') return [template.species + " is only allowed as the God."];
				if (!template.types || !typeTable.intersect(template.types).length) return ["Followers must share a type with the God."];
				let item = toId(team[i].item);
				if (item && item in {gengarite:1, kangaskhanite:1, lucarionite:1, mawilite:1, salamencite:1, souldew:1}) return [team[i].item + " is only allowed on the God."];
				if (toId(team[i].ability) === 'shadowtag') return [team[i].ability + " is only allowed on the God."];
			}
		},
		onBegin: function () {
			for (let i = 0; i < this.sides.length; i++) {
				this.sides[i].god = this.sides[i].pokemon[0];
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.side.pokemonLeft > 1 && pokemon.side.god === pokemon) {
				this.add('-message', pokemon.name + " has fallen! " + pokemon.side.name + "'s team has been Cursed!");
			}
		},
		onSwitchIn: function (pokemon) {
			if (pokemon.side.god.hp === 0) {
				pokemon.addVolatile('curse', pokemon);
			}
		},
	},
	{
		name: "Monogen",
		desc: [
			"All Pok&eacute;mon on a team must be from the same generation.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516475/\">Monogen</a>",
		],
		section: "OM of the Month",

		ruleset: ['OU'],
		banlist: [],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let gen = this.getTemplate(team[0].species).gen;
			if (!gen) return ["Your team must be from the same generation."];
			for (let i = 1; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.gen !== gen) return ["Your team must be from the same generation."];
			}
		},
	},
	{
		name: "[Seasonal] Polar Opposites",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",
		team: 'randomSeasonalPolar',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onNegateImmunity: function (pokemon, type) {
			if (type in this.data.TypeChart && this.runEvent('Immunity', pokemon, null, null, type)) return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/cap/\">CAP Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>"
		],
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP', 'Crucibelle'],
	},
	{
		name: "Battle Factory",
		section: "Other Metagames",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause']
	},
	{
		name: "Challenge Cup 1v1",
		section: "Other Metagames",

		team: 'randomCC',
		teamLength: {
			battle: 1
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview']
	},
	{
		name: "Balanced Hackmons",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3515725/\">Balanced Hackmons Suspect Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547823/\">Balanced Hackmons Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Kyogre-Primal', 'Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter']
	},
	{
		name: "Classic Hackmons",
		section: "Other Metagames",

		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species);
			var item = this.getItem(set.item);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			var ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}
			return problems;
		}
	},
	{
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>"
		],
		section: "Other Metagames",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew'
		]
	},
	{
		name: "Duotype",
		section: "Other Metagames",
		column: 2,
		searchShow: false,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Duo Type Clause', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina',
			'Giratina-O', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia','Mewtwo','Palkia','Rayquaza','Reshiram',
			'Shaymin-Sky','Talonflame','Xerneas','Yveltal','Zekrom','Damp Rock','Gengarite','Kangaskanite','Lucarionite',
			'Mawilite','Salamencite','Slowbronite','Soul Dew','Double Team','Minimize','Swagger'
		]
	},
	{
		name: "Tier Shift Monotype",
		section: "Other Metagames",
		column: 2,
		searchShow: false,

		mod: 'tiershift',
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Shaymin-Sky', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "Ubers Monotype",
		section: "Other Metagames",
		searchShow: false,

		ruleset: ['Pokemon', 'Standard Ubers', 'Same Type Clause'],
		banlist: []
	},
	{
		name: "UU Monotype",
		section: "Other Metagames",
		searchShow: false,

		ruleset: ['OU', 'Same Type Clause'],
		banlist: ['OU', 'BL', 'Heracronite', 'Medichamite', 'Gardevoirite', 'Drizzle', 'Drought']
	},
	{
		name: "RU Monotype",
		section: "Other Metagames",
		searchShow: false,

		ruleset: ['UU', 'Same Type Clause'],
		banlist: ['UU', 'BL2']
	},
	{
		name: "NU Monotype",
		section: "Other Metagames",
		searchShow: false,

		ruleset: ['RU', 'Same Type Clause'],
		banlist: ['RU', 'BL3']
	},
	{
		name: "PU Monotype",
		section: "Other Metagames",
		searchShow: false,
		

		ruleset: ['NU', 'Same Type Clause'],
		banlist: ['NU', 'BL4', 'Chatter']
	},
	{
		name: "LC Monotype",
		section: "Other Metagames",
		searchShow: false,

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup', 'Same Type Clause'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Swagger', 'LC Uber', 'Gligar']
	},
	{
		name: "1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536109/\">1v1 Viability Ranking</a>"
		],
		section: 'Other Metagames',

		teamLength: {
			validate: [1, 3],
			battle: 1
		},
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew', 'Perish Song',
		],
	},
	{
		name: "Tier Shift",
		desc: [
			"Pok&eacute;mon below OU/BL get all their stats boosted. UU/BL2 get +5, RU/BL3 get +10, NU/BL4 get +15, and PU or lower get +20.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554765/\">Tier Shift</a>"
		],
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Swift Swim']
	},
	{

		name: "OU (no Mega)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3536150/\">OU (no Mega) Viability Ranking</a>"],
		section: "Other Metagames",

		ruleset: ['OU'],
		onBegin: function () {
			for (let i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (let i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		}
	},
	{
		name: "Inverse Battle",
		desc: [
			"Battle with an inverted type chart.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526371/\">Inverse Battle Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Shadow Tag'
		],
		onNegateImmunity: function (pokemon, type) {
			if (type in this.data.TypeChart && this.runEvent('Immunity', pokemon, null, null, type)) return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551063/\">Almost Any Ability Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Slaking', 'Smeargle', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Illusion', 'Shadow Tag', 'Chatter'
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		}
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},
	{
		name: "LC UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3523929/\">LC UU</a>"],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Anorith', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Corphish', 'Cottonee',
			'Croagunk', 'Diglett', 'Drifloon', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus',
			'Gastly', 'Gothita', 'Houndour', 'Larvesta', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix', 'Pancham',
			'Pawniard', 'Ponyta', 'Porygon', 'Pumpkaboo-Super', 'Scraggy', 'Shellder', 'Skrelp', 'Snivy', 'Snubbull',
			'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon',
			'Shell Smash'
		]
	},
	{
		name: "Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],
		section: "Other Metagames",

		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547040/\">2v2 Doubles</a>"
		],
		section: "Other Metagames",

		gameType: 'doubles',
		teamLength: {
			validate: [2, 4],
			battle: 2
		},
		ruleset: ['Doubles OU'],
		banlist: ['Perish Song']
	},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>"
		],
		section: "Other Metagames",

		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle', 'Venomoth',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter'
		]
	},
	{
		name: "Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>"
		],
		section: "Other Metagames",

		mod: 'hiddentype',
		ruleset: ['OU']
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],
		section: "Other Metagames",

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU']
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber']
	},
	
	// Local Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "1v1 (No Team Preview)",
		section: 'Local Metagames',
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal',
			'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew'
		],
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Monocolor",
		section: "Local Metagames",

		ruleset: ['OU'],
		banlist: [],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let color = this.getTemplate(team[0].species).color;
			if (!color) return ["Your team must share the same color."];
			for (let i = 1; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.color !== color) return ["Your team must share the same color."];
			}
		},
	},
	{
		name: "Mega Tier",
		section: "Local Metagames",
		mod: 'megatier',
		ruleset: ['OU']
	},
	{
		name: "Ball Cup",
		section: "Local Metagames",
		mod: 'ballcup',
		ruleset: ['OU']
	},
	{
		name: "Move Equality",
		section: "Local Metagames",
		
		mod: "moveequality",
		ruleset: ["OU"],
		banlist: ["Greninja", "Dynamic Punch"]
	},
	{
		name: "Noble Items",
		section: "Local Metagames",
		
		mod: "nobleitems",
		ruleset: ["OU"],
	},
	{
		name: "Level Balance",
		section: "Local Metagames",
		
		ruleset: ['Pokemon', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if(!template.isMega || this.getItem(set.item).megaStone) template = this.getTemplate(this.getItem(set.item).megaStone);
			var levelScale = {
				LC: 94,
				'LC Uber': 92,
				NFE: 90,
				Limbo: 86,
				NU: 86,
				BL3: 84,
				RU: 82,
				BL2: 80,
				UU: 78,
				BL: 76,
				OU: 74,
				Unreleased: 74,
				Uber: 70
			};
			var customScale = {
				// bad mons
				caterpie:99,metapod:99,weedle:99,kakuna:99,magikarp:99,pichu:99,cleffa:99,igglybuff:99,tyrogue:99,sentret:99,ledyba:99,hoppip:99,sunkern:99,unown:99,azurill:99,ralts:99,zigzagoon:99,wurmple:99,silcoon:99,cascoon:99,slakoth:99,feebas:99,burmy:99,combee:99,mimejr:99,happiny:99,kricketot:99,tynamo:99,
				
				// Eviolite
				Ferroseed: 95, Misdreavus: 95, Munchlax: 95, Murkrow: 95, Natu: 95,
				Gligar: 90, Metang: 90, Monferno: 90, Roselia: 90, Seadra: 90, Togetic: 90, Wartortle: 90, Whirlipede: 90,
				Dusclops: 84, Porygon2: 82, Chansey: 78,

				// Weather or teammate dependent
				Snover: 95, Vulpix: 95, Ninetales: 78, Tentacruel: 78, Toxicroak: 78,
			
				// Banned mega
				"Kangaskhan-Mega": 72, "Gengar-Mega": 72, "Blaziken-Mega": 72, "Lucario-Mega": 72,

				// Holistic judgment
				Carvanha: 90, Genesect: 72, Kyurem: 78, Sigilyph: 74, Xerneas: 68
			};
			var level = levelScale[template.tier] || 90;
			var eviolite = (template.evos.length > 0 && set.item === "Eviolite") ? true : false;
			
			if (customScale[template.name]) level = customScale[template.name];
			
			if (eviolite && !customScale[template.name]) level = levelScale[this.getTemplate(template.evos[0]).tier];
			else if(eviolite) level = 80;
			
			if (set.level) set.forcedLevel = level;
			return [];
		}
	},
	{
		name: "Immunimons",
		section: "Local Metagames",

		ruleset: ['OU'],
		banlist: [],
		onTryHit: function (target, source, move) {
			if (target === source || move.type === '???' || move.id === 'struggle') return;
			if (target.hasType(move.type)) {
				this.add('-debug','immunimons immunity [' + move.id + ']');
				return null;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if ((source.hasType('Rock') && effect.id === 'stealthrock') || (source.hasType('Ground') && effect.id === 'spikes')) {
				this.add('-debug','immunimons immunity [' + effect.id + ']');
				return false;
			}
		},
	},
	{
		name: "Reliablemons",
		section: "Local Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onModifyMove: function(move, pokemon) {
			var moves = pokemon.moves;
			if (move.id === moves[0]) {
				var cheese = 0;
				var crackers = true;
			} else if (move.id === moves[1] && pokemon.typesData[1]) {
				var cheese = 1;
				var crackers = true;
			} else {
				var crackers = false;
			}
			if (crackers) {
				move.type = pokemon.typesData[cheese].type;
			}
		}
	},
	{
		name: "Haxmons",
		section: "Local Metagames",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 0;
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		}
	},
	{
		name: "Startermons",
		section: 'Local Metagames',

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Soul Dew', 'Charizardite X', 'Charizardite Y', 'Venusaurite', 'Blastoisinite', 'Blazikenite', 'Blaziken + Speed Boost'],
		validateSet: function (set) {
			var validStarters = {
				"Bulbasaur":1, "Ivysaur":1, "Venusaur":1, "Charmander":1, "Charmeleon":1, "Charizard":1, "Squirtle":1, "Wartortle":1, "Blastoise":1,
				"Chikorita":1, "Bayleef":1, "Meganium":1, "Cyndaquil":1, "Quilava":1, "Typhlosion":1, "Totodile":1, "Croconaw":1, "Feraligatr":1,
				"Treecko":1, "Grovyle":1, "Sceptile":1, "Torchic":1, "Combusken":1, "Blaziken":1, "Mudkip":1, "Marshtomp":1, "Swampert":1,
				"Turtwig":1, "Grotle":1, "Torterra":1, "Chimchar":1, "Monferno":1, "Infernape":1, "Piplup":1, "Prinplup":1, "Empoleon":1,
				"Snivy":1, "Servine":1, "Serperior":1, "Tepig":1, "Pignite":1, "Emboar":1, "Oshawott":1, "Dewott":1, "Samurott":1,
				"Chespin":1, "Quilladin":1, "Chesnaught":1, "Fennekin":1, "Braixen":1, "Delphox":1, "Froakie":1, "Frogadier":1, "Greninja":1,
				"Pikachu":1, "Raichu":1
			};
			if (!(set.species in validStarters)) {
				return [set.species + " is not a starter."];
			}
		},
		validateTeam: function (team) {
			var problems = [];
			var hasOneOfEach = true;
			var gens = [0, 0, 0, 0, 0, 0];
			for (var i = 0; i < team.length; i++) {
				var pokemon = Tools.getTemplate(team[i].species || team[i].name);
				if (pokemon.num <= 151) ++gens[0];
				else if (pokemon.num <= 251) ++gens[1];
				else if (pokemon.num <= 386) ++gens[2];
				else if (pokemon.num <= 494) ++gens[3];
				else if (pokemon.num <= 649) ++gens[4];
				else if (pokemon.num <= 721) ++gens[5];
			}
			for (var j in gens) {
				if (gens[j] > 1) hasOneOfEach = false;
			}
			if (!hasOneOfEach) problems.push('You must bring a Pokemon of each gen.');
			return problems;
		}
	},
	{
		name: "Pacifistmons",
		section: "Local Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Heatran', 'Gengarite', 'Taunt', 'Magic Guard'],
		onValidateSet: function(set) {
			var problems = [];
			for (var i in set.moves) {
				var move = this.getMove(string(set.moves[i]));
				if (move.heal) problems.push(move.name + ' is banned as it is a healing move.');
				if (move.category !== 'Status') problems.push(move.name + ' is banned as it is an attacking move.');
			}
			return problems;
		}
	},
	{
        name: "Technician Tower",
        section: "Local Metagames",

        mod: 'techniciantower',
        ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
        banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite','Heracronite', 'Technician', 'Skill Link'],
        validateSet: function(set) {
            for (var i in set.moves) {
                var move = this.getMove(string(set.moves[i]));
                if (move.basePower && move.basePower >= 90) return ['The move ' + move.name + ' is banned because it has >90 Base Power.'];
                if (move.id === 'frustration' && set.happiness < 105) return ['The move Frustration is banned because Pokemon ' + (set.name || set.species) + ' has less than 105 happiness'];
                if (move.id === 'return' && set.happiness > 150) return ['The move Return is banned because Pokemon ' + (set.name || set.species) +  'has more than 150 happiness'];
                if (move.basePowerCallback && !(move.id in {'frustration':1,'return':1})) return ['The move ' + move.name + ' is banned because it has a variable BP'];
                if (move.basePower && move.basePower > 63 && set.ability in {'Pixilate':1,'Aerilate':1,'Refrigerate':1}) return ['The move ' + move.name + ' is banned for Pokemon with an -ate ability.']
            }
        },
        onBasePowerPriority: 8,
        onBasePower: function (basePower, attacker, defender, move) {
            if (basePower <= 60) {
                this.debug('Technician boost');
                return this.chainModify(1.5);
            }
        },
    },
    {
        name: "Playstyle Reversal",
        section: "Local Metagames",

        ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
        banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite'],
        onModifyMove: function (move) {
            if (move && move.self) {
                if (move.category === "Status") {
                    move.onHit = function(source) {
                        return this.boost({atk: 1, spa: 1, def: -1, spd: -1});
                    }
                } else {
                    move.onHit = function(attacker, defender) {
                        return this.boost({atk: -1, spa: -1, def: 1, spd: 1}, defender, attacker);
                    }
                }
            } else if (move && move.category === "Status") {
                if (move.target === "self" && move.boosts) {
                    move.self = {boosts: {atk: -1, spa: -1, def: 1, spd: 1}};
                } else {
                    move.self = {boosts: {atk: 1, spa: 1, def: -1, spd: -1}};
                }
            } else if (move) {
                move.self = {boosts: {atk: -1, spa: -1, def: 1, spd: 1}};
            }
        }
    },
	{
        name: "Nature's Blessing",
        section: "Local Metagames",

        ruleset: ['Pokemon', 'Standard', 'Team Preview'],
        banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
        onTryHit: function (target, source, move) {
            if (target !== source && target.item && !target.ignore['Item'] && !(!source.ignore['Ability'] && source.ability === "unnerve")) {
                var item = Tools.getItem(target.item);
                if (item.isBerry && item.onSourceModifyDamage && item.naturalGift && move.type === item.naturalGift.type) {
                    this.add('-immune', target, '[msg]');
                    return null;
                }
            }
        }
        },
        {
        name: "Burning 'Mon",
        section: "Local Metagames",

        ruleset: ['Pokemon', 'Standard', 'Team Preview'],
        banlist: ['Mewtwo', 'Lugia', 'Ho-Oh', 'Blaziken', 'Kyogre', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Palkia', 'Giratina', 'Girainta-Origin', 'Darkrai', 'Shaymin-Sky', 'Arceus', 'Reshiram', 'Kyurem-White', 'Xerneas', 'Yveltal', 'Soul Dew', 'Gengarite', 'Salamencite', 'Red Orb'],
        onBegin: function () {
            this.add('-message', "Hah! You better have BURN HEAL!"); //This message is optional. Feel free to get rid of it if you don't want it.
            for (var i = 0; i < this.p1.pokemon.length; i++) {
                if (this.p1.pokemon[i].runImmunity('brn')) {
                    this.p1.pokemon[i].status = 'brn';
                }
            }
            for (var j = 0; j < this.p2.pokemon.length; j++) {
                if (this.p2.pokemon[j].runImmunity('brn')) {
                    this.p2.pokemon[j].status = 'brn';
                }
            }
        },
        onResidualOrder: 999, //This will always occur as the last possible occurence of the turn's residual phase.
        onResidual: function () {
            this.p1.pokemon[0].trySetStatus('brn');
            this.p2.pokemon[0].trySetStatus('brn');
            //Trust me I tried pokemon.trySetStatus it doesn't work ;_;
        }
        },
	{
		name: "Unreleased OU",
		section: "Local Metagames",

		ruleset: ['Pokemon', 'Standard Unreleased', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew']
	},
	{
		name: "C&E",
		section: "Local Metagames",

		searchShow: false,
		maxLevel: 100,
		ruleset: ['Team Preview']
	},
	{
		name: "Balanced Hackmons (Doubles)",
		section: "Local Metagames",
		gameType: 'doubles',

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter']
	},
	{
		name: "Final Destination",
		section: "Local Metagames",

		team: 'randomFinalDestination',
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Final Destination Clause'],
		onModifyMove: function (move) {
			move.willCrit = false;
		}
	},
	{
		name: "Mr Bones Wild Ride",
		section: "Local Metagames",

		team: 'randomMrBonesWildRide',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "MR BONES SAYS");
			this.add('message', "THE RIDE NEVER ENDS");
			this.setWeather('Sunny Day');
			delete this.weatherData.duration;
		},
		onBeforeMove: function (pokemon, target, move) {
			var dice = this.random(20);
			if (dice < 10 && dice > 1) {
				this.add('c|' + pokemon.name + '|I want to get off MR BONES WILD RIDE');
			} else if (dice === 1) {
				this.add('c|' + pokemon.name + '|I have the strangest feeling someone is watching me');
			} else if (dice === 0) {
				this.add('c|' + pokemon.name + '|I want to go on something more thrilling than MR BONES WILD RIDE');
			}
		}
	},
	
	// Old Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Metagamiate",
		section: "Old Metagames",
		column: 3,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Kyogre', 'Ho-Oh', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram',
			'Shaymin-Sky', 'Kyurem-White', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower' && !pokemon.hasAbility(['aerilate', 'pixilate', 'refrigerate'])) {
				var types = pokemon.getTypes();
				if (!types[0] || types[0] === '???') return;
				move.type = types[0];
				move.isMetagamiate = true;
			}
		},
		onBasePowerPriority: 9,
		onBasePower: function(basePower, attacker, defender, move) {
			if (!move.isMetagamiate) return;
			return this.chainModify([0x14CD, 0x1000]);
		}
	},
	{
		name: "350 Cup",
		desc: [
			"Pok&eacute;mon with a base stat total of 350 or lower get their stats doubled.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3512945/\">350 Cup</a>"
		],
		section: "Old Metagames",

		mod: '350cup',
		ruleset: ['Ubers', 'Evasion Moves Clause'],
		banlist: ['Abra', 'Cranidos', 'Darumaka', 'Gastly', 'Pawniard', 'Rufflet', 'Smeargle', 'Spritzee', 'DeepSeaScale', 'DeepSeaTooth', 'Light Ball', 'Thick Club'],
		onValidateSet: function (set) {
			const template = Tools.getTemplate(set.species);
			const item = this.getItem(set.item);
			if (item.name === 'Eviolite' && Object.values(template.baseStats).sum() <= 350) {
				return ['Eviolite is banned on Pok\u00E9mon with 350 or lower BST.'];
			}
		}
	},
	{
		name: "LC Extended",
		desc: [
			"LC but with Pok&eacute;mon being able to learn all moves from their evolutions.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557568/\">LC Extended</a>"
		],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Swagger'],
		validateSet: function (set, teamHas) {
			const species = set.species || set.name;
			let template = Tools.getTemplate(species);
			if (template.prevo) {
				return [species + " isn't the first in its evolution family."];
			}
			if (!template.nfe) {
				return [species + " doesn't have an evolution family."];
			}
			if (template.tier === 'LC Uber' || template.species in {'Fletchling':1, 'Gligar':1, 'Misdreavus':1, 'Scyther':1, 'Sneasel':1, 'Tangela':1}) {
				return [species + " is banned from LC Extended."];
			}
			const ability = set.ability;
			if (Object.values(template.abilities).indexOf(ability) < 0 || ability === 'Moody') {
				return [species + " doesn't have a legal ability."];
			}
			const level = set.level;
			let problems;
			while (template.evos.length) {
				let evos = template.evos;
				for (let i = 0; i < evos.length; i++) {
					template = Tools.getTemplate(evos[i]);
					set.species = template.species;
					set.ability = template.abilities[0];
					set.level = template.evoLevel;
					problems = this.validateSet(set, teamHas) || [];
					if (!problems.length) {
						set.species = species;
						set.ability = ability;
						set.level = Tools.clampIntRange(level, 1, 5);
						return;
					}
				}
			}
			for (let i = 0; i < problems.length; i++) {
				problems[i] = problems[i].replace(template.species, species);
			}
			return problems;
		}
	},
	{
		name: "Middle Cup",
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Team Preview', 'Standard'],
		banlist: ['Illegal', 'Eviolite', 'Chansey', 'Frogadier'],
		maxLevel: 50,
		defaultLevel: 50,
		onValidateSet: function(set) {
			var template = this.getTemplate(set.species || set.name);
			if (!template.evos || template.evos.length === 0 || !template.prevo) {
				return [set.species + " is not the middle Pokémon in an evolution chain."];
			}
		}
	},
	{
		name: "Alphabet Cup",
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Team Preview', 'Standard'],
		banlist: ['Soul Dew', 'Gengarite', 'Mawilite', 'Salamencite', 'Kangaskhanite', 'Mewtwonite X', 'Mewtwonite Y', 'Swoobat',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fairy', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying',
			'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Blaziken', 'Blaziken-Mega', 'Aegislash', 'Greninja', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		validateTeam: function(team, format) {
			var letters = {};
			var letter = '';
			for (var i = 0; i < team.length; i++) {
				letter = Tools.getTemplate(team[i]).species.slice(0,1).toUpperCase();
				if (letter in letters) return ['Your team cannot have more that one Pokémon starting with the letter "' + letter + '".'];
				letters[letter] = 1;
			}
		}
	},
	{
		name: "FU",
		section: "Old Metagames",

		ruleset: ['PU'],
		banlist: ['Vigoroth', 'Chatot', 'Fraxure', 'Sticky Web', 'Heat Rock', 'Piloswine', 'Zebstrika', 'Roselia', 'Kadabra', 'Raichu', 'Machoke',
		         'Togetic', 'Misdreavus', 'Stoutland', 'Armaldo', 'Lickilicky', 'Pelipper', 'Ninetales', 'Golem', 'Rapidash', 'Gourgeist-Super',
		         'Probopass', 'Leafeon', 'Torterra', 'Dusknoir', 'Aurorus', 'Ursaring', 'Jumpluff', 'Tangela', 'Mr. Mime', 'Monferno', 'Arbok',
		         'Grumpig', 'Rotom-Frost', 'Torkoal', 'Carracosta', 'Beheeyem', 'Avalugg', 'Barbaracle', 'Flareon', 'Dodrio', 'Marowak', 'Floatzel',
		         'Simipour', 'Basculin', 'Victreebel', 'Mightyena', 'Leavanny', 'Volbeat', 'Articuno', 'Sawsbuck', 'Drifblim', 'Ninjask', 'Lapras',
		         'Electrode', 'Meowstic', 'Luxray', 'Gigalith', 'Clefairy'
		]
	},
	{
		name: "Inheritance",
		desc: [
			"Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3529252/\">Inheritance</a>"
		],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 'Evasion Moves Clause', 'OHKO Clause',
			'Swagger Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'
		],
		banlist: ['Unreleased', 'Illegal', 'Assist', 'Chatter'],
		customBans: {
			receiver: {
				arceus:1, archeops:1, darkrai:1, deoxys:1, deoxysattack:1, deoxysspeed:1, dialga:1, giratina:1, giratinaorigin:1,
				groudon:1, hooh:1, hoopaunbound:1, keldeo:1, kyogre:1, kyuremblack:1, kyuremwhite:1, lugia:1, mewtwo:1, palkia:1,
				rayquaza:1, regigigas:1, reshiram:1, shayminsky:1, shedinja:1, slaking:1, xerneas:1, yveltal:1, zekrom:1
			},
			donor: {masquerain:1, sableye:1, smeargle:1},
			inheritedAbilities: {arenatrap:1, galewings:1, hugepower:1, imposter:1, parentalbond:1, purepower:1, shadowtag:1, wonderguard:1},
			items: {blazikenite:1, gengarite:1, kangaskhanite:1, mawilite:1, salamencite:1, souldew:1}
		},
		noChangeForme: true,
		noChangeAbility: true,
		abilityMap: (function () {
			let Pokedex = require('./../tools.js').data.Pokedex;
			if (!Pokedex) return null; // Process is data-unaware

			let abilityMap = Object.create(null);
			for (let speciesid in Pokedex) {
				let pokemon = Pokedex[speciesid];
				if (pokemon.num < 1 || pokemon.num > 720) continue;
				for (let key in pokemon.abilities) {
					let abilityId = toId(pokemon.abilities[key]);
					if (abilityMap[abilityId]) {
						abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](speciesid);
					} else {
						abilityMap[abilityId] = [speciesid];
					}
				}
			}
			return abilityMap;
		})(),
		getEvoFamily: function (species) {
			let template = Tools.getTemplate(species);
			while (template.prevo) {
				template = Tools.getTemplate(template.prevo);
			}
			return template.speciesid;
		},
		onValidateTeam: function (team, format, teamHas) {
			// Donor Clause
			let evoFamilyLists = [];
			for (let i = 0; i < team.length; i++) {
				let set = team[i];
				if (!set.abilitySources) continue;
				evoFamilyLists.push(set.abilitySources.map(format.getEvoFamily).unique());
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			let requiredFamilies = Object.create(null);
			for (let i = 0; i < evoFamilyLists.length; i++) {
				let evoFamilies = evoFamilyLists[i];
				if (evoFamilies.length !== 1) continue;
				if (requiredFamilies[evoFamilies[0]]) return ["You are limited to one inheritance from each family by the Donor Clause.", "(You inherit more than once from " + this.getTemplate(evoFamilies[0]).species + "'s.)"];
				requiredFamilies[evoFamilies[0]] = 1;
			}
		},
		validateSet: function (set, teamHas) {
			if (!this.format.abilityMap) return this.validateSet(set, teamHas); // shouldn't happen

			this.format.noChangeForme = false;
			let problems = this.tools.getFormat('Pokemon').onChangeSet.call(this.tools, set, this.format) || [];
			this.format.noChangeForme = true;

			if (problems.length) return problems;

			let species = toId(set.species);
			let template = this.tools.getTemplate(species);
			if (!template.exists) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.isUnreleased) return ["" + set.species + " is unreleased."];
			if (template.speciesid in this.format.customBans.receiver) {
				return ["" + set.species + " is banned."];
			} else if (!this.tools.data.FormatsData[species] || !this.tools.data.FormatsData[species].tier) {
				if (toId(template.baseSpecies) in this.format.customBans.receiver) {
					return ["" + template.baseSpecies + " is banned."];
				}
			}

			let name = set.name;

			let abilityId = toId(set.ability);
			if (!abilityId) return ["" + (set.name || set.species) + " must have an ability."];
			let pokemonWithAbility = this.format.abilityMap[abilityId];
			if (!pokemonWithAbility) return ["" + set.ability + " is an invalid ability."];
			let isBaseAbility = Object.values(template.abilities).map(toId).indexOf(abilityId) >= 0;
			if (!isBaseAbility && abilityId in this.format.customBans.inheritedAbilities) return ["" + set.ability + " is banned from being passed down."];

			// Items must be fully validated here since we may pass a different item to the base set validator.
			let item = this.tools.getItem(set.item);
			if (item.id) {
				if (!item.exists) return ["" + set.item + " is an invalid item."];
				if (item.isUnreleased) return ["" + (set.name || set.species) + "'s item " + item.name + " is unreleased."];
				if (item.id in this.format.customBans.items) return ["" + item.name + " is banned."];
			}

			let validSources = set.abilitySources = []; // evolutionary families
			for (let i = 0; i < pokemonWithAbility.length; i++) {
				let donorTemplate = this.tools.getTemplate(pokemonWithAbility[i]);
				let evoFamily = this.format.getEvoFamily(donorTemplate);

				if (validSources.indexOf(evoFamily) >= 0) {
					// The existence of a legal set has already been established.
					// We only keep iterating to find all legal donor families (Donor Clause).
					// Skip this redundant iteration.
					continue;
				}

				if (set.name === set.species) delete set.name;
				if (donorTemplate.species !== set.species && toId(donorTemplate.species) in this.format.customBans.donor) {
					problems = ["" + donorTemplate.species + " is banned from passing abilities down."];
					continue;
				} else if (donorTemplate.species !== set.species && abilityId in this.format.customBans.inheritedAbilities) {
					problems = ["The ability " + this.tools.getAbility(abilityId).name + " is banned from being passed down."];
					continue;
				}
				set.species = donorTemplate.species;
				if (donorTemplate.species !== template.species && donorTemplate.requiredItem) {
					// Bypass forme validation. Relevant to inherit from Giratina-O, and Mega/Primal formes.
					set.item = donorTemplate.requiredItem;
				}
				problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					validSources.push(evoFamily);
				}
				if (validSources.length > 1) {
					// This is an optimization only valid for the current basic implementation of Donor Clause.
					// Remove if the FIXME? above actually gets fixed.
					break;
				}
			}

			// Restore the intended species, name and item.
			set.species = template.species;
			set.name = (name === set.species ? "" : name);
			set.item = item.name;

			if (!validSources.length && pokemonWithAbility.length > 1) {
				return ["" + (set.name || set.species) + " set is illegal."];
			}
			if (!validSources.length) {
				problems.unshift("" + (set.name || set.species) + " has an illegal set with an ability from " + this.tools.getTemplate(pokemonWithAbility[0]).name);
				return problems;
			}
		}
	},
	{
		name: "Same Type Stealth Rock",
		desc: [
			"Stealth Rock inflicts damage calculated from the primary type of the user.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511171/\">Same Type Stealth Rock</a>"
		],
		section: "Old Metagames",

		mod: 'stsr',
		ruleset: ['OU']
	},
	{
		name: "Highest Stat Meta",
		desc: [
			"All Pok&eacute;mon on a team must share the same highest stat.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3509940/\">Highest Stat Meta</a>"
		],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew'],
		onValidateTeam: function (team) {
			var highest = [];
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species);
				var stats = template.baseStats;
				var max = Math.max.apply(Math, Object.values(stats));
				var h = [];
				for (var j in stats) {
					if (stats[j] === max) h.push(j);
				}
				if (i === 0) {
					highest = h;
					continue;
				}
				highest = highest.intersect(h);
				if (!highest.length) {
					return ["Your team must share the same highest stat."];
				}
			}
		}
	},
	{
		name: "No Guard Galaxy",
		desc: [
			"Every move will never miss.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3514582/\">No Guard Galaxy</a>"
		],
		section: "Old Metagames",

		ruleset: ['OU'],
		banlist: ['Dynamic Punch'],
		onAccuracy: function (accuracy, target, source, move) {
			return true;
		}
	},
	{
		name: "Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketch'd move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545826/\">Sketchmons</a>"
		],
		section: "Old Metagames",

		ruleset: ['OU'],
		banlist: ['Allow One Sketch', "King's Rock", 'Pinsirite', 'Razor Fang', 'Shadow Tag'],
		onValidateTeam: function (team) {
			var sketchedMoves = {};
			for (var i = 0; i < team.length; i++) {
				var move = team[i].sketchmonsMove;
				if (!move) continue;
				if (move in sketchedMoves) return ["You are limited to sketching one of each move by Move Clause.", "(You have sketched " + this.getMove(move).name + " more than once)"];
				sketchedMoves[move] = (team[i].name || team[i].species);
			}
		}
	},
	{
		name: "Hackmons 1v1",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/oras-1v1-3v3-team-preview.3496773/#post-5121864\">Hackmons 1v1</a>"],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'OHKO Clause', 'Endless Battle Clause', 'Team Preview 1v1', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Wonder Guard', 'Heal Pulse'],
		onValidateTeam: function (team, format) {
			if (team.length > 3) return ['You may only bring up to three Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "No Status",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542555/\">No Status</a>"],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Landorus', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Blazikenite', 'Gengarite', 'Griseous Orb', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		],
		onValidateSet: function (set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.category === 'Status') problems.push(set.species + "'s move " + move.name + " is banned by No Status.");
				}
			}
			return problems;
		}
	},
	{
		name: "MonsJustMons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3514696/\">MonsJustMons</a>"],
		section: "Old Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Arceus', 'Archeops', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Slaking', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		onValidateSet: function (set) {
			set.item = '';
			set.ability = 'None';
			set.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			set.ivs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			set.nature = '';
		}
	},
	{
		name: "Mix and Mega",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>"],
		section: "Old Metagames",

		mod: 'mixandmega',
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Gengarite', 'Shadow Tag', 'Dynamic Punch', 'Zap Cannon'],
		onValidateTeam: function (team, format) {
			var itemTable = {};
			for (var i = 0; i < team.length; i++) {
				var item = this.getItem(team[i].item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'redorb' || item.id === 'blueorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			var item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (item.id === 'redorb' && template.baseSpecies === 'Groudon') || (item.id === 'blueorb' && template.baseSpecies === 'Kyogre')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			if (template.tier === 'Uber') return ["" + template.species + " is not allowed to hold " + item.name + " because it's in the Uber tier."];
			if (template.species === 'Shuckle' && ['abomasite', 'aggronite', 'audinite', 'cameruptite', 'charizarditex', 'charizarditey', 'galladite', 'gyaradosite', 'heracronite', 'houndoominite', 'latiasite', 'mewtwonitey', 'sablenite', 'salamencite', 'scizorite', 'sharpedonite', 'slowbronite', 'steelixite', 'tyranitarite', 'venusaurite'].indexOf(item.id) >= 0) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			var bannedMons = {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Slaking':1, 'Smeargle':1, 'Regigigas':1};
			if (template.species in bannedMons) {
				return ["" + template.species + " is not allowed to hold a Mega Stone."];
			}
			if (item.id === 'beedrillite' || item.id === 'kangaskhanite') {
				return ["" + item.name + " can only allowed be held by " + item.megaEvolves + "."];
			}
			switch (item.id) {
			case 'blazikenite':
				if (set.ability !== 'Speed Boost') return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mawilite': case 'medichamite':
				var powerAbilities = {'Huge Power':1, 'Pure Power':1};
				if (powerAbilities.hasOwnProperty(set.ability)) break;
				if (!template.otherFormes) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				var allowedPower = false;
				for (var i = 0; i < template.otherFormes.length; i++) {
					var altTemplate = this.getTemplate(template.otherFormes[i]);
					if ((altTemplate.isMega || altTemplate.isPrimal) && powerAbilities.hasOwnProperty(altTemplate.abilities['0'])) {
						allowedPower = true;
						break;
					}
				}
				if (!allowedPower) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'slowbronite':
				if (template.species === 'Regirock' || template.species === 'Steelix') return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mewtwonitey':
				if (template.baseStats.def <= 20) return ["" + template.species + " does not have enough Defense to hold " + item.name + "."];
				break;
			case 'diancite':
				if (template.baseStats.def <= 40 || template.baseStats.spd <= 40) return ["" + template.species + " does not have enough Def. or Sp. Def. to hold " + item.name + "."];
				break;
			case 'ampharosite': case 'garchompite': case 'heracronite':
				if (template.baseStats.spe <= 10) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'cameruptite':
				if (template.baseStats.spe <= 20) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'abomasite': case 'sablenite':
				if (template.baseStats.spe <= 30) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			}
		},
		onBegin: function () {
			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchInPriority: -6,
		onSwitchIn: function (pokemon) {
			var item = pokemon.getItem();
			if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
				// Primal Reversion
				var bannedMons = {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Regigigas':1, 'Slaking':1, 'Smeargle':1};
				if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
					var template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
					pokemon.formeChange(template);
					pokemon.baseTemplate = template;

					// Do we have a proper sprite for it?
					if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					} else {
						var oTemplate = this.getTemplate(pokemon.originalSpecies);
						this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
						this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
						if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
							this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
						}
					}
					this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
					this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = pokemon.ability;
					pokemon.canMegaEvo = false;
				}
			} else {
				var oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					var oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},
		onSwitchOut: function (pokemon) {
			var oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		}
	},
	{
		name: "Protean Palace",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3496299/\">Protean Palace</a>"],
		section: "Old Metagames",

		ruleset: ['OU'],
		banlist: [],
		onPrepareHit: function (source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Protean');
			}
		}
	},
	{
		name: "Linked",
		section: "Old Metagames",

		mod: 'linked',
		ruleset: ['OU'],
		banlist: ["King's Rock", 'Razor Fang'],
		validateTeam: function (team, format) {
			var hasChoice = false;
			for (var i = 0; i < team.length; i++) {
				var item = toId(team[i].item);
				if (!item) continue;
				if (item === 'choiceband' || item === 'choicescarf' || item === 'choicespecs') {
					if (hasChoice) return ["You are limited to one Choice item."];
					hasChoice = true;
				}
			}
		},
		validateSet: function (set) {
			if (set.moves && set.moves.length >= 2) {
				var moves = [toId(set.moves[0]), toId(set.moves[1])];
				if (moves.indexOf('craftyshield') >= 0 || moves.indexOf('detect') >= 0 || moves.indexOf('kingsshield') >= 0 || moves.indexOf('protect') >= 0 || moves.indexOf('spikyshield') >= 0) {
					return ["Linking protect moves is banned."];
				}
				if (moves.indexOf('superfang') >= 0 && (moves.indexOf('nightshade') >= 0 || moves.indexOf('seismictoss') >= 0)) {
					return ["Linking Super Fang with Night Shade or Seismic Toss is banned."];
				}
				if (this.getMove(moves[0]).flags['charge'] || this.getMove(moves[1]).flags['charge']) {
					return ["Linking two turn moves is banned."];
				}
			}
		}
	},
	{
		name: "Stat Switch",
		section: "Old Metagames",

		mod: 'statswitch',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Arceus', 'Azumarill', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Regice', 'Reshiram', 'Xerneas',
			'Yveltal', 'Zekrom', 'Diancite', 'Gengarite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		]
	},
	{
		name: "Mediocremons",
		section: "Old Metagames",

		ruleset: ['OU'],
		banlist: ['Clefable', 'Kingdra', 'Venomoth', 'Abomasite', 'Mawilite', 'Medichamite', 'Huge Power', 'Pure Power'],
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			for (var stat in template.baseStats) {
				if (template.baseStats[stat] >= 100) return [set.species + " has a base stat of 100 or more."];
			}
		}
	},
	
	// Random Metagames
	///////////////////////////////////////////////////////////////////

        {
		name: "Monotype Random Battle",
		section: "Random Metagames",
		column: 1,

		team: 'randomMonotype',
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},      
	{
		name: "Random Haxmons",
		section: "Random Metagames",
		column: 1,

		team: 'random',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Sleep Clause Mod', 'Freeze Clause', 'Cancel Mod'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 0;
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		}
	},
	{
		name: "Random Inverse Battle",
		section: "Random Metagames",
		mod: 'inverse',

		team: 'random',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod']
	},
	{
		name: "Random Sky Battle",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomSky',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Random Ubers",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomUber',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Random LC",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomLC',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Random CAP",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomCap',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Random MonoGen",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomMonoGen',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Challenge Cup 2-vs-2",
		section: "Random Metagames",
		mod: 'randoms',

		gameType: 'doubles',
		team: 'randomCC',
		searchShow: true,
		ruleset: ['Pokemon', 'Team Preview 2v2', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.debug('Cutting down to 2');
			this.p1.pokemon = this.p1.pokemon.slice(0, 2);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 2);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Challenge Cup Metronome",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomMetro',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	
	// No Hax
	///////////////////////////////////////////////////////////////////

        {
		name: "OU (No Hax)",
		section: "No Hax",
		column: 4,

		ruleset: ['OU'],
		banlist: ['Uber', 'Soul Dew', 'Shadow Tag'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
		name: "Ubers (No Hax)",
		section: "No Hax",
		column: 4,

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: [],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
		name: "UU (No Hax)",
		section: "No Hax",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
		name: "RU (No Hax)",
		section: "No Hax",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	}, 
	{
		name: "NU (No Hax)",
		section: "No Hax",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	}, 
	{
		name: "PU (No Hax)",
		section: "No Hax",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
		name: "LC (No Hax)",
		section: "No Hax",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			if (move.id !== 'stormthrow' && move.id !== 'frostbreath') move.willCrit = false;
			if (move.secondaries && move.id !== 'fakeout' && move.id !== 'inferno' && move.id !== 'nuzzle' && move.id !== 'zapcannon' && move.id !== 'glaciate' && move.id !== 'electroweb' && move.id !== 'dynamicpunch'  && move.id !== 'acidspray'  && move.id !== 'bulldoze'  && move.id !== 'chatter'  && move.id !== 'flamecharge'  && move.id !== 'icywind' && move.id !== 'lowsweep' && move.id !== 'mudslap' && move.id !== 'mudshot' && move.id !== 'mysticalfire' && move.id !== 'poweruppunch' && move.id !== 'snarl' && move.id !== 'magikarpsrevenge' && move.id !== 'rocktomb')  {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	
	
	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>"
		],
		section: "BW2 Singles",
		column: 4,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew']
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>"
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>"
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>"
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning']
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>"
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist']
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>"
		],
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela']
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop']
	},
	{
		name: "[Gen 5] Random Battle",
		section: "BW2 Singles",

		mod: 'gen5',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Doubles OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3485044/\">BW2 Doubles Viability Ranking</a>"],
		section: 'BW2 Doubles',
		column: 4,

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop'
		]
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop']
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>"
		],
		section: "Past Generations",
		column: 4,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus']
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 4] Doubles Custom Game",
		section: 'Past Generations',

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 3] OU",
		section: "Past Generations",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>"
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain']
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard']
	},
	{
		name: "[Gen 2] Random Battle",
		section: "Past Generations",

		mod: 'gen2',
		team: 'random',
		ruleset: ['Pokemon', 'Standard']
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>"
		],
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: []
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Challenge Cup",
		section: "Past Generations",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	
	// Past VGC
	///////////////////////////////////////////////////////////////////
	
	{
		name: "VGC 2010",
		section: "Past VGC",
                column: 4,
		gameType: 'doubles',
		searchShow: true,
		
		mod: 'gen4',
		maxForcedLevel: 50,
		ruleset: ['Species Clause', 'Item Clause'],
		banlist: ['Unreleased', 'Illegal', 'Soul Dew', 'Huntail + Shell Smash + Sucker Punch', 'Manaphy', 'Mew', 'Arceus', 'Shaymin', 'Darkrai', 'Celebi', 'Jirachi', 'Deoxys', 'Phione'],
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		validateTeam: function (team) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
			var legendCount = 0;
			for (var i = 0; i < 4; i++) {
				var pokemon = Tools.getTemplate(team[i].species || team[i].name);
				if (pokemon.species in {'Mewtwo': 1, 'Lugia': 1, 'Ho-Oh': 1, 'Rayquaza': 1, 'Kyogre': 1, 'Groudon': 1, 'Dialga': 1, 'Palkia': 1, 'Giratina': 1}) legendCount ++;
			}
			if (legendCount > 2) return ['You can\'t use more than two of these pokemon: Mewtwo, Lugia, Ho-Oh, Rayquaza, Kyogre, Groudon, Dialga, Palkia, Giratina.'];
		}
	},
	
	{
		name: "VGC 2013",
		section: "Past VGC",

		mod: 'gen5',
		gameType: 'doubles',
		onBegin: function() {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0,4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Team Preview VGC', 'Species Clause', 'Item Clause'],
		banlist: ['Unreleased', 'Illegal', 'Sky Drop', 'Dark Void', 'Soul Dew',
			'Mewtwo',
			'Mew',
			'Lugia',
			'Ho-Oh',
			'Celebi',
			'Kyogre',
			'Groudon',
			'Rayquaza',
			'Jirachi',
			'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Deoxys-Defense',
			'Chatot',
			'Dialga',
			'Palkia',
			'Giratina', 'Giratina-Origin',
			'Phione',
			'Manaphy',
			'Darkrai',
			'Shaymin', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Victini',
			'Reshiram',
			'Zekrom',
			'Kyurem', 'Kyurem-Black', 'Kyurem-White',
			'Keldeo', 'Keldeo-Resolute',
			'Meloetta',
			'Genesect'],
		validateTeam: function (team, format) {
		if (team.length < 4) return ['You must bring at least four Pok\u00e9mon.'];
			
	        }
	},
		
	{
		name: "VGC 2014",
		section: "Past VGC",

		mod: 'gen5',
		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC', 'Kalos Pokedex'],
		requirePentagon: true,
		banlist: [], // The neccessary bans are in Standard GBU
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least 4 Pokemon.'];
		}
	},
	{
		name: "VGC 2015",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3524352/\">VGC 2015 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3530547/\">VGC 2015 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3500650/\">VGC Learning Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526666/\">Sample Teams for VGC 2015</a>"
		],
		section: "Past VGC",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true
	},
	
	// Seasonals
	///////////////////////////////////////////////////////////////////

	// Seasoning Greetings, November 2012
	{
		name: "Seasoning's Greetings",
		column: 3,

		team: 'randomSeasonal',
		section: 'Seasonal',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause']
	},
	{
		name: "Winter Wonderland",
		section: 'Seasonal',

		team: 'randomSeasonalWW',
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove: function (move) {
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(20)) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					move.onTryHit = function () {
						this.add('-message', "The present was a bomb!");
					};
					move.category = 'Physical';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', "The present was confusion!");
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "The present was Disable!");
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "The present was a taunt!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', "The present was some seeds!");
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', "The present was an embargo!");
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "The present was a music box!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', "The present was a curse!");
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "The present was Torment!");
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', "The present was a trap!");
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 14:
					move.onTryHit = function () {
						this.add('-message', "The present was a root!");
					};
					move.volatileStatus = 'ingrain';
					break;
				case 15:
				case 16:
				case 17:
					move.onTryHit = function () {
						this.add('-message', "The present was a makeover!");
					};
					var boosts = {};
					var possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 18:
					move.onTryHit = function () {
						this.add('-message', "The present was psychic powers!");
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 19:
					move.onTryHit = function () {
						this.add('-message', "The present was fatigue!");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				}
			}
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause']
	},
	// Valentine Venture, February 2013
	{
		name: "Valentine Venture",
		section: 'Seasonal',

		team: 'randomSeasonalVV',
		gameType: 'doubles',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause']
	},
	// Spring Forward, March 2013
	{
		name: "Spring Forward",
		section: 'Seasonal',

		team: 'randomSeasonalSF',
		onBegin: function () {
			if (this.random(100) < 75) {
				this.add('-message', "March and April showers bring May flowers...");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
			}
			this.debug('Cutting teams down to three.');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		onSwitchIn: function (pokemon) {
			var greenPokemon = {
				bulbasaur:1, ivysaur:1, venusaur:1, caterpie:1, metapod:1, bellsprout:1, weepinbell:1, victreebel:1, scyther:1,
				chikorita:1, bayleef:1, meganium:1, spinarak:1, natu:1, xatu:1, bellossom:1, politoed:1, skiploom:1, lavitar:1,
				tyranitar:1, celebi:1, treecko:1, grovyle:1, sceptile:1, dustox:1, lotad:1, lombre:1, ludicolo:1, breloom:1,
				electrike:1, roselia:1, gulpin:1, vibrava:1, flygon:1, cacnea:1, cacturne:1, cradily:1, keckleon:1, tropius:1,
				rayquaza:1, turtwig:1, grotle:1, torterra:1, budew:1, roserade:1, carnivine:1, yanmega:1, leafeon:1, shaymin:1,
				shayminsky:1, snivy:1, servine:1, serperior:1, pansage:1, simisage:1, swadloon:1, cottonee:1, whimsicott:1,
				petilil:1, lilligant:1, basculin:1, maractus:1, trubbish:1, garbodor:1, solosis:1, duosion:1, reuniclus:1,
				axew:1, fraxure:1, golett:1, golurk:1, virizion:1, tornadus:1, tornadustherian:1, burmy:1,
				kakuna:1, beedrill:1, sandshrew:1, nidoqueen:1, zubat:1, golbat:1, oddish:1, gloom:1, mankey:1, poliwrath:1,
				machoke:1, machamp:1, doduo:1, dodrio:1, grimer:1, muk:1, kingler:1, cubone:1, marowak:1, hitmonlee:1, tangela:1,
				mrmime:1, tauros:1, kabuto:1, dragonite:1, mewtwo:1, marill:1, hoppip:1, espeon:1, teddiursa:1, ursaring:1,
				cascoon:1, taillow:1, swellow:1, pelipper:1, masquerain:1, azurill:1, minun:1, carvanha:1, huntail:1, bagon:1,
				shelgon:1, salamence:1, latios:1, tangrowth:1, seismitoad:1, jellicent:1, elektross:1, druddigon:1,
				bronzor:1, bronzong:1, gallade:1
			};
			if (pokemon.template.id in greenPokemon) {
				this.add('-message', pokemon.name + " drank way too much!");
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onModifyMove: function (move) {
			if (move.id === 'barrage') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 35;
				move.critRatio = 2;
				move.accuracy = 100;
				move.multihit = [3, 5];
				move.onBeforeMove = function () {
					this.add('-message', "You found a little chocolate egg!");
				};
				move.onHit = function (target, source) {
					this.heal(Math.ceil(source.maxhp / 40), source);
				};
			} else if (move.id === 'eggbomb') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 100;
				move.willCrit = true;
				move.accuracy = 100;
				move.onHit = function (target, source) {
					this.add('-message', source.name + " ate a big chocolate egg!");
					this.heal(source.maxhp / 8, source);
				};
				// Too much chocolate, you get fat. Also with STAB it's too OP
				move.self = {boosts: {spe: -2, spa: -1}};
			} else if (move.id === 'softboiled') {
				move.heal = [3, 4];
				move.onHit = function (target) {
					this.add('-message', target.name + " ate a delicious chocolate egg!");
				};
			} else {
				// As luck is everywhere...
				move.critRatio = 2;
			}
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause']
	},
	// Fools Festival, April 2013
	{
		name: "Fools Festival",
		section: 'Seasonal',

		team: 'randomSeasonalFF',
		onBegin: function () {
			var dice = this.random(100);
			if (dice < 65) {
				this.add('-message', "April showers bring May flowers...");
				this.setWeather('Rain Dance');
			} else if (dice < 95) {
				this.add('-message', "What a wonderful spring day! Let's go picnic!");
				this.setWeather('Sunny Day');
			} else {
				this.add('-message', "Bollocks, it's hailing?! In april?! Curse you, spring!!");
				this.setWeather('Hail');
			}
			delete this.weatherData.duration;
		},
		onSwitchIn: function (pokemon) {
			var name = (pokemon.ability === 'illusion' && pokemon.illusion) ? pokemon.illusion.toString().substr(4, pokemon.illusion.toString().length) : pokemon.name;
			var stonedPokemon = {Koffing:1, Weezing:1, Slowpoke:1, Slowbro:1, Slowking:1, Psyduck:1, Spinda:1};
			var stonerQuotes = ['your face is green!', 'I just realised that Arceus fainted for our sins', 'I can, you know, feel the colors',
			"you're my bro", "I'm imaginining a new color!", "I'm smelling the things I see!", 'hehe, hehe, funny', "I'm hungry!", 'we are pokemanz',
			'Did you know that Eevee backwards is eevee?! AMAZING', 'aaaam gonna be the verrrry best like no one evar wasss',
			"I feel like someone is watching us through a screen!", "come at me bro"];
			if (name in stonedPokemon) {
				var random = this.random(stonerQuotes.length);
				this.add('-message', name + ": Duuuuuude, " + stonerQuotes[random]);
				this.boost({spe:-1, def:1, spd:1}, pokemon, pokemon, {fullname:'high'});
			}
			// Pokemon switch in messages
			var msg = '';
			switch (name) {
			case 'Ludicolo':
				msg = "¡Ay, ay, ay! ¡Vámonos de fiesta, ya llegó Ludicolo!";
				break;
			case 'Missingno':
				msg = "Hide yo items, hide yo data, missingno is here!";
				break;
			case 'Slowpoke': case 'Slowbro':
				var didYouHear = ['Black & White are coming out soon!', 'Genesect has been banned to Ubers!',
				'Smogon is moving to Pokemon Showdown!', "We're having a new thing called Seasonal Ladder!", 'Deoxys is getting Nasty Plot!'];
				didYouHear = didYouHear.randomize();
				msg = 'Did you hear? ' + didYouHear[0];
				break;
			case 'Spinda':
				msg = "LOOK AT ME I'M USING SPINDA";
				break;
			case 'Whimsicott':
				msg = 'Oh dear lord, not SubSeed again!';
				break;
			case 'Liepard':
				msg = '#yoloswag';
				break;
			case 'Tornadus':
				msg = "It's HURRICANE time!";
				break;
			case 'Riolu':
				msg = 'Have you ever raged so hard that you smashed your keyboard? Let me show you.';
				break;
			case 'Gastly': case 'Haunter': case 'Gengar':
				msg = 'Welcome to Trolledville, population: you';
				break;
			case 'Amoonguss':
				msg = 'How do you feel about three sleep turns?';
				break;
			case 'Shaymin-Sky':
				msg = 'Do you know what paraflinch is? huehue';
				break;
			case 'Ferrothorn':
				msg = 'inb4 Stealth Rock';
				break;
			}
			if (msg !== '') {
				this.add('-message', msg);
			}
		},
		onModifyMove: function (move) {
			var dice = this.random(100);
			if (dice < 40) {
				var type = '';
				switch (move.type.toLowerCase()) {
				case 'rock':
				case 'ground':
					type = 'Grass';
					break;
				case 'fire':
				case 'bug':
					type = 'Water';
					break;
				case 'water':
				case 'grass':
					type = 'Fire';
					break;
				case 'flying':
					type = 'Fighting';
					break;
				case 'fighting':
					type = 'Flying';
					break;
				case 'dark':
					type = 'Bug';
					break;
				case 'dragon':
				case 'electric':
					type = 'Ice';
					break;
				case 'ghost':
					type = 'Normal';
					break;
				case 'ice':
					type = 'Electric';
					break;
				case 'normal':
				case 'poison':
					type = 'Ghost';
					break;
				case 'psychic':
					type = 'Dark';
					break;
				case 'steel':
					type = 'Poison';
					break;
				}

				move.type = type;
				this.add('-message', 'lol trolled, I changed yo move type');
			}

			// Additional changes
			if (move.id === 'bulkup') {
				move.onHit = function (target, source, move) {
					var name = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Do you even lift, bro?!');
				};
			} else if (move.id === 'charm' || move.id === 'sweetkiss' || move.id === 'attract') {
				var malePickUpLines = ['have you been to Fukushima recently? Because you are glowing tonight!',
				'did it hurt when you fell to the earth? Because you must be an angel!', 'can I buy you a drink?',
				'roses are red / lemons are sour / spread your legs / and give me an hour',
				"roses are red / violets are red / I'm not good with colors", "Let's go watch cherry bossoms together (´･ω･`)",
				"Will you be my Denko? (´･ω･`)"];
				malePickUpLines = malePickUpLines.randomize();
				var femalePickUpLines = ['Do you go to the gym? You are buff!', "Guy, you make me hotter than July.",
				"While I stare at you I feel like I just peed myself", "Let's go to my apartment to have midnight coffee",
				"Marry me, I wanna have 10 kids of you!", "Go out with me or I'll twist your neck!", "Man, you have some nice abs, can I touch them?"];
				femalePickUpLines = femalePickUpLines.randomize();
				move.onTryHit = function (target, source, move) {
					var pickUpLine = '';
					if (source.gender === 'M') {
						pickUpLine = malePickUpLines[0];
					} else if (source.gender === 'F') {
						pickUpLine = femalePickUpLines[0];
					} else {
						return;
					}
					var name = (source.ability === 'illusion' && source.illusion) ? source.illusion.toString().substr(4, source.illusion.toString().length) : source.name;
					var targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Hey, ' + targetName + ', ' + pickUpLine);
				};
				move.onMoveFail = function (target, source, move) {
					// Returns false so move calls onHit and onMoveFail
					var femaleRejectLines = ['Uuuh... how about no', "gtfo I'm taken", 'I have to water the plants. On Easter Island. For a year. Bye',
					'GO AWAY CREEP', 'Do you smell like rotten eggs?', "I wouldn't date you even if you were the last Pokemon on earth."];
					femaleRejectLines = femaleRejectLines.randomize();
					var maleRejectLines = ["I'd rather get it on with a dirty daycare Ditto", "I'm not realy sure you're clean",
					"Ew, you're disgusting!", "It's not me, it's you. Go away, ugly duckling.", "Not really interested *cough*weirdo*cough*"];
					maleRejectLines = maleRejectLines.randomize();
					var answer = '';
					if (target.gender === 'M') {
						answer = maleRejectLines[0];
					} else if (target.gender === 'F') {
						answer = femaleRejectLines[0];
					} else {
						return;
					}
					var targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					if (!target.volatiles['attract']) {
						this.add('-message', targetName + ': ' + answer);
					}
				};
			} else if (move.id === 'taunt') {
				var quotes = [
					"Yo mama so fat, she 4x resists Ice- and Fire-type attacks!",
					"Yo mama so ugly, Captivate raises her opponent's Special Attack!",
					"Yo mama so dumb, she lowers her Special Attack when she uses Nasty Plot!",
					"Yo mama so fat, Smogon switched to Pokemon Showdown because PO had an integer overflow bug when you used Grass Knot against her!",
					"Yo mama so dumb, she thought Sylveon would be Light Type!"
				];
				move.onHit = function (target, source) {
					var sourceName = (source.ability === 'illusion' && source.illusion) ? source.illusion.toString().substr(4, source.illusion.toString().length) : source.name;
					this.add('-message', sourceName + ' said, "' + quotes.sample() + '"');
				};
			}
		},
		onFaint: function (pokemon) {
			// A poem every time a Pokemon faints
			var haikus = ["You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
			"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
			"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
			"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
			'Twinkle twinkle little star / fuck you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly",
			"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
			"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy."];
			haikus = haikus.randomize();
			this.add('-message', haikus[0]);
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause']
	},
	{
		name: "May Mayhem",
		section: 'Seasonal',

		team: 'randomSeasonalMM',
		onBegin: function () {
			// Shameless plug
			var date = Date();
			date = date.split(' ');
			if (parseInt(date[2]) === 12) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Treecko32!!');
			}
			if (parseInt(date[2]) === 16) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Joim!!');
			}
		},
		onSwitchIn: function (pokemon) {
			var dice = this.random(100);
			if (dice < 25) {
				this.add('-message', 'Never gonna give you up, never gonna let you down');
			}
		}
	},
	{
		name: "June Jubilee",
		section: 'Seasonal',

		team: 'randomSeasonalJJ',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "Greetings, trainer! Delibird needs your help! It's lost in the US and it needs to find its way back to the arctic before summer starts! Help your Delibird while travelling north, but you must defeat the opponent before he reaches there first!");
			this.setWeather('Sunny Day');
			delete this.weatherData.duration;
		},
		onBeforeMove: function (pokemon, target, move) {
			// Reshiram changes weather with its tail until you reach the arctic
			if (pokemon.template.speciesid === 'reshiram' && pokemon.side.battle.turn < 15) {
				var weatherMsg = '';
				var dice = this.random(100);
				if (dice < 25) {
					this.setWeather('Rain Dance');
					weatherMsg = 'a Drizzle';
				} else if (dice < 50) {
					this.setWeather('Sunny Day');
					weatherMsg = 'a Sunny Day';
				} else if (dice < 75) {
					this.setWeather('Hail');
					weatherMsg = 'Hail';
				} else {
					this.setWeather('Sandstorm');
					weatherMsg = 'a Sandstorm';
				}
				this.add('-message', "Reshiram caused " + weatherMsg + " with its tail!");
				delete this.weatherData.duration;
			}

			if (!pokemon.side.battle.seasonal) pokemon.side.battle.seasonal = {'none':false, 'drizzle':false, 'hail':false};
			if (pokemon.side.battle.turn >= 4 && pokemon.side.battle.seasonal.none === false) {
				this.add('-message', "You are travelling north and you have arrived to North Dakota! There's a clear sky and the temperature is lower here.");
				this.clearWeather();
				pokemon.side.battle.seasonal.none = true;
			}
			if (pokemon.side.battle.turn >= 8 && pokemon.side.battle.seasonal.drizzle === false) {
				this.add('-message', "You are travelling further north and you have arrived to Edmonton! It started raining a lot... and it's effing cold.");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.drizzle = true;
			}
			if (pokemon.side.battle.turn >= 12 && pokemon.side.battle.seasonal.hail === false) {
				this.add('-message', "You have arrived to the arctic! Defeat the other trainer so Delibird can be free!");
				this.setWeather('Hail');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.hail = true;
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.template.id === 'delibird') {
				var name = pokemon.side.name;
				var winner = '';
				if (pokemon.side.id === 'p1') {
					winner = 'p2';
				} else {
					winner = 'p1';
				}
				this.add('-message', "No!! You let Delibird down. He trusted you. You lost the battle, " + name + ". But you lost something else: your Pokémon's trust.");
				pokemon.battle.win(winner);
			}
		}
	},
	{
		name: "Jolly July",
		section: 'Seasonal',

		team: 'randomSeasonalJuly',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "You and your faithful favourite Pokémon are travelling around the world, and you will fight this trainer in many places until either win or finish the travel!");
			// ~learn international independence days with PS~
			var date = Date();
			date = date.split(' ');
			switch (parseInt(date[2])) {
			case 4:
				// 4th of July for the US
				this.add('-message', "FUCK YEAH 'MURICA!");
				break;
			case 5:
				// 5th independence day of Algeria and Venezuela
				this.add('-message', "¡Libertad para Venezuela o muerte!");
				break;
			case 9:
				// 9th independence day of Argentina and South Sudan
				this.add('-message', "¡Che, viteh que somos libres!");
				break;
			case 10:
				// Bahamas lol
				this.add('-message', "Free the beaches!");
				break;
			case 20:
				// Colombia
				this.add('-message', "¡Independencia para Colombia!");
				break;
			case 28:
				// Perú
				this.add('-message', "¡Perú libre!");
				break;
			}
		},
		onBeforeMove: function (pokemon) {
			// Set all the stuff
			var dice = this.random(100);
			if (!pokemon.side.battle.cities) {
				// Set up the cities you visit around the world
				pokemon.side.battle.cities = {
					'N': [
						'Madrid', 'Paris', 'London', 'Ghent', 'Amsterdam', 'Gdansk',
						'Munich', 'Rome', 'Rabat', 'Stockholm', 'Moscow', 'Beijing',
						'Tokyo', 'Dubai', 'New York', 'Vancouver', 'Los Angeles',
						'Edmonton', 'Houston', 'Mexico DF', 'Barcelona', 'Blanes'
					],
					'S': [
						'Buenos Aires', 'Lima', 'Johanesburg', 'Sydney', 'Melbourne',
						'Santiago de Chile', 'Bogota', 'Lima', 'Montevideo',
						'Wellington', 'Canberra', 'Jakarta', 'Kampala', 'Mumbai',
						'Auckland', 'Pretoria', 'Cape Town'
					]
				};
				pokemon.side.battle.currentPlace = {'hemisphere':'N', 'city':'Townsville'};
				pokemon.side.battle.cities.N = pokemon.side.battle.cities.N.randomize();
				pokemon.side.battle.cities.S = pokemon.side.battle.cities.S.randomize();
				pokemon.side.battle.indexes = {'N':0, 'S':0};
				// We choose a hemisphere and city to be in at the beginning
				if (dice < 50) pokemon.side.battle.currentPlace.hemisphere = 'S';
				pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][0];
				pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
			}

			// Snarky comments from one trainer to another
			var diceTwo = this.random(100);
			if (diceTwo > 75) {
				var comments = [
					"I've heard your mom is also travelling around the world catchin' em all, if you get what I mean, %s.",
					"You fight like a Miltank!", "I'm your Stealth Rock to your Charizard, %s!",
					"I bet I could beat you with a Spinda. Or an Unown.", "I'm rubber, you're glue!",
					"I've seen Slowpokes with more training prowess, %s.", "You are no match for me, %s!",
					"%s, have you learned how to battle from Bianca?"
				];
				comments = comments.randomize();
				var otherTrainer = (pokemon.side.id === 'p1') ? 'p2' : 'p1';
				this.add('-message', pokemon.side.name + ': ' + comments[0].replace('%s', pokemon.side.battle[otherTrainer].name));
			}

			// This is the stuff that is calculated every turn once
			if (!pokemon.side.battle.lastMoveTurn) pokemon.side.battle.lastMoveTurn = 0;
			if (pokemon.side.battle.lastMoveTurn !== pokemon.side.battle.turn) {
				var nextChange = this.random(2, 4);
				if (pokemon.side.battle.lastMoveTurn === 0 || pokemon.side.battle.lastMoveTurn + nextChange <= pokemon.side.battle.turn) {
					pokemon.side.battle.lastMoveTurn = pokemon.side.battle.turn;
					if (dice < 50) {
						if (pokemon.side.battle.currentPlace.hemisphere === 'N') {
							pokemon.side.battle.currentPlace.hemisphere = 'S';
							this.add('-fieldstart', 'move: Wonder Room', '[of] Seasonal');
						} else {
							pokemon.side.battle.currentPlace.hemisphere = 'N';
							this.add('-fieldend', 'move: Wonder Room', '[of] Seasonal');
						}
					}

					// Let's check if there's cities to visit left
					if (pokemon.side.battle.indexes.N === pokemon.side.battle.cities['N'].length - 1 &&
						pokemon.side.battle.indexes.S === pokemon.side.battle.cities['S'].length - 1) {
						this.add('-message', "You have travelled all around the world, " + pokemon.side.name + "! You won!");
						pokemon.battle.win(pokemon.side.id);
						return false;
					}
					// Otherwise, move to the next city
					pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]];
					pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
					var hemispheres = {'N':'northern', 'S':'southern'};
					pokemon.side.battle.add('-message', "Travelling around the world, you have arrived to a new city in the " + hemispheres[pokemon.side.battle.currentPlace.hemisphere] + " hemisphere, " + pokemon.side.battle.currentPlace.city + "!");
				}
			}
		},
		onModifyMove: function (move) {
			if (move.id === 'fireblast') move.name = 'July 4th Fireworks';
		}
	},
	{
		name: "Average August",
		section: 'Seasonal',

		team: 'randomSeasonalAA',
		gameType: 'doubles',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			// What does player 1 lead with?
			var p1Where = 'boat';
			var p2Where = 'boat';
			if (this.p1.pokemon[0].name === 'Kyogre') p1Where = 'pirates';
			if (this.p2.pokemon[0].name === 'Kyogre') p2Where = 'pirates';
			var shipNames = [
				'Zarelrules', 'Joimawesome', 'Treeckonoob', 'MJailBait', 'mikelpuns', 'TTTtttttt', 'Frazzle Dazzle',
				'TIbot', 'CDXCIV', 'Srs Bsns Trts', 'Leemz', 'Eggymad', 'Snoffles', 'bmelted', 'Poopes', 'Hugonedugen',
				'Il Haunter', 'chaospwns', 'WaterBro', 'niggie', 'DOOM', 'qhore', 'Jizzmine', 'Aldarown'
			].randomize();
			var whereAreThey = (p1Where === 'boat' && p2Where === 'boat') ? 'You both were aboard the fantastic ship S. S. ' + shipNames[0] :
			((p1Where === 'pirates' && p2Where === 'pirates') ? 'You are two pirate gangs on a summer sea storm about to raze the ship S. S. ' +  shipNames[0] :
			((p1Where === 'pirates') ? this.p1.name : this.p2.name) + ' leads a pirate boat to raze the ship S. S. ' + shipNames[0] +
			' where ' + ((p1Where === 'pirates') ? this.p2.name : this.p1.name)) + ' is enjoying a sea travel,';

			this.add('-message',
				'Alas, poor trainers! ' + whereAreThey + " when a sudden summer Hurricane made a Wailord hit your transport, and now it's sinking! " +
				"There are not enough life boats for everyone nor trainers ain't sharing their Water-type friends, " +
				"so you'll have to fight to access a life boat! Good luck! You have to be fast to not to be hit by the Hurricane!"
			);
		},
		onSwitchIn: function (pokemon) {
			if (pokemon.battle.turn > 0) {
				var result = true;
				for (var i = 0; i < pokemon.battle.sides.length; i++) {
					for (var j = 0; j < pokemon.battle.sides[i].active.length; j++) {
						if (pokemon.battle.sides[i].active[j] && !pokemon.battle.sides[i].active[j].volatiles['perishsong']) {
							result = false;
						}
						if (pokemon.battle.sides[i].active[j] && pokemon.battle.sides[i].active[j].ability !== 'soundproof') {
							pokemon.battle.sides[i].active[j].addVolatile('perishsong');
						} else {
							this.add('-immune', pokemon.battle.sides[i].active[j], '[msg]');
							this.add('-end', pokemon.battle.sides[i].active[j], 'Perish Song');
						}
					}
				}
				if (result) return false;
				this.add('-fieldactivate', 'move: Perish Song');
			}
		}
	},
	{
		name: "School Schemes",
		section: 'Seasonal',

		team: 'randomSeasonalSS',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod']
	},
	{
		name: "Octoberfest",
		section: 'Seasonal',

		mod: 'gen5',
		team: 'randomSeasonalOF',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onModifyMove: function (move) {
			if (move.id === 'trick') {
				delete move.onHit;
				switch (this.random(17)) {
				case 0:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Kick on the nuts!');
					};
					move.category = 'Physical';
					move.type = 'Normal';
					move.basePower = 200;
					break;
				case 1:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Fireworks at your feet!');
					};
					move.category = 'Special';
					move.type = 'Fire';
					move.basePower = 200;
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Doused with water!');
					};
					move.category = 'Special';
					move.type = 'Water';
					move.basePower = 200;
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Bombed with rotten eggs!');
					};
					move.category = 'Special';
					move.type = 'Poison';
					move.basePower = 200;
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', 'Trick: You got scared by a real-looking costume!');
					};
					move.category = 'Special';
					move.type = 'Dark';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', 'Trick: You got hit in the head!');
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Your arms were maimed!');
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "Trick: You've been taunted by those meddling kids!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', 'Treat: You got some yummy seeds!');
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Your car was stolen!');
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're haunted and you're going to die!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', 'Trick: A ghost cursed you!');
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're tormented by the constant tricking!");
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', 'Treat: Om nom nom roots!');
					};
					move.volatileStatus = 'ingrain';
					break;
				case 14:
					move.onTryHit = function () {
						this.add('-message', 'Treat: Uhm, these candy taste weird...');
					};
					var boosts = {};
					var possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 2;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 15:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're tired of running after teenagers with your baseball bat.");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 16:
					move.onTryHit = function () {
						this.add('-message', "Treat: You got candy!");
					};
					move.heal = [1, 2];
					break;
				}
			} else if (move.id === 'present') {
				move.accuracy = 100;
				move.basePower = 0;
				move.category = 'Status';
				move.volatileStatus = 'confusion';
				move.pp = 10;
				move.priority = 0;
				move.name = 'Offer Beer';
				move.boosts = {'atk':-1, 'spa':-1, 'def':1, 'spd':1, 'spe':-1, 'accuracy':-1, 'evasion':1};
				move.onTryHit = function () {
					this.add('-message', "Oh, why, thank you! This beer is delicious!");
				};
				move.effect = {
					onBeforeMove: function (pokemon, target, move) {
						if (this.random(10) < 3) {
							this.useMove('Sing', target);
							return;
						}
					}
				};
			}
		}
	},
	// Thankless Thanksgiving, November 2013
	{
		name: "Thankless Thanksgiving",
                section: 'Seasonal',
                
		team: 'randomSeasonalTT',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod']
	},
	// Christmas Charade, December 2013
	{
		name: "Christmas Charade",
		section: 'Seasonal',

		team: 'randomSeasonalCC',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove: function (move) {
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(19)) {
				case 0:
					move.onTryHit = function () {
						this.add('-message', "The present was a bomb!");
					};
					move.category = 'Physical';
					move.basePower = 250;
					break;
				case 1:
					move.onTryHit = function () {
						this.add('-message', "The present was confusion!");
					};
					move.volatileStatus = 'confusion';
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', "The present was Disable!");
					};
					move.volatileStatus = 'disable';
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', "The present was a taunt!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', "The present was some seeds!");
					};
					move.volatileStatus = 'leechseed';
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', "The present was an embargo!");
					};
					move.volatileStatus = 'embargo';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "The present was a music box!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "The present was a curse!");
					};
					move.volatileStatus = 'curse';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', "The present was Torment!");
					};
					move.volatileStatus = 'torment';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', "The present was a trap!");
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "The present was a root!");
					};
					move.volatileStatus = 'ingrain';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', "The present was a makeover!");
					};
					var boosts = {};
					var possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "The present was psychic powers!");
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', "The present was fatigue!");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 14:
				case 15:
					move.onTryHit = function () {
						this.add('-message', "The present was a snowball hit!");
					};
					move.category = 'Ice';
					move.basePower = 250;
					break;
				case 16:
					move.onTryHit = function () {
						this.add('-message', "The present was a crafty shield!");
					};
					move.volatileStatus = 'craftyshield';
					break;
				case 17:
					move.onTryHit = function () {
						this.add('-message', "The present was an electrification!");
					};
					move.volatileStatus = 'electrify';
					break;
				case 18:
					move.onTryHit = function () {
						this.add('-message', "The present was an ion deluge!");
					};
					move.volatileStatus = 'iondeluge';
					break;
				}
			}
		}
	},
	// Winter's Wont, January 2014
        {
		name: "Winter's Wont",
		section: 'Seasonal',

		gameType: 'doubles',
		team: 'randomSeasonalWinter',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		maxLevel: 1000,
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	// Fabulous February, February 2014
	{
		name: "Fabulous February",
		section: 'Seasonal',

		gameType: 'doubles',
		team: 'randomSeasonalFFY',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "新年快乐");
		},
		onModifyMove: function (move) {
			if (move.id === 'explosion') move.name = 'Firecrackers';
			else if (move.type === 'Fire') move.name = 'Fireworks';
		},
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Strikes Back",
		section: 'Seasonal',

		gameType: 'triples',
		team: 'randomSeasonalSB',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "V4 is a big poo-poo!");
		},
		onModifyMove: function (move) {
			// Change present mechanics
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(16)) {
				case 0:
					move.onTryHit = function () {
						this.add('-message', "The present was a bomb!");
					};
					move.category = 'Physical';
					move.basePower = 250;
					break;
				case 1:
					move.onTryHit = function () {
						this.add('-message', "The present was confusion!");
					};
					move.volatileStatus = 'confusion';
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', "The present was Disable!");
					};
					move.volatileStatus = 'disable';
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', "The present was a taunt!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', "The present was some seeds!");
					};
					move.volatileStatus = 'leechseed';
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', "The present was an embargo!");
					};
					move.volatileStatus = 'embargo';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "The present was a music box!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "The present was a curse!");
					};
					move.volatileStatus = 'curse';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', "The present was Torment!");
					};
					move.volatileStatus = 'torment';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', "The present was a trap!");
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "The present was a root!");
					};
					move.volatileStatus = 'ingrain';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', "The present was a makeover!");
					};
					var boosts = {};
					var possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "The present was psychic powers!");
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', "The present was fatigue!");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 14:
				case 15:
					move.onTryHit = function () {
						this.add('-message', "The present was a snowball hit!");
					};
					move.category = 'Ice';
					move.basePower = 250;
					break;
				}
			} else {
				// Change move type time to time only when the move is not present.
				if (this.random(100) < 35 && move.target !== 'self') {
					var type = '';
					switch (move.type.toLowerCase()) {
					case 'rock':
					case 'ground':
						type = 'Grass';
						break;
					case 'fire':
					case 'bug':
						type = 'Water';
						break;
					case 'water':
					case 'grass':
						type = 'Fire';
						break;
					case 'flying':
						type = 'Fighting';
						break;
					case 'fighting':
						type = 'Flying';
						break;
					case 'dark':
						type = 'Bug';
						break;
					case 'dragon':
					case 'poison':
						type = 'Fairy';
						break;
					case 'electric':
						type = 'Ice';
						break;
					case 'ghost':
						type = 'Normal';
						break;
					case 'ice':
						type = 'Electric';
						break;
					case 'normal':
						type = 'Ghost';
						break;
					case 'psychic':
						type = 'Dark';
						break;
					case 'steel':
						type = 'Poison';
						break;
					case 'fairy':
						type = 'Dragon';
						break;
					}

					move.type = type;
					this.add('-message', 'LOL trolled I changed yer move type hahaha');
				}
			}
		},
		onSwitchIn: function (pokemon) {
			if (this.random(100) < 25) {
				this.add('-message', pokemon.name + " drank way too much!");
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onFaint: function (pokemon) {
			// A poem every time a Pokemon faints
			var haikus = ["You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
			"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
			"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
			"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
			'Twinkle twinkle little star / screw you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly",
			"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
			"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy."];
			haikus = haikus.randomize();
			this.add('-message', haikus[0]);
		}
	},
	{
		name: "Sleigh Showdown",
		section: "Seasonal",

		team: 'randomSeasonalSleigh',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "Yikes! You are a grinch in a reckless, regretless sleigh race, running for Showdownville to ruin christmas. But, to achieve that, you must first defeat your opponent. Fight hard and take care with the obstacles!");
			this.seasonal = {position: [0, 0], weight: [2500, 2500]};
		},
		onModifyMove: function (move) {
			if (move.type === 'Fire') {
				move.onHit = function (pokemon, source) {
					this.add('-message', "The fire melts the snow, slowing down the sleigh!");
					this.boost({spe: -1}, pokemon, source);
				};
			}
			if (move.type === 'Water') {
				if (this.random(100) < 25) {
					this.add('-message', "The cold froze your Water-type attack, making it Ice-type instead!");
					move.type = 'Ice';
				}
			}
			if (move.type === 'Ice') {
				move.onHit = function (pokemon, source) {
					this.add('-message', "The ice makes the surface more slippery, speeding up the sleigh!");
					this.boost({spe: 1}, pokemon, source);
				};
			}
			if (move.id === 'present') {
				move.name = "Throw sack present";
				move.accuracy = 100;
				move.basePower = 0;
				move.category = "Status";
				move.heal = null;
				move.boosts = null;
				move.target = 'normal';
				move.status = null;
				move.type = "Normal";
				switch (this.random(9)) {
					case 0:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got an Excadreydle from the sack!");
							this.seasonal.weight[source.side.n] -= 40.4;
						};
						move.boosts = {spe: -1};
						break;
					case 1:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got a Chandelnukkiyah from the sack!");
							this.seasonal.weight[source.side.n] -= 34.3;
						};
						move.status = 'brn';
						break;
					case 2:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got a Glalie from the sack! Ka-boom!");
							this.seasonal.weight[source.side.n] -= 256.5;
						};
						move.category = 'Special';
						move.basePower = 300;
						break;
					case 3:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got a tree Starmie from the sack!");
							this.seasonal.weight[source.side.n] -= 80;
						};
						move.category = 'Special';
						move.type = 'Water';
						move.basePower = 150;
						break;
					case 4:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got an Abomaxmas tree from the sack!");
							this.seasonal.weight[source.side.n] -= 40.4;
						};
						move.category = 'Physical';
						move.type = 'Ice';
						move.basePower = 150;
						break;
					case 5:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got a Chansey egg nog from the sack!");
							this.seasonal.weight[source.side.n] -= 34.6;
						};
						move.target = 'self';
						move.heal = [3, 4];
						break;
					case 6:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got Cryogonal snowflakes from the sack!");
							this.seasonal.weight[source.side.n] -= 148;
						};
						move.category = 'Special';
						move.type = 'Ice';
						move.basePower = 200;
						break;
					case 7:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got Pikachu-powered christmas lights from the sack!");
							this.seasonal.weight[source.side.n] -= 6;
						};
						move.category = 'Special';
						move.type = 'Electric';
						move.basePower = 250;
						break;
					case 8:
						move.onTryHit = function (target, source) {
							this.add('-message', "You got Shaymin-Sky mistletoe from the sack!");
							this.seasonal.weight[source.side.n] -= 5.2;
						};
						move.category = 'Special';
						move.type = 'Grass';
						move.basePower = 200;
						break;
				}
			}
		},
		onBeforeMove: function (pokemon, target, move) {
			// Before every move, trainers advance on their sleighs. There might be obstacles.
			// We add more speed the less loaded the sleigh is.
			// Then, we get a random number from 0 to 99, then calculate if it's less than (Pokémon's speed * 0.083) + 5.
			var speed = Math.abs(pokemon.speed) + Math.ceil((2500 - this.seasonal.weight[pokemon.side.n]) / 25);
			if (this.random(100) < Math.ceil(speed * 0.083) + 5) {
				var name = pokemon.illusion ? pokemon.illusion.name : pokemon.name;
				// If an obstacle is found, the trainer won't advance this turn.
				switch (this.random(6)) {
				case 0:
				case 1:
				case 2:
					this.add('-message', "" + name + " hit a tree and some snow fell on it!");
					pokemon.cureStatus();
					this.damage(Math.ceil(pokemon.maxhp / 10), pokemon, pokemon, "head injuries", true);
					break;
				case 3:
					this.add('-message', "" + name + " hit a snow bank!");
					pokemon.setStatus('frz', pokemon, null, true);
					this.add('cant', pokemon, 'frz');
					return false;
				case 4:
					this.add('-message', "" + name + " fell into a traphole!");
					this.boost({spe: -1}, pokemon, pokemon, move);
					break;
				case 5:
					this.add('-message', "" + name + " hit a heavy wall!");
					// override status
					pokemon.setStatus('par', pokemon, null, true);
					break;
				}
			} else {
				// If no obstacles, the trainer advances as much meters as speed its Pokémon has.
				this.add('-message', "" + pokemon.side.name + " has advanced down the mountain " + speed + " meters!");
				this.seasonal.position[pokemon.side.n] += speed;
			}

			// Showdownville is about 4000 meters away from the mountaintop.
			if (this.seasonal.position[pokemon.side.n] >= 3500) {
				this.add('-message', "" + pokemon.side.name + " has arrived to Showdownville first and ruined christmas! The race is won!");
				this.win(pokemon.side.id);
			}
		},
		onHit: function (target) {
			// Getting hit thaws the ice if you are frozen.
			if (target.status === 'frz') target.cureStatus();
		}
	},
	// Spacetime Funtimes, January 2015
	{
		name: "Spacetime Funtimes",
		section: "Seasonal",

		team: 'randomSeasonalSFT',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('message', "Dialga and Palkia have distorted space and time!");
			// This shouldn't happen.
			if (!this.seasonal) this.seasonal = {scenario: 'lotr'};

			// Add the message for the scenario.
			this.add('-message', {
				'gen1': "It appears that you have travelled to the past! This looks like... 1997!",
				'lotr': "You find yourselves in middle of an epic battle for Middle Earth!",
				'redblue': "Wow! You are taking part in the most epic Pokémon fight ever!",
				'terminator': "You are caught up in the epic apocalyptic battle of the machines against the humans!",
				'desert': "It's no less than the exodus itself!",
				'shipwreck': "You're on a giant ship that was rekt by an iceberg. And the fish Pokémon want to eat the sailors!"
			}[this.seasonal.scenario]);

			// Let's see what's the scenario and change space and time.
			if (this.seasonal.scenario === 'lotr') {
				this.addPseudoWeather('wonderroom', this.p1.pokemon[0], null, '[of] Seasonal');
				delete this.pseudoWeather.wonderroom.duration;
			} else if (this.seasonal.scenario === 'terminator') {
				this.addPseudoWeather('trickroom', this.p1.pokemon[0], null, '[of] Seasonal');
				delete this.pseudoWeather.trickroom.duration;
			} else if (this.seasonal.scenario === 'gen1') {
				this.addPseudoWeather('magicroom', this.p1.pokemon[0], null, '[of] Seasonal');
				delete this.pseudoWeather.magicroom.duration;
			} else if (this.seasonal.scenario === 'desert') {
				this.setWeather(['Sandstorm', 'Sunnyday'][this.random(2)]);
				delete this.weatherData.duration;
			} else if (this.seasonal.scenario === 'shipwreck') {
				this.setWeather('raindance');
				this.addPseudoWeather('watersport', this.p1.pokemon[0], null, '[of] Seasonal');
				delete this.pseudoWeather.watersport.duration;
				delete this.weatherData.duration;
			}
		},
		onFaint: function (target, source) {
			if (this.seasonal.scenario === 'gen1') {
				if (source && source.removeVolatile) source.removeVolatile('mustrecharge');
				if (target && target.side) target.side.removeSideCondition('reflect');
				this.queue = [];
			}
		},
		onModifyMove: function (move) {
			if (this.seasonal.scenario === 'gen1') {
				if (move.id === 'blizzard') {
					move.accuracy = 90;
				}
				if (move.id === 'psychic') {
					move.secondary = {chance: 33, boosts: {spd: -1, spa: -1}};
				}
				if (move.id === 'amnesia') {
					move.boosts = {spa:2, spd:2};
				}
				if (move.id === 'hyperbeam') {
					move.category = 'Physical';
				}
			}
			if (this.seasonal.scenario === 'lotr') {
				if (move.id === 'growl') {
					move.name = 'Throw ring to lava';
					move.category = 'Special';
					move.basePower = 160;
					move.type = 'Fire';
					move.accuracy = true;
					move.self = {volatileStatus: 'mustrecharge'};
					move.onTryHit = function () {
						this.add('-message', 'Frodo throws the one ring into the lava!');
					};
				}
				if (move.id === 'thousandarrows') {
					move.onBasePower = function (basePower, pokemon, target) {
						if (target.name === 'Smaug') {
							this.add('-message', "Bard's arrow pierces through Smaug's diamond-tough skin!");
							return this.chainModify(3);
						}
					};
				}
			}
		},
		onSwitchIn: function (pokemon) {
			if (this.seasonal.scenario === 'lotr') {
				if (pokemon.name === 'Frodo') {
					this.add('-message', 'The One Ring gives power to Frodo!');
					this.add('-start', pokemon, 'typechange', 'Ground/Fairy');
					this.boost({def:2, spd:2, evasion:2}, pokemon);
					pokemon.typesData = [
						{type: 'Ground', suppressed: false,  isAdded: false},
						{type: 'Fairy', suppressed: false,  isAdded: true}
					];
				}
				if (pokemon.name === 'Gandalf') {
					this.add('-message', 'Fly, you fools!');
					this.boost({spe:1}, pokemon);
				}
				if (pokemon.name === 'Saruman') {
					this.add('-message', 'Against the power of Mordor there can be no victory.');
					this.boost({spd:1}, pokemon);
				}
				if (pokemon.name === 'Legolas') {
					this.add('-message', "They're taking the hobbits to Isengard!");
					this.boost({atk:1, spa:1}, pokemon);
				}
				if (pokemon.name === 'Boromir') {
					this.add('-message', 'One does not simply walk into Mordor.');
					pokemon.addVolatile('confusion');
				}
				if (pokemon.name === 'Aragorn') {
					this.add('-message', 'Aragorn, son of Arathor, king of Gondor.');
					this.boost({spd:1}, pokemon);
				}
				if (pokemon.name === 'Pippin') {
					this.add('-message', 'How about second breakfast?');
					this.boost({def:1, spd:1}, pokemon);
				}
				if (pokemon.name === 'Merry') {
					this.add('-message', "I don't think he knows about second breakfast, Pippin.");
					this.boost({def:1, spd:1}, pokemon);
				}
				if (pokemon.name === 'Samwise') {
					this.add('-message', 'Mr. Frodo!!');
					this.add('-start', pokemon, 'typechange', 'Normal/Fairy');
					this.boost({spe:3}, pokemon);
					pokemon.typesData = [
						{type: 'Normal', suppressed: false,  isAdded: false},
						{type: 'Fairy', suppressed: false,  isAdded: true}
					];
				}
				if (pokemon.name === 'Nazgûl') {
					this.add('-message', 'One ring to rule them all.');
				}
				if (pokemon.name === 'Smaug') {
					this.add('-message', 'I am fire. I am death.');
				}
				if (pokemon.name === 'Treebeard') {
					this.add('-message', 'Come, my friends. The ents are going to war!');
					this.boost({spe:2}, pokemon);
				}
				if (pokemon.name === 'Bard') {
					this.add('-message', 'Black arrow! Go now and speed well!');
					this.boost({accuracy:1, evasion:1}, pokemon);
				}
				if (pokemon.name === 'Gollum') {
					this.add('-message', 'My preciousssss!');
					this.boost({accuracy:6, evasion:1}, pokemon);
				}
				if (pokemon.name === 'Moses') {
					this.add('-message', 'Let my people go!');
					this.boost({spd:1}, pokemon);
				}
			}
			if (this.seasonal.scenario === 'gen1') {
				pokemon.side.removeSideCondition('reflect');
			}
		}
	},
	// Han vs Hun, February 2015
	{
		// Get it? They're Han Chinese!
		name: "Han vs Hun",
		section: "Seasonal",

		team: 'randomSeasonalMulan',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('message', "General Shang! The Huns are marching towards the Imperial City! Train your recruits quickly and make your stand!");
			this.seasonal.songCount = 0;
			this.seasonal.song = [
				"Let's get down to business, to defeat the Huns!", "Did they send me daughters, when I asked for sons?",
				"You're the saddest bunch I ever met.", "But you can bet, before we're through...", "Mister, I'll make a man out of you!",
				"Tranquil as a forest, but on fire within.", "Once you find your center, you are sure to win!",
				"You're a spineless, pale, pathetic lot, and you haven't got a clue.", "Somehow, I'll make a man out of you!",
				"I'm never gonna catch my breath...", "Say goodbye to those who knew me...", "Boy, was I a fool in school for cutting gym...",
				"This guy's got them scared to death!", "Hope he doesn't see right through me...", "Now I really wish I knew how to swim...",
				"We must be swift as a coursing river!", "With all the force of a great typhoon!", "With all the strength of a raging fire!",
				"Mysterious as the dark side of the moon!", "Time is racing towards us, 'til the Huns arrive.",
				"Heed my every order, and you might survive!", "You're unsuited for the rage of war.", "So pack up, go home, you're through.",
				"How could I make a man out of you?", "We must be swift as a coursing river!", "With all the force of a great typhoon!",
				"With all the strength of a raging fire!", "Mysterious as the dark side of the moon!"
			];
			this.seasonal.verses = {4: true, 8: true, 14: true, 18: true, 23: true, 27: true};
			this.seasonal.morale = 0;
		},
		onModifyMove: function (move) {
			if (move.id === 'sing') {
				move.name = "Train Recruits";
				move.accuracy = 100;
				move.target = "self";
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Bulk Up", source);
					if (this.seasonal.songCount < this.seasonal.song.length) {
						this.add('-message', '"' + this.seasonal.song[this.seasonal.songCount] + '"');
						if (this.seasonal.verses[this.seasonal.songCount]) {
							this.add('-message', "Because of the difficult training, the new recruits are more experienced!");
							if (this.seasonal.songCount === 27) {
								this.add('-message', "The recruits are now fully trained!");
							}
							this.seasonal.morale++;
						}
						this.seasonal.songCount++;
					} else {
						this.add('-message', "The soldiers cannot be trained further!");
					}
					return null;
				}
			} else if (move.id === 'flameburst') {
				move.name = "Fire Rocket";
				move.category = 'Physical';
				move.basePower = 180;
				move.type = 'Fire';
				move.accuracy = 85;
				move.ignoreOffense = true; // Fireworks not affected by boosts from morale
				move.onTry = function (source, target) {
					// If the soldier is inexperienced, the rocket can explode in their face. 50% chance at 0 morale, 33% at 1, 17% at 2, 0% afterwards.
					if (source.name !== 'Li Shang' && (this.random(6) > (this.seasonal.morale + 2))) {
						this.add('-message', "But " + source.name + "'s inexperience caused the rocket to explode before launch!");
						this.damage(Math.ceil(source.maxhp / 8), source, source, "the explosion", true);
						return null;
					}
				}
			}
		},
		onSwitchIn: function (pokemon) {
			this.seasonal.morale = this.seasonal.morale || 0;
			if (pokemon.name in {'Mulan': 1, 'Yao': 1, 'Ling': 1, 'Chien-Po': 1, 'Mushu': 1}) {
				var offense = Math.floor(this.seasonal.morale / 2) - 1;
				var defense = Math.ceil(this.seasonal.morale / 2) - 1;
				this.boost({atk: offense, spa: offense, def: defense, spd: defense}, pokemon, pokemon, this.getMove('sing'));

				// Make Mushu Dragon/Fire type.
				if (pokemon.name === 'Mushu') {
					pokemon.addType('Fire');
					this.add('-start', pokemon, 'typeadd', 'Fire', '[from] ' + pokemon);
				}
			}
		},
		onResidual: function () {
			if (this.seasonal.songCount < this.seasonal.song.length) {
				this.add('-message', '"' + this.seasonal.song[this.seasonal.songCount] + '"');
				var pokemon = null;
				if (this.seasonal.verses[this.seasonal.songCount]) {
					this.add('-message', "Because of the difficult training, the new recruits are more experienced!");
					if (this.seasonal.songCount === 27) {
						this.add('-message', "The recruits are now fully trained!");
					}
					if (this.p1.active[0].name in {'Mulan': 1, 'Yao': 1, 'Ling': 1, 'Chien-Po': 1, 'Mushu': 1}) {
						pokemon = this.p1.active[0];
					} else if (this.p2.active[0].name in {'Mulan': 1, 'Yao': 1, 'Ling': 1, 'Chien-Po': 1, 'Mushu': 1}) {
						pokemon = this.p2.active[0];
					}
					if (pokemon && pokemon.hp) {
						var boosts = (this.seasonal.morale % 2 ? {atk: 1, spa: 1} : {def: 1, spd: 1});
						this.boost(boosts, pokemon, pokemon, this.getMove('sing'));
					}
					this.seasonal.morale++;
				}
				
				this.seasonal.songCount++;
			}
		}
	},
	{
		name: "Super Staff Bros.",
		section: "Seasonal",

		team: 'randomSeasonalStaff',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
			this.add('message', "GET READY FOR THE NEXT BATTLE!");
			// This link leads to a post where all signature moves can be found so the user can use this resource while battling.
			this.add("raw|Seasonal help for moves can be found <a href='https://www.smogon.com/forums/threads/3491902/page-6#post-6093168'>here</a>");
			// Prepare Steamroll's special lead role.
			if (toId(this.p1.pokemon[0].name) === 'steamroll') {
				this.add('c|@Steamroll|I wasn\'t aware we were starting. Allow me...');
				this.p1.pokemon[0].isLead = true;
			}
			if (toId(this.p2.pokemon[0].name) === 'steamroll') {
				this.add('c|@Steamroll|I wasn\'t aware we were starting. Allow me...');
				this.p2.pokemon[0].isLead = true;
			}
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;

			// This code here is used for the renaming of moves showing properly on client.
			var globalRenamedMoves = {
				'defog': "Defrog"
			};
			var customRenamedMoves = {
				"cathy": {
					'kingsshield': "Heavy Dosage of Fun",
					'calmmind': "Surplus of Humour",
					'shadowsneak': "Patent Hilarity",
					'shadowball': "Ion Ray of Fun",
					'shadowclaw': "Sword of Fun",
					'flashcannon': "Fun Cannon",
					'dragontail': "/kick",
					'hyperbeam': "/ban"
				}
			};
			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);

			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				var last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (var j = 0; j < pokemon.moveset.length; j++) {
					var moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					var customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Here we add some flavour or design immunities.
		onImmunity: function (type, pokemon) {
			// Great Sage is naturally immune to Attract.
			if (type === 'attract' && toId(pokemon.name) === 'greatsage') {
				this.add('-immune', pokemon, '[from] Irrelevant');
				return false;
			}
			// qtrx is immune to Torment or Taunt.
			if ((type === 'torment' || type === 'taunt') && pokemon.volatiles['unownaura']) {
				this.add('-immune', pokemon, '[from] Unown aura');
				return false;
			}
			// Somalia's Ban Spree makes it immune to some move types, since he's too mad to feel pain.
			// Types have been chosen from types you can be immune against with an ability.
			if (toId(pokemon.name) === 'somalia' && type in {'Ground':1, 'Water':1, 'Fire':1, 'Grass':1, 'Poison':1, 'Normal':1, 'Electric':1}) {
				this.add('-message', "You can't stop SOMALIA in middle of his Ban Spree!");
				return false;
			}
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			var name = toId(pokemon.name);

			if (pokemon.template.isMega) {
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine'); // Announced ability.
				}
				if (name === 'enguarde' && pokemon.getAbility().id === 'innerfocus') {
					pokemon.setAbility('superluck');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'shrang' && pokemon.getAbility().id === 'levitate') {
					pokemon.setAbility('pixilate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'audiosurfer' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('pixilate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'dtc' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('levitate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'trinitrotoluene' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('protean');
					this.add('-ability', pokemon, pokemon.ability);
				}
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// No OP pls. Balance stuff, changing them upon switch in. Wonder Guard gets curse to minimise their turns out.
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			// Weak Pokémon get a boost so they can fight amongst the other monsters.
			// Innovamania is just useless, so the boosts are a prank.
			if (name === 'test2017' && !pokemon.illusion) {
				this.boost({atk:1}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'okuu' && !pokemon.illusion) {
				this.boost({def:2, spd:1}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'innovamania' && !pokemon.illusion) {
				this.boost({atk:6, def:6, spa:6, spd:6, spe:6, accuracy:6}, pokemon, pokemon, 'divine grace');
			}
			if (name === 'bloobblob' && !pokemon.illusion) {
				this.boost({def:1, spd:1, spe:2}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'timbuktu' && !pokemon.illusion) {
				this.boost({def:-2, spd:-1}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'electrolyte') {
				pokemon.lastAttackType = 'None';
			}
			// Deal with kupo's special transformation ability.
			if (pokemon.kupoTransformed) {
				pokemon.name = '@kupo';
				pokemon.kupoTransformed = false;
			}
			// Deal with Timbuktu's move (read onModifyMove relevant part).
			if (name === 'timbuktu') {
				pokemon.timesGeoblastUsed = 0;
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			var oldAbility = pokemon.ability;
			if (pokemon.template.isMega) {
				if (name === 'theimmortal' && pokemon.getAbility().id !== 'cloudnine') {
					pokemon.setAbility('cloudnine'); // Announced ability.
				}
				if (name === 'dell' && pokemon.getAbility().id !== 'adaptability') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'enguarde' && pokemon.getAbility().id !== 'superluck') {
					pokemon.setAbility('superluck');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skitty' && pokemon.getAbility().id !== 'shedskin') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'audiosurfer' && pokemon.getAbility().id !== 'pixilate') {
					pokemon.setAbility('pixilate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'dtc' && pokemon.getAbility().id !== 'levitate') {
					pokemon.setAbility('levitate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'shrang' && pokemon.getAbility().id !== 'pixilate') {
					pokemon.setAbility('pixilate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'trinitrotoluene' && pokemon.getAbility().id !== 'protean') {
					pokemon.setAbility('protean');
					this.add('-ability', pokemon, pokemon.ability);
				}
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'mikel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.typesData = [
					{type: 'Normal', suppressed: false,  isAdded: false},
					{type: 'Ghost', suppressed: false,  isAdded: false}
				];
			}
			if (name === 'qtrx') {
				this.add('-message', pokemon.name + " is radiating an Unown aura!"); // Even if only illusion.
				if (!pokemon.illusion) {
					pokemon.addVolatile('unownaura');
					this.add('-start', pokemon, 'typechange', 'Normal/Psychic');
					pokemon.typesData = [
						{type: 'Normal', suppressed: false,  isAdded: false},
						{type: 'Psychic', suppressed: false,  isAdded: false}
					];
				}
				pokemon.addVolatile('focusenergy');
				this.boost({evasion: -1}, pokemon, pokemon, 'Unown aura');
			}
			if (name === 'birkal' && !pokemon.illusion) {
				pokemon.addType('Bird');
				this.add('-start', pokemon, 'typeadd', 'Bird', '[from] ability: Caw');
			}

			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			var sentences = [];
			var sentence = '';

			// Admins.
			if (name === 'antar') {
				this.add("c|~Antar|It's my time in the sun.");
			}
			if (name === 'chaos') {
				this.add("c|~chaos|I always win");
			}
			if (name === 'haunter') {
				this.add("c|~haunter|Dux mea lux");
			}
			if (name === 'jasmine') {
				if (this[((pokemon.side.id === 'p1') ? 'p2' : 'p1')].active[0].name.charAt(0) === '%') {
					sentence = "Back in my day we didn't have Drivers.";
				} else {
					sentences = ["Your mum says hi.", "Sorry I was just enjoying a slice of pineapple pizza, what was I supposed to do again?", "I could go for some Cheesy Chips right about now.", "I'd tap that.", "/me throws coffee at the server"].randomize();
					sentence = sentences[0];
				}
				this.add('c|~Jasmine|' + sentence);
			}
			if (name === 'joim') {
				var dice = this.random(4);
				if (dice === 1) {
					// Fullscreen toucan!
					this.add('-message', '░░░░░░░░▄▄▄▀▀▀▄▄███▄');
					this.add('-message', '░░░░░▄▀▀░░░░░░░▐░▀██▌');
					this.add('-message', '░░░▄▀░░░░▄▄███░▌▀▀░▀█');
					this.add('-message', '░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌');
					this.add('-message', '░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄');
					this.add('-message', '░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄');
					this.add('-message', '░░░░░░░░░░░░░▐░░░░▐███████████▄');
					this.add('-message', '░░blessed by░░░░▐░░░░▐█████████████▄');
					this.add('-message', '░░le toucan░░░░░░▀▄░░░▐██████████████▄');
					this.add('-message', '░░░░░░ of ░░░░░░░░▀▄▄████████████████▄');
					this.add('-message', '░░░░░luck░░░░░░░░░░░░░█▀██████');
				} else if (dice === 2) {
					// Too spammy, sends it to chat only.
					this.add('c|~Joim|░░░░░░░░░░░░▄▐');
					this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
					this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
					this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
					this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
					this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
					this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
					this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
					this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
					this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
					this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
					this.add('c|~Joim|░░░░░░░▀███▀█░▄');
					this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
					this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
					this.add('c|~Joim|░░░░░░█░░░░░░░░█');
					this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
					this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
				} else if (dice === 3) {
					this.add('-message', '░░░░░░░░░░░░▄▄▄▄░░░░░░░░░░░░░░░░░░░░░░░▄▄▄▄▄');
					this.add('-message', '░░░█░░░░▄▀█▀▀▄░░▀▀▀▄░░░░▐█░░░░░░░░░▄▀█▀▀▄░░░▀█▄');
					this.add('-message', '░░█░░░░▀░▐▌░░▐▌░░░░░▀░░░▐█░░░░░░░░▀░▐▌░░▐▌░░░░█▀');
					this.add('-message', '░▐▌░░░░░░░▀▄▄▀░░░░░░░░░░▐█▄▄░░░░░░░░░▀▄▄▀░░░░░▐▌');
					this.add('-message', '░█░░░░░░░░░░░░░░░░░░░░░░░░░▀█░░░░░░░░░░░░░░░░░░█');
					this.add('-message', '▐█░░░░░░░░░░░░░░░░░░░░░░░░░░█▌░░░░░░░░░░░░░░░░░█');
					this.add('-message', '▐█░░░░░░░░░░░░░░░░░░░░░░░░░░█▌░░░░░░░░░░░░░░░░░█');
					this.add('-message', '░█░░░░░░░░░░░░░░░░░░░░█▄░░░▄█░░░░░░░░░░░░░░░░░░█');
					this.add('-message', '░▐▌░░░░░░░░░░░░░░░░░░░░▀███▀░░░░░░░░░░░░░░░░░░▐▌');
					this.add('-message', '░░█░░░░░░░░░░░░░░░░░▀▄░░░░░░░░░░▄▀░░░░░░░░░░░░█');
					this.add('-message', '░░░█░░░░░░░░░░░░░░░░░░▀▄▄▄▄▄▄▄▀▀░░░░░░░░░░░░░█');
				} else {
					sentences = ["Gen 1 OU is a true skill metagame.", "Finally a good reason to punch a teenager in the face!", "So here we are again, it's always such a pleasure.", "( ͝° ͜ʖ͡°)"].randomize();
					sentence = sentences[0];
					this.add('c|~Joim|' + sentence);
				}
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Give me my robe, put on my crown!');
			}
			if (name === 'v4') {
				sentences = ["Oh right. I'm still here...", "WHAT ELSE WERE YOU EXPECTING?!", "Soaring on beautiful buttwings."].randomize();
				this.add('c|~V4|' + sentences[0]);
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|Your mom');
			}

			// Leaders.
			if (name === 'hollywood') {
				this.add('c|&hollywood|Kappa');
			}
			if (name === 'jdarden') {
				this.add('c|&jdarden|Did someone call for some BALK?');
			}
			if (name === 'okuu') {
				sentences = ["Current Discussion Topics: Benefits of Nuclear Energy, green raymoo worst raymoo, ...", "Current Discussion Topics: I ate the Sun - AMA, Card Games inside of Fighting Games, ...", "Current Discussion Topics: Our testing process shouldn't include Klaxons, Please remove Orin from keyboard prior to entering chat, ...", "Current Discussion Topics: Please refrain from eating crow, We'll get out of Beta once we handle all of this Alpha Decay, ...", "Current Discussion Topics: Schroedinger's Chen might still be in that box, I'm So Meta Even This Acronym, ...", "Current Discussion Topics: What kind of idiot throws knives into a thermonuclear explosion?, わからない ハハハ, ..."].randomize();
				this.add("raw|<div class=\"broadcast-blue\"><b>" + sentences[0] + "</b></div>");
			}
			if (name === 'sirdonovan') {
				this.add('c|&sirDonovan|Oh, a battle? Let me finish my tea and crumpets');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|xD');
			}
			if (name === 'verbatim') {
				this.add('c|&verbatim|All in');
			}

			// Mods.
			if (name === 'acedia') {
				this.add('c|@Acedia|Time for a true display of skill ( ͡° ͜ʖ ͡°)');
			}
			if (name === 'am') {
				this.add('c|@AM|Lucky and Bad');
			}
			if (name === 'antemortem') {
				this.add('c|@antemortem|I Am Here To Oppress Users');
			}
			if (name === 'ascriptmaster') {
				this.add("c|@Ascriptmaster|Good luck, I'm behind 7 proxies");
			}
			if (name === 'asgdf') {
				sentences = ["Steel waters run deep, they say!", "I will insteell fear in your heart!", "Man the harpuns!"].randomize();
				this.add('c|@asgdf|' + sentences[0]);
			}
			if (name === 'audiosurfer') {
				pokemon.phraseIndex = this.random(3);
				if (pokemon.phraseIndex === 2) {
					var singers = ['Waxahatchee', 'Speedy Ortiz', 'Sufjan Stevens', 'Kendrick Lamar'];
					this.add('c|@Audiosurfer|Have you heard the new ' + singers[this.random(4)] + ' song?');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|@Audiosurfer|If you were worth playing you wouldn\'t be on the ladder.');
				} else {
					this.add('c|@Audiosurfer| Just came back from surfing. Don\'t believe me? Here\'s a pic: http://fc02.deviantart.net/fs70/i/2011/352/d/3/surf_all_the_oceans_by_dawn_shade-d4jga6b.png');
				}
			}
			if (name === 'barton') {
				this.add('c|@barton|free passion');
			}
			if (name === 'bean') {
				sentences = ["Everybody wants to be a cat", "if you KO me i'll ban u on PS", "just simply outplay the coin-toss"].randomize();
				this.add('c|@bean|' + sentences[0]);
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
			}
			if (name === 'biggie') {
				sentences = ["Now I'm in the limelight cause I rhyme tight", "HAPPY FEET! WOMBO COMBO!", "You finna mess around and get dunked on"].randomize();
				this.add('c|@BiGGiE|' + sentences[0]);
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|How Can Mirrors Be Real If Our Eyes Aren\'t Real? ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'businesstortoise') {
				this.add('c|@Business Tortoise|' + ["Another day, another smile :)", "Hello this is steve, how may I help you?"][this.random(2)]);
			}
			if (name === 'coolstorybrobat') {
				pokemon.phraseIndex = this.random(5);
				switch (pokemon.phraseIndex) {
					case 1:
						sentence = "Time to GET SLAYED";
						break;
					case 2:
						sentence = "BRUH!";
						break;
					case 3:
						sentence = "Ahem! Gentlemen...";
						break;
					case 4:
						sentence = "I spent 6 months training in the mountains for this day!";
						break;
					default:
						sentence = "Shoutout to all the pear...";
				}
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'dell') {
				this.add('c|@Dell|<[~.~]> Next best furry besides Yoshi taking the stand!');
			}
			if (name === 'eeveegeneral') {
				sentences = ['Eevee army assemble!', 'To the ramparts!', 'You and what army?'];
				this.add('c|@Eevee General|' + sentences[this.random(3)]);
			}
			if (name === 'electrolyte') {
				this.add('c|@Electrolyte|Eyyy where the middle school azn girls at??');
			}
			if (name === 'eos') {
				this.add('c|@Eos|ᕦ༼ຈل͜ຈ༽ᕤ');
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|/me enters battle');
			}
			if (name === 'genesect') {
				pokemon.phraseIndex = this.random(6);
				if (pokemon.phraseIndex === 5) {
					this.add('-message', '░░ ░░ ██ ██ ██ ██ ██ ░░ ░░');
					this.add('-message', '░░ ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░');
					this.add('-message', '██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██');
					this.add('-message', '██ ▓▓ ▓▓ ██ ██ ██ ▓▓ ▓▓ ██');
					this.add('-message', '██ ██ ██ ██ ░░ ██ ██ ██ ██');
					this.add('-message', '██ ▒▒ ▒▒ ██ ██ ██ ▒▒ ▒▒ ██');
					this.add('-message', '██ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ██');
					this.add('-message', '░░ ██ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ██ ░░');
					this.add('-message', '░░ ░░ ██ ██ ██ ██ ██ ░░ ░░');
				} else if (pokemon.phraseIndex === 4) {
					this.add('c|@Genesect|┬┴┬┴┤  ʕ├┬┴┬┴');
					this.add('c|@Genesect|┬┴┬┴┤ ʕ•├┬┴┬┴');
					this.add('c|@Genesect|┬┴┬┴┤ʕ•ᴥ├┬┴┬┴');
					this.add('c|@Genesect|Shitposting?');
				} else if (pokemon.phraseIndex === 3) {
					this.add('-message', '▄ ▄▄░░░░░░░▄▄▄▄░░░░▌▄▄▄▄▄░░░░░▐▌');
					this.add('-message', '▒▀█▌░░░▐▀▀▄▄▐▌▒░░▒▀▒▄▒█▄░░░░▐▌');
					this.add('-message', '░░▀█▒░░▓░░█▐█▌▌░░▒░▐▌█▌▐▌░░▐▌░');
					this.add('-message', '░░░░░░▓▀░░▒▐▀▄▀▀▀▀▒▒▀▀░░▀▌▒▀░░');
					this.add('-message', '░░░░░░▌░░░░░░▀▄▄▄▄▀░░░░░░▌░░░░');
					this.add('-message', '░░░░░▄▌░░░░░░░░░░░░░░░░░░▒░░░░');
				} else if (pokemon.phraseIndex === 2) {
					this.add('c|@Genesect|Born too early to explore the universe');
					this.add('c|@Genesect|Born too late to explore the world');
					this.add('c|@Genesect|Born just in time to explore ＤＡＮＫＭＥＭＥＳ');
				} else if (pokemon.phraseIndex === 1) {
					this.add('-message', '░░░░░░░░░░▄▄▄▄▄▄░░░░░░░░░░');
					this.add('-message', '░░░░░░░░▄▀█▀█▄██████████▄▄');
					this.add('-message', '░░░░░░░▐██████████████████▌');
					this.add('-message', '░░░░░░░███████████████████▌');
					this.add('-message', '░░░░░░▐███████████████████▌');
					this.add('-message', '░░░░░░█████████████████████▄');
					this.add('-message', '░░░▄█▐█▄█▀█████████████▀█▄█▐█▄');
					this.add('-message', '░▄██▌██████▄█▄█▄█▄█▄█▄█████▌██▌');
					this.add('-message', '████▄▀▀▀▀████████████▀▀▀▀▄███');
					this.add('-message', '█████████▄▄▄▄▄▄▄▄▄▄▄▄██████▀');
					this.add('-message', '░░░▀▀████████████████████▀');
					this.add('c|@Genesect|/me tips fedora');
				} else {
					sentences = ["(ง ͠ ͠° ͟ل͜ ͡°)ง sᴏᴜɴᴅs ᴅᴏɴɢᴇʀᴏᴜs... ɪᴍ ɪɴ (ง ͠ ͠° ͟ل͜ ͡°)ง", 'http://pastebin.com/8r0jgDd7 become a mod today!'].randomize();
					this.add('c|@Genesect|' + sentences[0]);
				}
			}
			if (name === 'hippopotas') {
				this.add('-message', '@Hippopotas\'s Sand Stream whipped up a sandstorm!');
			}
			if (name === 'hydroimpact') {
				this.add('c|@HYDRO IMPACT|Think about the name first and then the Pokemon. Look beyond the "simple" detail.');
			}
			if (name === 'innovamania') {
				sentences = ['Don\'t take this seriously', 'These Black Glasses sure look cool', 'Ready for some fun?( ͡° ͜ʖ ͡°)', '( ͡° ͜ʖ ͡°'];
				this.add('c|@innovamania|' + sentences[this.random(4)]);
			}
			if (name === 'jac') {
				this.add('c|@Jac|YAAAAAAAAAAAAAAAS');
			}
			if (name === 'jinofthegale') {
				this.add('c|@jin of the gale|' + ['3...2...1... LET IT RIP!', 'My bit-beast is going to eat you alive!'][this.random(2)]);
			}
			if (name === 'kostitsynkun') {
				this.add('c|@Kostitsyn-kun|Kyun ★ Kyun~');
			}
			if (name === 'kupo') {
				this.add('c|@kupo|abc!');
			}
			if (name === 'lawrenceiii') {
				this.add('c|@Lawrence III|Give me all of your virgin maidens.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|Enter stage left');
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``And believe me I am still alive.``');
				this.add('c|@LegitimateUsername|``I\'m doing Science and I\'m still alive.``');
				this.add('c|@LegitimateUsername|``I feel FANTASTIC and I\'m still alive.``');
				this.add('c|@LegitimateUsername|``While you\'re dying I\'ll be still alive.``');
				this.add('c|@LegitimateUsername|``And when you\'re dead I will be still alive.``');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|Happiness and rainbows, hurrah!');
			}
			if (name === 'lyto') {
				sentences = ["This is divine retribution!", "I will handle this myself!", "Let battle commence!"].randomize();
				this.add('c|@Lyto|' + sentences[0]);
			}
			if (name === 'marty') {
				this.add('c|@Marty|Prepare yourself.');
			}
			if (name === 'morfent') {
				this.add('c|@Morfent|``──────▀█████▄──────▲``');
				this.add('c|@Morfent|``───▄███████████▄──◀█▶``');
				this.add('c|@Morfent|``─────▄████▀█▄──────█``');
				this.add('c|@Morfent|``───▄█████████████████▄  - I``');
				this.add('c|@Morfent|``─▄█████.▼.▼.▼.▼.▼.▼.▼   - cast``');
				this.add('c|@Morfent|``▄███████▄.▲.▲.▲.▲.▲.▲   - magic``');
				this.add('c|@Morfent|``█████████████████████▀▀ - shitpost``');
			}
			if (name === 'naniman') {
				this.add('c|@Nani Man|rof');
			}
			if (name === 'phil') {
				this.add('c|@phil|GET SLUGGED');
			}
			if (name === 'qtrx') {
				sentences = ["cutie are ex", "q-trix", "quarters", "cute T-rex", "Qatari", "random letters", "spammy letters", "asgdf"];
				this.add('c|@qtrx|omg DONT call me \'' + sentences[this.random(8)] + '\' pls respect my name its very special!!1!');
			}
			if (name === 'queez') {
				this.add('c|@Queez|B-be gentle');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|Get Rekeri\'d :]');
			}
			if (name === 'relados') {
				var italians = {'haunter': 1, 'test2017': 1, 'uselesstrainer': 1};
				if (toId(pokemon.side.foe.active[0].name) in italians) {
					this.add('c|@Relados|lol italians');
				} else {
					sentences = ['lmfao why are you even playing this game', 'and now, to unleash screaming temporal doom', 'rof'];
					this.add('c|@Relados|' + sentences[this.random(3)]);
				}
			}
			if (name === 'reverb') {
				this.add('c|@Reverb|How is this legal?');
			}
			if (name === 'rosiethevenusaur') {
				sentences = ['!dt party', 'Are you Wifi whitelisted?', 'Read the roomintro!'];
				this.add('c|@RosieTheVenusaur|' + sentences[this.random(3)]);
			}
			if (name === 'scalarmotion') {
				this.add('-message', 'sraclrlamtio got prmotd to driier');
			}
			if (name === 'scotteh') {
				this.add('c|@Scotteh|─────▄▄████▀█▄');
				this.add('c|@Scotteh|───▄██████████████████▄');
				this.add('c|@Scotteh|─▄█████.▼.▼.▼.▼.▼.▼.▼');
			}
			if (name === 'shamethat') {
				sentences = ['no guys stop fighting', 'mature people use their words', 'please direct all attacks to user: beowulf'];
				this.add('c|@Shame That|' + sentences[this.random(3)]);
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|\\_$-_-$_/');
			}
			if (name === 'spydreigon') {
				sentences = ['curry consumer', 'try to keep up', 'fucking try to knock me down', 'Sometimes I slather myself in vasoline and pretend I\'m a slug', 'I\'m really feeling it!'];
				this.add('c|@Spydreigon|' + sentences[this.random(5)]);
			}
			if (name === 'steamroll') {
				if (!pokemon.isLead) {
					sentences = ['You\'re in for it now!', 'Welcome to a new world of pain!', 'This is going to be **__fun__**...', 'Awesome! Imma deck you in the shnoz!'];
					this.add('c|@Steamroll|' + sentences[this.random(4)]);
				} else {
					pokemon.isLead = false;
				}
			}
			if (name === 'steeledges') {
				sentences = ["In this moment, I am euphoric. Not because of any phony god's blessing. But because, I am enlightened by my own intelligence.", "Potent Potables for $200, Alex."].randomize();
				this.add('c|@SteelEdges|' + sentences[0]);
			}
			if (name === 'temporaryanonymous') {
				sentences = ['Hey, hey, can I gently scramble your insides (just for laughs)? ``hahahaha``', 'check em', 'If you strike me down, I shall become more powerful than you can possibly imagine! I have a strong deathrattle effect and I cannot be silenced!'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(3)]);
			}
			if (name === 'test2017') {
				var quacks = '';
				var count = 0;
				do {
					count++;
					quacks = quacks + 'QUACK!';
				} while (this.random(3) !== 2 && count < 15);
				this.add('c|@Test2017|' + quacks);
			}
			if (name === 'tfc') {
				sentences = ['Here comes the king', ' this chat sucks', 'Coronis smells'];
				this.add('c|@TFC|' + sentences[this.random(3)]);
			}
			if (name === 'tgmd') {
				this.add('c|@TGMD|I\'m a dog :]');
			}
			if (name === 'timbuktu') {
				this.add('c|@Timbuktu|plot twist');
			}
			if (name === 'trickster') {
				this.add('c|@Trickster|' + ['I do this for free, you know.', 'Believe in the me that believes in you!'][this.random(2)]);
			}
			if (name === 'trinitrotoluene') {
				this.add('c|@trinitrotoluene|pls no hax');
			}
			if (name === 'waterbomb') {
				this.add('c|@WaterBomb|Get off my lawn! *shakes cane*');
			}
			if (name === 'xfix') {
				var hazards = {stealthrock: 1, spikes: 1, toxicspikes: 1, stickyweb: 1};
				var hasHazards = false;
				for (var hazard in hazards) {
					if (pokemon.side.getSideCondition(hazard)) {
						hasHazards = true;
						break;
					}
				}
				if (hasHazards) {
					this.add('c|@xfix|(no haz... too late)');
				} else {
					this.add('c|@xfix|(no hazards, attacks only, final destination)');
				}
			}
			if (name === 'zdrup') {
				this.add('c|@zdrup|Wait for it...');
			}
			if (name === 'zebraiken') {
				pokemon.phraseIndex = this.random(3);
				//  Zeb's faint and entry phrases correspond to each other.
				if (pokemon.phraseIndex === 2) {
					this.add('c|@Zebraiken|bzzt n_n');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|@Zebraiken|bzzt *_*');
				} else {
					this.add('c|@Zebraiken|bzzt o_o');
				}
			}

			// Drivers.
			if (name === 'aelita') {
				this.add('c|%Aelita|Transfer: Aelita. Scanner: Aelita. Virtualization!');
			}
			if (name === 'arcticblast') {
				sentences = ['BEAR MY ARCTIC BLAST', 'lmao what kind of team is this', 'guys guys guess what?!?!?!?!', 'Double battles are completely superior to single battles.', 'I miss the days when PS never broke 100 users and all the old auth were still around.'];
				this.add('c|%Arcticblast|' + sentences[this.random(5)]);
			}
			if (name === 'articuno') {
				sentences = ['Don\'t hurt me, I\'m a gril!', '/me quivers **violently**', 'Don\'t make me use my ban whip...'];
				this.add('c|%Articuno|' + sentences[this.random(3)]);
			}
			if (name === 'astara') {
				this.add('c|%Ast☆arA|I\'d rather take a nap, I hope you won\'t be a petilil shit, Eat some rare candies and get on my level.');
			}
			if (name === 'asty') {
				this.add('c|%Asty|:^) Top kek');
			}
			if (name === 'birkal') {
				this.add('c|%Birkal|caw');
			}
			if (name === 'bloobblob') {
				this.add('c|%bloobblob|Contract?');
			}
			if (name === 'charlescarmichael') {
				this.add('c|%Charles Carmichael|If Taylor Swift were in a Fast and Furious movie, it’d be called Taylor Drift.');
			}
			if (name === 'crestfall') {
				sentences = ['On wings of night.', 'Let us hunt those who have fallen to darkness.'];
				this.add('c|%Crestfall|' + sentences[this.random(2)]);
			}
			if (name === 'feliburn') {
				this.add('c|%Feliburn|Come on!');
			}
			if (name === 'galbia') {
				this.add('c|%galbia|prepare for my beautiful display of pure italian skill');
			}
			if (name === 'hugendugen') {
				this.add('c|%Hugendugen|4-1-0 let\'s go for it');
			}
			if (name === 'jellicent') {
				this.add('c|%Jellicent|~(^.^)~');
			}
			if (name === 'kayo') {
				this.add('c|%Kayo|The One and Only Obese Phantom Enthusiast');
			}
			if (name === 'ljdarkrai') {
				this.add('c|%LJDarkrai|Azideias');
			}
			if (name === 'majorbling') {
				sentences = ['(ゞ๑⚈ ˳̫⚈๑) ♡', 'If you can\'t win contests as well as battles, your team is bad~ <3', '♡ Dedenne is too cute to KO ♡'];
				this.add('c|%Majorbling|' + sentences[this.random(3)]);
			}
			if (name === 'raseri') {
				this.add('c|%raseri|ban prinplup');
			}
			if (name === 'quotecs') {
				this.add('c|%QuoteCS|Yeah, I know what you mean, but unfortunately I lack good answers to those because of my incredibly dry personality.');
			}
			if (name === 'uselesstrainer') {
				sentences = ['huehuehuehue', 'PIZA', 'SPAGUETI', 'RAVIOLI RAVIOLI GIVE ME THE FORMUOLI', 'get ready for PUN-ishment'];
				this.add('c|%useless trainer|' + sentences[this.random(5)]);
			}
			if (name === 'vacate') {
				this.add('c|%Vacate|sticky situation');
			}

			// Voices.
			if (name === 'aldaron') {
				this.add('c|+Aldaron|indefatigable workhorse');
			}
			if (name === 'bmelts') {
				this.add('c|+bmelts|zero post hero');
			}
			if (name === 'cathy') {
				var foe = toId(pokemon.side.foe.active[0].name);
				if (foe === 'greatsage' && !this.convoPlayed) {
					this.add('-message', '<~GreatSage> from my observation, it appears that most romantic partners occupy their discussions with repetitive declarations and other uninteresting content');
					this.add('-message', '<&Cathy> lol');
					this.add('-message', '<&Cathy> sounds dull');
					this.add('-message', '<~GreatSage> i do not believe i have ever observed romantic partners discuss any consequential matters (e.g. mathematics, science, or other topics of intellectual interest)');
					this.add('-message', '<~GreatSage> the "normal social protocol" of romance has always presented as exceptionally absurd to me');
					this.add('-message', '<&Cathy> which aspects are you referring to?');
					this.add('-message', '<~GreatSage> it is rather difficult to summarize them in phrases');
					this.add('-message', '<~GreatSage> it\'s not something i have investigated with any thoroughness');
					this.convoPlayed = true;
				} else {
					switch (foe) {
					case 'bmelts':
						sentence = ['attacks bmelts with a heavy dosage of fun', 'destroys bmelts with an ion ray of fun times'][this.random(2)];
						break;
					case 'snowflakes':
						sentence = 'pounces on Snowflakes with a surplus of humour';
						break;
					case 'mikel':
						sentence = 'crushes mikel with patent hilarity';
						break;
					case 'hugendugen':
						sentence = 'skewers Hugendugen with the sword of fun';
						break;
					case 'limi':
						sentence = 'devastates Limi with the fun cannon';
						break;
					}
				}
				if (sentence) {
					this.add('c|HappyFunTimes|/me ' + sentence);
				} else if (!this.convoPlayed){
					this.add('c|+Cathy|Trivial.');
				}
			}
			if (toId(pokemon.side.foe.active[0].name) === 'cathy') {
				if (name === 'greatsage' && !this.convoPlayed) {
					this.add('-message', '<~GreatSage> from my observation, it appears that most romantic partners occupy their discussions with repetitive declarations and other uninteresting content');
					this.add('-message', '<&Cathy> lol');
					this.add('-message', '<&Cathy> sounds dull');
					this.add('-message', '<~GreatSage> i do not believe i have ever observed romantic partners discuss any consequential matters (e.g. mathematics, science, or other topics of intellectual interest)');
					this.add('-message', '<~GreatSage> the "normal social protocol" of romance has always presented as exceptionally absurd to me');
					this.add('-message', '<&Cathy> which aspects are you referring to?');
					this.add('-message', '<~GreatSage> it is rather difficult to summarize them in phrases');
					this.add('-message', '<~GreatSage> it\'s not something i have investigated with any thoroughness');
					this.convoPlayed = true;
				} else {
					switch (name) {
					case 'bmelts':
						sentence = ['attacks bmelts with a heavy dosage of fun', 'destroys bmelts with an ion ray of fun times'][this.random(2)];
						break;
					case 'snowflakes':
						sentence = 'pounces on Snowflakes with a surplus of humour';
						break;
					case 'mikel':
						sentence = 'crushes mikel with patent hilarity';
						break;
					case 'hugendugen':
						sentence = 'skewers Hugendugen with the sword of fun';
						break;
					case 'limi':
						sentence = 'devastates Limi with the fun cannon';
						break;
					}
					if (sentence) this.add('c|HappyFunTimes|/me ' + sentence);
				}
			}
			if (name === 'diatom') {
				this.add('-message', pokemon.side.foe.name + ' was banned by Diatom. (you should be thankful you are banned and not permabanned)');
			}
			if (name === 'mattl') {
				this.add('c|+MattL|The annoyance I will cause is not well-defined.');
			}
			if (name === 'shaymin') {
				this.add('c|+shaymin|Ready for hax?');
			}
			if (name === 'somalia') {
				this.add('c|+SOMALIA|stupidest shit ever');
			}
			if (name === 'talktakestime') {
				this.add('c|+TalkTakesTime|Welcome to BoTTT!');
			}
		},
		// Here we deal with some special mechanics due to custom sets and moves.
		onBeforeMove: function (pokemon, target, move) {
			var name = toId(pokemon.name);
			// Special Shaymin forme change.
			if (name === 'shaymin' && !pokemon.illusion) {
				var targetSpecies = (move.category === 'Status') ? 'Shaymin' : 'Shaymin-Sky';

				if (targetSpecies !== pokemon.template.species) {
					this.add('message', pokemon.name + ((move.category === 'Status') ? ' has reverted to Land Forme!' : ' took to the sky once again!'));
					var template = this.getTemplate(targetSpecies);
					pokemon.formeChange(targetSpecies);
					pokemon.baseTemplate = template;
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = template.ability;
					pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
					this.add('detailschange', pokemon, pokemon.details);
				}
			}

			// Break the secondary of Dell's sig if an attack is attempted.
			if (target.volatiles['parry'] && move.category !== 'Status') {
				target.removeVolatile('parry');
			}

			if (pokemon.volatiles['needles']) {
				var dice = this.random(3);
				pokemon.removeVolatile('needles');
				if (dice === 2) {
					this.boost({atk:1, spe:1, def:-1}, pokemon, pokemon, 'used needles');
				} else if (dice === 1) {
					this.boost({def:1, spd:1, spe:-1}, pokemon, pokemon, 'used needles');
				} else {
					this.boost({atk:1, def:1, spe:-1}, pokemon, pokemon, 'used needles');
				}
			}

			if (move.id === 'judgment' && name === 'shrang' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
				pokemon.typesData = [
					{type: 'Dragon', suppressed: false,  isAdded: false},
					{type: 'Fairy', suppressed: false,  isAdded: false}
				];
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			if (pokemon.kupoTransformed) {
				pokemon.name = '@kupo';
				pokemon.kupoTransformed = false;
			}
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			// Admins.
			if (name === 'antar') {
				this.add('c|~Antar|Should\'ve been an Umbreon.');
			}
			if (name === 'chaos') {
				if (name === toId(pokemon.name)) this.add('c|~chaos|//forcewin chaos');
				if (this.random(1000) === 420) {
					// Shouldn't happen much, but if this happens it's hilarious.
					this.add('c|~chaos|actually');
					this.add('c|~chaos|//forcewin ' + pokemon.side.name);
					this.win(pokemon.side);
				}
			}
			if (name === 'haunter') {
				this.add('c|~haunter|you can\'t compare with my powers');
			}
			if (name === 'jasmine') {
				this.add('c|~Jasmine|' + ['I meant to do that.', 'God, I\'m the worse digimon.'][this.random(2)]);
			}
			if (name === 'joim') {
				sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
				this.add('c|~Joim|' + sentences[this.random(4)]);
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
			}
			if (name === 'v4') {
				this.add('c|~V4|' + ['Back to irrevelance for now n_n', 'Well that was certainly a pleasant fall.'][this.random(2)]);
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|your mom');
				// Followed by the usual '~Zarel fainted'.
				this.add('-message', '~Zarel used your mom!');
			}

			// Leaders.
			if (name === 'hollywood') {
				this.add('c|&hollywood|BibleThump');
			}
			if (name === 'jdarden') {
				this.add('c|&jdarden|;-;7');
			}
			if (name === 'okuu') {
				this.add("raw|<div class=\"broadcast-blue\"><b>...and Smooth Jazz.</b></div>");
			}
			if (name === 'sirdonovan') {
				this.add('-message', 'RIP sirDonovan');
			}
			if (name === 'slayer95') {
				this.add('c|&Slayer95|I may be defeated this time, but that is irrevelant in the grand plot of seasonals!');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|xD');
			}
			if (name === 'verbatim') {
				this.add('c|&verbatim|Crash and Burn');
			}

			// Mods.
			if (name === 'acedia') {
				this.add('c|@Acedia|My dad smoked his whole life. One day my mom told him "If you want to see your children graduate, you have to stop". 3 years later he died of lung cancer. My mom told me "Dont smoke; dont put your family through this". At 24, I have never touched a cigarette. I must say, I feel a sense of regret, because watching you play Pokemon gave me cancer anyway ( ͝° ͜ʖ͡°)');
			}
			if (name === 'am') {
				this.add('c|@AM|RIP');
			}
			if (name === 'antemortem') {
				this.add('c|@antemortem|FUCKING CAMPAIGNERS');
			}
			if (name === 'ascriptmaster') {
				this.add('c|@Ascriptmaster|Too overpowered. I\'m nerfing you next patch');
			}
			if (name === 'asgdf') {
				this.add('c|@asgdf|' + ['Looks like I spoke too hasteely', 'You only won because I couldn\'t think of a penguin pun!'][this.random(2)]);
			}
			if (name === 'audiosurfer') {
				if (pokemon.phraseIndex === 2) {
					this.add('c|@Audiosurfer|No? Well you should check it out.');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|@Audiosurfer|You should consider Battling 101 friend.');
				} else {
					this.add('c|@Audiosurfer|Back to catching waves.');
				}
			}
			if (name === 'barton') {
				this.add('c|@barton|' + ['ok', 'haha?'][this.random(2)]);
			}
			if (name === 'bean') {
				sentences = ['that\'s it ur getting banned', 'meow', '(✖╭╮✖)'];
				this.add('c|@bean|' + sentences[this.random(3)]);
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|There is no need to be mad');
			}
			if (name === 'biggie') {
				sentences = ['It was all a dream', 'It\'s gotta be the shoes', 'ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ'];
				this.add('c|@BiGGiE|' + sentences[this.random(3)]);
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin| The Mirror Can Lie It Doesn\'t Show What\'s Inside! ╰〳~ ✖ Д ✖ ~〵⊃━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'businesstortoise') {
				this.add('c|@Business Tortoise|couldn\'t meet my deadline...');
			}
			if (name === 'coolstorybrobat') {
				switch (pokemon.phraseIndex) {
					case 1:
						sentence = "Lol I got slayed";
						break;
					case 2:
						sentence = "BRUH...";
						break;
					case 3:
						sentence = "I tried";
						break;
					case 4:
						sentence = "Going back to those mountains to train brb";
						break;
					default:
						sentence = "I forgot what fruit had... tasted like...";
				}
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'dell') {
				this.add('c|@Dell|All because I couldn\'t use Yoshi...');
				this.add('c|@Dell|───────────────████─███────────');
				this.add('c|@Dell|──────────────██▒▒▒█▒▒▒█───────');
				this.add('c|@Dell|─────────────██▒────────█──────');
				this.add('c|@Dell|─────────██████──██─██──█──────');
				this.add('c|@Dell|────────██████───██─██──█──────');
				this.add('c|@Dell|────────██▒▒▒█──────────███────');
				this.add('c|@Dell|────────██▒▒▒▒▒▒───▒──██████───');
				this.add('c|@Dell|───────██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███─');
				this.add('c|@Dell|──────██▒▒▒▒─────▒▒▒▒▒▒▒▒▒▒▒▒█─');
				this.add('c|@Dell|──────██▒▒▒───────▒▒▒▒▒▒▒█▒█▒██');
				this.add('c|@Dell|───────██▒▒───────▒▒▒▒▒▒▒▒▒▒▒▒█');
				this.add('c|@Dell|────────██▒▒─────█▒▒▒▒▒▒▒▒▒▒▒▒█');
				this.add('c|@Dell|────────███▒▒───██▒▒▒▒▒▒▒▒▒▒▒▒█');
				this.add('c|@Dell|─────────███▒▒───█▒▒▒▒▒▒▒▒▒▒▒█─');
				this.add('c|@Dell|────────██▀█▒▒────█▒▒▒▒▒▒▒▒██──');
				this.add('c|@Dell|──────██▀██▒▒▒────█████████────');
				this.add('c|@Dell|────██▀███▒▒▒▒────█▒▒██────────');
				this.add('c|@Dell|█████████▒▒▒▒▒█───██──██───────');
				this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒█────████▒▒█──────');
				this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒▒█───███▒▒▒█──────');
				this.add('c|@Dell|█▒▒▒▒▒▒█▒▒▒▒▒█────█▒▒▒▒▒█──────');
				this.add('c|@Dell|██▒▒▒▒▒█▒▒▒▒▒▒█───█▒▒▒███──────');
				this.add('c|@Dell|─██▒▒▒▒███████───██████────────');
				this.add('c|@Dell|──██▒▒▒▒▒██─────██─────────────');
				this.add('c|@Dell|───██▒▒▒██─────██──────────────');
				this.add('c|@Dell|────█████─────███──────────────');
				this.add('c|@Dell|────█████▄───█████▄────────────');
				this.add('c|@Dell|──▄█▓▓▓▓▓█▄─█▓▓▓▓▓█▄───────────');
				this.add('c|@Dell|──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────');
				this.add('c|@Dell|──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────');
				this.add('c|@Dell|──▀████████▀▀███████▀──────────');
			}
			if (name === 'eeveegeneral') {
				this.add('c|@Eevee General|' + ['Retreat!', 'You may have won the battle, but you haven\'t won the war!', 'I salute you o7'][this.random(3)]);
			}
			if (name === 'electrolyte') {
				this.add('c|@Electrolyte|just wait till I hit puberty...');
			}
			if (name === 'enguarde') {
				this.add('c|@Enguarde|I let my guard down...');
			}
			if (name === 'eos') {
				this.add('c|@EoS|؍༼ಥ_ಥ༽ጋ');
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|This is why we can\'t have nice things.');
			}
			if (name === 'genesect') {
				if (pokemon.phraseIndex === 5 || pokemon.phraseIndex === 3 || pokemon.phraseIndex === 1) {
					this.add('-message', '▄████▄░░░░░░░░░░░░░░░░░░░░');
					this.add('-message', '██████▄░░░░░░▄▄▄░░░░░░░░░░');
					this.add('-message', '░███▀▀▀▄▄▄▀▀▀░░░░░░░░░░░░░');
					this.add('-message', '░░░▄▀▀▀▄░░░█▀▀▄░▄▀▀▄░█▄░█░');
					this.add('-message', '░░░▄▄████░░█▀▀▄░█▄▄█░█▀▄█░');
					this.add('-message', '░░░░██████░█▄▄▀░█░░█░█░▀█░');
					this.add('-message', '░░░░░▀▀▀▀░░░░░░░░░░░░░░░░░');
				} else if (pokemon.phraseIndex === 4) {
					this.add('c|@Genesect|Well, if that\'s what you want');
					this.add('c|@Genesect|┬┴┬┴┤ʕ•ᴥ├┬┴┬┴');
					this.add('c|@Genesect|┬┴┬┴┤ ʕ•├┬┴┬┴');
					this.add('c|@Genesect|┬┴┬┴┤  ʕ├┬┴┬┴');
				} else {
					sentences = ["The darkside cannot be extinguished, when you fight...", "؍༼ಥ_ಥ༽ጋ lament your dongers ؍༼ಥ_ಥ༽ጋ", "Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ", "やれやれだぜ", " ୧༼ಠ益ಠ༽୨ MRGLRLRLR ୧༼ಠ益ಠ༽୨"].randomize();
					this.add('c|@Genesect|' + sentences[0]);
				}
			}
			if (name === 'hippopotas') {
				this.add('-message', 'The sandstorm subsided.');
			}
			if (name === 'hydroimpact') {
				this.add('c|@HYDRO IMPACT|Well done, you\'ve gone beyond your limits and have gained my trust. Now go and write your own destiny, don\'t let fate write it for you.');
			}
			if (name === 'innovamania') {
				sentences = ['Did you rage quit?', 'How\'d you lose with this set?', 'Pm Nani Man to complain about this set ( ͡° ͜ʖ ͡°)'];
				this.add('c|@innovamania|' + sentences[this.random(3)]);
			}
			if (name === 'jac') {
				this.add('c|@Jac|bruh');
			}
			if (name === 'jinofthegale') {
				sentences = ['ヽ༼ຈل͜ຈ༽ﾉ You\'ve upped your game ヽ༼ຈل͜ຈ༽ﾉ?', 'Please don\'t steal my bit-beast!', 'Should have used Black'];
				this.add('c|@jin of the gale|' + sentences[this.random(3)]);
			}
			if (name === 'kostitsynkun') {
				this.add('c|@Kostitsyn-kun|Kyun ★ Kyun~');
			}
			if (name === 'kupo') {
				this.add('c|@kupo|:C');
			}
			if (name === 'lawrenceiii') {
				this.add('c|@Lawrence III|Fuck off.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|' + ['Alas poor me', 'Goodnight sweet prince'][this.random(2)]);
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``This isn\'t brave. It\'s murder. What did I ever do to you?``');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|You made me sad. That\'s the opposite of happy.');
			}
			if (name === 'lyto') {
				this.add('c|@Lyto|' + ['Unacceptable!', 'Mrgrgrgrgr...'][this.random(2)]);
			}
			if (name === 'marty') {
				this.add('c|@Marty|Your fate is sealed');
			}
			if (name === 'morfent') {
				sentences = ['Hacking claims the lives of over 2,000 registered laddering alts every day.', 'Every 60 seconds in Africa, a minute passes. Together we can stop this. Please spread the word.', 'SOOOOOO $TONED FUCK MAN AW $HIT NIGGA HELLA MOTHER FUCKING 666 ODD FUTURE MAN BRO CHECK THIS OUT MY SWAG WITH THE WHAT WHOLE 666 420 $$$$ HOLLA HOLLA GET DOLLA SWED CASH FUCKING MARIJUANA CIGARETTES GANGSTA GANGSTA EAZY-E C;;R;E;A;M; SO BAKED OFF THE BOBMARLEY GANJA 420 SHIT PURE OG KUUSSHHH LEGALIZE CRYSTAL WEED'];
				this.add('c|@Morfent|' + sentences[this.random(3)]);
			}
			if (name === 'naniman') {
				sentences = ['rof', "deck'd", '**praise** TI'];
				this.add('c|@Nani Man|' + sentences[this.random(3)]);
			}
			if (name === 'phil') {
				this.add('c|@phil|The salt is real right now');
			}
			if (name === 'qtrx') {
				sentences = ['Keyboard not found; press **Ctrl + W** to continue...', 'hfowurfbiEU;DHBRFEr92he', 'At least my name ain\t asgdf...'];
				this.add('c|@qtrx|' + sentences[this.random(3)]);
			}
			if (name === 'queez') {
				this.add('c|@Queez|(◕‿◕✿)');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|lucky af :[');
			}
			if (name === 'relados') {
				sentences = ['BS HAX', 'rekt', 'rof'];
				this.add('c|@Relados|' + sentences[this.random(3)]);
			}
			if (name === 'reverb') {
				this.add('c|@Reverb|stupid communist dipshit');
			}
			if (name === 'rosiethevenusaur') {
				this.add('c|@RosieTheVenusaur|' + ['SD SKARM SHALL LIVE AGAIN!!!', 'Not my WiFi!'][this.random(2)]);
			}
			if (name === 'scalarmotion') {
				this.add('-message', 'scalarmotion was banned by Nani Man. (spangj)');
			}
			if (name === 'scotteh') {
				this.add('-message', '▄███████▄.▲.▲.▲.▲.▲.▲');
				this.add('-message', '█████████████████████▀▀');
			}
			if (name === 'shamethat') {
				sentences = ["ok agree to disagree", "rematch, don't attack this time", "i blame beowulf"];
				this.add('c|@Shame That|' + sentences[this.random(3)]);
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|!learn skitty, roleplay');
				this.add('raw|<div class="infobox">Skitty <span class="message-learn-cannotlearn">can\'t</span> learn Role Play</div>');
			}
			if (name === 'spydreigon') {
				sentences = ['lolhax', 'crit mattered', 'bruh cum @ meh', '>thinking Pokemon takes any skill'];
				this.add('c|@Spydreigon|' + sentences[this.random(4)]);
			}
			if (name === 'steamroll') {
				if (!pokemon.killedSome) {
					sentence = 'Goddamn I feel useless.';
				} else {
					sentences = ['...And I saw, as it were... Spaghetti.', "Agh, shouldn't of been that easy.", 'Hope that was enough.'];
					sentence = sentences[this.random(3)];
				}
				this.add('c|@Steamroll|' + sentence);
			}
			if (name === 'steeledges') {
				this.add('c|@SteelEdges|' + ['You know, I never really cared for Hot Pockets.', 'Suck it, Trebek. Suck it long, and suck it hard.'][this.random(2)]);
			}
			if (name === 'temporaryanonymous') {
				sentences = [';_;7', 'This kills the tempo', 'I\'m kill. rip.', 'S-senpai! Y-you\'re being too rough! >.<;;;;;;;;;;;;;;;;;', 'A-at least you checked my dubs right?', 'B-but that\'s impossible! This can\'t be! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHGH'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(6)]);
			}
			if (name === 'test2017') {
				sentences = ['DUCK YOU!', 'GO DUCK YOURSELF!', 'SUCK MY DUCK!'];
				this.add('c|@Test2017|' + sentences[this.random(3)]);
			}
			if (name === 'tfc') {
				this.add('c|@TFC|' + ['brb gotta piss', 'oh thats bs'][this.random(2)]);
			}
			if (name === 'tgmd') {
				this.add('c|@TGMD|rip in pepsi');
			}
			if (name === 'timbuktu') {
				this.add('c|@Timbuktu|' + ['</3', 'broken'][this.random(2)]);
			}
			if (name === 'trickster') {
				sentences = ['RIP in pepperoni cappuccino pistachio.', 'El psy congroo.', 'W-wow! Hacker!', '“This guy\'s team is CRAZY!” ☑ “My team can\'t win against a team like that” ☑ "He NEEDED precisely those two crits to win" ☑ “He led with the only Pokemon that could beat me” ☑ "He got the perfect hax" ☑ “There was nothing I could do” ☑ “I played that perfectly”', '(⊙﹏⊙✿)'];
				this.add('c|@Trickster|' + sentences[this.random(5)]);
			}
			if (name === 'trinitrotoluene') {
				this.add('c|@trinitrotoluene|why hax @_@');
			}
			if (name === 'waterbomb') {
				this.add('c|@WaterBomb|brb getting more denture cream');
			}
			if (name === 'xfix') {
				var foe = pokemon.side.foe.active[0];
				if (foe.name === '@xfix') {
					this.add('c|@xfix|(annoying Dittos...)');
				} else if (foe.ability === 'magicbounce') {
					this.add('c|@xfix|(why ' + foe.name + ' has Magic Bounce...)');
					this.add('c|@xfix|(gg... why...)');
				} else {
					this.add('c|@xfix|(gg... I guess)');
				}
			}
			if (name === 'zdrup') {
				this.add('c|@zdrup|... keep waiting for it ...');
			}
			if (name === 'zebraiken') {
				if (pokemon.phraseIndex === 2) {
					this.add('c|@Zebraiken|bzzt u_u');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|@Zebraiken|bzzt ._.');
				} else {
					// Default faint.
					this.add('c|@Zebraiken|bzzt x_x');
				}
			}

			// Drivers.
			if (name === 'aelita') {
				sentences = ['Oh no, the Scyphozoa\'s here!', 'Devirtualized...', 'Stones. Aelita Stones. Like the rock group. I\'m Odd\'s cousin from Canada.'];
				this.add('c|%Aelita|' + sentences[this.random(3)]);
			}
			if (name === 'arcticblast') {
				sentences = ['totally had it but choked, gg', 'I would have won if it weren\'t for HAX', 'oh', 'Double battles are stil superior to single battles.', 'newfag'];
				this.add('c|%Arcticblast|' + sentences[this.random(5)]);
			}
			if (name === 'articuno') {
				sentences = ['This is why you don\'t get any girls.', 'fite me irl', 'Actually, I don\'t have a gender...'];
				this.add('c|%Articuno|' + sentences[this.random(3)]);
			}
			if (name === 'astara') {
				sentences = ['/me twerks into oblivion', 'good night ♥', 'Astara Vista Baby'];
				this.add('c|%Ast☆arA|' + sentences[this.random(3)]);
			}
			if (name === 'asty') {
				this.add('c|%Asty|:^( Bottom kek');
			}
			if (name === 'birkal') {
				this.add('c|%Birkal|//birkal');
			}
			if (name === 'bloobblob') {
				this.add('c|%bloobblob|I won\'t die! Even if I\'m killed!');
			}
			if (name === 'charlescarmichael') {
				this.add('c|%Charles Carmichael|The Grandmaster of Puns will be back for revenge!');
			}
			if (name === 'crestfall') {
				this.add('c|%Crestfall|Vayne [All Chat]: Outplayed me gg no re');
			}
			if (name === 'feliburn') {
				this.add('c|%Feliburn|' + ['BHUWUUU!', 'I like shorts! They\'re comfy and easy to wear!'][this.random(2)]);
			}
			if (name === 'galbia') {
				this.add('c|%galbia|' + ['azz e mo', 'rip luck :('][this.random(2)]);
			}
			if (name === 'jellicent') {
				this.add('c|%Jellicent|X_X');
			}
			if (name === 'kayo') {
				this.add('c|%Kayo|Fat ShOoOoOoSty!');
			}
			if (name === 'ljdarkrai') {
				this.add('c|%LJDarkrai|:<');
			}
			if (name === 'majorbling') {
				this.add('c|%Majorbling|There is literally no way to make this pokemon good...(ゞ๑T  ˳̫T\'๑) ');
			}
			if (name === 'raseri') {
				this.add('c|%raseri|banned');
			}
			if (name === 'quotecs') {
				this.add('c|%QuoteCS|#StillIrrelevant');
			}
			if (name === 'uselesstrainer') {
				sentences = ['MATTERED', 'CAIO', 'ima repr0t', 'one day i\'ll turn into a beautiful butterfly'];
				this.add('c|%useless trainer|' + sentences[this.random(4)]);
			}
			if (name === 'vacate') {
				this.add('c|%Vacate|dam it');
			}

			// Ex-staff or honorary voice.
			if (name === 'bmelts') {
				this.add('c|+bmelts|retired now');
			}
			if (name === 'cathy') {
				this.add('c|+Cathy|I was being facetious');
			}
			if (name === 'diatom' && !pokemon.hasBeenThanked) {
				this.add('c|★' + pokemon.side.foe.name + '|Thanks Diatom...');
			}
			if (name === 'mattl') {
				this.add('c|+MattL|Finish him! You used "Finals week!" Fatality!');
			}
			if (name === 'redew') {
				this.add('c|+Redew|i hope u think ur a good player');
				this.add('c|+Redew|play spl man');
				this.add('c|+Redew|ud win lots');
			}
			if (name === 'shaymin') {
				this.add('c|+shaymin|You\'ve done well, perhaps...too well, even beating the odds!');
			}
			if (name === 'somalia') {
				this.add('c|+SOMALIA|tired of this shitass game');
			}
			if (name === 'talktakestime') {
				this.add('-message', '(Automated response: Your battle contained a banned outcome.)');
			}
		},
		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
			if (toId(pokemon.name) === 'hippopotas' && !pokemon.illusion) {
				this.add('-message', 'The sandstorm subsided.');
			}
			// Shaymin forme change.
			if (toId(pokemon.name) === 'shaymin' && !pokemon.illusion) {
				if (pokemon.template.species === 'Shaymin') {
					var template = this.getTemplate('Shaymin-Sky');
					pokemon.formeChange('Shaymin-Sky');
					pokemon.baseTemplate = template;
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = template.ability;
					pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				}
			}

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onDragOut: function (pokemon) {
			// Prevents qtrx from being red carded by chaos while in the middle of using sig move, which causes a visual glitch.
			if (pokemon.isDuringAttack) {
				this.add('-message', "But the Unown Aura absorbed the effect!");
				return null;
			}
			if (pokemon.kupoTransformed) {
				pokemon.name = '@kupo';
				pokemon.kupoTransformed = false;
			}
		},
		onAfterMoveSelf: function (source, target, move) {
			// Make haunter not immune to Life Orb as a means to balance.
			if (toId(source.name) === 'haunter') {
				this.damage(source.maxhp / 10, source, source, this.getItem('lifeorb'));
			}
		},
		onModifyPokemon: function (pokemon) {
			var name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway. This isn't implemented for Cathy since her moves are all custom. Don't trick her a Scarf!
			if (name !== 'qtrx' && name !== 'Cathy') {
				var moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (var i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
			// Enforce taunt disabling custom moves.
			if (pokemon.volatiles['taunt']) {
				var moves = pokemon.moveset;
				for (var i = 0; i < moves.length; i++) {
					if (this.getMove(moves[i].id).category === 'Status' && !moves[i].disabled) {
						pokemon.disableMove(moves[i].id, false);
						moves[i].disabled = true;
					}
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function (battle) {
			for (var s in battle.sides) {
				var thisSide = battle.sides[s];
				if (thisSide.premonTimer > 4) {
					thisSide.premonTimer = 0;
					thisSide.premonEffect = true;
				} else if (thisSide.premonTimer > 0) {
					if (thisSide.premonTimer === 4) thisSide.addSideCondition('safeguard');
					thisSide.premonTimer++;
				}
				for (var p in thisSide.active) {
					var pokemon = thisSide.active[p];
					var name = toId(pokemon.name);

					if (pokemon.side.premonEffect) {
						pokemon.side.premonEffect = false;
						this.add('c|@zdrup|...dary! __**LEGENDARY!**__');
						this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1}, pokemon, pokemon, 'legendary premonition');
						pokemon.addVolatile('aquaring');
						pokemon.addVolatile('focusenergy');
					}
					if (pokemon.volatiles['resilience'] && !pokemon.fainted) {
						this.heal(pokemon.maxhp / 16, pokemon, pokemon);
						this.add('-message', pokemon.name + "'s resilience healed itself!");
					}
					if (pokemon.volatiles['unownaura'] && !pokemon.fainted && !pokemon.illusion) {
						this.add('-message', "Your keyboard is reacting to " + pokemon.name + "'s Unown aura!");
						if (this.random(2) === 1) {
							this.useMove('trickroom', pokemon);
						} else {
							this.useMove('wonderroom', pokemon);
						}
					}
					if (name === 'beowulf' && !pokemon.fainted && !pokemon.illusion) {
						this.add('c|@Beowulf|/me buzzes loudly!');
					}
					if (name === 'cathy' && !pokemon.fainted && !pokemon.illusion) {
						var messages = [
							'kicking is hilarious!',
							'flooding the chat log with kicks makes me lol',
							'please don\'t stop me from having fun',
							'having fun is great!',
							'isn\'t this so much fun?',
							'let\'s all have fun by spamming the channel!',
							'FUN FUN FUN',
							'SO MUCH FUN!',
							'^_^ fun times ^_^',
							'/me is having so much fun!',
							'having fun is great!',
							'/me thinks spam is fun!',
							'/me loves spamming this channel, because it\'s completely inconsequential!',
							'this is just the internet -- nothing matters!',
							'let\'s have fun ALL NIGHT LONG!!!!!!!!!!!!!!!!!!!!!!'
						];
						this.add('c|HappyFunTimes|' + messages[this.random(15)]);
					}
					if (pokemon.volatiles['parry']) {
						// Dell hasn't been attacked.
						pokemon.removeVolatile('parry');
						this.add('-message', "Untouched, the Aura Parry grows stronger still!");
						this.boost({def:1, spd:1}, pokemon, pokemon, 'Aura Parry');
					}
				}
			}
		},
		// This is where the signature moves are actually done.
		onModifyMove: function (move, pokemon) {
			// This is to make signature moves work when transformed.
			if (move.id === 'transform') {
				move.onHit = function (target, pokemon) {
					if (!pokemon.transformInto(target, pokemon)) return false;
					pokemon.originalName = pokemon.name;
					pokemon.name = target.name;
				};
			}

			var name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			// Prevent visual glitch with Spell Steal.
			move.effectType = 'Move';
			// Just because it's funny.
			if (move.id === 'defog') {
				move.name = 'Defrog';
				this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Defog", pokemon);
			}

			// Admin signature moves.
			if (move.id === 'spikes' && name === 'antar') {
				move.name = 'Firebomb';
				move.basePower = 100;
				move.category = 'Special';
				move.flags = {};
				move.type = 'Fire';
				move.onTryHitSide = function (side, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Overheat", side.active[0]);
				};
			}
			if (move.id === 'embargo' && name === 'chaos') {
				move.name = 'Forcewin';
				move.onHit = function (pokemon) {
					pokemon.addVolatile('taunt');
					pokemon.addVolatile('torment');
					pokemon.addVolatile('confusion');
					pokemon.addVolatile('healblock');
				};
			}
			if (move.id === 'quiverdance' && name === 'haunter') {
				move.name = 'Genius Dance';
				move.boosts = {spd:1, spe:1, accuracy:2, evasion:-1, def:-1};
				move.onTryHit = function (pokemon) {
					if (pokemon.volatiles['haunterino']) return false;
				};
				move.onHit = function (pokemon) {
					if (pokemon.volatiles['haunterino']) return false;
					pokemon.addVolatile('haunterino');
				};
			}
			if (move.id === 'bellydrum' && name === 'jasmine') {
				move.name = 'Lockdown';
				move.onHit = function (target, pokemon) {
					this.add("raw|<div class=\"broadcast-red\"><b>The server is restarting soon.</b><br />Please finish your battles quickly. No new battles can be started until the server resets in a few minutes.</div>");
				};
				move.self = {boosts: {atk:6}};
			}
			if (move.id === 'milkdrink' && name === 'joim') {
				move.name = 'Red Bull Drink';
				move.boosts = {spa:1, spe:1, accuracy:1, evasion:-1};
				delete move.heal;
				move.onTryHit = function (pokemon) {
					if (pokemon.volatiles['redbull']) return false;
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Geomancy", pokemon);
				};
				move.onHit = function (pokemon) {
					if (pokemon.volatiles['redbull']) return false;
					pokemon.addVolatile('redbull');
				};
			}
			if (move.id === 'sleeptalk' && name === 'theimmortal') {
				move.name = 'Sleep Walk';
				move.pp = 20;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Healing Wish", target);
				};
				move.onHit = function (pokemon) {
					if (pokemon.status !== 'slp') {
						if (pokemon.hp >= pokemon.maxhp) return false;
						if (!pokemon.setStatus('slp')) return false;
						pokemon.statusData.time = 3;
						pokemon.statusData.startTime = 3;
						this.heal(pokemon.maxhp);
						this.add('-status', pokemon, 'slp', '[from] move: Rest');
					}
					var moves = [];
					for (var i = 0; i < pokemon.moveset.length; i++) {
						var move = pokemon.moveset[i].id;
						if (move && move !== 'sleeptalk') moves.push(move);
					}
					var move = '';
					if (moves.length) move = moves[this.random(moves.length)];
					if (!move) return false;
					this.useMove(move, pokemon);
					var activate = false;
					var boosts = {};
					for (var i in pokemon.boosts) {
						if (pokemon.boosts[i] < 0) {
							activate = true;
							boosts[i] = 0;
						}
					}
					if (activate) pokemon.setBoost(boosts);
					if (!pokemon.informed) {
						this.add('c|~The Immortal|I don\'t really sleep walk...');
						pokemon.informed = true;
					}
				};
			}
			if (move.id === 'vcreate' && name === 'v4') {
				move.name = 'V-Generate';
				move.self = {boosts: {accuracy: -2}};
				move.accuracy = 85;
				move.secondaries = [{chance: 50, status: 'brn'}];
			}
			if (move.id === 'relicsong' && name === 'zarel') {
				move.name = 'Relic Song Dance';
				move.basePower = 60;
				move.multihit = 2;
				move.category = 'Special';
				move.type = 'Psychic';
				move.negateSecondary = true;
				move.ignoreImmunity = true;
				delete move.secondaries;
				move.onTryHit = function (target, pokemon) {
					this.attrLastMove('[still]');
					var move = pokemon.template.speciesid === 'meloettapirouette' ? 'Brick Break' : 'Relic Song';
					this.add('-anim', pokemon, move, target);
				};
				move.onHit = function (target, pokemon, move) {
					if (pokemon.template.speciesid === 'meloettapirouette' && pokemon.formeChange('Meloetta')) {
						this.add('-formechange', pokemon, 'Meloetta', '[msg]');
					} else if (pokemon.formeChange('Meloetta-Pirouette')) {
						this.add('-formechange', pokemon, 'Meloetta-Pirouette', '[msg]');
						// Modifying the move outside of the ModifyMove event? BLASPHEMY
						move.category = 'Physical';
						move.type = 'Fighting';
					}
				};
				move.onAfterMove = function (pokemon) {
					// Ensure Meloetta goes back to standard form after using the move
					if (pokemon.template.speciesid === 'meloettapirouette' && pokemon.formeChange('Meloetta')) {
						this.add('-formechange', pokemon, 'Meloetta', '[msg]');
					}
				};
			}

			// Leader signature moves.
			if (move.id === 'geomancy' && name === 'hollywood') {
				move.name = 'Meme Mime';
				move.flags = {};
				move.onTry = function () {};
				move.boosts = {atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Geomancy", pokemon);
				};
			}
			if (move.id === 'dragontail' && name === 'jdarden') {
				move.name = 'Wyvern\'s Wind';
				if (!move.flags) move.flags = {};
				move.flags['sound'] = 1;
				move.type = 'Flying';
				move.category = 'Special';
				move.basePower = 80;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Boomburst", target);
				};
			}
			if (move.id === 'firespin' && name === 'okuu') {
				move.name = 'Blazing Star - Ten Evil Stars';
				move.basePower = 60;
				move.accuracy = true;
				move.type = 'Fire';
				move.priority = 2;
				move.status = 'brn';
				move.self = {boosts: {spa:-1}};
				move.onHit = function (target, source) {
					var oldAbility = target.setAbility('solarpower');
					if (oldAbility) {
						this.add('-ability', target, target.ability, '[from] move: Blazing Star - Ten Evil Stars');
					}
				};
			}
			if (move.id === 'mefirst' && name === 'sirdonovan') {
				move.name = 'Ladies First';
				move.category = 'Special';
				move.type = 'Fairy';
				move.basePower = 120;
				move.accuracy = 100;
				move.self = {boosts: {spe:1}};
				move.onHit = function (target, pokemon) {
					var decision = this.willMove(pokemon);
					if (decision && target.gender === 'F') {
						this.cancelMove(pokemon);
						this.queue.unshift(decision);
						this.add('-activate', pokemon, 'move: Ladies First');
					}
				};
			}
			if (move.id === 'allyswitch' && name === 'slayer95') {
				move.name = 'Spell Steal';
				move.target = 'self';
				move.onTryHit = function (target, source) {
					if (!source.illusion) {
						this.add('-fail', source);
						this.add('-hint', "Spell Steal only works behind an Illusion!");
						return null;
					}
				};
				move.onHit = function (target, source) {
					var lastMove = source.illusion.moveset[source.illusion.moves.length - 1];
					this.useMove(lastMove.id, source);
				};
			}
			if (move.id === 'kingsshield' && name === 'sweep') {
				move.name = "Sweep's Shield";
				move.onHit = function (pokemon) {
					pokemon.setAbility('swiftswim');
					pokemon.addVolatile('stall');
				};
			}
			if (move.id === 'superfang' && name === 'vacate') {
				move.name = 'Duper Fang';
				move.basePower = 105;
				delete move.damageCallback;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Super Fang", target);
				};
				move.onHit = function (pokemon) {
					if (this.random(100) < 95) {
						pokemon.trySetStatus('par');
					} else {
						pokemon.addVolatile('confusion');
					}
				};
			}
			if (move.id === 'bravebird' && name === 'verbatim') {
				move.name = 'Glass Cannon';
				move.basePower = 170;
				move.accuracy = 80;
				move.recoil = [1, 4];
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "High Jump Kick", target);
				};
				move.onHit = function (pokemon) {
					this.add('c|&verbatim|DEFENESTRATION!');
					if (this.random(20) === 1) pokemon.switchFlag = true;
				};
				move.onMoveFail = function (target, source, move) {
					this.damage(source.maxhp / 2, source, source, 'glasscannon');
				};
			}

			// Mod signature moves.
			if (move.id === 'worryseed' && name === 'acedia') {
				move.name = 'Procrastination';
				move.onHit = function (pokemon, source) {
					var oldAbility = pokemon.setAbility('slowstart');
					if (oldAbility) {
						this.add('-ability', pokemon, 'Slow Start', '[from] move: Procrastination');
						if (this.random(100) < 10) source.faint();
						return;
					}
					return false;
				};
			}
			if (move.id === 'pursuit' && name === 'am') {
				move.name = 'Predator';
				move.basePowerCallback = function (pokemon, target) {
					if (target.beingCalledBack) return 120;
					return 60;
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Pursuit", target);
				};
				move.boosts = {atk:-1, spa:-1, accuracy:-2};
			}
			if (move.id === 'triattack' && name === 'ascriptmaster') {
				move.name = 'Spectrum Beam';
				move.ignoreImmunity = true;
				move.basePower = 8;
				move.critRatio = 1;
				move.accuracy = 95;
				move.typechart = Object.keys(Tools.data.TypeChart);
				move.hitcount = 0;
				move.type = move.typechart[0];
				move.multihit = move.typechart.length;
				delete move.secondaries;
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Swift", target);
				};
				move.onHit = function (target, source, move) {
					move.hitcount++;
					move.type = move.typechart[move.hitcount];
				};
			}
			if (move.id === 'drainingkiss' && name === 'antemortem') {
				move.name = 'Postmortem';
				move.basePower = 110;
				move.accuracy = 85;
				delete move.drain;
				// Manually activate the ability again.
				if (pokemon.ability === 'sheerforce') {
					delete move.secondaries;
					move.negateSecondary = true;
					pokemon.addVolatile('sheerforce');
				} else {
					move.secondaries = [{chance: 50, self: {boosts: {spa: 1, spe: 1}}}];
				}
			}
			if (move.id === 'futuresight' && name === 'asgdf') {
				move.name = 'Obscure Pun';
				// It's easier onHit since it's a future move.
				// Otherwise, all of onTryHit must be rewritten here to add the drop chance.
				move.onHit = function (pokemon) {
					this.add('-message', 'I get it now!');
					if (this.random(100) < 70) {
						this.boost({spa:-1, spd:-1}, pokemon, pokemon, move.sourceEffect);
					}
				};
			}
			if (move.id === 'detect' && name === 'audiosurfer') {
				move.name = 'Audioshield';
				move.secondary = {chance: 50, self: {boosts: {accuracy:-1}}};
				move.onTryHit = function (target) {
					this.add('-anim', target, "Boomburst", target);
					return !!this.willAct() && this.runEvent('StallMove', target);
				};
				move.onHit = function (pokemon) {
					var foe = pokemon.side.foe.active[0];
					if (foe.ability !== 'soundproof') {
						this.add('-message', 'The Audioshield is making a deafening noise!');
						this.damage(foe.maxhp / 12, foe, pokemon);
						if (this.random(2) === 1) this.boost({atk:-1, spa:-1}, foe, foe, 'noise damage');
					}
					pokemon.addVolatile('stall');
				};
			}
			if (move.id === 'bulkup' && name === 'barton') {
				move.name = 'MDMA Huff';
				move.boosts = {atk:2, spe:1, accuracy:-1};
			}
			if (move.id === 'glare' && name === 'bean') {
				move.name = 'Coin Toss';
				move.accuracy = true;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Pay Day", target);
				};
				move.onHit = function (pokemon) {
					pokemon.addVolatile('confusion');
				};
				move.ignoreImmunity = true;
				move.type = 'Dark';
			}
			if (move.id === 'bugbuzz' && name === 'beowulf') {
				move.name = 'Buzzing of the Swarm';
				move.category = 'Physical';
				move.basePower = 100;
				move.secondaries = [{chance:10, volatileStatus: 'flinch'}];
			}
			if (move.id === 'dragontail' && name === 'biggie') {
				move.name = 'Food Rush';
				move.basePower = 100;
				move.type = 'Normal';
				move.self = {boosts: {evasion:-1}};
			}
			if (move.id === 'quickattack' && name === 'birkal') {
				move.name = 'Caw';
				move.type = 'Bird';
				move.category = 'Status';
				move.onHit = function (target) {
					if (!target.setType('Bird')) return false;
					this.add('-start', target, 'typechange', 'Bird');
					this.add('c|%Birkal|caw');
				};
			}
			if (move.id === 'oblivionwing' && name === 'blitzamirin') {
				move.name = 'Pneuma Relinquish';
				move.type = 'Ghost';
				move.damageCallback = function (pokemon, target) {
					return target.hp / 2;
				};
				move.onImmunity = function (type) {
					if (type in {'Normal':1, 'Ghost':1}) return false;
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Roar of Time", target);
				};
				move.onHit = function (pokemon) {
					pokemon.addVolatile('gastroacid');
				};
			}
			if (move.id === 'bravebird' && name === 'coolstorybrobat') {
				move.name = 'Brave Bat';
				move.basePower = 130;
				move.critRatio = 2;
				delete move.recoil;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Brave Bird", target);
				};
			}
			if (move.id === 'detect' && name === 'dell') {
				var dmg = Math.ceil(pokemon.maxhp / (pokemon.ability === 'simple' ? 2 : 4));
				move.name = 'Aura Parry';
				move.self = {boosts: {atk:1, spa:1, spe:1}};
				move.onTryHit = function (target, source) {
					if (source.hp <= dmg) return false;
					this.attrLastMove('[still]');
					this.add('-anim', source, "Amnesia", source);
					return !!this.willAct() && this.runEvent('StallMove', target);
				};
				move.onHit = function (target) {
					this.directDamage(dmg, target, target);
					pokemon.addVolatile('parry');
					pokemon.addVolatile('stall');
				};
			}
			if (name === 'eeveegeneral') {
				if (move.id === 'shiftgear') {
					move.name = 'Gears of War';
				}
				if (move.id === 'quickattack') {
					move.name = 'War Crimes';
					move.type = 'Normal';
					move.category = 'Status';
					move.basePower = 0;
					move.onHit = function (pokemon, source) {
						this.directDamage(source.maxhp / 4, source, source);
						pokemon.addVolatile('curse');
						pokemon.addVolatile('confusion');
						this.add("c|@Eevee General|What's a Geneva Convention?");
					};
				}
			}
			if (name === 'electrolyte') {
				if (move.id === 'entrainment') {
					move.name = 'Study';
					move.priority = 1;
					move.flags = {protect:1};
					move.onTryHit = function (target, source) {
						if (source.lastAttackType === 'None') {
							this.add('-hint', "Study only works when preceded by an attacking move.");
							return false;
						}
					};
					move.onHit = function (target, source) {
						var possibleTypes = [];
						var attackType = source.lastAttackType;
						source.lastAttackType = 'None';
						for (var type in this.data.TypeChart) {
							if (target.hasType(type)) continue;
							var typeCheck = this.data.TypeChart[type].damageTaken[attackType];
							if (typeCheck === 1) {
								possibleTypes.push(type);
							}
						}
						if (!possibleTypes.length) {
							return false;
						}
						var type = possibleTypes[this.random(possibleTypes.length)];
						if (!target.setType(type)) {
							return false;
						}
						this.add('c|@Electrolyte|Ha! I\'ve found your weakness.');
						this.add('-start', target, 'typechange', type);
					};
				} else {
					pokemon.lastAttackType = move.type;
				}
			}
			if (move.id === 'fakeout' && name === 'enguarde') {
				move.name = 'Ready Stance';
				move.type = 'Steel';
				move.secondaries = [{chance:100, boosts:{atk:-1, spa:-1}, volatileStatus: 'flinch'}];
				move.onTryHit = function (target, source) {
					if (source.activeTurns > 1) {
						this.add('-hint', "Ready Stance only works on your first turn out.");
						return false;
					}
				};
				move.onHit = function (target, source) {
					source.addVolatile('focusenergy');
					this.add('c|@Enguarde|En garde!'); // teehee
				};
			}
			if (move.id === 'shadowball' && name === 'eos') {
				move.name = 'Shadow Curse';
				move.power = 60;
				move.priority = 1;
				move.volatileStatus = 'curse';
				move.onHit = function (target, source) {
					this.directDamage(source.maxhp / 2, source, source);
				};
			}
			if (move.id === 'roleplay' && name === 'formerhope') {
				move.volatileStatus = 'taunt';
				move.self = {boosts: {spa:1}};
				move.onTryHit = function (target, source) {
					this.add('c|@Former Hope|/me godmodes');
				};
				move.onHit = function () {};
			}
			if (move.id === 'geargrind' && name === 'genesect') {
				move.name = "Grind you're mum";
				move.basePower = 30;
				move.onHit = function (target, pokemon) {
					if (target.fainted || target.hp <= 0) this.boost({atk:2, spa:2, spe:1}, pokemon, pokemon, move);
				};
			}
			if (move.id === 'partingshot' && name === 'hippopotas') {
				move.name = 'Hazard Pass';
				delete move.boosts;
				move.onHit = function (pokemon) {
					var hazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'].randomize();
					pokemon.side.addSideCondition(hazards[0]);
					pokemon.side.addSideCondition(hazards[1]);
				};
			}
			if (move.id === 'hydrocannon' && name === 'hydroimpact') {
				move.name = 'HYDRO IMPACT';
				move.basePower = 150;
				move.accuracy = 90;
				move.category = 'Physical';
				move.status = 'brn';
				delete move.self;
				move.onHit = function (target, source) {
					this.directDamage(source.maxhp * 0.35, source, source);
				};
			}
			if (move.id === 'splash' && name === 'innovamania') {
				move.name = 'Rage Quit';
				delete move.onTryHit;
				move.onHit = function (pokemon) {
					pokemon.faint();
				};
			}
			if (move.id === 'crunch' && name === 'jas61292') {
				move.name = 'Minus One';
				move.basePower = 110;
				move.accuracy = 85;
				delete move.secondary;
				delete move.secondaries;
				move.onHit = function (pokemon, source) {
					var boosts = {};
					var stats = Object.keys(pokemon.stats).slice(1);
					boosts[stats[this.random(4)]] = -1;
					this.boost(boosts, pokemon, source);
				};
			}
			if (move.id === 'rapidspin' && name === 'jinofthegale') {
				move.name = 'Beyblade';
				move.category = 'Special';
				move.type = 'Electric';
				move.basePower = 90;
				// If we use onHit but use source, we don't have to edit self.onHit.
				move.onHit = function (pokemon, source) {
					var side = source.side;
					for (var i = 0; i < side.pokemon.length; i++) {
						side.pokemon[i].status = '';
					}
					this.add('-cureteam', source, '[from] move: Beyblade');
				};
			}
			if (move.id === 'refresh' && name === 'kostitsynkun') {
				move.name = 'Kawaii-desu uguu~';
				move.heal = [1, 2];
				move.flags = {heal: 1};
				move.onHit = function (target, source) {
					this.add('-curestatus', source, source.status);
					source.status = '';
					source.removeVolatile('confusion');
					source.removeVolatile('curse');
					source.removeVolatile('attract');
					if (this.random(7) === 1) {
						pokemon.side.foe.active[0].addVolatile('attract');
					}
				};
			}
			if (move.id === 'transform' && name === 'kupo') {
				move.name = 'Kupo Nuts';
				move.flags = {};
				move.priority = 2;
				move.onHit = function (pokemon, user) {
					var template = pokemon.template;
					if (pokemon.fainted || pokemon.illusion) {
						return false;
					}
					if (!template.abilities || (pokemon && pokemon.transformed) || (user && user.transformed)) {
						return false;
					}
					if (!user.formeChange(template, true)) {
						return false;
					}
					user.transformed = true;
					user.typesData = [];
					for (var i = 0, l = pokemon.typesData.length; i < l; i++) {
						user.typesData.push({
							type: pokemon.typesData[i].type,
							suppressed: false,
							isAdded: pokemon.typesData[i].isAdded
						});
					}
					for (var statName in user.stats) {
						user.stats[statName] = pokemon.stats[statName];
					}
					user.moveset = [];
					user.moves = [];
					for (var i = 0; i < pokemon.moveset.length; i++) {
						var move = this.getMove(user.set.moves[i]);
						var moveData = pokemon.moveset[i];
						var moveName = moveData.move;
						if (moveData.id === 'hiddenpower') {
							moveName = 'Hidden Power ' + user.hpType;
						}
						user.moveset.push({
							move: moveName,
							id: moveData.id,
							pp: move.noPPBoosts ? moveData.maxpp : 5,
							maxpp: move.noPPBoosts ? moveData.maxpp : 5,
							target: moveData.target,
							disabled: false
						});
						user.moves.push(toId(moveName));
					}
					for (var j in pokemon.boosts) {
						user.boosts[j] = pokemon.boosts[j];
					}
					this.add('-transform', user, pokemon);
					user.setAbility(pokemon.ability);
					user.originalName = user.name;
					user.name = pokemon.name;
					user.update();
				};
			}
			if (move.id === 'gust' && name === 'lawrenceiii') {
				move.name = 'Shadow Storm';
				move.type = 'Shadow';
				move.accuracy = true;
				move.ignoreDefensive = true;
				move.defensiveCategory = 'Physical';
				move.basePowerCallback = function (pokemon, target) {
					if (target.volatiles['partiallytrapped']) return 65;
					return 35;
				};
				move.onEffectiveness = function (typeMod, target, type, move) {
					var eff = 1;
					if (toId(pokemon.side.foe.active[0].name) === 'lawrenceiii') eff = -1;
					return eff; // Shadow moves are SE against all non-Shadow mons.
				};
				move.onHit = function (target, source) {
					if (target.volatiles['partiallytrapped'] && (this.random(100) < 35)) {
						target.addVolatile('confusion');
					}
				};
			}
			if (move.id === 'shellsmash' && name === 'legitimateusername') {
				move.name = 'Shell Fortress';
				move.boosts = {def:2, spd:2, atk:-4, spa:-4, spe:-4};
			}
			if (move.id === 'trumpcard' && name === 'level51') {
				move.name = 'Next Level Strats';
				delete move.basePowerCallback;
				move.target = 'self';
				move.category = 'Status';
				move.onTryHit = function (pokemon) {
					if (pokemon.level >= 200) return false;
				};
				move.onHit = function (pokemon) {
					pokemon.level += 9;
					if (pokemon.level > 200) pokemon.level = 200;
					this.add('-message', 'Level 51 advanced 9 levels! It is now level ' + pokemon.level + '!');
				};
			}
			if (move.id === 'thundershock' && name === 'lyto') {
				move.name = 'Gravity Storm';
				move.basePower = 100;
				move.accuracy = 100;
				delete move.secondary;
				delete move.secondaries;
				move.self = {volatileStatus: 'magnetrise'};
			}
			if (move.id === 'protect' && name === 'layell') {
				move.name = 'Pixel Protection';
				move.self = {boosts: {def:3, spd:2}};
				move.onTryHit = function (pokemon) {
					if (pokemon.volatiles['pixels']) {
						this.add('-hint', "Pixel Protection only works once per outing.");
						return false;
					}
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Moonblast", pokemon);
					return !!this.willAct() && this.runEvent('StallMove', pokemon);
				};
				move.onHit = function (pokemon) {
					if (pokemon.volatiles['pixels']) return false;
					pokemon.addVolatile('pixels');
					pokemon.addVolatile('stall');
				};
			}
			if (move.id === 'sacredfire' && name === 'marty') {
				move.name = 'Immolate';
				move.basePower += 20;
				move.category = 'Special';
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Flamethrower", target);
				};
			}
			if (move.id === 'spikes' && name === 'morfent') {
				move.name = 'Used Needles';
				move.self = {boosts: {evasion: -1}};
				move.target = 'normal';
				move.onTryHit = function (target, source) {
					source.addVolatile('needles');
				};
			}
			if (name === 'naniman') {
				if (move.id === 'fireblast') {
					move.name = 'Tanned';
					move.accuracy = 100;
					move.secondaries = [{status:'brn', chance:100}];
					move.onTryHit = function (target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Eruption", target);
					};
					move.onHit = function (target, source) {
						this.boost({atk:1, spa:1, evasion:-1, accuracy:-1}, source, source);
					};
				} else if (move.id === 'topsyturvy') move.name = 'rof';
			}
			if (move.id === 'inferno' && name === 'nixhex') {
				move.name = 'Beautiful Disaster';
				move.type = 'Normal';
				move.secondaries = [{
					chance:100,
					onHit: function (target, source) {
						var result = this.random(2);
						if (result < 1) {
							target.trySetStatus('brn', source);
						} else {
							target.trySetStatus('par', source);
						}
					}
				}];
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Simple Beam", target);
				};
			}
			if (move.id === 'hypnosis' && name === 'osiris') {
				move.name = 'Restless Sleep';
				move.accuracy = 85;
				move.volatileStatus = 'nightmare';
			}
			if (move.id === 'whirlpool' && name === 'phil') {
				move.name = 'Slug Attack';
				move.basePower = 50;
				move.secondaries = [{chance:100, status:'tox'}];
			}
			if (move.id === 'meditate' && name === 'qtrx') {
				move.name = 'KEYBOARD SMASH';
				move.target = 'normal';
				move.boosts = null;
				move.hitcount = [3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7][this.random(11)];
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Fairy Lock", target);
					this.add('-anim', pokemon, "Fairy Lock", pokemon); // DRAMATIC FLASHING
				};
				move.onHit = function (target, source) {
					var gibberish = '';
					var hits = 0;
					var hps = ['hiddenpowerbug', 'hiddenpowerdark', 'hiddenpowerdragon', 'hiddenpowerelectric', 'hiddenpowerfighting', 'hiddenpowerfire', 'hiddenpowerflying', 'hiddenpowerghost', 'hiddenpowergrass', 'hiddenpowerground', 'hiddenpowerice', 'hiddenpowerpoison', 'hiddenpowerpsychic', 'hiddenpowerrock', 'hiddenpowersteel', 'hiddenpowerwater'];
					this.add('c|@qtrx|/me slams face into keyboard!');
					source.isDuringAttack = true; // Prevents the user from being kicked out in the middle of using Hidden Powers.
					for (var i = 0; i < move.hitcount; i++) {
						if (target.hp !== 0) {
							var len = 16 + this.random(35);
							gibberish = '';
							for (var j = 0; j < len; j++) gibberish += String.fromCharCode(48 + this.random(79));
							this.add('-message', gibberish);
							this.useMove(hps[this.random(16)], source, target);
							hits++;
						}
					}
					this.add('-message', 'Hit ' + hits + ' times!');
					source.isDuringAttack = false;
				};
			}
			if (move.id === 'leer' && name === 'queez') {
				move.name = 'Sneeze';
				delete move.boosts;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Curse", target);
				};
				move.onHit = function (target, source) {
					if (!target.volatiles.curse) {
						this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1}, source, source);
						target.addVolatile('curse');
					} else {
						this.boost({atk: 1}, source, source);
						this.boost({def: -1}, target, source);
						this.useMove('explosion', source, target);
					}
				};
			}
			if (move.id === 'headcharge' && name === 'rekeri') {
				move.name = 'Land Before Time';
				move.basePower = 125;
				move.type = 'Rock';
				move.accuracy = 90;
				move.secondaries = [{chance:10, volatileStatus:'flinch'}];
			}
			if (move.id === 'stockpile' && name === 'relados') {
				move.name = 'Loyalty';
				move.type = 'Fire';
				move.priority = 1;
				delete move.volatileStatus;
				move.onTryHit = function () {
					return true;
				};
				move.onHit = function (target, source) {
					if (!source.volatiles['stockpile'] || (source.volatiles['stockpile'].layers < 3)) {
						source.addVolatile('stockpile');
						this.add("raw|<div class=\"broadcast-blue\"><b>Relados received a loyalty point!</b></div>");
					} else {
						source.removeVolatile('stockpile');
						this.add("raw|<div class=\"broadcast-red\"><b>Relados was rewarded for his loyalty!</b><br />Relados has advanced one level.</div>");
						source.level++;
						source.formeChange('Terrakion');
						source.details = source.species + (source.level === 99 ? '' : ', L' + source.level + 1);
						this.add('detailschange', source, source.details);
						this.heal(source.maxhp, source, source);
					}
					this.add('-clearallboost');
					for (var i = 0; i < this.sides.length; i++) {
						if (this.sides[i].active[0]) this.sides[i].active[0].clearBoosts();
					}
				};
			}
			if (move.id === 'eggbomb' && name === 'reverb') {
				move.name = 'fat monkey';
				move.accuracy = 95;
				move.flags = {contact: 1, protect: 1};
				move.self = {boosts: {def:-1, spe:-1}};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Brave Bird", target);
				};
				move.onHit = function (target, source) {
					this.heal(120, source, source);
				};
				move.onMoveFail = function (target, source, move) {
					this.directDamage(120, source, source);
				};
			}
			if (move.id === 'frenzyplant' && name === 'rosiethevenusaur') {
				move.name = 'Swag Plant';
				move.volatileStatus = 'confusion';
				move.self = {boosts: {atk:1, def:1}};
			}
			if (move.id === 'icebeam' && name === 'scalarmotion') {
				move.name = 'Eroding Frost';
				move.basePower = 65;
				move.onEffectiveness = function (typeMod, type) {
					if (type in {'Fire':1, 'Water': 1}) return 1;
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Blizzard", target);
				};
			}
			if (move.id === 'boomburst' && name === 'scotteh') {
				move.name = 'Geomagnetic Storm';
				move.type = 'Electric';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Discharge", target);
				};
			}
			if (move.id === 'healingwish' && name === 'shamethat') {
				move.name = 'Extreme Compromise';
			}
			if (move.id === 'judgment' && name === 'shrang') {
				move.name = 'Pixilate';
			}
			if (move.id === 'storedpower' && name === 'skitty') {
				move.name = 'Ultimate Dismissal';
				move.type = 'Fairy';
				move.onDamage = function (damage, target, source, effect) {
					if (damage > 0) {
						this.heal(Math.ceil((damage * 0.25) * 100 / target.maxhp), source, source);
					}
				};
			}
			if (move.id === 'thousandarrows' && name === 'snowflakes') {
				move.name = 'Azalea Butt Slam';
				move.category = 'Special';
				move.onHit = function (target, source, move) {
					target.addVolatile('trapped', source, move, 'trapper');
				};
			}
			if (move.id === 'waterpulse' && name === 'spydreigon') {
				move.name = 'Mineral Pulse';
				move.basePower = 95;
				move.type = 'Steel';
				move.accuracy = 100;
			}
			if (name === 'steamroll') {
				if (move.id === 'protect') {
					move.name = 'Conflagration';
					move.onTryHit = function (pokemon) {
						if (pokemon.activeTurns > 1) {
							this.add('-hint', "Conflagration only works on your first turn out.");
							return false;
						}
						this.attrLastMove('[still]');
						this.add('-anim', pokemon, "Fire Blast", pokemon);
					};
					move.self = {boosts: {atk:2, def:2, spa:2, spd:2, spe:2}};
				}
				move.onHit = function (target, pokemon) {
					if (target.fainted || target.hp <= 0) pokemon.killedSome = 1;
				};
			}
			if (move.id === 'tailglow' && name === 'steeledges') {
				delete move.boosts;
				move.name = 'True Daily Double';
				move.target = 'normal';
				move.onTryHit = function (target, source) {
					if (source.volatiles['truedailydouble']) return false;
					this.attrLastMove('[still]');
					this.add('-anim', source, "Nasty Plot", target);
				};
				move.onHit = function (target, source) {
					if (this.random(2)) {
						this.add('-message', '@SteelEdges failed misserably!');
						this.boost({spa: -2}, source, source);
					} else {
						this.add('-message', '@SteelEdges is the winner!');
						this.boost({spa: 4}, source, source);
					}
					source.addVolatile('truedailydouble');
				};
			}
			if (move.id === 'shadowsneak' && name === 'temporaryanonymous') {
				move.name = 'SPOOPY EDGE CUT';
				move.basePower = 90;
				move.accuracy = 100;
				move.self = {boosts: {evasion:-1}};
				move.onTryHit = function (target, source) {
					this.add('-message', '*@Temporaryanonymous teleports behind you*');
					this.attrLastMove('[still]');
					this.add('-anim', source, "Shadow Force", target);
				};
				move.onHit = function (pokemon) {
					if (pokemon.hp <= 0 || pokemon.fainted) {
						this.add('c|@Temporaryanonymous|YOU ARE ALREADY DEAD *unsheathes glorious cursed nippon steel katana and cuts you in half with it* heh......nothing personnel.........kid......................');
					}
				};
				move.onMoveFail = function (target, source, move) {
					this.add('-message', '*@Temporaryanonymous teleports behind you*');
					this.add('c|@Temporaryanonymous|YOU ARE ALREADY DEAD *misses* Tch......not bad.........kid......................');
				};
			}
			if (name === 'test2017') {
				if (move.id === 'karatechop') {
					move.name = 'Ducktastic';
					move.basePower = 100;
					move.accuracy = 100;
					move.type = 'Normal';
				}
				if (move.id === 'roost') {
					move.onHit = function (pokemon) {
						pokemon.trySetStatus('tox');
					};
				}
			}
			if (move.id === 'drainpunch' && name === 'tfc') {
				move.name = 'Chat Flood';
				move.basePower = 150;
				move.type = 'Water';
				move.category = 'Special';
				move.self = {boosts: {spa:-1, spd:-1, def:-1}};
			}
			if (move.id === 'return' && name === 'tgmd') {
				delete move.basePowerCallback;
				move.name = 'Canine Carnage';
				move.basePower = 120;
				move.secondaries = [{chance:10, volatileStatus:'flinch'}, {chance:100, boosts:{def:-1}}];
				move.accuracy = 90;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Close Combat", target);
				};
			}
			if (move.id === 'rockthrow' && name === 'timbuktu') {
				move.name = 'Geoblast';
				move.type = 'Fire';	// Not the other way round or STAB would be lost.
				move.category = 'Special';
				move.accuracy = true;
				move.basePowerCallback = function (source, target) {
					return (40 * Math.pow(2, source.timesGeoblastUsed));
				};
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Rock', type);
				};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Fire Blast", source);
					this.add('-anim', source, "Power Gem", target);
				};
				move.onHit = function (target, source) {
					source.timesGeoblastUsed++;
				};
			}
			if (move.id === 'naturepower' && name === 'trickster') {
				move.name = 'Cometstorm';
				move.category = 'Special';
				move.type = 'Fairy';
				move.basePower = 80;
				move.secondaries = [{chance:30, status:'brn'}, {chance:30, status:'frz'}];
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Ice', type);
				};
				move.self = {boosts: {accuracy:-1}};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Simple Beam", target);
				};
				delete move.onHit;
			}
			if (move.id === 'explosion' && name === 'trinitrotoluene') {
				move.name = 'Get Haxed';
				move.basePower = 250;
				move.onTryHit = function (target, source) {
					this.boost({def: -1}, target, source);
				};
				move.onHit = function (pokemon) {
					pokemon.side.addSideCondition('spikes');
					this.add('-message', 'Debris was scattered on ' + pokemon.name + "'s side!");
				};
			}
			if (move.id === 'waterfall' && name === 'waterbomb') {
				move.name = 'Water Bomb';
				move.basePowerCallback = function (pokemon, target) {
					if (this.effectiveWeather() === 'raindance' || this.effectiveWeather() === 'primordialsea') return 93;
					if (this.effectiveWeather() === 'sunnyday' || this.effectiveWeather() === 'desolateland') return 210;
					return 140;
				};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Seismic Toss", target);
					target.ignore['Ability'] = true;
				};
				move.accuracy = true;
				move.ignoreImmunity = true;
				move.ignoreDefensive = true;
				move.ignoreEvasion = true;
			}
			if (move.id === 'metronome' && name === 'xfix') {
				if (pokemon.moveset[3] && pokemon.moveset[3].pp) {
					pokemon.moveset[3].pp = Math.round(pokemon.moveset[3].pp * 10 + 6) / 10;
				}
				move.name = '(Super Glitch)';
				move.multihit = [2, 5];
				move.onTryHit = function (target, source) {
					if (!source.isActive) return null;
					if (this.random(777) !== 42) return;
					var opponent = pokemon.side.foe.active[0];
					opponent.setStatus('brn');
					var possibleStatuses = ['confusion', 'flinch', 'attract', 'focusenergy', 'foresight', 'healblock'];
					for (var i = 0; i < possibleStatuses.length; i++) {
						if (this.random(3) === 1) {
							opponent.addVolatile(possibleStatuses[i]);
						}
					}

					function generateNoise() {
						var noise = '';
						var random = this.random(40, 81);
						for (var i = 0; i < random; i++) {
							if (this.random(4) !== 0) {
								// Non-breaking space
								noise += '\u00A0';
							} else {
								noise += String.fromCharCode(this.random(0xA0, 0x3040));
							}
						}
						return noise;
					}
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is frozen solid?)");
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is hurt by its burn!)");
					this.damage(opponent.maxhp * this.random(42, 96) * 0.01, opponent, opponent);
					var exclamation = source.status === 'brn' ? '!' : '?';
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER @xfix is hurt by its burn" + exclamation + ")");
					this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
					return null;
				};
			}
			if (move.id === 'detect' && name === 'zebraiken') {
				move.name = 'bzzt';
				move.self = {boosts: {spa:1, atk:1}};
			}
			if (move.id === 'wish' && name === 'zdrup') {
				move.name = 'Premonition';
				move.flags = {};
				move.sideCondition = 'mist';
				move.onTryHit = function (pokemon) {
					if (pokemon.side.premonTimer) {
						this.add ('-hint', 'Premonition\'s effect is already underway!');
						return false;
					}
				};
				move.onHit = function (pokemon) {
					pokemon.side.premonTimer = 1;
				};
			}

			// Driver signature moves.
			if (move.id === 'thunder' && name === 'aelita') {
				move.name = 'Energy Field';
				move.accuracy = 100;
				move.basePower = 150;
				move.secondaries = [{chance:40, status:'par'}];
				move.self = {boosts:{spa:-1, spd:-1, spe:-1}};
			}
			if (move.id === 'psychoboost' && name === 'arcticblast') {
				move.name = 'Doubles Purism';
				delete move.self;
				move.onHit = function (target, source) {
					if (source.hp) {
						var hasRemovedHazards = false;
						var sideConditions = {'spikes': 1, 'toxicspikes': 1, 'stealthrock': 1, 'stickyweb': 1};
						for (var i in sideConditions) {
							if (target.side.removeSideCondition(i)) {
								hasRemovedHazards = true;
								this.add('-sideend', target.side, this.getEffect(i).name, '[from] move: Doubles Purism', '[of] ' + source);
							}
							if (source.side.removeSideCondition(i)) {
								hasRemovedHazards = true;
								this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Doubles Purism', '[of] ' + source);
							}
						}
						if (hasRemovedHazards) this.add('c|%Arcticblast|HAZARDS ARE TERRIBLE IN DOUBLES');
					}
				};
			}
			if (move.id === 'whirlwind' && name === 'articuno') {
				move.name = 'True Support';
				move.self = {boosts: {def:1, spd:1}};
				move.onHit = function (target, source) {
					this.useMove('substitute', target, target);
				};
			}
			if (move.id === 'toxic' && name === 'asty') {
				move.name = 'Amphibian Toxin';
				move.accuracy = 100;
				move.self = {boosts:{atk:-1, spa:-1}};
				move.boosts = {atk:-1, spa:-1};
				move.onHit = function (target, source) {
					target.side.addSideCondition('toxicspikes');
					target.side.addSideCondition('toxicspikes');
				};
			}
			if (move.id === 'psywave' && name === 'astara') {
				move.name = 'Star Bolt Desperation';
				move.type = ['Bird', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'][this.random(19)];
				move.damageCallback = function (pokemon) {
					return pokemon.hp * 7 / 8;
				};
				move.onHit = function (target, source) {
					if (this.random(2) === 1) target.addVolatile('confusion');
					var status = ['par', 'brn', 'frz', 'psn', 'tox', 'slp'][this.random(6)];
					if (this.random(2) === 1) target.trySetStatus(status);
					var boosts = {};
					var increase = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'][this.random(6)];
					var decrease = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'][this.random(6)];
					boosts[increase] = 1;
					boosts[decrease] = -1;
					this.boost(boosts, source, source);
				};
			}
			if (move.id === 'spikecannon' && name === 'bloobblob') {
				// I fear that having two moves with id 'bulletseed' would mess with PP.
				move.name = 'Lava Whip';
				move.type = 'Fire';
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Tail Slap", target);
				};
			}
			if (move.id === 'hypervoice' && name === 'bumbadadabum') {
				move.name = 'Open Source Software';
				move.type = 'Electric';
				move.basePower = 110;
				move.accuracy = 95;
				move.secondaries = [{chance:20, self:{boosts:{spa:-1}}, volatileStatus:'disable'}];
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Dark Void", target);
				};
				move.onHit = function () {
					this.add('c|%Bumbadadabum|I\'d just like to interject for a moment. What you\'re referring to as Linux, is in fact, GNU/Linux, or as I\'ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.');
				};
			}
			if (move.id === 'swagger' && name === 'charlescarmichael') {
				move.name = 'Bad Pun';
				move.onHit = function (pokemon) {
					pokemon.addVolatile('taunt');
				};
			}
			if (move.id === 'protect' && name === 'crestfall') {
				move.name = 'Final Hour';
				move.onTryHit = function (pokemon) {
					if (pokemon.activeTurns > 1) {
						this.add('-hint', "Final Hour only works on your first turn out.");
						return false;
					}
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Dark Pulse", pokemon);
				};
				move.onHit = function () {
					this.add('c|%Crestfall|' + ['The die is cast...', 'Time for reckoning.'][this.random(2)]);
				};
				move.self = {boosts: {spe:2, evasion:1, def:-2, spd:-2}};
			}
			if (move.id === 'dragonrush' && name === 'dtc') {
				move.name = 'Dragon Smash';
				move.basePower = 150;
				move.recoil = [1, 2];
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Head Charge", target);
				};
			}
			if (name === 'feliburn') {
				if (move.id === 'firepunch') {
					move.name = 'Falcon Punch';
					move.basePower = 150;
					move.accuracy = 85;
					move.self = {boosts: {atk:-1, def:-1, spd:-1}};
					move.onTryHit = function (target, source) {
						this.add('c|%Feliburn|FAALCOOOOOOON');
						this.attrLastMove('[still]');
						this.add('-anim', source, "Fire Punch", target);
					};
					move.onHit = function () {
						this.add('c|%Feliburn|PUUUUUNCH!!');
					};
				}
				if (move.id === 'taunt') {
					move.onHit = function () {
						this.add('c|%Feliburn|Show me your moves!');
					};
				}
			}
			if (move.id === 'highjumpkick' && name === 'galbia') {
				move.name = 'Kibitz';
				move.basePower = 110;
				move.accuracy = 100;
				delete move.onMoveFail;
				move.onHit = function (target, source) {
					var result = this.random(100);
					var chance = source.hasAbility('serenegrace') ? 60 : 30;
					// If the result is less than 60 or 30, then Kibitz will flinch the target.
					if (this.willMove(target) && result < chance) {
						target.addVolatile('flinch');
					} else if (target.hp !== 0 && !target.newlySwitched) {
						this.damage(source.maxhp / 3, source, source, 'Kibitz');
					}
				};
			}
			if (move.id === 'psychup' && name === 'hugendugen') {
				move.name = 'Policy Decision';
				move.onHit = function (target, source) {
					var targetBoosts = {};
					var targetDeboosts = {};
					for (var i in target.boosts) {
						targetBoosts[i] = target.boosts[i];
						targetDeboosts[i] = -target.boosts[i];
					}
					source.setBoost(targetBoosts);
					target.setBoost(targetDeboosts);
					this.add('-copyboost', source, target, '[from] move: Policy Decision');
					this.add('-invertboost', target, '[from] move: Policy Decision');
				};
			}
			if (move.id === 'surf' && name === 'jellicent') {
				move.name = 'Shot For Shot';
				move.basePower = 80;
				move.volatileStatus = 'confusion';
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Teeter Dance", target);
				};
			}
			if (move.id === 'vinewhip' && name === 'kayo') {
				move.name = 'Beard of Zeus Bomb';
				move.type = 'Steel';
				move.basePower = 90;
				move.secondaries = [{
					chance:50,
					self:{boosts:{atk:1, spd:1}},
					onHit: function (target, source) {
						if (target.gender === 'F') {
							target.addVolatile('attract');
						} else if (target.gender === 'M') {
							target.addVolatile('confusion');
						} else {
							target.trySetStatus('brn');
						}
					}
				}];
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Leaf Storm", target);
				};
			}
			if (move.id === 'blazekick' && name === 'ljdarkrai') {
				move.name = 'Blaze Blade';
				move.accuracy = 100;
				move.basePower = 90;
				move.critRatio = 2;
			}
			if (move.id === 'bulletpunch' && name === 'majorbling') {
				move.name = 'Focus Laser';
				move.type = 'Electric';
				move.category = 'Status';
				move.basePower = 0;
				move.self = {volatileStatus:'torment'};
				move.onTryHit = function (target, source) {
					if (pokemon.activeTurns > 1) {
						this.add('-hint', "Focus Laser only works on your first turn out.");
						return false;
					}
				};
				move.onPrepareHit = function (source, target, move) {
					if (pokemon.activeTurns > 1) {
						return;
					}
					this.add('-message', "%Majorbling's power level is increasing! It's over nine thousand!");
					target.addVolatile('focuspunch');
					this.boost({spa:2, atk:2, spe:2}, target, target);
				};
				move.onHit = function (target, source) {
					this.useMove('discharge', source, target);
					source.removeVolatile('focuspunch');
				};
			}
			if (move.id === 'scald' && name === 'raseri') {
				move.name = 'Ban Scald';
				move.basePower = 150;
				delete move.secondary;
				delete move.secondaries;
				move.status = 'brn';
			}
			if (move.id === 'spikes' && name === 'quotecs') {
				move.name = 'Diversify';
				move.self = {boosts: {atk:1, spd:1}};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Eruption", source);
				};
			}
			if (move.id === 'bulletpunch' && name === 'uselesstrainer') {
				move.name = 'Ranting';
				move.type = 'Bug';
				move.basePower = 40;
				move.multihit = [2, 5];
				move.self = {volatileStatus: 'mustrecharge'};
				move.accuracy = 95;
			}

			// Voices signature moves.
			if (move.id === 'superpower' && name === 'aldaron') {
				move.name = 'Admin Decision';
				move.basePower = 80;
				move.self = {boosts: {def:1, spd:1, spe:-2}};
				move.onEffectiveness = function () {
					return 1;
				};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Simple Beam", target);
				};
			}
			if (move.id === 'partingshot' && name === 'bmelts') {
				move.name = "Aaaannnd... he's gone";
				move.type = 'Ice';
				move.category = 'Special';
				move.basePower = 80;
				delete move.boosts;
			}
			if (name === 'cathy') {
				if (move.id === 'kingsshield') {
					move.name = 'Heavy Dosage of Fun';
				}
				if (move.id === 'calmmind') {
					move.name = 'Surplus of Humour';
					move.self = {boosts: {spa:1, atk:1}};
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', target, "Geomancy", target);
					};
				}
				if (move.id === 'shadowsneak') {
					move.name = 'Patent Hilarity';
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Shadow Sneak", target);
					};
				}
				if (move.id === 'shadowball') {
					move.name = 'Ion Ray of Fun';
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Simple Beam", target);
					};
				}
				if (move.id === 'shadowclaw') {
					move.name = 'Sword of Fun';
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Sacred Sword", target);
					};
				}
				if (move.id === 'flashcannon') {
					move.name = 'Fun Cannon';
					move.secondaries = [{chance:60, boosts:{spd:-1}}];
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Hydro Pump", target);
					};
				}
				if (move.id === 'dragontail') {
					move.name = '/kick';
					move.type = 'Steel';
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Karate Chop", target);
					};
				}
				if (move.id === 'hyperbeam') {
					move.name = '/ban';
					move.basePower = 150;
					move.type = 'Ghost';
				}
				if (move.id === 'memento') {
					move.name = 'HP Display Policy';
					move.boosts = {atk: -12, def: -12, spa: -12, spd: -12, spe: -12, accuracy: -12, evasion: -12};
					move.onTryHit = function (target, source) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Explosion", target);
					};
					move.onHit = function (target, source) {
						source.faint();
					};
				}
			}
			if (name === 'diatom') {
				if (move.id === 'healingwish') {
					move.name = 'Be Thankful';
					move.sideCondition = 'luckychant';
					move.onHit = function () {
						pokemon.side.addSideCondition('reflect');
						pokemon.side.addSideCondition('lightscreen');
						pokemon.side.addSideCondition('safeguard');
						pokemon.side.addSideCondition('mist');
						for (var i = 0; i < 6; i++) {
							var thanker = pokemon.side.pokemon[i];
							if (toId(thanker.name) !== name && !thanker.fainted) this.add('c|' + thanker.name + '|Thanks Diatom!');
							pokemon.hasBeenThanked = true;
						}
					};
				}
				if (move.id === 'psywave') {
					move.accuracy = 80;
					move.onMoveFail = function () {
						this.add('c|+Diatom|you should be thankful my psywave doesn\'t always hit');
					};
				}
			}
			if (move.id === 'growl' && name === 'limi') {
				move.name = 'Resilience';
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Shadow Ball", target);
				};
				move.onHit = function (target, source) {
					target.trySetStatus('psn');
					source.trySetStatus('psn');
					source.addVolatile('resilience');
					source.addVolatile('aquaring');
				};
			}
			if (move.id === 'toxic' && name === 'mattl') {
				move.name = 'Topology';
				move.self = {status: 'tox'};
			}
			if (move.id === 'swagger' && name === 'mikel') {
				move.accuracy = true;
				move.name = 'Trolling Lobby';
				move.onTryHit = function (pokemon, source) {
					if (source.hp <= Math.floor(source.maxhp * 2 / 3)) return false;
					return;
				};
				move.onHit = function (pokemon, source) {
					pokemon.addVolatile('taunt');
					if (!pokemon.hasType('Grass')) pokemon.addVolatile('leechseed');
					pokemon.addVolatile('torment');
					this.directDamage(source.maxhp * 2 / 3, source, source);
				};
			}
			if (move.id === 'judgment' && name === 'greatsage') {
				move.type = 'Rock';
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Energy Ball", target);
					this.add('c|+Great Sage|JUDGEMENT ' + target.name);
				};
				move.onHit = function (target, source) {
					source.addVolatile('ingrain');
					source.addVolatile('aquaring');
				};
			}
			if (move.id === 'recover' && name === 'redew') {
				move.onHit = function (pokemon) {
					if (pokemon.trySetStatus('tox')) {
						this.add('-message', '+Redew lost at SPL and got badly poisoned due to excessive trolling!');
					}
				};
			}
			if (move.id === 'detect' && name === 'shaymin') {
				move.name = 'Flower Garden';
				move.type = 'Grass';
				move.self = {boosts: {def:1, spa:1, spd:1}};
				move.onTryHit = function (target, source) {
					if (source.volatiles['flowergarden']) return false;
					this.attrLastMove('[still]');
					this.add('-anim', source, "Amnesia", source);
				};
				move.onHit = function (target, source) {
					source.addVolatile('stall');
					source.addVolatile('flowergarden');
				};
			}
			if (move.id === 'energyball' && name === 'somalia') {
				move.name = 'Ban Everyone';
				move.basePower = 0;
				delete move.secondary;
				move.category = 'Status';
				move.accuracy = 50 + 50 * pokemon.hp / pokemon.maxhp;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Explosion", target);
					source.faint();
				};
				move.onHit = function (target, source) {
					this.add('-anim', target, "Explosion", source);
					target.faint();
					target.side.addSideCondition('stealthrock');
					target.side.addSideCondition('toxicspikes');
				};
				move.onMoveFail = function (target, source, move) {
					source.faint();
				};
			}
			if (move.id === 'taunt' && name === 'talktakestime') {
				move.name = 'Bot Mute';
				move.onHit = function (target) {
					target.addVolatile('embargo');
					target.addVolatile('torment');
					target.addVolatile('healblock');
				};
			}
		}
	},
	{
		name: "You are (not) prepared",
		section: 'Seasonal',
		team: 'randomSeasonalMay2015',
		mod: 'seasonal',
		gameType: 'triples',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|<b><font color='red'>IMPORTANT!</font></b> All moves on this seasonal are custom. Use the command /seasonaldata or /sdata to know what they do.");
			this.add("raw|More information can be found <a href='http://www.smogon.com/forums/threads/3491902/page-12#post-6202283'>here</a>");
		},
		onModifyMove: function (move) {
			// Shows legit name after use...
			var legitNames = {
				recover: "Cura", softboiled: "Curaga", reflect: "Wild Growth", acupressure: "Power Shield",
				holdhands: "Rejuvenation", luckychant: "Fairy Ward", followe: "Taunt", meditate: "Sacrifice",
				helpinghand: "Cooperation", spite: "Slow Down", aromaticmist: "Healing Touch", healbell: "Penance",
				fakeout: "Stop", endure: "Last Stand", withdraw: "Barkskin", seismictoss: "Punishment",
				flamethrower: "Flamestrike", fireblast: "Conflagration", thunderbolt: "Moonfire", thunder: "Starfire",
				toxic: "Corruption", leechseed: "Soul Leech", icebeam: "Ice Lance", freezeshock: "Frostbite",
				aircutter: "Hurricane", muddywater: "Storm", furyswipes: "Fury", scratch: "Garrote", slash: "Mutilate",
				smog: "Poison Gas", protect: "Evasion"
			};
			if (move.id in legitNames) {
				move.name = legitNames[move.id];
			}
		},
		onFaint: function (pokemon) {
			var message = {
				'Amy': 'French?', 'Princess Leia': 'Why, you stuck up, half-witted, scruffy-looking Nerf herder.',
				'Scruffy': "Scruffy's gonna die the way he lived. [Turns page of Zero-G Juggs magazine.] Mmhm.",
				'Yoda': 'Wrath leads to the dark side.', 'Bender': 'DEATH TO ALL HUMANS!', 'Gurren Lagann': 'Later, buddy.',
				'Lagann': "Eh, I guess I'm no one.", 'Rei Ayanami': 'Man fears the darkness, and so he scrapes away at the edges of it with fire.',
				'Slurms McKenzie': 'I will keep partying until the end.', 'C3PO': 'Oh, dear!',
				'Hermes': 'I can still... limbo...', 'Professor Farnsworth': 'Bad news, everyone!', 'Kif': 'Sigh.',
				'Jar Jar Binks': "Better dead here than deader in the Core. Ye gods, whatta meesa sayin'?",
				'R2D2': '*beep boop*', 'Asuka Langley': 'Disgusting.', 'Chewy': 'GRARARWOOWRALWRL',
				'Fry': 'Huh. Did everything just taste purple for a second?', 'Han Solo': 'I should have shot first...',
				'Leela': 'Yeeee-hAW!', 'Luke Skywalker': 'I could not use the force...',
				'Nibbler': 'I hereby place an order for one cheese pizza.',
				'Shinji Ikari': 'It would be better if I never existed. I should just die too.', 'Zoidberg': 'Why not Zoidberg?',
				'Anti-Spiral': 'If this is how it must be, protect the universe at all costs.', 'Gendo Ikari': 'Everything goes according to the plan.',
				'Kaworu Nagisa': 'Dying of your own will. That is the one and only absolute freedom there is.',
				'Jabba the Hut': 'Han, ma bukee.', 'Lilith': '...', 'Lrrr': "But I'm emperor of Omicron Persei 8!",
				'Mommy': 'Stupid!', 'Bobba Fett': "I see now I've done terrible things.", 'Zapp Brannigan': "Oh, God, I'm pathetic. Sorry. Just go...",
				'An angel': ',,,', 'Darth Vader': "I'm sorry, son.", 'Emperor Palpatine': 'What the hell is an "Aluminum Falcon"?',
				'Fender': '*beeps*', 'Storm Trooper': 'But my aim is perfect!'
			}[pokemon.name];
			this.add('-message', pokemon.name + ': ' + message);
		}
	},
	{
		name: "Rainbow Road",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "Seasonal",

		team: "randomRainbow",
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "The last attack on each Pok\u00e9mon is based on their Pok\u00e9dex color.");
			this.add('-message', "Red/Pink beats Yellow/Green, which beats Blue/Purple, which beats Red/Pink.");
			this.add('-message', "Using a color move on a Pok\u00e9mon in the same color group is a neutral hit.");
			this.add('-message', "Use /details [POKEMON] to check its Pok\u00e9dex color.");

			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			var physicalnames = {
				'Red': 'Crimson Crash', 'Pink': 'Rose Rush', 'Yellow': 'Saffron Strike', 'Green': 'Viridian Slash',
				'Blue': 'Blue Bombardment', 'Purple': 'Indigo Impact'
			};
			var specialnames = {
				'Red': 'Scarlet Shine', 'Pink': 'Coral Catapult', 'Yellow': 'Golden Gleam', 'Green': 'Emerald Flash',
				'Blue': 'Cerulean Surge', 'Purple': 'Violet Radiance'
			};
			for (var i = 0; i < allPokemon.length; i++) {
				var pokemon = allPokemon[i];
				var color = pokemon.template.color;
				var category = (pokemon.stats.atk > pokemon.stats.spa ? 'Physical' : 'Special');
				var last = pokemon.moves.length - 1;
				var move = (category === 'Physical' ? physicalnames[color] : specialnames[color]);
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(move);
					pokemon.moveset[last].move = move;
					pokemon.baseMoveset[last].move = move;
				}
			}
		},
		onBeforeTurn: function (pokemon) {
			var side = pokemon.side;
			side.item = '';

			var decisions = [];
			var decision, i;
			if (side.hadItem || this.random(4) === 0) { // Can never get 2 consecutive turns of items
				side.hadItem = false;
				return;
			}
			switch (this.random(8)) {
			case 0:
				side.item = 'lightning';
				side.hadItem = true;
				this.add('message', "Lightning suddenly struck " + side.name + " and shrank their Pok\u00e9mon!");
				this.add('-start', pokemon, 'shrunken', '[silent]');
				break;
			case 1:
				side.item = 'blooper';
				side.hadItem = true;
				this.add('message', "A Blooper came down and splattered ink all over " + side.name + "'s screen!");
				this.add('-start', pokemon, 'blinded', '[silent]');
				break;
			case 2:
				if (pokemon.isGrounded()) {
					side.item = 'banana';
					side.hadItem = true;
					this.add('message', side.name + " slipped on a banana peel!");
					this.add('-start', pokemon, 'slipped', '[silent]');
					pokemon.addVolatile('flinch');
				}
				break;
			case 3:
				if (!side.sideConditions['goldenmushroom']) {
					side.item = 'goldmushroom';
					side.hadItem = true;
					this.add('message', side.name + " collected a Golden Mushroom, giving them a speed boost!");
					this.add('-start', pokemon, 'goldenmushroom', '[silent]');
					side.addSideCondition('goldenmushroom');
					side.sideConditions['goldenmushroom'].duration = 3;
					// Get all relevant decisions from the Pokemon and tweak speed.
					for (i = 0; i < this.queue.length; i++) {
						if (this.queue[i].pokemon === pokemon) {
							decision = this.queue[i];
							decision.speed = pokemon.getStat('spe');
							decisions.push(decision);
							// Cancel the decision
							this.queue.splice(i, 1);
							i--;
						}
					}
					for (i = 0; i < decisions.length; i++) {
						this.insertQueue(decisions[i]);
					}
				}
				break;
			case 4:
			case 5:
				if (!side.sideConditions['goldenmushroom']) {
					side.item = 'mushroom';
					side.hadItem = true;
					this.add('message', side.name + " collected a Mushroom, giving them a quick speed boost!");
					this.add('-start', pokemon, 'mushroom', '[silent]');
					side.addSideCondition('mushroom');
					side.sideConditions['mushroom'].duration = 1;
					// Get all relevant decisions from the Pokemon and tweak speed.
					for (i = 0; i < this.queue.length; i++) {
						if (this.queue[i].pokemon === pokemon) {
							decision = this.queue[i];
							decision.speed = pokemon.getStat('spe');
							decisions.push(decision);
							// Cancel the decision
							this.queue.splice(i, 1);
							i--;
						}
					}
					for (i = 0; i < decisions.length; i++) {
						this.insertQueue(decisions[i]);
					}
				}
				break;
			default:
				if (side.pokemonLeft - side.foe.pokemonLeft >= 2) {
					side.item = 'blueshell';
					side.hadItem = true;
					this.add('message', "A Blue Spiny Shell flew over the horizon and crashed into " + side.name + "!");
					this.damage(pokemon.maxhp / 2, pokemon, pokemon, this.getMove('judgment'), true);
				}
			}
		},
		onAccuracy: function (accuracy, target, source, move) {
			if (source.hasAbility('keeneye')) return;
			var modifier = 1;
			if (source.side.item === 'blooper' && !source.hasAbility('clearbody')) {
				modifier *= 0.4;
			}
			if (target.side.item === 'lightning') {
				modifier *= 0.8;
			}
			return this.chainModify(modifier);
		},
		onDisableMove: function (pokemon) {
			// Enforce Choice Item locking on color moves
			// Technically this glitches with Klutz, but Lopunny is Brown and will never appear :D
			if (!pokemon.ignoringItem() && pokemon.getItem().isChoice && pokemon.lastMove === 'swift') {
				var moves = pokemon.moveset;
				for (var i = 0; i < moves.length; i++) {
					if (moves[i].id !== 'swift') {
						pokemon.disableMove(moves[i].id, false);
					}
				}
			}
		},
		onEffectivenessPriority: -5,
		onEffectiveness: function (typeMod, target, type, move) {
			if (move.id !== 'swift') return;
			// Only calculate color effectiveness once
			if (target.getTypes()[0] !== type) return 0;
			var targetColor = target.template.color;
			var sourceColor = this.activePokemon.template.color;
			var effectiveness = {
				'Red': {'Red': 0, 'Pink': 0, 'Yellow': 1, 'Green': 1, 'Blue': -1, 'Purple': -1},
				'Pink': {'Red': 0, 'Pink': 0, 'Yellow': 1, 'Green': 1, 'Blue': -1, 'Purple': -1},
				'Yellow': {'Red': -1, 'Pink': -1, 'Yellow': 0, 'Green': 0, 'Blue': 1, 'Purple': 1},
				'Green': {'Red': -1, 'Pink': -1, 'Yellow': 0, 'Green': 0, 'Blue': 1, 'Purple': 1},
				'Blue': {'Red': 1, 'Pink': 1, 'Yellow': -1, 'Green': -1, 'Blue': 0, 'Purple': 0},
				'Purple': {'Red': 1, 'Pink': 1, 'Yellow': -1, 'Green': -1, 'Blue': 0, 'Purple': 0}
			};
			return effectiveness[sourceColor][targetColor];
		},
		onModifyDamage: function (damage, source, target, effect) {
			if (source === target || effect.effectType !== 'Move') return;
			if (target.side.item === 'lightning') return this.chainModify(2);
			if (source.side.item === 'lightning') return this.chainModify(0.5);
		},
		onModifySpe: function (speMod, pokemon) {
			if (pokemon.side.sideConditions['goldenmushroom'] || pokemon.side.sideConditions['mushroom']) {
				return this.chainModify(1.75);
			}
		},
		onResidual: function (battle) {
			var side;
			for (var i = 0; i < battle.sides.length; i++) {
				side = battle.sides[i];
				if (side.sideConditions['goldenmushroom'] && side.sideConditions['goldenmushroom'].duration === 1) {
					this.add('-message', "The effect of " + side.name + "'s Golden Mushroom wore off.");
					this.add('-end', side.active[0], 'goldenmushroom', '[silent]');
					side.removeSideCondition('goldenmushroom');
				}
				switch (side.item) {
				case 'lightning':
					this.add('-end', side.active[0], 'shrunken', '[silent]');
					break;
				case 'blooper':
					this.add('-end', side.active[0], 'blinded', '[silent]');
					break;
				case 'banana':
					this.add('-end', side.active[0], 'slipped', '[silent]');
					break;
				case 'mushroom':
					this.add('-end', side.active[0], 'mushroom', '[silent]');
				}

				side.item = '';
			}
		},
		onModifyMove: function (move, pokemon) {
			if (move.id !== 'swift') return;
			var physicalnames = {
				'Red': 'Crimson Crash', 'Pink': 'Rose Rush', 'Yellow': 'Saffron Strike', 'Green': 'Viridian Slash',
				'Blue': 'Blue Bombardment', 'Purple': 'Indigo Impact'
			};
			var specialnames = {
				'Red': 'Scarlet Shine', 'Pink': 'Coral Catapult', 'Yellow': 'Golden Gleam', 'Green': 'Emerald Flash',
				'Blue': 'Cerulean Surge', 'Purple': 'Violet Radiance'
			};
			var color = pokemon.template.color;
			move.category = (pokemon.stats.atk > pokemon.stats.spa ? 'Physical' : 'Special');
			move.name = (move.category === 'Physical' ? physicalnames[color] : specialnames[color]);
			move.basePower = 100;
			move.accuracy = 100;
			move.type = '???';
			if (move.category === 'Physical') move.flags['contact'] = true;
		},
		onPrepareHit: function (pokemon, target, move) {
			if (move.id !== 'swift') return;
			var animations = {
				'Crimson Crash': 'Flare Blitz', 'Scarlet Shine': 'Fusion Flare', 'Rose Rush': 'Play Rough',
				'Coral Catapult': 'Moonblast', 'Saffron Strike': 'Bolt Strike',	'Golden Gleam': 'Charge Beam',
				'Viridian Slash': 'Power Whip', 'Emerald Flash': 'Solarbeam', 'Blue Bombardment': 'Waterfall',
				'Cerulean Surge': 'Hydro Pump', 'Indigo Impact': 'Poison Jab', 'Violet Radiance': 'Gunk Shot'
			};
			this.attrLastMove('[anim] ' + animations[move.name]);
		},
		onSwitchInPriority: -9,
		onSwitchIn: function (pokemon) {
			if (!pokemon.hp) return;
			this.add('-start', pokemon, pokemon.template.color, '[silent]');
			if (pokemon.side.item === 'lightning') {
				this.add('-start', pokemon, 'shrunken', '[silent]');
			}
			if (pokemon.side.sideConditions['goldenmushroom']) {
				this.add('-start', pokemon, 'goldenmushroom', '[silent]');
			}
		},
		onSwitchOut: function (pokemon) {
			this.add('-end', pokemon, pokemon.template.color, '[silent]');
		}
	},
	{
		name: "Spoopy Party",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "Seasonal",

		team: 'randomSpoopy',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onSwitchIn: function (pokemon) {
			if (pokemon.species === 'Magikarp') {
				this.boost({spe:4, spd:2, def:2}, pokemon, pokemon, 'the power of dank');
			}
		},
		onModifyMove: function (move) {
			if (move.id === 'aquaring') {
				move.volatileStatus = 'wonderring';
				move.onHit = function (pokemon) {
					this.add('-start', pokemon, 'Aqua Ring');
					this.add('-message', "7.8/10, too much water - IGN");
				};
			}
			if (move.id === 'hyperbeam') {
				move.type = 'Water';
				move.accuracy = true;
				delete move.self;
				move.onTryHit = function (target, source) {
					this.add('-message', target.name + "'s fuel cannot melt " + source.name + " beams!");
				};
			}
			if (move.id === 'trickortreat') {
				switch (this.random(7)) {
				case 0:
					move.category = 'Special';
					move.type = 'Fire';
					move.basePower = 200;
					move.onTryHit = function () {
						this.add('-message', "Pumpkin bomb!");
					};
					move.onHit = function () {};
					break;
				case 1:
					move.category = 'Physical';
					move.type = 'Poison';
					move.basePower = 25;
					move.multihit = 4;
					move.onTryHit = function () {
						this.add('-message', "Toilet paper missile attack!");
					};
					move.onHit = function () {};
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', "Yum! Chocolate!");
					};
					move.onHit = function (target, source) {
						this.heal(Math.ceil(target.maxhp * 0.5));
					};
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', "This is a rather bland candy.");
					};
					move.onHit = function (target, source) {
						this.heal(Math.ceil(target.maxhp * 0.25));
						target.setStatus('par');
						target.addVolatile('confusion');
					};
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', "You are about to be rotten-egged on!");
					};
					move.onHit = function (target, source) {
						target.setStatus('tox');
						target.addVolatile('torment');
					};
					break;
				case 5:
					move.category = 'Special';
					move.type = 'Dark';
					move.basePower = 500;
					move.self = {volatileStatus: 'mustrecharge'};
					move.onTryHit = function () {
						this.add('-message', "Ultimate Super Hiper Mega Awesome Beam destroyer of worlds!");
					};
					move.onHit = function (target, source) {
						this.add('-message', source.name + " was caught in the explosion!");
						source.setStatus('brn');
						source.addVolatile('disabled');
						source.addVolatile('confusion');
					};
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "Have some refreshment, my fellow.");
					};
					move.onHit = function (target, source) {
						target.addVolatile('aquaring');
					};
					break;
				}
			}
		},
		onResidual: function () {
			var allpokes = this.p1.active.concat(this.p2.active);
			var pokemon;
			for (var i = 0; i < allpokes.length; i++) {
				pokemon = allpokes[i];
				if (pokemon.hp && pokemon.volatiles['wonderring']) {
					this.heal(pokemon.maxhp / 8, pokemon, pokemon, 'dank memes');
				}
			}
		}
	},
	{
		name: "Super Squad Smackdown",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "Seasonal",
		team: 'randomSeasonalHero',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onEffectiveness: function (typeMod, target, move, type) {
			if (this.activePokemon && this.activePokemon.name === 'Magneto' && move.id === 'flashcannon' && type === 'Steel') return 1;
		},
		onSwitchInPriority: 10,
		onSwitchIn: function (pokemon) {
			switch (pokemon.name) {
			case 'Iron Man':
				pokemon.addType('Steel');
				this.add('-start', pokemon, 'typechange', 'Fire/Steel');
				break;
			case 'Spiderman':
				this.boost({atk: 1, spe: 2}, pokemon, pokemon, 'Spidey Sense');
				break;
			}
		}
	}
];
