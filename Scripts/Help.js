// Help

// Libraries
const DiscFunc = require(__dirname + "/../../CommonScripts/DiscFunctions.js");
const DBFunc = require(__dirname + "/../../CommonScripts/DatabaseFunctions.js");

// ============================================================================

exports.main = function(message) {
    let CMDS = `__**WrightBot v18**__
• bing bong we still working on it

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

    let EULA = `__**EULA**__
James, the bot author, has, to the best of his ability, complied with the Discord API Terms of Service. Due to the nature of WrightBot's code, **responsibility for ensuring that all users of WrightBot give WrightBot permission to collect any and all "End User Data" (as detailed in the Discord API ToS, found here: https://discordapp.com/developers/docs/legal#2-license-accounts-and-restrictions ) rests on the owners and other administrative figures in which WrightBot is used.** James is not responsible for any breach of the Discord API Terms of Service caused by the negligence of the owners and other administrative figures in servers in which WrightBot is used. By using WrightBot in your server, you accept the EULA outlined here.

__**OFFICIAL SUPPORT SERVER**__
Need some help? Come on down to JSJ; we have a section reserved for anything related to WrightBot, or our other bots PilotBot and The Donald!
https://discord.gg/MvEHdmc`

    if (message.channel.type != 'dm') {
    DiscFunc.sendMessage(message,message.author + ', I sent a copy of the Court Record to you in a DM.', null);
    }
    DiscFunc.sendDM(message,CMDS,'Sent commands');
    DiscFunc.sendDM(message,EULA);
}
