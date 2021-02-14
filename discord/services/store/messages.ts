import * as _json from "./jsonHandler";

export function newMessageTermin(messageId, channelId, termin, session, raidName) {
    let messages = _json.read('messages');
    const newMessage = { messageId, channelId, termin, session, raidName, type: "termin" };
    messages.push(newMessage);
    _json.write('messages', messages);
}

export function newMessageKalender(messageId, channelId) {
    let messages = _json.read('messages');
    const newMessage = { messageId, channelId, type: "kalender" };
    messages.push(newMessage);
    _json.write('messages', messages);
}

export function getMessage(messageId) {
    const messages = _json.read('messages');
    const foundMessage = messages.find(c => c.messageId === messageId);
    if (foundMessage) return foundMessage;
}

export function getAll() {
    return _json.read('messages');
}

export function deleteMessage(messageId) {
    const messages = _json.read('messages');
    const filteredMessages = messages.filter(c => c.messageId !== messageId);
    _json.write('messages', filteredMessages);
}