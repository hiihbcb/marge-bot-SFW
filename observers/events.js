class Events {
    notifyGeneral(message, command) {
        var createMessage = "@everyone" + " New Event! Join or Die: " + command;
        var general = Client.channels.cache.get(ourChannels.general.id);
        general.send(createMessage);
    }

    moveUser(newState) {
        if (newState.selfDeaf == true && newState.channelID != ourChannels.afk.id) {
            var member = newState.guild.members.cache.get(ourUsers.FRIEND1.id);
            member.voice.setChannel(ourChannels.afk.id);
        }
    }
}

module.exports = Events;