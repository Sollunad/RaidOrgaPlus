import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
	.setName("link")
	.setDescription("Befehle, um einen Channel mit einem Raid zu verknüpfen/die Verknüpfung aufzuheben.")
	.addSubcommand((sub) => sub
		.setName("set")
		.setDescription("Raid mit dem Channel verknüpfen.")
		.addStringOption(option => option.setName("raid").setDescription("Der Name des Raides")))
	.addSubcommand(sub => sub
		.setName("remove")
		.setDescription("Bestehende verknüpfung aufheben."))
	.addSubcommand(sub => sub
		.setName("get")
		.setDescription("Gibt den Raid Namen zurück, sofern dieser Channel mit einem Raid verbunden ist."));

export default {
	data: command,
	execute: executeCommand,
};

async function executeCommand(interaction: CommandInteraction<CacheType>): Promise<void> {
	const subCommand = interaction.options.getSubcommand();

	switch (subCommand) {
		case "set":
			await setRaid(interaction);
			break;
		case "get":
			await getRaid(interaction);
			break;
		case "remove":
			await removeRaid(interaction);
			break;
	}
}

async function setRaid(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply("setRaid");
}

async function removeRaid(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply("removeRaid");
}

async function getRaid(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply("getRaid");
}