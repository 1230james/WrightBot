// WrightBot

// Important Variables
const defaultPrefix = "!";

// Libraries
var Discord = require("discord.js");
var bot = new Discord.Client();
var moment = require("moment");
var config = require("./config.json");
var log = (msg) => { // Console timestamp
	console.log(`[WrightBot ${moment().format("MM-DD-YYYY HH:mm:ss")}] ${msg}`);
};

// My Scripts
const DiscFunc = require(__dirname + "/../!CommonScripts/DiscFunctions.js");
const DBFunc = require(__dirname + "/../!CommonScripts/DatabaseFunctions.js");

const Help = require(__dirname + "/Scripts/Help.js");
const ConfigScript = require(__dirname + "/Scripts/Config.js");

// Files
var database = require(__dirname + "/database.json");
var databaseBackup = require(__dirname + "/database-backup.json");

// Misc. Functions
function createDatabaseInfo(guild) { // Create new guild info in the database
	let guildInfo = {
		nsfw: false,
		prefix: defaultPrefix,
		announceChannel: null
	}
	database[guild.id] = guildInfo;
}

function setStatus() {
	var botStatus = {}; // Used for setting the bot's status and online/offline state, etc.
	botStatus.status = 'online';
	botStatus.game = {};
	botStatus.game.name = bot.guilds.size + " trials | " + defaultPrefix + "help";
	botStatus.game.type = "WATCHING";
	bot.user.setPresence(botStatus).catch(log); //Set status and send a message to the console once the bot is ready
}

// ============================================================================

// Stuff to run once bot is initially online
var avlist = [ // List of file paths to avatar
	'avatar1.png',
	'avatar2.png',
	'avatar3.png',
	"avatar4.png",
	"avatar5.png"
]
bot.on('ready', () => {
	setStatus();
	log(`Online in ${bot.channels.size} courtroom(s) and ${bot.guilds.size} courthouse(s).`);
	// Pick avatar
	if (config.devMode) return; 
	var avatar = avlist[Math.floor(Math.random() * avlist.length)] // Pick a random one from the list
	// Christmas avatar
	var month = `${moment().format("MM")}`
	if (month == "12") { avatar = "avatarxmas.png" } // Christmas avatar!
	// Set avatar
	bot.user.setAvatar(DBFunc.read(__dirname + "/Avatars/" + avatar)).catch(err => {});
	log('Current avatar: ' + avatar);
});

// Stuff to run whenever a message is sent
bot.on("message", function(message) {
	// Prevent people who arent supposed to use the bot from using it
	if (message.author.bot) return;
	if (config.devMode && message.author.id != "126516587258707969") return;
	
	// Passive stuff
	if (!(database[message.guild.id])) {
		createDatabaseInfo(message.guild);
		DBFunc.writeData(__dirname + "/database.json", JSON.stringify(database,null,4));
	}
	
	// One-time vars
	let prefix = database[message.guild.id].prefix;
	let input = message.content.toUpperCase();
	
	// ========================================================================

	// help or cmds - Shows commands and info
	if ((input == defaultPrefix + "HELP") || (input == defaultPrefix + "CMDS") || (input == prefix + "HELP") || (input == prefix + "CMDS")) {
		Help.main(message);
	}
	
	// config - Let server admins configure the bot
	if (input.startsWith(prefix + "CONFIG")) {
		database = ConfigScript.main(message,input,database,bot);
		DBFunc.writeData(__dirname + "/database.json", JSON.stringify(database,null,4));
	}
	
});

// Login to Discord
if (config.devMode) bot.login(config.authDev);
else bot.login(config.auth);