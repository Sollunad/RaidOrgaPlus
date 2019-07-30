const Discord = require("discord.js/typings");
const _icons = require('../icons');

exports.defaultEmbed = defaultEmbed;

function defaultEmbed() {
    return new Discord.RichEmbed()
        .setColor('#F55535')
        .setTimestamp()
        .setFooter('RaidOrga+', _icons.miscIcon('raid'))
}