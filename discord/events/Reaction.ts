import { MessageEmbed, MessageReaction, PartialMessageReaction } from "discord.js";
import { DiscordEvent } from "../models/DiscordEvent";
import { encrypt } from "../utils/encyrption";

export default {
	name: "messageReactionAdd",
	once: false,
	execute: async (reaction: MessageReaction | PartialMessageReaction): Promise<void> => {
		if (reaction.partial) {
			await reaction.fetch();
		}

		if (reaction.emoji.name === "🎫") {
			const message = "Hello!\nWhat message do you want to send to the moderators?";

			// get the user who reacted with the Ticket-emoji
			const users = await reaction.users.fetch();
			const user = users.find((u) => !u.bot);

			if (user == null) {
				return;
			}

			// remove the reaction of the user.
			await reaction.users.remove(user);

			// create a DM Channel with the user and send the message
			const dmChannel = await user.createDM();
			await dmChannel.send(message);

			// await a reply from the user and encrypt the user id.
			const replyCollection = await dmChannel.awaitMessages({
				filter: null,
				max: 1,
				time: 900_000, // 900.000 ms = 15 Minutes.
			});

			const reply = replyCollection.first();
			const userId = encrypt(reply.author.id);

			// send an embed with the message of the user to the channel named "shoutbox", with the encrypted user id in the footer.
			const embed = new MessageEmbed()
				.setColor("#0099ff")
				.setTitle("New Ticket (or something like this)")
				.setDescription("I could have a description?")
				.addField("Message", reply.content)
				.setTimestamp()
				.setFooter({ text: userId });

			const guild = reaction.message.guild;
			const channel = guild.channels.cache.find((channel) => channel.name === "shoutbox");
			if (channel && channel.isText()) {
				channel.send({ embeds: [embed] });
			}
		}
	},
} as DiscordEvent;
