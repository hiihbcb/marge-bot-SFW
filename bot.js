//Require Bot Dependencies
const Discord = require("discord.js");
global.Client = new Discord.Client();

const config = require('./json_files/auth.json');
Client.login(config.token);

global.ourUsers = require('./json_files/users.json');
global.ourChannels = require('./json_files/channels.json');

//Require observer classes
const Observers = require("./observers")
const events = new Observers.Events();
const messages = new Observers.Messages();

Client.on("ready", () => {
    console.log("I am ready!");
});

Client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

Client.once('disconnect', () => {
    console.log('Disconnect!');
});

Client.on("message", async message => {
    switch (messages.checkPrefix(message)) {
        case "marge" :
            messages.incomming(message);
            break;
        case "seshCreate":
            events.notifyGeneral(message, messages.getCommand(message, seshCreatePrefix));
            break;
        default:
            break;
    };
});

Client.on("voiceStateUpdate", (oldState, newState) => {
    switch (newState.id) {
        case ourUsers.FRIEND1.id :
            events.moveUser(newState);
        default:
            break;
    };
});