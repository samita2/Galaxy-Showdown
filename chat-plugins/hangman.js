/*
* Hangman chat plugin
* By bumbadadabum and Zarel. Art by crobat.
*/

'use strict';

const permission = 'announce';
const maxMistakes = 6;

class Hangman extends Rooms.RoomGame {
	constructor(room, user, word, hint) {
		super(room);

		if (room.gameNumber) {
			room.gameNumber++;
		} else {
			room.gameNumber = 1;
		}

		this.gameid = 'hangman';
		this.title = 'Hangman';
		this.creator = user.userid;
		this.word = word;
		this.hint = hint;
		this.incorrectGuesses = 0;

		this.guesses = [];
		this.letterGuesses = [];
		this.lastGuesser = '';
		this.wordSoFar = [];

		for (let i = 0; i < word.length; i++) {
			if (/[a-zA-Z]/.test(word[i])) {
				this.wordSoFar.push('_');
			} else {
				this.wordSoFar.push(word[i]);
			}
		}
	}

	guess(word, user) {
		if (user.userid === this.room.game.creator) return user.sendTo(this.room, "You can't guess in your own hangman game.");

		let sanitized = word.replace(/[^A-Za-z ]/g, '');
		let normalized = toId(sanitized);
		if (normalized.length < 1) return user.sendTo(this.room, "Guess too short.");
		if (sanitized.length > 30) return user.sendTo(this.room, "Guess too long.");

		for (let i = 0; i < this.guesses.length; i++) {
			if (normalized === toId(this.guesses[i])) return user.sendTo(this.room, "Your guess has already been guessed.");
		}

		if (sanitized.length > 1) {
			if (!this.guessWord(sanitized, user.name)) {
				user.sendTo(this.room, "Invalid guess");
			} else {
				this.room.send(user.name + " guessed \"" + sanitized + "\"!");
			}
		} else {
			if (!this.guessLetter(sanitized, user.name)) {
				user.sendTo(this.room, "Invalid guess");
			}
		}
	}

	guessLetter(letter, guesser) {
		letter = letter.toUpperCase();
		if (this.guesses.indexOf(letter) >= 0) return false;
		if (this.word.toUpperCase().indexOf(letter) > -1) {
			for (let i = 0; i < this.word.length; i++) {
				if (this.word[i].toUpperCase() === letter) {
					this.wordSoFar[i] = this.word[i];
				}
			}

			if (this.wordSoFar.indexOf('_') < 0) {
				this.incorrectGuesses = -1;
				this.guesses.push(letter);
				this.letterGuesses.push(letter + '1');
				this.lastGuesser = guesser;
				this.finish();
				return true;
			}
			this.letterGuesses.push(letter + '1');
		} else {
			this.incorrectGuesses++;
			this.letterGuesses.push(letter + '0');
		}

		this.guesses.push(letter);
		this.lastGuesser = guesser;
		this.update();
		return true;
	}

	guessWord(word, guesser) {
		let ourWord = toId(this.word);
		let guessedWord = toId(word);
		if (ourWord === guessedWord) {
			for (let i = 0; i < this.wordSoFar.length; i++) {
				if (this.wordSoFar[i] === '_') {
					this.wordSoFar[i] = this.word[i];
				}
			}
			this.incorrectGuesses = -1;
			this.guesses.push(word);
			this.lastGuesser = guesser;
			this.finish();
			return true;
		} else if (ourWord.length === guessedWord.length) {
			this.incorrectGuesses++;
			this.guesses.push(word);
			this.lastGuesser = guesser;
			this.update();
			return true;
		}
		return false;
	}

	hangingMan() {
		return '<img width="120" height="120" src="//play.pokemonshowdown.com/fx/hangman' + (this.incorrectGuesses === -1 ? 7 : this.incorrectGuesses) + '.png" />';
	}

	generateWindow() {
		let result = 0;

		if (this.incorrectGuesses === maxMistakes) {
			result = 1;
		} else if (this.wordSoFar.indexOf('_') < 0) {
			result = 2;
		}

		let output = '<div class="broadcast-' + (result === 1 ? 'red' : (result === 2 ? 'green' : 'blue')) + '">';
		output += '<p style="text-align:left;font-weight:bold;font-size:10pt;margin:5px 0 0 15px">' + (result === 1 ? 'Too bad! The mon has been hanged.' : (result === 2 ? 'The word has been guessed. Congratulations!' : 'Hangman')) + '</p>';
		output += '<table><tr><td style="text-align:center;">' + this.hangingMan() + '</td><td style="text-align:center;width:100%;word-wrap:break-word">';

		let wordString = this.wordSoFar.join('');
		if (result === 1) {
			let word = this.word;
			wordString = wordString.replace(/_+/g, function (match, offset) {
				return '<font color="#7af87a">' + word.substr(offset, match.length) + '</font>';
			});
		}

		if (this.hint) output += '<div>(Hint: ' + Tools.escapeHTML(this.hint) + ')</div>';
		output += '<p style="font-weight:bold;font-size:12pt;letter-spacing:3pt">' + wordString + '</p>';
		if (this.guesses.length) {
			if (this.letterGuesses.length) {
				output += 'Letters: ' + this.letterGuesses.map(function (g) {
					return '<strong' + (g[1] === '1' ? '' : ' style="color: #DBA"') + '>' + Tools.escapeHTML(g[0]) + '</strong>';
				}).join(', ');
			}
			if (result === 2) {
				output += '<br />Winner: ' + Tools.escapeHTML(this.lastGuesser);
			} else if (this.guesses[this.guesses.length - 1].length === 1) {
				// last guess was a letter
				output += ' <small>&ndash; ' + Tools.escapeHTML(this.lastGuesser) + '</small>';
			} else {
				output += '<br />Guessed: ' + this.guesses[this.guesses.length - 1] + ' <small>&ndash; ' + Tools.escapeHTML(this.lastGuesser) + '</small>';
			}
		}

		output += '</td></tr></table></div>';

		return output;
	}

	display(user, broadcast) {
		if (broadcast) {
			this.room.add('|uhtml|hangman' + this.room.gameNumber + '|' + this.generateWindow());
		} else {
			user.sendTo(this.room, '|uhtml|hangman' + this.room.gameNumber + '|' + this.generateWindow());
		}
	}

	update() {
		this.room.add('|uhtmlchange|hangman' + this.room.gameNumber + '|' + this.generateWindow());

		if (this.incorrectGuesses === maxMistakes) {
			this.finish();
		}
	}

	end() {
		this.room.add('|uhtmlchange|hangman' + this.room.gameNumber + '|<div class="infobox">(The game of hangman was ended.)</div>');
		this.room.add("The game of hangman was ended.");
		delete this.room.game;
	}

	finish() {
		this.room.add('|uhtmlchange|hangman' + this.room.gameNumber + '|<div class="infobox">(The game of hangman has ended &ndash; scroll down to see the results)</div>');
		this.room.add('|html|' + this.generateWindow());
		delete this.room.game;
	}
}

exports.commands = {
	hangman: {
		create: 'new',
		new: function (target, room, user) {
			let params = target.split(',');

			if (!this.can(permission, null, room)) return false;
			if (room.hangmanDisabled) return this.errorReply("Hangman is disabled for this room.");
			if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
			if (room.game) return this.errorReply("There is already a game in progress in this room.");

			if (!params) return this.errorReply("No word entered.");
			let word = params[0].replace(/[^A-Za-z '-]/g, '');
			if (word.replace(/ /g, '').length < 1) return this.errorReply("Enter a valid word");
			if (word.length > 30) return this.errorReply("Phrase must be less than 30 characters.");
			if (word.split(' ').some(function (w) { return w.length > 20; })) return this.errorReply("Each word in the phrase must be less than 20 characters.");
			if (!/[a-zA-Z]/.test(word)) return this.errorReply("Word must contain at least one letter.");

			let hint;
			if (params.length > 1) {
				hint = params.slice(1).join(',').trim();
				if (hint.length > 150) return this.errorReply("Hint too long.");
			}

			room.game = new Hangman(room, user, word, hint);
			room.game.display(user, true);

			return this.privateModCommand("(A game of hangman was started by " + user.name + ".)");
		},
		createhelp: ["/hangman create [word], [hint] - Makes a new hangman game. Requires: % @ # & ~"],

		guess: function (target, room, user) {
			if (!target) return this.parse('/help guess');
			if (!room.game || room.game.gameid !== 'hangman') return this.errorReply("There is no game of hangman running in this room.");
			if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");

			room.game.guess(target, user);
		},
		guesshelp: ["/hangman guess [letter] - Makes a guess for the letter entered.",
					"/hangman guess [word] - Same as a letter, but guesses an entire word."],

		stop: 'end',
		end: function (target, room, user) {
			if (!this.can(permission, null, room)) return false;
			if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
			if (!room.game || room.game.gameid !== 'hangman') return this.errorReply("There is no game of hangman running in this room.");

			room.game.end();
			return this.privateModCommand("(The game of hangman was ended by " + user.name + ".)");
		},
		endhelp: ["/hangman end - Ends the game of hangman before the man is hanged or word is guessed. Requires: % @ # & ~"],

		disable: function (target, room, user) {
			if (!this.can('tournamentsmanagement', null, room)) return;
			if (room.hangmanDisabled) {
				return this.errorReply("Hangman is already disabled.");
			}
			room.hangmanDisabled = true;
			if (room.chatRoomData) {
				room.chatRoomData.hangmanDisabled = true;
				Rooms.global.writeChatRoomData();
			}
			return this.sendReply("Hangman has been disabled for this room.");
		},

		enable: function (target, room, user) {
			if (!this.can('tournamentsmanagement', null, room)) return;
			if (!room.hangmanDisabled) {
				return this.errorReply("Hangman is already enabled.");
			}
			delete room.hangmanDisabled;
			if (room.chatRoomData) {
				delete room.chatRoomData.hangmanDisabled;
				Rooms.global.writeChatRoomData();
			}
			return this.sendReply("Hangman has been enabled for this room.");
		},

		display: function (target, room, user) {
			if (!room.game || room.game.title !== 'Hangman') return this.errorReply("There is no game of hangman running in this room.");
			if (!this.canBroadcast()) return;
			room.update();

			room.game.display(user, this.broadcasting);
		},

		'': function (target, room, user) {
			return this.parse('/help hangman');
		},
	},

	hangmanhelp: ["/hangman allows users to play the popular game hangman in PS rooms.",
				"Accepts the following commands:",
				"/hangman create [word], [hint] - Makes a new hangman game. Requires: % @ # & ~",
				"/hangman guess [letter] - Makes a guess for the letter entered.",
				"/hangman guess [word] - Same as a letter, but guesses an entire word.",
				"/hangman display - Displays the game.",
				"/hangman end - Ends the game of hangman before the man is hanged or word is guessed. Requires: % @ # & ~",
				"/hangman [enable/disable] - Enables or disables hangman from being started in a room. Requires: # & ~"],

	gw: 'guess',
	g: 'guess',
	guess: function (target, room, user) {
		if (!room.game) return this.errorReply("There is no game running in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!room.game.guess) return this.errorReply("You can't guess anything in this game.");

		room.game.guess(target, user);
	},
	guesshelp: ["/guess - Shortcut for /hangman guess.", "/hangman guess [letter] - Makes a guess for the letter entered.",
					"/hangman guess [word] - Same as a letter, but guesses an entire word."],
};
