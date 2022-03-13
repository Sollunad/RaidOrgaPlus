import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { kalenderEmbed } from "../Utils/embedProvider";

const command = new SlashCommandBuilder()
	.setName("kalender")
	.setDescription("Zeigt die Termine der nächsten 7 Tage an.");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => calender(interaction),
	production: true
};

async function calender(interaction: CommandInteraction<CacheType>) {
	const embed = await kalenderEmbed();
	await interaction.channel.send({ embeds: [embed] });
	
	await interaction.reply({ content: "Pong!", ephemeral: true });
}