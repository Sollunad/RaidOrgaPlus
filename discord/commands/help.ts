import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { DiscordClient } from "models/DiscordClient";

const command = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Gibt eine Liste aller zur verfügung stehenden Befehle aus.");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => pong(interaction),
};

async function pong(interaction: CommandInteraction<CacheType>) {
	const commands = (interaction.client as DiscordClient).commands;
	
	let reply = '';
	commands.forEach(command => {
		reply += `**${command.data.name}**\n${command.data.description}\n\n`;
	});

	await interaction.reply(reply);
}