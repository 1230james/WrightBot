// Judge / RNG Verdict
"use strict";

const log = require(__dirname + "/../util/Log.js");

// ============================================================================

module.exports = {
    command: "judge",
    hasArgs: true,
    func: function(message) {
        let str = "**";
        let verdict = (Math.random() < .5 && "guilty") || "not guilty";
        
        if (message.channel.type != "dm" && message.mentions.users.size == 1) {
            let mentionedUser = message.mentions.members.first();
            str += (mentionedUser.nickname || mentionedUser.user.username)
                + "** is **";
        } else {
            verdict = verdict.charAt(0).toUpperCase() + verdict.slice(1);
        }
        
        str += verdict + "!**";
        message.channel.send(str);
        log(message, "Declared a " + verdict + " verdict");
    }
}
