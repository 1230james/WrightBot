// WRIGHTBOT

var Discord = require("discord.js"); //Set up the bot
var bot = new Discord.Client();
var moment = require("moment");
//var yt = require('ytdl-core');
const fs = require("fs");
var banList = require("discord-ban-list");
const DBL = require("dblapi.js");
var database = require("./database.json");
const config = require(__dirname/ + "/config.json");
var log = (msg) => { // Console timestamp
		console.log(`[WrightBot ${moment().format("MM-DD-YYYY HH:mm:ss")}] ${msg}`);
	};
	
bot.on('ready', () => {
	var botStatus = {} // Used for setting the bot's status and online/offline state, etc.
	botStatus.status = 'online'
	botStatus.game = {}
	botStatus.game.name = 'w/ my badge | !help'
	botStatus.game.type = 1
	bot.user.setPresence(botStatus).catch(log); //Set status and send a message to the console once the bot is ready
	log(`Online in ${bot.channels.size} courtroom(s) and ${bot.guilds.size} courthouse(s).`);
	var avlist = [ // List of file paths to avatar
	__dirname + '/avatar1.png', __dirname + '/avatar2.png', __dirname + '/avatar3.png', __dirname + '/avatar4.png', __dirname + '/avatar5.png', 
	]
	var avatar = avlist[Math.floor(Math.random() * avlist.length)] // Pick a random avatar
	var month = `${moment().format("MM")}`
	if (month == "12") { avatar = "avatarxmas.png" } // Christmas avatar!
	bot.user.setAvatar(fs.readFileSync(avatar), function(err) {
        if (err) throw err;
    });
	/*if (month == "12") { // Could probably do one-line statements for this but I want to be safe
		//bot.user.setUsername("LarryButzBot");
		console.log("Larry!!!!");
	} if (month != "12") {
		bot.user.setUsername("WrightBot");
	} */
	log('Current avatar: ' + avatar);
});

//Copypasta stuff
// 
//[TEXT CHANNEL VS DM CHECK]
//if (message.channel.type === 'text') {
//		log(message.guild.name + ':' + ' message to @' + message.author.username + ' in #' + message.channel.name)
//	} else if (message.channel.type === 'dm') {
//		log('message to @' + message.author.username + ' in their DMs')
//	}
//
//[IF SENT BY BOT THEN DONT CONTINUE]
//if(message.author.bot) return;

process.on("unhandledRejection", err => {
  //Keep from permission error spam in console
});

function clean(text) { //For !eval
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}

function updateFile() { //Used to write to the db file when it needs to be updated
    fs.writeFile(__dirname + '/database.json', JSON.stringify(database, null, 2))
}
 
function db(arr,val) { //Add new variables to the db, eg: db("foo","bar")
  database[arr] =  val
  fs.writeFileSync(__dirname + '/database.json', JSON.stringify(database, null, 2))
}

function sum(obj) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}
 
function remove(arr, what) {
	var found = arr.indexOf(what);
 
    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

bot.on('message', (message) => { //When the bot is on, do this stuff
	//var sCht = require(__dirname + '/channel');
	var doneTheStuff; //vars
	var user 	= message.author;
	var input 	= message.content.toUpperCase();
	let prefix = "!";

	function sendMessage(msg, logm) { // Send a message
		message.channel.send(msg)
		if (logm) { // If log (the parameter) is null, then don't log something in the console
			if (message.channel.type === 'text') { // Text channel vs DM check
				log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
			} else if (message.channel.type === 'dm') {
				log('[@' + message.author.username + ', a DM]: ' + logm)
			}
		}
	}

	function sendFile(file, logm) { // Send a file
		var files = {}
		files.files = [file] // file should be a string
		message.channel.send(files)
		if (logm) {
			if (message.channel.type === 'text') {
				log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
			} else if (message.channel.type === 'dm') {
				log('[@' + message.author.username + ', a DM]: ' + logm)
			}
		}
	}

	function sendDM(msg, logm) { // Same as sendMessage but sends to author's DM
		message.author.send(msg)
		if (logm) {
			if (message.channel.type === 'text') {
				log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
			} else if (message.channel.type === 'dm') {
				log('[@' + message.author.username + ', a DM]: ' + logm)
			}
		}
	}
	
// Blocklist
var blocklist = ['365631806461968386'];
for (var i=0;i<blocklist.length;i++)
	if (message.author.id == blocklist[i]) return;
	
// !help or !cmds - Display commands and bot info
if (input == prefix + "HELP" || input == prefix + "CMDS") {
	if(message.author.bot) return;
	
	var CMDS = `__**WrightBot v17**__
+ (16) Added support for avatar changes.
• (16a) Moved auth URL and official server invite link to !invite.
• (16b) Cleaned up code and updated it for Discord.js 11.1.0
~~- (16c) Removed welcome message feature (it broke).~~
+ (16d) Fixed welcome messages.
• (16e) Fixed a crash related to NSFW toggle
• (16f) Fixed a crash related to welcoming new users.
• (16g) Fixed a crash related to a minor new feature in the works.
+ (17) EULA added.

__**COMMANDS**__
1. !help - Displays all commands and bot-related info in a direct message.
2. !invite - Displays auth and relevant invite links.
3. !vulgar - Toggles the usage of vulgar words for sentence generators.
4. !judge [player mention/statement] - Judges someone or something Guilty or Not Guilty.
5. !guiltynotguilty - Displays a certain GIF. Try it and see.
6. !yell <phrase> - Displays corresponding speech bubble GIF or PNG. Add no phrase for a list of valid phrases.
7. !gavel <1/3> - Pounds a gavel the specified number of times.
8. !accuse [@mention]- Creates a random accusation statement against the mentioned user, or an ambiguous witness.

__**TO BE IMPLEMENTED**__
9. !investigate - Creates a random statement regarding found evidence.
10. !crime [@mention] - Creates a random statement a crime the mentioned user committed, or an ambiguous witness.
11. !emote <emote> - Displays corresponding Phoenix sprite. Add no emote for a list of valid emotes.

__**CONFIGURABLES**__
*Note that these commands can only be used by the server owner.*
1. !vulgar - Toggles vulgar language for sentences between "true" and "false" on a **per text channel** basis. Set to false by default.`

	var EULA = `__**EULA**__
James, the bot author, has, to the best of his ability, complied with the Discord API Terms of Service. Due to the nature of WrightBot's code, **responsibility for ensuring that all users of WrightBot give WrightBot permission to collect any and all "End User Data" (as detailed in the Discord API ToS, found here: https://discordapp.com/developers/docs/legal#2-license-accounts-and-restrictions ) rests on the owners and other administrative figures in which WrightBot is used.** James is not responsible for any breach of the Discord API Terms of Service caused by the negligence of the owners and other administrative figures in servers in which WrightBot is used. By using WrightBot in your server, you accept the EULA outlined here.

__**OFFICIAL SUPPORT SERVER**__
Need some help? Come on down to JSJ; we have a section reserved for anything related to WrightBot, or our other bots PilotBot and The Donald!
https://discord.gg/MvEHdmc`

	if (message.channel.type != 'dm') {
		sendMessage(message.author + ', I sent a copy of the Court Record to you in a DM.', null);
	}
	sendDM(CMDS,'Sent commands');
	sendDM(EULA);
}

// !invite - Display auth & inv links
if (input == prefix + "INVITE") {
	if (message.author.bot) return;
	var auth = `__**AUTH URL**__
https://discordapp.com/oauth2/authorize?&client_id=232749520423878658&scope=bot&permissions=0

__**OFFICIAL SERVER**__
https://discord.gg/MvEHdmc
Come here to see new beta features in action, general talk, and for support for WrightBot, and our other homemade bots.`
	sendMessage(auth, 'Sent auth url')
}

// !judge - Judge someone guilty/not guilty
if (input.startsWith(prefix + "JUDGE")) {         //I added a space after "JUDGE" to make sure the person was referencing "judge ..." instead of maybe "judge1234 ..."
if(message.author.bot) return; //Keeps bot from replying to itself

if (message.mentions.users.size === 1) {     //If one person was mentioned (Will not work with 2+ because code would bork and it would just sound weird)
    var mentionedUser = message.mentions.users.first();        //Set a variable to be the first (and only) user mentioned in the message
    
    var Response = [    //Set custom responses specifically for someone being mentioned
    mentionedUser + ' is guilty!',
    mentionedUser + ' is not guilty!'
    ]
    //You can add as many responses as you want without altering code
    
} else {

    var Response = [ 
        'Guilty!',
        'Not guilty!'
    ]
    }
    //Again, you can put in as many of these as you want without altering any other code (make sure to put a comma after each one except for the last)

    
var Response = Response[Math.floor(Math.random() * Response.length)] //Response.length is 2 currently, so it chooses a random whole number between 1 and 2

sendMessage(Response, 'Rendered a verdict (' + Response + ')')
}

// !guiltynotguilty - Display Guilty / Not Guilty bugs bunny GIF
if (input == prefix + "GUILTYNOTGUILTY") {
		if(message.author.bot) return;
		sendFile('https://i.gyazo.com/0e0e438cf7041606688021277fa1c2a1.gif', 'Sent the Guilty/Not Guilty GIF')
}

// !yell - Speech bubbles!
if (input.startsWith("!YELL")) {
	if(message.author.bot) return;
	
	var yelllist = `__**YELL COMMANDS**__
	1. Objection
	2. Hold It
	3. Take That
	4. Gotcha
	5. Eureka
	6. Got it
	7. Such insolence
	8. Hang on
	9. That's enough
	10. Not so fast
	11. Overruled
	12. Have a look
	13. Silence
	14. Satorha or Satora
	15. Welcome`
	
	if (input == prefix + "YELL OBJECTION") {
		sendFile('https://i.gyazo.com/9fc7da3d319a4d3d963db5601c22a15a.gif','Shouted "Objection"')
	}

	else if (input == prefix + "YELL HOLD IT") {
		sendFile('https://i.gyazo.com/7cfdcbfb2fcb04d7116d716fe9771fbf.gif','Shouted "Hold It"')
	}

	else if (input == prefix + "YELL TAKE THAT") {
		sendFile('https://i.gyazo.com/56456d25be455ef1a6ff362f2175a0e6.gif','Shouted "Take That"')
	}
	
	else if (input == prefix + "YELL GOTCHA") {
		sendFile('https://i.gyazo.com/4adeee8f0fd9f05ed52c316ee89e9c06.gif','Shouted "Gotcha"')
	}
	
	else if (input == prefix + "YELL EUREKA") {
		sendFile('https://i.gyazo.com/864d32441f3d85da171fe03f4bee07b5.gif','Shouted "Eureka"')
	}
	
	else if (input == prefix + "YELL SUCH INSOLENCE") {
		sendFile('https://i.gyazo.com/119d8b982ab25389dc65822b712145aa.png','Shouted "Such Insolence"')
	}

	else if (input == prefix + "YELL GOT IT") {
		sendFile('https://i.gyazo.com/a48671ab942bc0e178ef4869b9431852.png','Shouted "Got It"')
	}
	
	else if (input == prefix + "YELL HANG ON") {
		sendFile('https://i.gyazo.com/1348542984fb392e35e58c2e58946e0d.png','Shouted "Hang On"')
	}
	
	else if (input == prefix + "YELL THATS ENOUGH" || input == prefix + "YELL THAT'S ENOUGH") {
		sendFile('https://i.gyazo.com/a97f0cc16f1a93546f32cb07175a3706.png','Shouted "Thats Enough"')
	}
	
	else if (input == prefix + "YELL NOT SO FAST") {
		sendFile('https://i.gyazo.com/c0b53dac75974784e0f5940e553f45db.png','Shouted "Not So Fast"')
	}
	
	else if (input == prefix + "YELL OVERRULED") {
		sendFile('https://i.gyazo.com/f8e9719c76baaea9154fc8a17b6cf11c.png','Shouted "Overruled"')
	}
	
	else if (input == prefix + "YELL HAVE A LOOK") {
		sendFile('https://i.gyazo.com/da747fe1cd10f06baafdf5b73a407364.png','Shouted "Have a Look"')
	}
	
	else if (input == prefix + "YELL SILENCE") {
		sendFile('https://i.gyazo.com/082a4af57a778d491fd51ad9d1e3ac8f.png','Shouted "Silence"')
	}
	
	else if (input == prefix + "YELL SATORHA" || input == prefix + "YELL SATORA") {
		sendFile('https://i.gyazo.com/ddb5b98a78eefcbd44fd78590638a8ee.png','Shouted "Satorha"')
	}
	
	else if (input == prefix + "YELL WELCOME") {
		sendFile('https://i.gyazo.com/81233f5fb253f4af969270b634f42ffa.png','Shouted "Welcome"')
	}
	
	else {
		sendMessage(yelllist,'Sent yell list')
	}
}

// !gavel - Gavel GIF
if (input.startsWith("!GAVEL")) {
	if(message.author.bot) return;
	
	if (input == ("!GAVEL 1")) {
		sendFile('https://i.gyazo.com/b24a2e3d76a9a77e94a80b02796c7ed3.gif','Pounded gavel once')
	}
	
	if (input == ("!GAVEL 3")) {
		sendFile('https://i.gyazo.com/a79a846c1099d7cdfd159c0cc56e8efa.gif','Pounded gavel thrice')
	}
	
	if (input != ("!GAVEL 1") & input != ("!GAVEL 3")) {
		sendMessage('Invalid argument; enter `!gavel 1` or `!gavel 3`','Failed to pound gavel')
	}
}

// !accuse - Accusation statements
if (input.startsWith("!ACCUSE")){
	if(message.author.bot) return;
	
	if (message.mentions.users.size == 1) {
		var mentionedUser = message.mentions.users.first();
	} else {
		var mentionedUser = 'the witness in question'
	}
    
	if (database[message.channel.id + '.NSFW'] === 'true') { //!vulgar check
		var verblist = [
			'raped', 'fucked', 'choked', 'gagged', 'bent', 'molested', 'gave autism to', 'touched', 'blew', 'came inside of', 'gave a rimjob to', 'anally stimulated', 'juiced', 'butt bashed', 'demolished', 'blasted hot cum on', 'flung shit at', 'gulped', 'devoured', 'bounced on',  'sexually humiliated', 'emerged out of', 'lashed out at', 'gobbled', 'goofed', 'gripped the asscheek of', 'melted', 'muzzled', 'tied down and whipped', 'masturbated to the thought of', 'squirmed into', 'gave some tip to', 'fondled', 'anally probed', 'thrusted into', 'nibbled the nipple of', 'stuck their tongue inside of', 'explored the anal cavity of', 'cut up', 'spurted into',  'erupted inside of', 'oozed on', 'screeched at', 'shrieked at', 'rage-fucked', 'slithered on', 'twisted', 'spooned with', 'sprayed', 'squeezed', 'wiggled', 'teased', 'shanked', 'murdered', 'annihilated', 'stabbed', 'bludgeoned', 'ran over'
		]
			
		var adjectivelist = [
		'dead', 'hairless', 'sadistic', 'metal', 'wild', 'domesticated', 'abnormal', 'medicated', 'cocky', 'massive', 'disrespectful', 'impressive', 'out of control', 'internet-worthy', 'hilarious', 'sexy', 'hot', 'very tactful', 'bearded', 'duck-like', 'violent', 'slimy', 'insanely creepy', 'embarrassed-to-the-bone', 'self-centered', 'talking', 'naked', 'angry', 'shaky', 'deep', 'sick', 'zippy', 'sticky', 'fluffy', 'frozen', 'unholy', 'painfully honest', 'filthy', 'fighting', 'bonkers', 'harsh', 'frisky', 'greedy', 'crawly', 'insane', 'hideous', 'ungodly', 'abusive', 'drunken', 'hateful', 'idiotic', 'twisted', 'useless', 'yapping', 'magical', 'indecent', 'godawful', 'arrogant', 'confused', 'flirting', 'high-end', 'insecure', 'maniacal', 'sickened', 'slippery', 'stubborn', 'tripping', 'vengeful', 'sinister', 'costumed', 'cowardly', 'haunting', 'startled', 'alcoholic', 'demanding', 'shivering', 'offensive', 'nighttime', 'startling', 'disgusting', 'slap happy', 'disturbing', 'adulterous', 'blathering', 'flickering', 'rebellious', 'impertinent', 'bull-headed', 'hyperactive', 'infuriating', 'outnumbered', 'pea-brained', 'territorial', 'underhanded', 'zombie like', 'mischievous', 'at-the-ready', 'freeloading', 'house-broken', 'up-to-no-good', 'cruel-hearted', 'misunderstood', 'narrow-minded', 'self-absorbed', 'bat-shit-crazy', 'fiercely-loyal', 'out-of-control', 'fear-inspiring', 'bat shit crazy', 'mentally-impaired', 'autistic', 'hospitalized'
		]
				
	} else {
		var verblist = [
			'murdered', 'killed', 'assaulted', 'robbed', 'hit', 'lied to', 'ran over', 'stabbed', 'bludgeoned', 'shanked', 'screeched at', 'shrieked at'
		]
			
		var adjectivelist = [
			'hairless', 'metal', 'wild', 'domesticated', 'abnormal', 'medicated', 'disrespectful', 'impressive', 'out of control', 'internet-worthy', 'hilarious', 'very tactful', 'bearded', 'duck-like', 'violent', 'painfully honest', 'filthy', 'fighting', 'bonkers', 'harsh', 'frisky', 'greedy', 'crawly', 'insane', 'hideous', 'ungodly', 'hateful', 'twisted', 'useless', 'yapping', 'magical', 'indecent', 'godawful', 'arrogant', 'confused', 'flirting', 'high-end', 'insecure', 'maniacal', 'sickened', 'stubborn', 'tripping', 'vengeful', 'sinister', 'costumed', 'cowardly', 'haunting', 'startled', 'demanding', 'shivering', 'offensive', 'nighttime', 'startling', 'disgusting', 'slap happy', 'disturbing', 'flickering', 'rebellious', 'impertinent', 'bull-headed', 'hyperactive', 'infuriating', 'outnumbered', 'pea-brained', 'territorial', 'underhanded', 'zombie like', 'mischievous', 'at-the-ready', 'freeloading', 'house-broken', 'up-to-no-good', 'cruel-hearted', 'misunderstood', 'narrow-minded', 'self-absorbed', 'fiercely-loyal', 'out-of-control', 'fear-inspiring', 'hospitalized'
		]
	}
	
	var nounlist = [
		'aunt',	'baby', 'brother', 'boyfriend', 'bride', 'brother', 'cousin', 'dad', 'daughter', 'father', 'father-in-law', 'lover', 'fiancée', 'friend', 'boyfriend', 'girlfriend', 'godchild', 'godfather', 'godmother', 'grandchild', 'grandchildren', 'granddaughter', 'grandfather', 'granddad', 'grandpa', 'grandmother', 'grandma', 'grandson', 'great-grandparents', 'groom', 'half-brother', 'husband', 'mother', 'mother-in-law', 'mum', 'mummy', 'mom', 'nephew', 'niece', 'parent', 'parents', 'sister', 'son', 'stepbrother', 'twin', 'twin-brother', 'uncle', 'wife', 'pet bird', 'cat', 'cow', 'dog', 'goat', 'pig', 'pet snake'
		]
	
	var verb = verblist[Math.floor(Math.random() * verblist.length)]
	var adjective = adjectivelist[Math.floor(Math.random() * adjectivelist.length)]
	var noun = nounlist[Math.floor(Math.random() * nounlist.length)]
	
	sendMessage('The defense contends that ' + mentionedUser + ' ' + verb + ' their ' + adjective + ' ' + noun + '!','Accused ' + mentionedUser)
}

// !investigate - Investigation statements
if (input.startsWith("!INVESTIGATE")) {
	sendFile("https://i.gyazo.com/80d7db8a33b9d74b72d0fe2c015b7b9e.png")
}

// !crime - Crime statements
if (input.startsWith("!CRIME")) {
	sendFile("https://i.gyazo.com/80d7db8a33b9d74b72d0fe2c015b7b9e.png")
}

// !investigate - Investigation statements
if (input.startsWith("!EMOTE")) {
	sendFile("https://i.gyazo.com/80d7db8a33b9d74b72d0fe2c015b7b9e.png")
}


// Got mentioned?
//if (input.includes("<@232749520423878658>") && !input.startsWith("!ACCUSE") && !input.startsWith("!JUDGE") && !input.startsWith("!CRIME")) {
//	if(message.author.bot) return;
//	
//	message.channel.send('Your Honor, the defense regrets to inform you that I don\'t possess CleverBot API.')
//	if (message.channel.type === 'text') {
//		log(message.guild.name + ':' + ' Got mentioned by @' + message.author.username + ' in #' + message.channel.name)
//	} else if (message.channel.type === 'dm') {
//		log('Got mentioned by @' + message.author.username + ' in their DMs')
//	}
//<close bracket>

// !print - Prints bot stats for James
if (input == prefix + "PRINT") {
	if(message.author.bot) return;
	
	if (message.author == '<@126516587258707969>') {
		message.channel.send(`Online in ${bot.channels.size} courtroom(s) and ${bot.guilds.size} courthouse(s).`)
		}
	}

// !broadcast - Broadcast to all servers
if (input.startsWith("!BROADCAST ")) {
  message.delete()
  if ((message.author.id !== '126509065277931520') && (message.author.id !== '126516587258707969')) {
	  sendMessage('I\'m sorry, Your Honor, but you can\'t do that.')
	  return;
  }
  var broadcasttext = message.content.split("!broadcast ").join("")
  sendMessage('Broadcast sent!','Sent broadcast: ' + broadcasttext)
  var guildArray = bot.guilds.map(g => g.id)
 
  for(var i = 0; i < bot.guilds.size; i++) {
	  if (bot.guilds.get(guildArray[i]).defaultChannel) {
		  bot.guilds.get(guildArray[i]).defaultChannel.send('Your Honor, I have new, important evidence! It says:```' + broadcasttext + '```')
	  } 
  }
}

// !eval - Evaluation
if (input.startsWith("!EVAL ")) {
    if (message.channel.type === 'text') {
	  if ((message.author.id !== '126509065277931520') && (message.author.id !== '126516587258707969')) return;
	  if (message.content === '$eval process.exit()') {
		  message.channel.send("```\n" + 'Your Honor? What kind of evidence is this?' + "\n```")
		  return;
	  }
	let code = message.content.split("$eval ").join(" ")
	try {
	  var evaled = eval(code);
	  if (typeof evaled !== 'string')
		evaled = require('util').inspect(evaled);
	  message.channel.send("```xl\n" + clean(evaled) + "\n```");
	} catch (err) {
	  message.channel.send("`ERROR` ```xl\n" +
		clean(err) +
		"\n```");
	}
	}
}

// !vulgar - Vulgar language toggle
if (input == prefix + "VULGAR") {
    message.delete();

  if (message.channel.type === 'text') {
  if (user.id === message.guild.ownerID) {
    if (database[message.channel.id + '.NSFW'] === 'true') {
        db(message.channel.id + '.NSFW','false')
        sendMessage('This channel now has vulgar language **disabled**. To enable it, type !vulgar.','Toggled NSFW (now disabled)')
      } else {

        db(message.channel.id + '.NSFW','true')
        sendMessage('This channel now has vulgar language **enabled**. To disable it, type !vulgar.','Toggled NSFW (now enabled)')
      }
    } else {
      sendMessage(user + ', only the Judge (server owners) can use that command.','Attempted to toggle NSFW')
      }
    }
}


// !avatar - Avatar changer
if (input.startsWith("!AVATAR ")) {
	if ((message.author.id !== '126516587258707969')) {
		sendMessage('I\'m sorry, Your Honor, but you can\'t do that.')
		return;
	}
	if(message.author.bot) return;
	
	if (message.content.startsWith("!AVATAR")) { // Caps insensitive
		var avchange = message.content.split("!AVATAR ").join("")
	} else if (message.content.startsWith("!avatar")) {
		var avchange = message.content.split("!avatar ").join("")
	}
	if ((avchange !== 'xmas') || (avchange !== 'dev')) { // Keeps bot from crashing while trying to find a nonexistent file
		if ((avchange < 1) || (avchange > 5)) {
			log('Failed at avatar switch attempt.');
			return;
		}
	}
	var avatar = __dirname + '/avatar' + avchange + '.png'
	bot.user.setAvatar(fs.readFileSync(avatar), function(err) {
        if (err) return;
		});
	log('Current avatar: ' + avatar);
}

// !username - Name changer
if (message.content.startsWith("!USERNAME ")) {
	if ((message.author.id !== '126516587258707969')) {
		sendMessage('I\'m sorry, Your Honor, but you can\'t do that.')
		return;
	}
	var str = message.content.substring(10);
	if (str.length > 0)
		bot.user.setUsername(str);
	else sendMessage("You need to enter something for the new name.");
}

// !banlist - Gets list of banned users
if (input == prefix + "BANLIST") {
	if (message.author.id != 126516587258707969) { return }
	log(message.guild.fetchBans().prototype.entries())
}

// FSX Discord Lenny
if (input.startsWith("/LENNY")) { 
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	
	message.delete()
	if ((message.guild.id == '241054207761711104') || (message.guild.id == '420431645041229834')) {
		sendMessage('( ͡° ͜ʖ ͡°)','Sent a lenny')
	}
}
if ((input.startsWith("/DISAPPROVE")) || (input.startsWith("/WTF"))) {
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	
	message.delete()
	if ((message.guild.id == '241054207761711104') || (message.guild.id == '420431645041229834')) {
		sendMessage('ಠ_ಠ','Sent a wtf')
	}
}
if (input.startsWith("/UH")) {
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	
	message.delete()
	if ((message.guild.id == '241054207761711104') || (message.guild.id == '420431645041229834')) {
		sendMessage('Can I get uhhh','Sent uhhh')
	}
}

// Bamboozler
//if ((message.author.id == "196458763438260224") && (message.content.startsWith("."))) {
//	message.channel.send(".")
//

// FSAC Drill
if ((message.author.id != 196458763438260224) && (message.channel.id == 270337074526158851)) {
//	message.delete()
}

//Channel test
if (input == prefix + "MESSAGETEST") {
	bot.channels.get('233030082816376832').send('Message Shit');
}

// restart - Force a crash
if (input.startsWith(prefix + "RESTART")) {
	if (message.author.id != '126516587258707969') return;
	let botStatus = {} 
	botStatus.status = 'invisible'
	bot.user.setPresence(botStatus).catch(err => {log(err)}); 
	sendMessage("Restarting...");
	throw "===== RESTARTING =====";
}
});

// Welcome message
bot.on('guildMemberAdd', (member) => {/*
	if (member.guild.id == 228328763505639426) {
		return;
	}
	var files = {}
	files.files = ['https://i.gyazo.com/81233f5fb253f4af969270b634f42ffa.png']
	if (member.guild.defaultChannel) {
		member.guild.defaultChannel.send(files)
		member.guild.defaultChannel.send('You are now in the courthouse of ' + member.guild.name + ', ' + member + '!')
	}
	//log('Welcomed @' + member.user.username + ' to ' + member.guild.name)*/
});

if (!config.devMode) {
    bot.login(auth);
} else {
    bot.login(authDev);
}

const dbl = new DBL(config.dblKey,bot);
