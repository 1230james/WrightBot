// Accuse
"use strict";

// Libraries
const log = require(__dirname + "/../util/Log.js").func;

// ============================================================================

var verbs, adjectives, nouns;

module.exports = {
    command: "accuse",
    hasArgs: true,
    func: function(message) {
        // Get the person being accused
        let accused;
        if (message.channel.type != "dm" && message.mentions.users.size == 1) {
            accused = message.mentions.members.first();
            accused = "**" +
                (accused.nickname || accused.user.username) + "**";
        } else {
            accused = "the witness in question";
        }
        
        let verb      = verbs[Math.floor(Math.random() * verbs.length)];
        let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        let noun      = nouns[Math.floor(Math.random() * nouns.length)];
        
        message.channel.send('The defense contends that ' + accused + ' '
            + verb + ' their ' + adjective + ' ' + noun + '!');
        log(message, "Accused " + accused);
    }
}

// ============================================================================

// Maybe I should put these in a JSON file?
// I'll do it Soon™️
verbs = [
    'murdered', 'killed', 'assaulted', 'robbed', 'hit', 'lied to', 'ran over', 'stabbed', 'bludgeoned', 'shanked', 'screeched at', 'shrieked at'
]
    
adjectives = [
    'hairless', 'metal', 'wild', 'domesticated', 'abnormal', 'medicated', 'disrespectful', 'impressive', 'out of control', 'internet-worthy', 'hilarious', 'very tactful', 'bearded', 'duck-like', 'violent', 'painfully honest', 'filthy', 'fighting', 'bonkers', 'harsh', 'frisky', 'greedy', 'crawly', 'insane', 'hideous', 'ungodly', 'hateful', 'twisted', 'useless', 'yapping', 'magical', 'indecent', 'godawful', 'arrogant', 'confused', 'flirting', 'high-end', 'insecure', 'maniacal', 'sickened', 'stubborn', 'tripping', 'vengeful', 'sinister', 'costumed', 'cowardly', 'haunting', 'startled', 'demanding', 'shivering', 'offensive', 'nighttime', 'startling', 'disgusting', 'slap happy', 'disturbing', 'flickering', 'rebellious', 'impertinent', 'bull-headed', 'hyperactive', 'infuriating', 'outnumbered', 'pea-brained', 'territorial', 'underhanded', 'zombie like', 'mischievous', 'at-the-ready', 'freeloading', 'house-broken', 'up-to-no-good', 'cruel-hearted', 'misunderstood', 'narrow-minded', 'self-absorbed', 'fiercely-loyal', 'out-of-control', 'fear-inspiring', 'hospitalized'
]

nouns = [
    'aunt',	'baby', 'brother', 'boyfriend', 'bride', 'brother', 'cousin', 'dad', 'daughter', 'father', 'father-in-law', 'lover', 'fiancée', 'friend', 'boyfriend', 'girlfriend', 'godchild', 'godfather', 'godmother', 'grandchild', 'grandchildren', 'granddaughter', 'grandfather', 'granddad', 'grandpa', 'grandmother', 'grandma', 'grandson', 'great-grandparents', 'groom', 'half-brother', 'husband', 'mother', 'mother-in-law', 'mum', 'mummy', 'mom', 'nephew', 'niece', 'parent', 'parents', 'sister', 'son', 'stepbrother', 'twin', 'twin-brother', 'uncle', 'wife', 'pet bird', 'cat', 'cow', 'dog', 'goat', 'pig', 'pet snake'
]