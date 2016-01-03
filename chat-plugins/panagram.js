'use strict';

exports.commands = {
	
  panagramhelp: 'panagramrules',
  panagramrules: function(target, room, user) {
        if (!this.canBroadcast()) return;
        return this.sendReplyBox('<u><font size = 2><center>Pangram rules and commands</center></font></u><br />' +
            '<b>/panagram</b> - Starts a game of Panagram in the room (Panagrams are just anagrams with Pokemon). Illegal and CAP Pokemon won\'t be selected. Must be ranked + or higher to use.<br />' +
            '<b>/guessp [Pokemon]</b> - Guesses a Pokémon. After guessing incorrectly, you cannot guess again in the same game. There are a total of 3 tries per game. The answer is revealed after all 3 chances are over.<br />' +
            '<b>/panagramend</b> OR <b>/endpanagram</b> OR <b>/endp</b> - Ends the current game of Panagram.');
    },
 panagram: function(target, room, user) {
        if (!this.can('broadcast', null, room)) return false;
        if (room.panagram) return this.sendReply('There is already a game of Panagram going on.');
        let pokedex = [];
        for (let i in Tools.data.Pokedex) {
            if (Tools.data.Pokedex[i].num > 0 && !Tools.data.Pokedex[i].forme) {
                pokedex.push(i);
            }
        }
        let mixer = function(word) {
            let array = [];
            for (let k = 0; k < word.length; k++) {
                array.push(word[k]);
            }
            let a;
            let b;
            let i = array.length;
            while (i) {
                a = Math.floor(Math.random() * i);
                i--;
                b = array[i];
                array[i] = array[a];
                array[a] = b;
            }
            return array.join('').toString();
        }

        let poke = pokedex[Math.floor(Math.random() * pokedex.length)];
        let panagram = mixer(poke.toString());
        while (panagram == poke) {
            panagram = mixer(poke);
        }
        //var x = Math.floor(Math.random() * panagram.length);
        this.add('|html|<div class = "infobox"><center><b>A game of Panagram has been started!</b><br/>' +
            'The scrambled Pokémon is <b>' + panagram + '</b><br/>' +
            '<font size = 1>Type in <b>/gp or /guesspoke [Pokémon]</b> to guess the Pokémon!');
        room.panagram = {};
        room.panagram.guessed = [];
        room.panagram.chances = 2;
        room.panagram.answer = toId(poke);
    },

  gp: 'guessp',
  guesspoke: 'guessp',
  guessp: function(target, room, user, cmd) {
        if (!room.panagram) return this.sendReply('There is no game of Panagram going on in this room.');
        if (room.panagram[user.userid]) return this.sendReply("You've already guessed once!");
        if (!target) return this.sendReply("The proper syntax is /guessp [pokemon]");
        if (!Tools.data.Pokedex[toId(target)]) return this.sendReply("'" + target + "' is not a valid Pokémon.");
        if (Tools.data.Pokedex[toId(target)].num < 1) return this.sendReply(Tools.data.Pokedex[toId(target)].species + ' is either an illegal or a CAP Pokémon.');
        if (Tools.data.Pokedex[toId(target)].baseSpecies) target = toId(Tools.data.Pokedex[toId(target)].baseSpecies);
        if (room.panagram.guessed.indexOf(toId(target)) > -1) return this.sendReply("That Pokemon has already been guessed!");
        if (room.panagram.answer == toId(target)) {
            this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, which was the correct answer! Congratulations!');
            delete room.panagram;
        } else {
            if (room.panagram.chances > 0) {
                this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, but was not the correct answer...');
                room.panagram[user.userid] = toId(target);
                room.panagram.guessed.push(toId(target));
                room.panagram.chances--;
            } else {
                this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, but was not the correct answer. You have failed to guess the Pokemon, which was <b>' + Tools.data.Pokedex[room.panagram.answer].species + '</b>');
                delete room.panagram;
            }
        }
    },
    panagramoff: 'endpanagram',
    endp: 'endpanagram',
    panagramend: 'endpanagram',
    endpanagram: function(target, room, user) {
        if (!room.panagram) return this.sendReply('There is no panagram game going on in this room yet.');
        this.add("|html|<b>The game of Panagram has been ended.</b>");
        delete room.panagram;
    },
    };
