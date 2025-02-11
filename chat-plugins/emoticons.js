'use strict';

let color = require('../config/color');

exports.parseEmoticons = parseEmoticons;

let emotes = {
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelspr': 'http://i.imgur.com/3VtkKfJ.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelsfra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsslo': 'http://i.imgur.com/iQuToJf.jpg?1',
	'feelsdrg': 'http://i.imgur.com/UZzWcA3.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg?1',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg?1',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelsfuku': 'http://i.imgur.com/m018Q4S.jpg',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'fukya': 'http://i.imgur.com/ampqCZi.gif',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'Kappa': 'http://i.imgur.com/5qRROqN.png',
	'BibleThump': 'https://static-cdn.jtvnw.net/emoticons/v1/86/1.0',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0',
	'PogChamp': 'https://static-cdn.jtvnw.net/emoticons/v1/88/1.0',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'NotLikeThis': 'https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0',
	'BrokeBack': 'https://static-cdn.jtvnw.net/emoticons/v1/4057/1.0',
	'ThunBeast': 'https://static-cdn.jtvnw.net/emoticons/v1/1898/1.0',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0',
	'BabyRage': 'https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0',
	'TriHard': 'http://static-cdn.jtvnw.net/emoticons/v1/171/1.0',
	'BORt': 'http://static-cdn.jtvnw.net/emoticons/v1/243/1.0',
	'ACKbar': 'http://static-cdn.jtvnw.net/emoticons/v1/72752/1.0',
	'ANELE': 'http://static-cdn.jtvnw.net/emoticons/v1/3792/1.0',
	'ArgieB8': 'http://static-cdn.jtvnw.net/emoticons/v1/51838/1.0',
	'ArsoNoSexy': 'https://static-cdn.jtvnw.net/emoticons/v1/50/1.0',
	'AsianGlow': 'https://static-cdn.jtvnw.net/emoticons/v1/74/1.0',
	'BatChest': 'https://static-cdn.jtvnw.net/emoticons/v1/1905/1.0',
	'BlargNaut': 'https://static-cdn.jtvnw.net/emoticons/v1/38/1.0',
	'BuddhaBar': 'https://static-cdn.jtvnw.net/emoticons/v1/27602/1.0',
	'CorgiDerp': 'https://static-cdn.jtvnw.net/emoticons/v1/49106/1.0',
	'CougarHunt': 'https://static-cdn.jtvnw.net/emoticons/v1/21/1.0',
	'DAESuppy': 'https://static-cdn.jtvnw.net/emoticons/v1/973/1.0',
	'DBstyle': 'https://static-cdn.jtvnw.net/emoticons/v1/73/1.0',
	'EagleEye': 'https://static-cdn.jtvnw.net/emoticons/v1/20/1.0',
	'FPSMarksman': 'https://static-cdn.jtvnw.net/emoticons/v1/42/1.0',
	'FrankerZ': 'https://static-cdn.jtvnw.net/emoticons/v1/65/1.0',
	'FreakinStinkin': 'https://static-cdn.jtvnw.net/emoticons/v1/39/1.0',
	'FUNgineer': 'https://static-cdn.jtvnw.net/emoticons/v1/244/1.0',
	'GingerPower': 'https://static-cdn.jtvnw.net/emoticons/v1/32/1.0',
	'GrammarKing': 'https://static-cdn.jtvnw.net/emoticons/v1/3632/1.0',
	'HassanChop': 'https://static-cdn.jtvnw.net/emoticons/v1/68/1.0',
	'HeyGuys': 'https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0',
	'HotPokket': 'https://static-cdn.jtvnw.net/emoticons/v1/357/1.0',
	'Jebaited': 'https://static-cdn.jtvnw.net/emoticons/v1/90/1.0',
	'JKanStyle': 'https://static-cdn.jtvnw.net/emoticons/v1/15/1.0',
	'JonCarnage': 'https://static-cdn.jtvnw.net/emoticons/v1/26/1.0',
	'KappPride': 'https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0',
	'KappHD': 'https://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png',
	'KappRoss': 'https://static-cdn.jtvnw.net/emoticons/v1/70433/1.0',
	'Keepo': 'https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0',
	'KevinTurtle': 'https://static-cdn.jtvnw.net/emoticons/v1/40/1.0',
	'MVGame': 'https://static-cdn.jtvnw.net/emoticons/v1/29/1.0',
	'NinjaTroll': 'https://static-cdn.jtvnw.net/emoticons/v1/45/1.0',
	'NoNoSpot': 'https://static-cdn.jtvnw.net/emoticons/v1/44/1.0',
	'NotATK': 'https://static-cdn.jtvnw.net/emoticons/v1/34875/1.0',
	'OMGScoots': 'https://static-cdn.jtvnw.net/emoticons/v1/91/1.0',
	'OneHand': 'https://static-cdn.jtvnw.net/emoticons/v1/66/1.0',
	'OptimizePrime': 'https://static-cdn.jtvnw.net/emoticons/v1/16/1.0',
	'PazPazowitz': 'https://static-cdn.jtvnw.net/emoticons/v1/19/1.0',
	'PeoplesChamp': 'https://static-cdn.jtvnw.net/emoticons/v1/3412/1.0',
	'PermaSmug': 'https://static-cdn.jtvnw.net/emoticons/v1/27509/1.0',
	'PicoMause': 'https://static-cdn.jtvnw.net/emoticons/v1/27/1.0',
	'PipeHype': 'https://static-cdn.jtvnw.net/emoticons/v1/4240/1.0',
	'PMSTwin': 'https://static-cdn.jtvnw.net/emoticons/v1/92/1.0',
	'Poooound': 'https://static-cdn.jtvnw.net/emoticons/v1/358/1.0',
	'PRChase': 'https://static-cdn.jtvnw.net/emoticons/v1/28328/1.0',
	'PuppeyFace': 'https://static-cdn.jtvnw.net/emoticons/v1/58136/1.0',
	'RedCoat': 'https://static-cdn.jtvnw.net/emoticons/v1/22/1.0',
	'ResidentSleeper': 'https://static-cdn.jtvnw.net/emoticons/v1/245/1.0',
	'RitzMitz': 'https://static-cdn.jtvnw.net/emoticons/v1/4338/1.0',
	'RuleFive': 'https://static-cdn.jtvnw.net/emoticons/v1/361/1.0',
	'ShadyLulu': 'https://static-cdn.jtvnw.net/emoticons/v1/52492/1.0',
	'ShazBotstix': 'https://static-cdn.jtvnw.net/emoticons/v1/87/1.0',
	'SoBayed': 'https://static-cdn.jtvnw.net/emoticons/v1/1906/1.0',
	'SoonerLater': 'https://static-cdn.jtvnw.net/emoticons/v1/355/1.0',
	'StoneLightning': 'https://static-cdn.jtvnw.net/emoticons/v1/17/1.0',
	'Sullustan': 'https://static-cdn.jtvnw.net/emoticons/v1/72751/1.0',
	'SuperVinlin': 'https://static-cdn.jtvnw.net/emoticons/v1/31/1.0',
	'TheThing': 'https://static-cdn.jtvnw.net/emoticons/v1/7427/1.0',
	'TheTarFu': 'https://static-cdn.jtvnw.net/emoticons/v1/70/1.0',
	'TheRinger': 'https://static-cdn.jtvnw.net/emoticons/v1/18/1.0',
	'TheKing': 'https://static-cdn.jtvnw.net/emoticons/v1/50901/1.0',
	'TF2John': 'https://static-cdn.jtvnw.net/emoticons/v1/1899/1.0',
	'TinyFace': 'https://static-cdn.jtvnw.net/emoticons/v1/67/1.0',
	'UleetBackup': 'https://static-cdn.jtvnw.net/emoticons/v1/49/1.0',
	'UnSane': 'https://static-cdn.jtvnw.net/emoticons/v1/71/1.0',
	'WholeWheat': 'https://static-cdn.jtvnw.net/emoticons/v1/1896/1.0',
	'WinWaker': 'https://static-cdn.jtvnw.net/emoticons/v1/167/1.0',
	'WTRuck': 'https://static-cdn.jtvnw.net/emoticons/v1/1897/1.0',
	'YouWHY': 'https://static-cdn.jtvnw.net/emoticons/v1/4337/1.0',
	'StrooPer': 'http://static-cdn.jtvnw.net/emoticons/v1/72750/1.0',
	'BigBrother': 'http://static-cdn.jtvnw.net/emoticons/v1/1904/1.0',
	'BCWarrior': 'http://static-cdn.jtvnw.net/emoticons/v1/30/1.0',
	'DatHass': 'http://static-cdn.jtvnw.net/emoticons/v1/20225/1.0',
	'DendiFace': 'http://static-cdn.jtvnw.net/emoticons/v1/58135/1.0',
	'OpieOP': 'http://static-cdn.jtvnw.net/emoticons/v1/356/1.0',
	'DatSheffy': 'http://static-cdn.jtvnw.net/emoticons/v1/170/1.0',
	'DogFace': 'http://static-cdn.jtvnw.net/emoticons/v1/1903/1.0',
	'PraiSelt': 'http://static-cdn.jtvnw.net/emoticons/v1/38586/1.0',
	'SeemsGood': 'http://static-cdn.jtvnw.net/emoticons/v1/64138/1.0',
	'SriHead': 'http://static-cdn.jtvnw.net/emoticons/v1/14706/1.0',
	'deIlluminati': 'http://static-cdn.jtvnw.net/emoticons/v1/46248/1.0',
	'SwiftRage': 'https://static-cdn.jtvnw.net/emoticons/v1/34/1.0',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'PJSalt': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'yadontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'dafuq': 'http://cdn.overclock.net/6/6c/50x50px-ZC-6c0e35eb_jackie-chan-meme.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'yesface': 'http://i.imgur.com/k9YCF6K.png',
	'trollface': 'http://i.imgur.com/YdZ72N8.png?1',
	'fukiu': 'http://i.imgur.com/DqPskTb.gif',
	'lennyface': 'http://i.imgur.com/CKi3Gh3.png',
	'bordll': 'http://i.imgur.com/XBlL6vw.jpg?1',
	'meDa': 'http://i.imgur.com/Z25jWSk.jpg?1',
	'eczz': 'http://i.imgur.com/wA5VMv3.jpg?1',
	'chbll': 'http://i.imgur.com/DQ6rTSF.jpg?1',
	'PLui': 'http://i.imgur.com/hhjo6qh.png?1',
	'snjap': 'http://i.imgur.com/glrg8c2.jpg?1',
	'uDio': 'http://i.imgur.com/OgZWzp8.jpg?1',
	'waitwat': 'http://i.imgur.com/FpxTQxU.jpg',
	'happyface': 'https://qph.is.quoracdn.net/main-qimg-f207eb810b1fb6f5655a1bf942a5cf7f?convert_to_webp=true',
	'Kidm': 'https://qph.is.quoracdn.net/main-qimg-97089097754f3312c841489f86ee0aeb?convert_to_webp=true',
	'Strng': 'https://qph.is.quoracdn.net/main-qimg-29c28f170da073803efa56247542a3b0?convert_to_webp=true',
	'PoKM': 'https://qph.is.quoracdn.net/main-qimg-fb5a7040411891f74ef5c242fd3808d7?convert_to_webp=true',
	'CheWie': 'https://qph.is.quoracdn.net/main-qimg-1d36374afe76e55fe21e581028151836?convert_to_webp=true',
	'CReal': 'https://qph.is.quoracdn.net/main-qimg-5b8b572e88401ead4c5596ed395716cf?convert_to_webp=true',
	'Cerlsplit': 'https://qph.is.quoracdn.net/main-qimg-323aa9f1b513645811a929a135cb4bd7?convert_to_webp=true',
	'CAcptd': 'https://qph.is.quoracdn.net/main-qimg-3331fb7b21171a8857df5193011454d8?convert_to_webp=true',
	'CNorris': 'https://qph.is.quoracdn.net/main-qimg-8c2e24f11f2c427acfca0ece215b8cbb?convert_to_webp=true',
	'DoH': 'https://qph.is.quoracdn.net/main-qimg-7e4c50aad1f115c27f648673cc81e57f?convert_to_webp=true',
	'DumB': 'https://qph.is.quoracdn.net/main-qimg-83effb4bd28bcceba02db9eb644e45d1?convert_to_webp=true',
	'4evral': 'https://qph.is.quoracdn.net/main-qimg-7e594eea1fd9afa277d7708563f061ac?convert_to_webp=true',
	'YeY': 'https://qph.is.quoracdn.net/main-qimg-0235f11b25bdcf33044f512f42bbaed0?convert_to_webp=true',
	'pokerface': 'https://qph.is.quoracdn.net/main-qimg-bad29ae075758584fd722dc8a15f5f9d?convert_to_webp=true',
	'ohgodwhy': 'https://qph.is.quoracdn.net/main-qimg-a679472f976f5cbda6e82cc7210a635b?convert_to_webp=true',
	'NotBad': 'https://qph.is.quoracdn.net/main-qimg-216cf3e002bc4e3be2e6d2e7ad2c5d04?convert_to_webp=true',
	'HlOl': 'https://qph.is.quoracdn.net/main-qimg-8bda04d7f0a0cbbc38318d4c815b27d6?convert_to_webp=true',
	'COokie': 'https://qph.is.quoracdn.net/main-qimg-308438906543185f5fe84e986a0cc232?convert_to_webp=true',
	'ConTent': 'https://qph.is.quoracdn.net/main-qimg-9149b83c79a1516ebf5f4f9308e528c4?convert_to_webp=true',
	'fukyea': 'https://qph.is.quoracdn.net/main-qimg-003fb8028ff8e9d286786c372eb84ca4?convert_to_webp=true',
	'oHcrap': 'https://qph.is.quoracdn.net/main-qimg-3516216e3a75bfe14d2dca65c985e49b?convert_to_webp=true',
	'mRd': 'https://qph.is.quoracdn.net/main-qimg-28fc438ca99507a43a04a6c1f52dd0f7?convert_to_webp=true',
	'suCSs': 'https://qph.is.quoracdn.net/main-qimg-9e1888c10006773fa294d19315a40552?convert_to_webp=true',
	'freGA': 'http://i.imgur.com/7ujf8fL.jpg?1',
	'SupaHot': 'http://i.imgur.com/pxjv34R.jpg?1',
	'LukeNoo': 'http://i.imgur.com/tAyqMrf.jpg?1',
	'mOn': 'http://i.imgur.com/4daPYQ5.png',
	'BTte': 'http://i.imgur.com/KjMYGdj.jpg?1',
	'GAy': 'http://i.imgur.com/Tms3DPi.png?1',
	'piKa': 'http://i.imgur.com/viGgYqN.png',
	'faCe': 'https://qph.is.quoracdn.net/main-qimg-e88588d1f672c2cd982317fc68bbac3b?convert_to_webp=true',
};

let emotesKeys = Object.keys(emotes);
let patterns = [];
let metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

for (let i in emotes) {
	if (emotes.hasOwnProperty(i)) {
		patterns.push('(' + i.replace(metachars, '\\$&') + ')');
	}
}
let patternRegex = new RegExp(patterns.join('|'), 'g');

/**
 * Parse emoticons in message.
 *
 * @param {String} message
 * @param {Object} room
 * @param {Object} user
 * @param {Boolean} pm - returns a string if it is in private messages
 * @returns {Boolean|String}
 */
function parseEmoticons(message, room, user, pm) {
	if (typeof message !== 'string' || (!pm && room.disableEmoticons)) return false;

	let match = false;
	let len = emotesKeys.length;


	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;

	// escape HTML
	message = Tools.escapeHTML(message);

	// add emotes
	message = message.replace(patternRegex, function (match) {
		let emote = emotes[match];
		return typeof emote === 'string' ? '<img src="' + emote + '" title="' + match + '" />' : match;
	});

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	let group = user.getIdentity().charAt(0);
	if (room.auth) group = room.auth[user.userid] || group;

	let style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";

	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";
	if (pm) return message;

	room.addRaw(message);

	return true;
}

/**
 * Create a two column table listing emoticons.
 *
 * @return {String} emotes table
 */
function create_table() {
	let emotes_name = Object.keys(emotes);
	let emotes_list = [];
	let emotes_group_list = [];
	let len = emotes_name.length;
	let i;

	for (i = 0; i < len; i++) {
		emotes_list.push("<td>" +
			"<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' />" +
			emotes_name[i] + "</td>");
	}

	let emotes_list_right = emotes_list.splice(len / 2, len / 2);

	for (i = 0; i < len / 2; i++) {
		let emote1 = emotes_list[i],
			emote2 = emotes_list_right[i];
		if (emote2) {
			emotes_group_list.push("<tr>" + emote1 + emote2 + "</tr>");
		} else {
			emotes_group_list.push("<tr>" + emote1 + "</tr>");
		}
	}

	return "<div class='infobox'><center><b><u>List of Emoticons</u></b></center>" + "<div class='infobox-limited'><table border='1' cellspacing='0' cellpadding='5' width='100%'>" + "<tbody>" + emotes_group_list.join("") + "</tbody>" + "</table></div></div>";
}

let emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return false;
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],
	
};
