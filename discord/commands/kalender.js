const _embeds = require('../services/util/embedProvider');
const _messages = require('../services/store/messages');

exports.run = async (client, message, args) => {
    message.channel.send(await _embeds.kalenderEmbed())
        .then(m => _messages.newMessageKalender(m.id, m.channel.id));

};

exports.help = {
    usage: '!orga kalender',
    desc: 'Zeigt die Termine der kommenden sieben Tage an. Updated automatisch alle zehn Minuten.'
};