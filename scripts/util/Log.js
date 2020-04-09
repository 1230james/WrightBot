// Console log function

module.exports = {
    name: "log",
    /** Prints a message into the console similar to the following:
      * [Username @ Mon, 06 Apr 2020 22:32:59 GMT]: logMsg
      * @param messge A discord.js Message object.
      * @param logMsg The message to be printed into the console. */
    func: function(message, logMsg) {
        console.log("[" +
            message.author.username + " @ " +
            (new Date()).toUTCString() + "]: " + logMsg
        );
    }
}