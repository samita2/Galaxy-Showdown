/*
Ratings and how they work:
-2: Extremely detrimental
	  The sort of ability that relegates Pokemon with Uber-level BSTs
	  into NU.
	ex. Slow Start, Truant
-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Normalize
 0: Useless
	  An ability with no net effect on a Pokemon during a battle.
	ex. Pickup, Illuminate
 1: Ineffective
	  An ability that has a minimal effect. Should never be chosen over
	  any other ability.
	ex. Damp, Shell Armor
 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia
 3: Useful
	  An ability that is generally useful.
	ex. Volt Absorb, Iron Fist
 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4
	  can be ambiguous.
	ex. Technician, Protean
 5: Essential
	  The sort of ability that defines metagames.
	ex. Drizzle, Shadow Tag
*/

exports.BattleAbilities = {
	"shadowtag": {
		desc: "When this Pokemon enters the field, its non-Ghost-type opponents cannot switch or flee the battle unless they have the same ability, are holding Shed Shell, or they use the moves Baton Pass or U-Turn.",
		shortDesc: "Prevents foes from switching out normally unless they also have this Ability.",
		onStart: function(pokemon) {
			this.add('-activate', target, 'trapped');
		}
		id: "shadowtag",
		name: "Shadow Tag",
		rating: 5,
		num: 23
	},
};
