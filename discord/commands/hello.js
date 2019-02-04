const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.channel.send('Hello World!');
};

exports.help = {
    usage: 'Raid Hello',
    desc: 'Hello World'
};
