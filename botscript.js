// WrightBot by James "1230james" Hyun
"use strict";

// Libraries & Important Variables
const config = require("./config.json");
const fs = require("fs");

const Discord = require("discord.js");
const bot = new Discord.Client();
bot.cmds = new Map();
bot.util = new Map();

// Load in all the commands
const commandFiles = fs.readdirSync(__dirname + "/scripts/cmds")
    .filter(file => file.endsWith(".js"));
for (let file of commandFiles) {
    let cmd = require(__dirname + "/scripts/cmds/" + file);
    bot.cmds.set(cmd.command, cmd);
    
    if (cmd.aliases != null) { // Type safety? What's that? :^)
        for (let alias of cmd.aliases) { // I love you pass by reference
            bot.cmds.set(alias, bot.cmds.get(cmd.command)); 
        }
    }
}

// Load in utilities
const utilityFiles = fs.readdirSync(__dirname + "/scripts/util")
    .filter(file => file.endsWith(".js"));
for (let file of utilityFiles) {
    let util = require(__dirname + "/scripts/util/" + file);
    bot.util.set(util.name, util);
}

/*
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
*/

// =============================================================================

// Stuff to run once bot is initially online
bot.on("ready", () => {
    // Set status
    bot.user.setPresence({
        status: "online",
        activity: {
            type: "WATCHING",
            name: bot.guilds.cache.size + " trials | " + "w!help" // defaultPrefix + "help"
        }
    }).catch(err => { console.log(err) });
    
    // Set avatar
        // TODO
    
    // Print to console
    console.log(`Discord is ready!\nOnline in ${bot.channels.cache.size} channel(s) and ${bot.guilds.cache.size} server(s).`);
});

// =============================================================================

// Stuff to run whenever a message is sent
bot.on("message", function(message) {
    // Prevent people who arent supposed to use the bot from using it
    if (message.author.bot) return;
    if (config.devMode && message.author.id != "126516587258707969") return;
    
    // Passive stuff
    /*
    if (!(database[message.guild.id])) {
        createDatabaseInfo(message.guild);
        DBFunc.writeData(__dirname + "/database.json", JSON.stringify(database,null,4));
    }
    */
    
    // One-time vars
    let prefix = "w!" //database[message.guild.id].prefix;
    
    // Command processing
    processCommand(prefix, message);
});

function processCommand(prefix, message) {
    let input = message.content.toLowerCase();
    bot.cmds.forEach(function(cmdObj, cmd) {
        // Match command
        let prefixAndCmd = prefix + cmd;
        if (input.substring(0, prefixAndCmd.length) == prefixAndCmd) {
            if (canRunCommand(prefixAndCmd, input, cmdObj)) {
                cmdObj.func(message);
            }
        }
    });
}

function canRunCommand(prefixAndCmd, input, cmdObj) {
    return argsCheck(prefixAndCmd, input, cmdObj);
    // maybe I can put more stuff here later idk
}

function argsCheck(prefixAndCmd, input, cmdObj) {
    if (cmdObj.hasArgs) { // If this command is expecting arguments
        if (input.length == prefixAndCmd.length) { 
            return true; // If the message only contains the command, run command
        }
        if (input.substring(0, prefixAndCmd.length + 1) == prefixAndCmd + " ") {
            return true; // If whitespace separates the command and the first argument, run command
        }
        return false;
    } else { // If this comand is NOT expecting args
        return (input.length == prefixAndCmd.length); // run command iff input matches the command
    }
}

// =============================================================================

// Login to Discord
if (config.devMode) bot.login(config.authDev);
else bot.login(config.auth);
