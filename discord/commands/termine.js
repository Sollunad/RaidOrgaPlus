const _termine = require('../services/endpoints/termine');
const _aufstellungen = require('../services/endpoints/aufstellungen');
const _embeds = require('../services/util/embedProvider');
const _icons = require('../services/icons');
const _sessions = require('../services/store/sessions');

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
                let allBosses = aufstellungen.map((a, index) => `(${index + 1}) ${a.name}`).join('\n');
                if (allBosses === '') allBosses = 'Keine';
                const anmeldungen = await _termine.getAnmeldungen(message.auth, termin.id);
                const emojiYes = client.emojis.find(emoji => emoji.name === 'yes');
                const emojiMaybe = client.emojis.find(emoji => emoji.name === 'maybe');
                const emojiNo = client.emojis.find(emoji => emoji.name === 'no');
                const emojis = [emojiYes, emojiMaybe, emojiNo];
                let anmeldungenString = anmeldungen.filter(a => a.type < 3).map(a => `${emojis[a.type]} ${a.name}`).join('\n');
                if (anmeldungenString === '') anmeldungenString = 'Keine';
                let embed = _embeds.defaultEmbed().setTitle(`${message.raid.name} - Kommender Termin`)
                    .addField('Datum', termin.date)
                    .addField('Uhrzeit', termin.time)
                    .addField('Geplante Bosse', allBosses)
                    .addField('Anmeldungen', anmeldungenString);
                message.channel.send(embed)
                    .then(msg => msg.react(emojiYes))
                    .then(r => r.message.react(emojiMaybe))
                    .then(r => r.message.react(emojiNo))
                    .then(r => {
                        handleReactions(r, termin, emojis, message.raid.name);
                        const timer = setInterval(async function() {
                            await resendEmbed(r.message, message.auth, termin, emojis, message.raid.name);
                            if (isTerminInPast(termin)) {
                                clearInterval(timer);
                            }
                        }, 1000 * 60 * 5);
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

function handleReactions(r, termin, emojis, raidName) {
    const collector = r.message.createReactionCollector(reactionFilter);
    collector.on('collect', async (r) => {
        const user = r.users.filter(user => !user.bot).first();
        const session = _sessions.getSession(user.id);
        if (isTerminInPast(termin)) {
            r.message.channel.send(`${user} Dieser Termin liegt in der Vergangenheit!`);
        } else if (session === 'Keine Session' || session === 'Abgelaufen') {
            r.message.channel.send(`${user} Bitte logge dich zunächst über RaidOrga+ ein: https://orga.sollunad.de/#/einstellungen`);
        } else {
            const type = getAnmeldungType(r.emoji.name);
            await _termine.putAnmeldung(session, termin.id, type);
            await resendEmbed(r.message, session, termin, emojis, raidName);
            const typeText = ['angemeldet', 'vielleicht da', 'abgemeldet'];
            r.message.channel.send(`${user} Du bist nun ${typeText[type]} ${r.emoji}`);
        }
        r.remove(user).catch(console.log);
    });
}

function reactionFilter(reaction, user) {
    const reactionEmojiNames = ['yes', 'maybe', 'no'];
    return reactionEmojiNames.includes(reaction.emoji.name) && !user.bot;
}

function isTerminInPast(termin) {
    const dateArray = termin.date.slice(4).split('.');
    const timeArray = termin.time.split(':');
    const dateObject = {year: dateArray[2], month: dateArray[1] - 1, day: dateArray[0], hour: timeArray[0], minute: timeArray[1]};
    const date = new Date(dateObject.year, dateObject.month, dateObject.day, dateObject.hour, dateObject.minute);
    const now = new Date();
    return date < now;
}

async function resendEmbed(message, session, termin, emojis, raidName) {
    const aufstellungen = await _aufstellungen.getAufstellungen(session, termin.id);
    let allBosses = aufstellungen.map((a, index) => `(${index + 1}) ${a.name}`).join('\n');
    if (allBosses === '') allBosses = 'Keine';
    const anmeldungen = await _termine.getAnmeldungen(session, termin.id);
    let anmeldungenString = anmeldungen.filter(a => a.type < 3).map(a => `${emojis[a.type]} ${a.name}`).join('\n');
    if (anmeldungenString === '') anmeldungenString = 'Keine';
    let embed = _embeds.defaultEmbed().setTitle(`${raidName} - Kommender Termin`)
        .addField('Datum', termin.date)
        .addField('Uhrzeit', termin.time)
        .addField('Geplante Bosse', allBosses)
        .addField('Anmeldungen', anmeldungenString);
    message.edit(embed);
}

function getAnmeldungType(emoji) {
    switch (emoji) {
        case 'yes':
            return 0;
        case 'maybe':
            return 1;
        case 'no':
            return 2;
        default:
            return null;
    }
}

exports.help = {
    usage: '!orga termine <termin> <aufstellung>',
    desc: 'Zeigt Termine und Aufstellungen an.'
};
