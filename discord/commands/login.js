const Discord = require("discord.js");

exports.run = (client, message, args) => {
    //TODO #182
    message.channel.send('Hello World!');
};

exports.help = {
    usage: '!orga login [Einmalpasswort]',
    desc: 'Verknüpft RO+-Account mit Discord-Account. Das Einmalpasswort kann in den Einstellungen von RO+ generiert werden.'
};
