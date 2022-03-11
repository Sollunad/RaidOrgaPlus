import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction, MessageEmbed } from "discord.js";

import { encrypt } from "../utils/encyrption";

const command = new SlashCommandBuilder()
	.setName("message")
	.setDescription("Send a message to the moderators of this Server!");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => message(interaction),
	production: false
};

async function message(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply({ content: "The bot has send you a message with the instructions.", ephemeral: true });

	const message = `Hello!\nWhat message do you want to send to the moderators of the server ${interaction.guild.name}?`;
	const dmChannel = await interaction.user.createDM();
	await dmChannel.send(message);

	const replyCollection = await dmChannel.awaitMessages({
		filter: null,
		max: 1,
		time: 900_000, // 900.000 ms = 15 Minutes.
	});

	const reply = replyCollection.first();
	const userId = encrypt(reply.author.id);

	const embed = new MessageEmbed()
		.setColor("#0099ff")
		.setTitle("New Ticket (or something like this)")
		.setDescription("I could have a description?")
		.addField("Message", reply.content)
		.setTimestamp()
		.setFooter(userId);

	const channel = interaction.guild.channels.cache.find((channel) => channel.name === "shoutbox");
	if (channel && channel.isText()) {
		channel.send({ embeds: [embed] });
	} else {
		interaction.followUp({ embeds: [embed] });
	}
}
