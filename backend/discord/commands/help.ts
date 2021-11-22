import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Gibt eine Liste aller zur verfügung stehenden Befehle aus.");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => pong(interaction),
};

async function pong(interaction: CommandInteraction<CacheType>) {
	await interaction.reply("Pong!");
}
