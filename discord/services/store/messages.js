const _json = require('./jsonHandler');

exports.newMessageTermin = newMessageTermin;
exports.getMessage = getMessage;
exports.deleteMessage = deleteMessage;
exports.getAll = getAll;

function newMessageTermin(messageId, channelId, termin, session, raidName) {
    let messages = _json.read('messages');
    const newReaction = { messageId, channelId, termin, session, raidName, type: "termin" };
    messages.push(newReaction);
    _json.write('messages', messages);
}

function getMessage(messageId) {
    const messages = _json.read('messages');
    const foundMessage = messages.find(c => c.messageId === messageId);
    if (foundMessage) return foundMessage;
}

function getAll() {
    return _json.read('messages');
}

function deleteMessage(messageId) {
    const messages = _json.read('messages');
    const filteredMessages = messages.filter(c => c.messageId !== messageId);
    _json.write('messages', filteredMessages);
}