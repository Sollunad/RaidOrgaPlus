const Discord = require("discord.js");
const _icons = require('../icons');

exports.defaultEmbed = defaultEmbed;
exports.terminEmbed = terminEmbed;

function defaultEmbed() {
    return new Discord.RichEmbed()
        .setColor('#F55535')
        .setTimestamp()
        .setFooter('RaidOrga+', _icons.miscIcon('raid'))
}

function terminEmbed(client, raidName, termin, aufstellungen, anmeldungen) {
    const emojis = getAnmeldeEmojis(client);
    let allBosses = aufstellungen.map((a, index) => `(${index + 1}) ${a.name}${a.is_cm? ' CM' : ''}`).join('\n');
    if (allBosses === '') allBosses = 'Keine';
    let anmeldungenString = anmeldungen.filter(a => a.type < 3).map(a => `${emojis[a.type]} ${a.name}`).join('\n');
    if (anmeldungenString === '') anmeldungenString = 'Keine';
    return defaultEmbed().setTitle(`${raidName} - Kommender Termin`)
        .addField('Datum', termin.date)
        .addField('Uhrzeit', termin.time)
        .addField('Geplante Bosse', allBosses)
        .addField('Anmeldungen', anmeldungenString);
}

function getAnmeldeEmojis(client) {
    const emojiYes = client.emojis.find(emoji => emoji.name === 'yes');
    const emojiMaybe = client.emojis.find(emoji => emoji.name === 'maybe');
    const emojiNo = client.emojis.find(emoji => emoji.name === 'no');
    return [emojiYes, emojiMaybe, emojiNo];
}