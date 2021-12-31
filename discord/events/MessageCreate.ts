import { Message } from "discord.js";
import { DiscordEvent } from "../models/DiscordEvent";
import { decrypt } from "../utils/encyrption";

export default {
	name: "messageCreate",
	once: false,
	execute: async (message: Message<boolean>): Promise<void> => {
		if (message.type !== "REPLY") {
			return;
		}

		if (message.channel.type === "GUILD_TEXT" && message.channel.name === "shoutbox") {
			await sendMessage(message);
		}
	}
} as DiscordEvent

async function sendMessage(message: Message<boolean>): Promise<void> {
	if (message.partial) {
		await message.fetch();
	}

	const ref = await message.fetchReference();
	const encryptedUserId = ref.embeds[0].footer.text;
	const userId = decrypt(encryptedUserId);

	const user = message.guild.members.cache.get(userId);
	const dmChannel = await user.createDM();
	dmChannel.send(message.content);
}