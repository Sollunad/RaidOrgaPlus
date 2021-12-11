import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

import { decrypt } from "../../util/encyrption";

const command = new SlashCommandBuilder()
	.setName("test")
	.setDescription("A set of test commands")
	.setDefaultPermission(false)
	.addSubcommand((sub) => sub.setName("ping").setDescription("Replies with pong!"))
	.addSubcommand((sub) =>
		sub
			.setName("decrypt")
			.setDescription("Decrypts a given cypher!")
			.addStringOption((option) =>
				option.setName("cypher").setDescription("The cypher/text to decrypt.").setRequired(true)
			)
	)
	.addSubcommand((sub) => sub.setName("reaction").setDescription("Test reaction event handling"));

export default {
	data: command,
	execute: executeCommand,
};

async function executeCommand(interaction: CommandInteraction<CacheType>): Promise<void> {
	const subCommand = interaction.options.getSubcommand();

	switch (subCommand) {
		case "ping":
			await pong(interaction);
			break;
		case "decrypt":
			await decryptMessage(interaction);
			break;
		case "reaction":
			await reaction(interaction);
			break;
	}
}

async function pong(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply("Pong!");
}

async function decryptMessage(interaction: CommandInteraction<CacheType>): Promise<void> {
	// const cypher = interaction.options.getString("cypher");
	const cypher = interaction.options.get("cypher");
	let result = "";

	if (cypher) {
		result = decrypt(cypher.value.toString());
	}

	await interaction.reply("The result: " + result);
}

async function reaction(interaction: CommandInteraction<CacheType>): Promise<void> {
	const message = await interaction.reply({ content: "Test Reaction", fetchReply: true });

	if ("react" in message) {
		await message.react("🎫");
	}
}
