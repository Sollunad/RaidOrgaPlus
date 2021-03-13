import * as _messages from "../services/store/messages";
import { anmeldungHandler } from "./anmeldung";
import { DiscordClient } from "../models/DiscordClient";

export { reactionHandler };

async function reactionHandler(client: DiscordClient, eventData) {
    if (eventData.member.user.bot) return;

    const messageId = eventData.message_id;
    const userId = eventData.user_id;
    const messageInfo = _messages.getMessage(messageId);

    if (messageInfo) {
        const channel = client.channels.cache.get(eventData.channel_id);
        const user = client.users.cache.find(user => user.id === userId);
        if (channel.isText()) {
			channel.messages.fetch(messageId).then(async (messageObject) => {
				const emojiName = eventData.emoji.id ? eventData.emoji.id : eventData.emoji.name;
				const reaction = messageObject.reactions.cache.get(emojiName);
	
				if (messageInfo.type === "termin") {
					await anmeldungHandler(client, messageInfo, reaction, user);
				}
	
				await reaction.users.remove(user);
			});
		}
    }
}