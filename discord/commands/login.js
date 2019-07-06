const Discord = require("discord.js");
const _users = require('../services/endpoints/users');
const _sessions = require('../services/sessions.js');

exports.run = async (client, message, args) => {
    const key = args[0];
    if (key) {
        const response = await _sessions.login(message.author.id, key);
        message.channel.send('Du bist jetzt eingeloggt!');
    }
    message.delete();
};

exports.help = {
    usage: '!orga login [Einmalschlüssel]',
    desc: 'Verknüpft RO+-Account mit Discord-Account. Das Einmalpasswort kann in den Einstellungen von RO+ generiert werden.'
};
