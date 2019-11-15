// Gavel GIF

// Libraries
const DiscFunc = require(__dirname + "/../../CommonScripts/DiscFunctions.js");

// Variables
const gavel1Url = "https://i.gyazo.com/b24a2e3d76a9a77e94a80b02796c7ed3.gif";
const gavel3Url = "https://i.gyazo.com/a79a846c1099d7cdfd159c0cc56e8efa.gif";

// ============================================================================

exports.main = function(message,pounds,prefix) {
    switch(pounds) {
        case 1:
            DiscFunc.sendFile(message, gavel1Url, 'Pounded gavel once');
            break;
        case 3:
            DiscFunc.sendFile(message, gavel3Url, 'Pounded gavel thrice');
            break;
        default:
            DiscFunc.sendMessage(message,
            "Invalid argument; enter `" + prefix + "gavel 1` or `" + prefix +
                "gavel 3`",
            "Failed to pound gavel");
    }
}
