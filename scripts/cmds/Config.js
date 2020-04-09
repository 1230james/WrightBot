// Server configuration command
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js").func;

// ============================================================================

module.exports = {
    command: "config",
    hasArgs: true,
    func: function(message) {
        message.channel.send("This command is still in development; check back later!");
    }
}






/*

// ============================================================================

exports.main = function(message,input,database,client) {
    // Prevent usage outside of servers
    if (message.channel.type != "text") {
        DiscFunc.sendMessage(message,"You can only use this channel in a server.");
        return;
    }
    
    // Prevent usage by non-admins
    let memberPerms = message.channel.memberPermissions(message.member);
    if (!(memberPerms.has("ADMINISTRATOR") || memberPerms.has("MANAGE_GUILD"))) {
        DiscFunc.sendMessage(message,
        "You need the **Manage Server** permission to use this command.");
    }
    
    // Get args
    let args = [];
    let input2 = input.substring(input.indexOf(" ")+1); // input2 = input except without the prefix and command
    if (input != input2) {
    let index = input2.indexOf(" "); // Index of the space
    let arg1 = input2.substring(0,((index>0 && index) || 2000)); // Get the first argument
    switch(arg1) {
        case "PREFIX":
            args[0] = "prefix";
            let arg2 = input2.substring(index+1);
            args[1] = ((arg1 != arg2) && arg2) || "";
            break;
        case "VULGAR":
            args[0] = "vulgar";
            break;
        case "ANNOUNCECHANNEL":
            args[0] = "announcechannel";
            break;
        default:
            args[0] = false;
        }
    } else {
        args[0] = false;
    }
    
    // Process
    let guildPrefix = database[message.guild.id].prefix.toLowerCase();
    switch(args[0]) {
        case false: // No args/invalid arg
            let msg = "```fix\nWrightBot Configuration```"
                + "**Prefix:** " + guildPrefix // No new line character needed for the first line after a code block
                + "\n**Vulgar Text:** " + ((database[message.guild.id].nsfw && "Enabled") || "Disabled")
                + "\n**Announcements Channel:** " + (database[message.guild.id].announceChannel || "None");
            let msg2 = "```css\nConfig Info```"
                + "**__Prefix__** - `" + guildPrefix + "config prefix [prefix]`\nThe "
                    + "prefix WrightBot uses in this server. Provide no argument to"
                    + " view the current prefix. Prefixes are __case in-sensitive__."
                + "\n\n**__Vulgar Text__** - `" + guildPrefix + "config vulgar`\nWhether"
                    + " WrightBot uses more vulgar words in randomly-generated phrases."
                    + " Use command to toggle."
                + "\n\n**__Announcements Channel__** - `" + guildPrefix + "config "
                    + "announcechannel [channel mention]`\nThe channel WrightBot posts "
                    + "announcements from the developer. Provide no argument to view the"
                    + " current channel set."
            DiscFunc.sendMessage(message,msg+"\n\n"+msg2,"Sent config menu");
            break;
        case "prefix": // Changing prefix
            if (args[1] && args[1] != "") {
                database[message.guild.id].prefix = args[1];
                DiscFunc.sendMessage(message,
                    "This server's prefix has been updated in the Court Record."
                        + "\nThe prefix is now `" + args[1] + "`",
                    "Updated prefix to " + args[1]);
            } else {
                DiscFunc.sendMessage(message,"Your Honor, this server's prefix is `" +
                    database[message.guild.id].prefix + "`","Sent prefix");
            }
            break;
        case "vulgar": // Vulgar text 
            database[message.guild.id].nsfw = !(database[message.guild.id].nsfw);
            let acceptText = (database[message.guild.id].nsfw && "accepting") || "declining";
            let enabledText = (database[message.guild.id].nsfw && "enabled") || "disabled";
            DiscFunc.sendMessage(message,
                "Now " + acceptText + " more gruesome cases."
                    + "\nVulgar words for randomly-generated phrases are now **"
                    + enabledText + "**.",
                "Updated prefix to " + args[1]);
            break;
        case "announcechannel": // Announce channel
            let channel = message.mentions.channels.first();
            if (channel) { // If a channel was mentioned
                if (channel.memberPermissions(client.user).has(["SEND_MESSAGES","VIEW_CHANNEL"])) { // If bot can post in listed channel
                    database[message.guild.id].announceChannel = channel;
                    DiscFunc.sendMessage(message,"This server's announcement channel has "
                            + "been updated in the Court Record.\nI will now post developer"
                            + " announcements in " + channel + ".",
                        "Updated announce channel to " + channel.name
                    );
                } else { // If bot cant post in listed channel
                DiscFunc.sendMessage(message,
                    "Your Honor, that channel cannot be the announcement channel because"
                        + " I do not have the **Send Messages** and/or **Read Messages**"
                        + " permission(s) there!",
                    "Tried to update announce channel but failed"
                );
                }
            } else { // If no channel was mentioned
                channel = database[message.guild.id].announceChannel || "not set.\n"
                    + "Please set one by typing `" + guildPrefix + "announcechannel "
                    + "<channel mention>`!";
                DiscFunc.sendMessage(message,
                    "Your Honor, this server's announcement channel is " + channel,
                    "Sent announce channel"
                );
            }
        default: // lol nothing
    }
    return database
}
*/