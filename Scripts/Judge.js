// Judge / RNG Verdict

// Libraries
const DiscFunc = require(__dirname + "/../../CommonScripts/DiscFunctions.js");

// ============================================================================

exports.main = function(message,prefix) {
    let str = "";
    let verdict = (Math.random() < .5 && "guilty") || "not guilty";
    if (message.mentions.users.size == 1) {
        let mentionedUser = message.mentions.user.first();
        str += mentionedUser + " is ";
    } else {
        if (!message.contents == prefix + "JUDGE") return;
        verdict = verdict.charAt(0).toUpperCase() + verdict.slice(1);
    }
    str += verdict + "!";
    DiscFunc.sendMessage(message, str, "Declared a " + verdict + " verdict");
}
