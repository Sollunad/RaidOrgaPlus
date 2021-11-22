import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => pong(interaction),
};

async function pong(interaction: CommandInteraction<CacheType>) {
	await interaction.reply("Pong!");
}
