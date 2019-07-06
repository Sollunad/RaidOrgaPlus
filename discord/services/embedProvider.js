const Discord = require("discord.js");
const _icons = require('./icons');

exports.defaultEmbed = defaultEmbed;

function defaultEmbed() {
    console.log( _icons.miscIcon('raid'));
    return new Discord.RichEmbed()
        .setColor('#F55535')
        .setTimestamp()
        .setFooter('RaidOrga+', _icons.miscIcon('raid'))
}