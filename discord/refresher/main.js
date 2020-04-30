const _messages = require('../services/store/messages');
const _termine = require('../services/endpoints/termine');
const _aufstellungen = require('../services/endpoints/aufstellungen');
const _embeds = require('../services/util/embedProvider');
const _util = require('../services/util/util');

exports.refreshMessage = refreshMessage;
exports.startTimer = startTimer;

function startTimer(client) {
    setInterval(async function() {
        refreshAll(client);
    }, 1000 * 10);
}

function refreshAll(client) {
    console.log('refreshAll');
    const messages = _messages.getAll();
    for (const message of messages) {
        refreshMessage(client, message.messageId);
    }
}

function refreshMessage(client, messageId) {
    const messageInfo = _messages.getMessage(messageId);
    const channel = client.channels.get(messageInfo.channelId);

    channel.fetchMessage(messageId).then(async (messageObject) => {
        if (messageInfo.type === "termin") {
            if (_util.isTerminInPast(messageInfo.termin)) {
                _messages.deleteMessage(messageId);
            } else {
                await resendTerminEmbed(client, messageObject, messageInfo.session, messageInfo.termin, messageInfo.raidName);
            }
        }
    });
}

async function resendTerminEmbed(client, message, session, termin, raidName) {
    const aufstellungen = await _aufstellungen.getAufstellungen(session, termin.id);
    const anmeldungen = await _termine.getAnmeldungen(session, termin.id);
    const embed = _embeds.terminEmbed(client, raidName, termin, aufstellungen, anmeldungen);
    message.edit(embed);
}