const _termine = require('../services/endpoints/termine');
const _aufstellungen = require('../services/endpoints/aufstellungen');
const _embeds = require('../services/util/embedProvider');
const _icons = require('../services/icons');
const _sessions = require('../services/store/sessions');
const _reactions = require('../services/store/messages');

exports.run = async (client, message, args) => {
    if (!message.raid) {
        message.channel.send('Für diesen Channel wurde kein Raid verlinkt.');
        return;
    }
    const pickedTermin = args[0];
    const pickedAufstellung = args[1];

    const termine = await _termine.getTermine(message.auth, message.raid.id);
    if (termine.length === 0) {
        message.channel.send('Es gibt keine kommenden Termine oder dir fehlt die Berechtigung, diese anzuzeigen.');
    } else {
        if (pickedTermin && pickedTermin <= termine.length) {
            const termin = termine[pickedTermin - 1];
            const aufstellungen = await _aufstellungen.getAufstellungen(message.auth, termin.id);
            if (pickedAufstellung && pickedAufstellung <= aufstellungen.length) {
                /*
                    Embed: 1 Aufstellung
                 */
                const aufstellung = aufstellungen[pickedAufstellung - 1];
                const elements = await _aufstellungen.getElements(message.auth, aufstellung.id);
                let aufstellungString = '';
                const empty = client.emojis.find(emoji => emoji.name === 'empty');
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const clss = client.emojis.find(emoji => emoji.name === element.class.toLowerCase());
                    const role = client.emojis.find(emoji => emoji.name === element.role.toLowerCase() + '_');
                    aufstellungString += `${clss? clss : empty} ${role? role: empty} - ${element.name}\n`
                }
                let embed = _embeds.defaultEmbed().setTitle(`${message.raid.name} - Aufstellung`)
                    .addField('Datum', termin.date)
                    .addField('Uhrzeit', termin.time)
                    .addField('Boss', `(${pickedAufstellung}) ${aufstellung.name}`)
                    .addField('Aufstellung', aufstellungString)
                    .setThumbnail(_icons.encIcon(aufstellung.abbr));
                message.channel.send(embed);
            } else {
                /*
                    Embed: 1 Termin
                 */
                const anmeldungen = await _termine.getAnmeldungen(message.auth, termin.id);
                const emojiYes = client.emojis.find(emoji => emoji.name === 'yes');
                const emojiMaybe = client.emojis.find(emoji => emoji.name === 'maybe');
                const emojiNo = client.emojis.find(emoji => emoji.name === 'no');
                const emojis = [emojiYes, emojiMaybe, emojiNo];
                const embed = _embeds.terminEmbed(client, message.raid.name, termin, aufstellungen, anmeldungen);
                message.channel.send(embed)
                    .then(msg => msg.react(emojiYes))
                    .then(r => r.message.react(emojiMaybe))
                    .then(r => r.message.react(emojiNo))
                    .then(r => {
                        _reactions.newMessageTermin(r.message.id, r.message.channel.id, termin, message.auth, message.raid.name);
                    });


            }
        } else {
            /*
                Embed: Alle Termine
             */
            let embed = _embeds.defaultEmbed().setTitle(`${message.raid.name} - Alle Termine`);
            for (let i = 0; i < termine.length; i++) {
                const termin = termine[i];
                embed = embed.addField(`(${i + 1}) ${termin.date}`, termin.time);
            }
            message.channel.send(embed);
        }
    }
};

exports.help = {
    usage: '!orga termine <termin> <aufstellung>',
    desc: 'Zeigt Termine und Aufstellungen an.'
};
