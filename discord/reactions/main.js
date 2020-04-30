const _messages = require('../services/store/messages');
const { anmeldungHandler } = require('./anmeldung');

exports.reactionHandler = reactionHandler;

async function reactionHandler(client, eventData) {
    if (eventData.member.user.bot) return;

    const messageId = eventData.message_id;
    const userId = eventData.user_id;
    const messageInfo = _messages.getMessage(messageId);

    if (messageInfo) {
        const channel = client.channels.get(eventData.channel_id);
        const user = client.users.find(user => user.id === userId);
        channel.fetchMessage(messageId).then(async (messageObject) => {
            const emojiName = eventData.emoji.id? `${eventData.emoji.name}:${eventData.emoji.id}` : eventData.emoji.name;
            const reaction = messageObject.reactions.get(emojiName);

            if (messageInfo.type === "termin") {
                await anmeldungHandler(client, messageInfo, reaction, user);
            }

            await reaction.remove(user);
        });
    }
}