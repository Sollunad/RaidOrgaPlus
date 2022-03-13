import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder().setName("server").setDescription("Replies with server info!");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => server(interaction),
	production: false
};

async function server(interaction: CommandInteraction<CacheType>) {
	await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
}
