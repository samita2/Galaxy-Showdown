//ranking is mostly arbitrary
'use strict';

let Groupsranking = [' ', 'τ', '£', 'ϝ', 'ß', 'α', 'ϸ', 'Θ', 'Σ', '©', ];
let Groups = {

        '©': {
                id: "champion",
                name: "Champion",
                rank: 9
        },
        'Σ': {
                id: "elite",
                name: "Elite",
                rank: 8
        },
        'Θ': {
                id: "rg",
                name: "Royal Guard",
                rank: 7
        },
        'ϸ': {
                id: "professor",
                name: "Professor",
                rank: 6
        },
        'α': {
        	id: "ace",
        	name: "Ace",
        	rank: 5
        },
        'ß': {
                id: "brain",
                name: "Frontier Brain",
                rank: 4
        },        
        'ϝ': {
                id: "frontier",
                name: "Frontier",
                rank: 3
        },
        '£': {
                id: "gleader",
                name: "Gym Leader",
                rank: 2
        },
        'τ': {
                id: "trainer",
                name: "Gym Trainer",
                rank: 1
        },
        ' ': {
                rank: 0
        }
}

exports.commands = {
        leaguedeauth: 'leaguepromote',
        roomtrainer: 'leaguepromote',
        roomgleader: 'leaguepromote',
        roomfrontier: 'leaguepromote',
        roombrain: 'leaguepromote',
        roomace: 'leaguepromote',
        roomprofessor: 'leaguepromote',
        roomrg: 'leaguepromote',
        roomelite: 'leaguepromote',
        roomchampion: 'leaguepromote',
        leaguedemote: 'leagueauth',
        leaguepromote: function (target, room, user, connection, cmd) {
                if (!room.auth) {
                        this.sendReply("/leagueauth - This room isn't designed for per-room moderation");
                        return this.sendReply("Before setting league staff, you need to set it up with /roomfounder");
                }
                if (!target) return this.parse('/leagueauth [user] - Giver a user a rank in a league. Use /leagueauthhelp for more help.');
                if (!this.can('roommod', null, room)) return false;

                target = this.splitTarget(target, true);
                let targetUser = this.targetUser;
                let userid = toId(this.targetUsername);
                let name = targetUser ? targetUser.name : this.targetUsername;

                if (!userid) return this.parse('/leagueauthhelp');
                if (!targetUser && (!room.auth || !room.auth[userid])) {
                        return this.sendReply("User '" + name + "' is offline and unauthed, and so can't be promoted.");
                }

                let currentGroup = ((room.leagueauth&& room.leagueauth[userid]) || ' ')[0];
                let nextGroup = target;
                if (target === 'leaguedeauth') nextGroup = Groupsranking[0];
               
                if (cmd==='roomtrainer') {
                        nextGroup = Groupsranking[1];
                } else if (cmd==='roomgleader') {
                        nextGroup = Groupsranking[2];
                } else if (cmd==='roomfrontier') {
                        nextGroup = Groupsranking[3];                
                } else if (cmd==='roombrain') {
                        nextGroup = Groupsranking[4];
                } else if (cmd==='roomace') {
                        nextGroup = Groupsranking[5];
                } else if (cmd==='roomprofessor') {
                        nextGroup = Groupsranking[6];
                } else if (cmd==='roomrg') {
                        nextGroup = Groupsranking[7];
                } else if (cmd==='roomelite') {
                        nextGroup = Groupsranking[8];
                } else if (cmd==='roomchampion') {
                        nextGroup = Groupsranking[9];
                } else if (cmd==='leaguedeauth') {
                        nextGroup = Groupsranking[0];
                }
                
                if (!nextGroup) {
			return this.sendReply("Please specify a group such as /roomgldeader or /roomtrainer");
		}
		
		if (!Groups[nextGroup]) {
                        return this.sendReply("Group '" + nextGroup + "' does not exist.");
                }

                let groupName = Groups[nextGroup].name || "regular user";
                if (currentGroup === nextGroup) {
                        return this.sendReply("User '" + name + "' is already a " + groupName + " in this room.");
                }

                if (nextGroup === ' ') {
                        delete room.leagueauth[userid];
                } else {
                        room.leagueauth[userid] = nextGroup;
                }

                if (Groups[nextGroup].rank < Groups[currentGroup].rank) {
                        this.privateModCommand("(" + name + " was changed to " + groupName + " by " + user.name + ".)");
                        if (targetUser && Rooms.rooms[room.id].users[targetUser.userid]) targetUser.popup("You were changed to " + groupName + " by " + user.name + ".");
                } else {
                        this.addModCommand("" + name + " was changed to " + groupName + " by " + user.name + ".");
                }

                if (targetUser) targetUser.updateIdentity(room.id);
                if (room.chatRoomData) Rooms.global.writeChatRoomData();
        },
        
        toggleauth: function(target, room, user) {
        if (!this.can('roommod', null, room)) return false;
        room.showAuth = !room.showAuth;
        this.sendReply('Done.');
        if (room.showAuth) {
        this.add("|raw|<div class=\"broadcast-red\"><b>Leagueauth will show</b></div>");
        } else {
            this.add("|raw|<div class=\"broadcast-blue\"><b>Leagueauth will not show</div>");
        }
    },   
    
    leagueauthhelp: function (target, room, user) {
        if (!this.canBroadcast()) return;
            return this.sendReplyBox('\
            <center><b><u>League Auth Commands:</u></b></center><br>\
            <b>/roomtrainer</b> - Promotes a user to Gym Trainer.<br>\
            <b>/roomgleader</b> - Promotes a user to Gym Leader.<br>\
            <b>/roomelite</b> - Promotes a user to League Elite.<br>\
            <b>/roomchampion</b> - Promotes a user to League Champion.<br>\
            <b>/roombrain</b> - Promotes a user to Brain.<br>\
            <b>/roomfrontier</b> - Promotes a user to Frontier.<br>\
            <b>/roomrg</b> - Promotes a user to Royal Guard.<br>\
            <b>/roomprofessor</b> - Promotes a user to Professor.<br>\
            <b>/roomace</b> - Promotes a user to League Ace<br>\
            <b>/leaguedeauth</b> - Removes any level of League Auth from a user.<br>\
            <b>/leagueauth</b> - View all League Auth in the room.<br>\
            <br><i>League Auth ranks are symbolic, and give a person no access to moderation controls.\
            ');
    },
    
	leagueauth: function (target, room, user, connection) {
		let targetRoom = room;
		if (target) targetRoom = Rooms.search(target);
		if (!targetRoom || (targetRoom !== room && targetRoom.modjoin && !user.can('bypassall'))) return this.sendReply("The room '" + target + "' does not exist.");
		if (!targetRoom.auth) return this.sendReply("/roomauth - The room '" + (targetRoom.title ? targetRoom.title : target) + "' isn't designed for per-room moderation and therefore has no auth list.");

		let rankLists = {};
		for (let u in targetRoom.leagueauth) {
			if (!rankLists[targetRoom.leagueauth[u]]) rankLists[targetRoom.leagueauth[u]] = [];
			rankLists[targetRoom.leagueauth[u]].push(u);
		}

		let buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return (Groups[b] || {rank:0}).rank - (Groups[a] || {rank:0}).rank;
		}).forEach(function (r) {
			buffer.push((Groups[r] ? Groups[r] .name + "s (" + r + ")" : r) + ":\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) {
			connection.popup("The room '" + targetRoom.title + "' has no league auth.");
			return;
		}
		if (targetRoom !== room) buffer.unshift("" + targetRoom.title + " room auth:");
		connection.popup(buffer.join("\n\n"));
	},
}
