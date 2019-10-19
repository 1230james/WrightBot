var forever = require('forever-monitor'); // This thing restarts a given script any time it crashes; no more bots going down at school!
var readline = require('readline'); // Used for console input
var input = readline.createInterface({ 
	input: process.stdin,
	output: process.stdout
});

var bot = new (forever.Monitor)('botscript.js', { // https://github.com/foreverjs/forever-monitor/blob/master/README.md
	max: 99999, // Max iterations before restarts stop.
	silent: false, // Whether to silence the output of THIS script (not the child script, where the child script is the bot script in this case.)
	args: [], // Arguments to pass onto the child script; useless for this particular scenario but I think it's needed for syntax or whatever
	killTree: true // Not sure if I need this; better safe than sorry
});

bot.on('start', function() { // Allows bot to be shut down at any time from the console
	input.question("=== TYPE ANYTHING TO KILL THE BOT===\n\n\n", (answer) => { 
		if (answer) { // I would use a certain keyword but idk how to keep the input open all the time in case I put in "klil" instead of "kill" on accident.
			bot.max = 0;
			bot.kill(); // .kill() is a method from forever-monitor that kills the given process.
		}
		input.close();
	})
});

bot.on('exit', function() {
	console.log("Bot has been killed.\nPlease restart it manually.");
});

bot.start();