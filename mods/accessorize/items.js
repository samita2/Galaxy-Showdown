exports.BattleItems = {
    "blackbelt": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Black Belt');
            this.mixTemplate(pokemon, 'Fighting', {atk: 30, def: 15, spd: -10, spe: 5});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Fighting', {atk: 30, def: 15, spd: -10, spe: 5});
            }
        }
    },
    "blackglasses": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Black Glasses');
            this.mixTemplate(pokemon, 'Dark', {def: -10, spa: 30, spd: 15, spe: 5});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Dark', {def: -10, spa: 30, spd: 15, spe: 5});
            }
        }
    },
    "charcoal": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Charcoal');
            this.mixTemplate(pokemon, 'Fire', {atk: 25, def: -5, spa: 25, spd: -5});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Fire', {atk: 25, def: -5, spa: 25, spd: -5});
            }
        }
    },
    "cherishball": {
        inherit: true,
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Cherish Ball');
            this.mixTemplate(pokemon, 'Fairy', {def: 25, spd: 25, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Fairy', {def: 25, spd: 25, spe: -10});
            }
        }
    },
    "dragonfang": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Dragon Fang');
            this.mixTemplate(pokemon, 'Dragon', {atk: 20, def: -5, spa: 20, spd: -5, spe: 10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Dragon', {atk: 20, def: -5, spa: 20, spd: -5, spe: 10});
            }
        }
    },
    "hardstone": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Hard Stone');
            this.mixTemplate(pokemon, 'Rock', {atk: 20, def: 30, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Water', {atk: 20, def: 30, spe: -10});
            }
        }
    },
    "magnet": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Magnet');
            this.mixTemplate(pokemon, 'Electric', {def: -5, spa: 20, spd: -5, spe: 30});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Electric', {def: -5, spa: 20, spd: -5, spe: 30});
            }
        }
    },
    "metalcoat": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Metal Coat');
            this.mixTemplate(pokemon, 'Steel', {def: 25, spd: 25, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Steel', {def: 25, spd: 25, spe: -10});
            }
        }
    },
    "miracleseed": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Miracle Seed');
            this.mixTemplate(pokemon, 'Grass', {def: 15, spa: 20, spd: 15, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Grass', {def: 15, spa: 20, spd: 15, spe: -10});
            }
        }
    },
    "mysticwater": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Mystic Water');
            this.mixTemplate(pokemon, 'Water', {spa: 20, spd: 30, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Water', {spa: 20, spd: 30, spe: -10});
            }
        }
    },
    "nevermeltice": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Never-Melt Ice');
            this.mixTemplate(pokemon, 'Ice', {atk: 20, def: -5, spa: 20, spd: -5, spe: 10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Ice', {atk: 20, def: -5, spa: 20, spd: -5, spe: 10});
            }
        }
    },
    "poisonbarb": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Poison Barb');
            this.mixTemplate(pokemon, 'Poison', {atk: 20, def: 15, spd: 15, spe: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Poison', {atk: 20, def: 15, spd: 15, spe: -10});
            }
        }
    },
    "sharpbeak": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Sharp Beak');
            this.mixTemplate(pokemon, 'Flying', {atk: 20, def: -5, spd: -5, spe: 30});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Flying', {atk: 20, def: -5, spd: -5, spe: 30});
            }
        }
    },
    "silkscarf": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Silk Scarf');
            this.mixTemplate(pokemon, 'Normal', {atk: 10, def: -10, spa: 30, spd: 10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Normal', {atk: 10, def: -10, spa: 30, spd: 10});
            }
        }
    },
    "silverpowder": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Silver Powder');
            this.mixTemplate(pokemon, 'Bug', {atk: 25, def: 10, spd: -10, spe: 15});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Bug', {atk: 25, def: 10, spd: -10, spe: 15});
            }
        }
    },
    "softsand": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Soft Sand');
            this.mixTemplate(pokemon, 'Ground', {atk: 30, def: 10, spa: 10, spd: -10});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Ground', {atk: 30, def: 10, spa: 10, spd: -10});
            }
        }
    },
    "spelltag": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Spell Tag');
            this.mixTemplate(pokemon, 'Ghost', {atk: 25, def: -5, spa: 25, spd: -5});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Ghost', {atk: 25, def: -5, spa: 25, spd: -5});
            }
        }
    },
    "twistedspoon": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onSwitchIn: function (pokemon) {
            if (!pokemon.currentSpecies) pokemon.currentSpecies = pokemon.template.speciesid;
            this.add('-item', pokemon, 'Twisted Spoon');
            this.mixTemplate(pokemon, 'Psychic', {def: -10, spa: 25, spd: 10, spe: 15});
        },
        onUpdate: function (pokemon) {
            if (pokemon.currentSpecies !== pokemon.template.speciesid) {
                this.mixTemplate(pokemon, 'Psychic', {def: -10, spa: 25, spd: 10, spe: 15});
            }
        }
    }
};
