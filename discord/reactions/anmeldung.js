exports.anmeldungHandler = anmeldungHandler;
const _termine = require('../services/endpoints/termine');
const _sessions = require('../services/store/sessions');
const _refresher = require('../refresher/main');
const _util = require('../services/util/util');

async function anmeldungHandler(client, messageInfo, reaction, user) {
    const session = _sessions.getSession(user.id);
    const termin = messageInfo.termin;
    if (_util.isTerminInPast(termin)) {
        reaction.message.channel.send(`${user} Dieser Termin liegt in der Vergangenheit!`)
            .then(msg => startDeleteReplyTimer(msg));
    } else if (session === 'Keine Session' || session === 'Abgelaufen') {
        reaction.message.channel.send(`${user} Bitte logge dich zunächst über RaidOrga+ ein: https://orga.sollunad.de/#/einstellungen`)
            .then(msg => startDeleteReplyTimer(msg));
    } else {
        const type = getAnmeldungType(reaction.emoji.name);
        await _termine.putAnmeldung(session, termin.id, type);
        _refresher.refreshMessage(client, messageInfo.messageId);
        const typeText = ['angemeldet', 'vielleicht da', 'abgemeldet'];
        reaction.message.channel.send(`${user} Du bist nun ${typeText[type]} ${reaction.emoji}`)
            .then(msg => startDeleteReplyTimer(msg));
    }
}

function startDeleteReplyTimer(reply) {
    const waitTime = 1000 * 10;
    reply.delete(waitTime);
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