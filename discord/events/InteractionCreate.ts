import { CacheType, Interaction } from "discord.js";
import { DiscordClient } from "../models/DiscordClient";
import { DiscordEvent } from "../models/DiscordEvent";

export default {
	name: "interactionCreate",
	once: false,
	execute: async (interaction: Interaction<CacheType>): Promise<void> => {
		if ((!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) || interaction.user.bot) {
			return;
		}

		const client = interaction.client as DiscordClient;
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			return;
		}

		console.log(`Executing Command: ${interaction.commandName}`);

		try {
			await command.execute(interaction);
		} catch (e) {
			console.error(`Command: ${interaction.commandName}\nError: ${e}`);
			await interaction.reply({ content: "There was an error while executing this command!" });
		}
	},
} as DiscordEvent;
