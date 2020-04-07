// Auth url
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js");

// ============================================================================

module.exports = {
    command: "invite",
    hasArgs: false,
    func: function(message) {
        message.channel.send(`__**Auth URL**__
<https://discordapp.com/oauth2/authorize?&client_id=232749520423878658&scope=bot&permissions=0>`);
        log(message, "Sent auth url");
    }
}