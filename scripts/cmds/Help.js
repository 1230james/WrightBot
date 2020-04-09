// Help/Commands list
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js");

// ============================================================================

module.exports = {
    command: "help",
    aliases: ["cmds", "commands"],
    hasArgs: false,
    func: function(message) {
        let cmds = `__**WrightBot**__ by 1230james

__**COMMANDS**__
1. !help - Displays all commands and bot-related info in a direct message.
2. !invite - Displays auth link so you can invite the bot to your server.
~~3. !vulgar - Toggles the usage of vulgar words for sentence generators.~~ *Temporarily removed; all servers have vulgar DISABLED.*
4. !judge [player mention/statement] - Judges someone or something Guilty or Not Guilty.
5. !guiltynotguilty - Displays a certain GIF. Try it and see.
6. !yell <phrase> - Displays corresponding speech bubble GIF or PNG. Add no phrase for a list of valid phrases.
7. !gavel <1/3> - Pounds a gavel the specified number of times.
8. !accuse [@mention]- Creates a random accusation statement against the mentioned user, or an ambiguous witness.

__**TO BE IMPLEMENTED**__
*These commands are not done yet, and they do not do anything as of right now.*
9. !investigate - Creates a random statement regarding found evidence.
10. !crime [@mention] - Creates a random statement a crime the mentioned user committed, or an ambiguous witness.
11. !emote <emote> - Displays corresponding Phoenix sprite. Add no emote for a list of valid emotes.
`

        let invite = `__**OFFICIAL SUPPORT SERVER**__
Need some help? Come on down to JSJ; we have a section reserved for anything related to WrightBot!
https://discord.gg/MvEHdmc`

        if (message.channel.type != 'dm') {
            message.channel.send("<@" + message.author.id + ">, I sent a copy of the Court Record to you in a DM.");
            // For some reason message.author doesn't parse into a mention? I think it's a bug based on the discord.js docs
        }
        message.author.send(cmds);
        message.author.send(invite);
        log(message, "Sent commands to " + message.author.username);
    }
}
