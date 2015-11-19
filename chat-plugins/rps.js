'use strict';

//rps
var rockpaperscissors  = false;
var numberofspots = 2;
var gamestart = false;
var rpsplayers = new Array();
var rpsplayersid = new Array();
var player1response = new Array();
var player2response = new Array();

exports.commands = {
rps: "rockpaperscissors",
	rockpaperscissors: function(target, room, user) {
		if(rockpaperscissors === false) {
			rockpaperscissors = true;
			return this.parse('/jrps');
		}
	},

	respond: 'shoot',
	shoot: function(target, room, user) {
		if(gamestart === false) {
			return this.sendReply('There is currently no game of rock-paper-scissors-lizard-spock going on.');
		} else {
			if(user.userid === rpsplayersid[0]) {
				if(player1response[0]) {
					return this.sendReply('You have already responded.');
				}
				if(target === 'rock') {
					player1response.push('rock');
					if(player2response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with rock.');
				}
				if(target === 'paper') {
					player1response.push('paper');
					if(player2response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with paper.');
				}
				if(target === 'scissors') {
					player1response.push('scissors');
					if(player2response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with scissors.');
				}
				if(target === 'lizard') {
					player1response.push('lizard');
					if(player2response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with lizard.');
				}
				if(target === 'spock') {
					player1response.push('spock');
					if(player2response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with spock.');
				} else {
					return this.sendReply('Please respond with one of the following: rock, paper, scissors, lizard or spock.');
				}
			}
			if(user.userid === rpsplayersid[1]) {
				if(player2response[0]) {
					return this.sendReply('You have already responded.');
				}
				if(target === 'rock') {
					player2response.push('rock');
					if(player1response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with rock.');
				}
				if(target === 'paper') {
					player2response.push('paper');
					if(player1response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with paper.');
				}
				if(target === 'scissors') {
					player2response.push('scissors');
					if(player1response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with scissors.');
				}
				if(target === 'lizard') {
					player2response.push('lizard');
					if(player1response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with lizard.');
				}
				if(target === 'spock') {
					player2response.push('spock');
					if(player1response[0]) {
						return this.parse('/compare');
					}
					return this.sendReply('You responded with spock.');
				} else {
				return this.sendReply('Please respond with one of the following: rock, paper, scissors, lizard or spock.');
				}
			} else {
				return this.sendReply('You are not in this game of rock-paper-scissors-lizard-spock.');
			}
		}
	},

	compare: function(target, room, user) {
		if(gamestart === false) {
			return this.sendReply('There is no rock-paper-scissors-lizard-spock game going on right now.');
		} else {
			if(player1response[0] === undefined && player2response[0] === undefined) {
				return this.sendReply('Neither ' + rpsplayers[0] + ' nor ' + rpsplayers[1] + ' has responded yet.');
			}
			if(player1response[0] === undefined) {
				return this.sendReply(rpsplayers[0] + ' has not responded yet.');
			}
			if(player2response[0] === undefined) {
				return this.sendReply(rpsplayers[1] + ' has not responded yet.');
			} else {
				if(player1response[0] === player2response[0]) {
					this.add('Both players responded with \'' + player1response[0] + '\', so the game of rock-paper-scissors-lizard-spock between ' + rpsplayers[0] + ' and ' + rpsplayers[1] + ' was a tie!');
				}
				if(player1response[0] === 'rock' && player2response[0] === 'paper') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'rock\' and ' + rpsplayers[1] + ' responded with \'paper\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'rock' && player2response[0] === 'scissors') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'rock\' and ' + rpsplayers[1] + ' responded with \'scissors\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'rock' && player2response[0] === 'lizard') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'rock\' and ' + rpsplayers[1] + ' responded with \'lizard\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'rock' && player2response[0] === 'spock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'rock\' and ' + rpsplayers[1] + ' responded with \'spock\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'paper' && player2response[0] === 'rock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'paper\' and ' + rpsplayers[1] + ' responded with \'rock\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'paper' && player2response[0] === 'scissors') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'paper\' and ' + rpsplayers[1] + ' responded with \'scissors\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'paper' && player2response[0] === 'spock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'paper\' and ' + rpsplayers[1] + ' responded with \'spock\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'paper' && player2response[0] === 'lizard') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'paper\' and ' + rpsplayers[1] + ' responded with \'lizard\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'scissors' && player2response[0] === 'rock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'scissors\' and ' + rpsplayers[1] + ' responded with \'rock\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'scissors' && player2response[0] === 'paper') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'scissors\' and ' + rpsplayers[1] + ' responded with \'paper\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'scissors' && player2response[0] === 'spock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'scissors\' and ' + rpsplayers[1] + ' responded with \'spock\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'scissors' && player2response[0] === 'lizard') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'scissors\' and ' + rpsplayers[1] + ' responded with \'lizard\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'lizard' && player2response[0] === 'rock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'lizard\' and ' + rpsplayers[1] + ' responded with \'rock\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'lizard' && player2response[0] === 'spock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'lizard\' and ' + rpsplayers[1] + ' responded with \'spock\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'lizard' && player2response[0] === 'paper') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'lizard\' and ' + rpsplayers[1] + ' responded with \'paper\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'lizard' && player2response[0] === 'scissors') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'lizard\' and ' + rpsplayers[1] + ' responded with \'scissors\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'spock' && player2response[0] === 'paper') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'spock\' and ' + rpsplayers[1] + ' responded with \'paper\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'spock' && player2response[0] === 'scissors') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'spock\' and ' + rpsplayers[1] + ' responded with \'scissors\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'spock' && player2response[0] === 'rock') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'spock\' and ' + rpsplayers[1] + ' responded with \'rock\', so <b>' + rpsplayers[0] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				if(player1response[0] === 'spock' && player2response[0] === 'lizard') {
					this.add('|html|' + rpsplayers[0] + ' responded with \'spock\' and ' + rpsplayers[1] + ' responded with \'lizard\', so <b>' + rpsplayers[1] + '</b> won the game of rock-paper-scissors-lizard-spock!');
				}
				rockpaperscissors = false;
				numberofspots = 2;
				gamestart = false;
				rpsplayers = [];
				rpsplayersid = [];
				player1response = [];
				player2response = [];
			}
		}
	},

	endrps: function(target, room, user) {
		if(!user.can('broadcast')) {
			return this.sendReply('You do not have enough authority to do this.');
		}
		if(rockpaperscissors === false) {
			return this.sendReply('There is no game of rock-paper-scissors-lizard-spock happening right now.');
		}
		if(user.can('broadcast') && rockpaperscissors === true) {
			rockpaperscissors = false;
			numberofspots = 2;
			gamestart = false;
			rpsplayers = [];
			rpsplayersid = [];
			player1response = [];
			player2response = [];
			return this.add('|html|<b>' + user.name + '</b> ended the game of rock-paper-scissors-lizard-spock.');
		}
	},

	jrps: 'joinrps',
	joinrps: function(target, room, user) {
		if(rockpaperscissors === false) {
			return this.sendReply('There is no game going on right now.');
		}
		if(numberofspots === 0) {
			return this.sendReply('There is no more space in the game.');
		}
		else {
			if(rpsplayers[0] === undefined) {
				numberofspots = numberofspots - 1;
				this.add('|html|<b>' + user.name + '</b> has started a game of rock-paper-scissors-lizard-spock! /jrps or /joinrps to play against them.');
				rpsplayers.push(user.name);
				rpsplayersid.push(user.userid);
				return false;
			}
			if(rpsplayers[0] === user.name) {
				return this.sendReply('You are already in the game.');
			}
			if(rpsplayers[0] && rpsplayers[1] === undefined) {
				numberofspots = numberofspots - 1;
				this.add('|html|<b>' + user.name + '</b> has joined the game of rock-paper-scissors-lizard-spock!');
				rpsplayers.push(user.name);
				rpsplayersid.push(user.userid);
			}
			if(numberofspots === 0) {
				this.add('|html|The game of rock-paper-scissors-lizard-spock between <b>' + rpsplayers[0] + '</b> and <b>' + rpsplayers[1] + '</b> has begun! Use /shoot rock/paper/scissors/lizard/spock');
				gamestart = true;
			}
		}
	},
};
