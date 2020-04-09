// Guilty Not Guilty
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js").func;

// ============================================================================

const gifURL = "https://i.gyazo.com/0e0e438cf7041606688021277fa1c2a1.gif"

module.exports = {
    command: "guiltynotguilty",
    hasArgs: false,
    func: function(message) {
        message.channel.send("",{files: [gifURL]});
        log(message, "Sent guilty/not guilty GIF");
    }
}