// Gavel GIF
"use strict";

const log = require(__dirname + "/../util/Log.js");

// ============================================================================

// Variables
const gavel1Url = "https://i.gyazo.com/b24a2e3d76a9a77e94a80b02796c7ed3.gif";
const gavel3Url = "https://i.gyazo.com/a79a846c1099d7cdfd159c0cc56e8efa.gif";

module.exports = {
    command: "gavel",
    hasArgs: true,
    func: function(message) {
        let pounds = null;
        
        // Determine the value of pounds
        let input = message.content.toLowerCase();
        let arg = input.substring(input.indexOf(" "));
        switch(arg) {
            case "1":
                pounds = 1;
                break;
            case "3":
                pounds = 3;
                break;
            default:
                // do nothing lmao
        }
        
        // Respond
        switch(pounds) {
            case 1:
                message.channel.send(gavel1Url);
                log(message, "Pounded gavel once");
                break;
            case 3:
                message.channel.send(gavel3Url);
                log(message, "Pounded gavel thrice");
                break;
            default:
                message.channel.send("Invalid argument; enter `" + prefix +
                    "gavel 1` or `" + prefix + "gavel 3`");
                log(message, "Failed to pound gavel");
        }
    }
}