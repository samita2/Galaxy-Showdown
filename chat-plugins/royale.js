'use strict';

let fs = require('fs');

let royale = JSON.parse(fs.readFileSync('config/royale.txt'));

exports.commands = {
	setroyale: function (target, room, user, connection, cmd) {
		if (!this.can('potd')) return;
		let targets = target.split(",");
		let seat = isNaN(targets[0]);
		let len = royale.length;
	if (!seat && targets[0] > 0 && targets[0] <= 7 && len < 10) {
		royale[royale.length] = '<tr> <td>' + targets[0] + '</td> <td>' + targets[1] + '</td> <td>' + targets[2] + '</td> </tr>';
	fs.writeFile('config/royale.txt', JSON.stringify(royale));
	this.sendReply("Successfully added in list of royals.")
	} else {
		this.sendReply("/setroyale [seat],[username],[title] - Adds in list of royale (Seat should be a number ranging from 1 to 7 and maximum 7 seats can be assigned)")
	}
	},

	removeroyale: function (target, room, user, connection, cmd) {
		if (!this.can('potd')) return;
		
		let len = royale.length;
			
				if (len <= 0) {
					this.sendReply("Royale List is currently empty.....")
				} else { 
		let royaleSpliced = royale.splice((target - 1),1);
		this.sendReply('|raw|<div class="infobox"><center><u><b>Royale Family</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Seat</th><th>Username</th><th>Title</th></tr>' + royaleSpliced + '</table> </div>') 
		fs.writeFile('config/royale.txt', JSON.stringify(royale));
		this.sendReply("Successfully removed from list of royale.");
				}
	},
	
	replaceroyale: function (target, room, user, connection, cmd) {
		if (!this.can('potd')) return;
		
		let targets = target.split(",");
		
		let len = royale.length;
			
				if (len <= 0) {
					this.sendReply("Royale List is currently empty.....")
				} else { 
		let royaleSpliced = royale.splice((targets[0] - 1),1);
		royale[royale.length] = '<tr> <td>' + targets[0] + '</td> <td>' + targets[1] + '</td> <td>' + targets[2] + '</td> </tr>';
		fs.writeFile('config/royale.txt', JSON.stringify(royale));
		this.sendReply("Successfully replaced Seat No. " + targets[0] + " from list of royale.");
				}
	},
	
	rf: 'royale',
	royale: function (target, room, user, connection, cmd) {
		if (!this.canBroadcast());

			let len = royale.length;
			
				if (len <= 0) {
					this.sendReply("Royale List is currently empty.....")
				} else { 
			

			let sortroyale = royale.sort();
			let joinedroyale = sortroyale.join("");
			this.sendReply('|raw|<div class="infobox"><center><u><b>Royale Family</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Seat</th><th>Username</th><th>Title</th></tr>' + joinedroyale + '</table> </div>')
				}
				},
};
