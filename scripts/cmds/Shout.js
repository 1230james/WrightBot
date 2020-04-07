// Yell / Shout bubble
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js");

// ============================================================================

const urlMap = new Map();

module.exports = {
    command: "yell",
    aliases: ["shout"],
    hasArgs: true,
    func: function(message) {
        let msg = null;
        
        // Determine which image we're posting
        let input = message.content.toLowerCase();
        let prefix = input.substring(0, input.indexOf("shout"));
        let arg = input.substring(input.indexOf(" ") + 1);
        if (arg.charAt(arg.length - 1) == "!") { // If the last character is an exclamation mark, ignore it
            arg = arg.substring(0, arg.length - 1);
        }
        
        // Post it
        let url = urlMap.get(arg);
        if (url) {
            message.channel.send("",{files: [url]});
            log(message, "Posted shout gif (" + arg + ")");
        } else { // Post the list of valid arguments if an invalid one is passed
            message.channel.send(yellList);
            log(message, "Posted shout list");
        }
    }
}

// ============================================================================

const yellList = `__**YELL COMMANDS**__
1. Objection
2. Hold It
3. Take That
4. Gotcha
5. Eureka
6. Got it
7. Such insolence
8. Hang on
9. That's enough
10. Not so fast
11. Overruled
12. Have a look
13. Silence
14. Satorha or Satora
15. Welcome`

// This is sort of disgusting, BUT it could be way worse                                            because it was :(
urlMap.set("objection", "https://i.gyazo.com/9fc7da3d319a4d3d963db5601c22a15a.gif")
    .set("hold it", "https://i.gyazo.com/7cfdcbfb2fcb04d7116d716fe9771fbf.gif")
    .set("take that", "https://i.gyazo.com/56456d25be455ef1a6ff362f2175a0e6.gif")
    .set("gotcha", "https://i.gyazo.com/4adeee8f0fd9f05ed52c316ee89e9c06.gif")
    .set("eureka", "https://i.gyazo.com/864d32441f3d85da171fe03f4bee07b5.gif")
    .set("such insolence", "https://i.gyazo.com/119d8b982ab25389dc65822b712145aa.png")
    .set("got it", "https://i.gyazo.com/a48671ab942bc0e178ef4869b9431852.png")
    .set("hang on", "https://i.gyazo.com/1348542984fb392e35e58c2e58946e0d.png")
    .set("thats enough", "https://i.gyazo.com/a97f0cc16f1a93546f32cb07175a3706.png")
    .set("that's enough", urlMap.get("thats enough"))
    .set("not so fast", "https://i.gyazo.com/c0b53dac75974784e0f5940e553f45db.png")
    .set("overruled", "https://i.gyazo.com/f8e9719c76baaea9154fc8a17b6cf11c.png")
    .set("have a look", "https://i.gyazo.com/da747fe1cd10f06baafdf5b73a407364.png")
    .set("silence", "https://i.gyazo.com/082a4af57a778d491fd51ad9d1e3ac8f.png")
    .set("satorha", "https://i.gyazo.com/ddb5b98a78eefcbd44fd78590638a8ee.png")
    .set("satora", urlMap.get("satorha"))
    .set("welcome", "https://i.gyazo.com/81233f5fb253f4af969270b634f42ffa.png");