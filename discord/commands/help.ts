import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplicationCommand, CacheType, CommandInteraction, Message, MessageEmbed } from "discord.js";
import { defaultEmbed } from "../Utils/embedProvider";

const command = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Gibt eine Liste aller zur verfügung stehenden Befehle aus.")
	.addStringOption((option) => option.setName("befehl").setDescription("der Name des Befehls").setRequired(false));

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => help(interaction),
	production: true,
};

async function help(interaction: CommandInteraction<CacheType>): Promise<void> {
	const commandName = interaction.options.getString("befehl");

	const client = interaction.client;
	const guild = await client.guilds.fetch(process.env.GUILD_ID);
	const guildCommands = await guild.commands.fetch();
	let embed: MessageEmbed;

	if (commandName != null && commandName.trim() != null && commandName.trim() != "") {
		const command = guildCommands.filter((c) => c.name === commandName).first();
		if (command == null) {
			await interaction.reply(`Der Befehl *${commandName}* konnte nicht gefunden werden.`);
			return;
		}

		embed = await commandHelp(interaction, command);
	} else {
		embed = defaultEmbed().setTitle("Help - Alle Befehle");
		guildCommands.filter(g => g.defaultPermission).forEach((command) => {
			embed.addField(command.name, command.description);
		});
	}

	await interaction.reply({ embeds: [embed] });
}

async function commandHelp(
	interaction: CommandInteraction<CacheType>,
	command: ApplicationCommand<any>
): Promise<MessageEmbed> {
	const embed = defaultEmbed()
		.setTitle("Help - " + command.name)
		.setDescription(command.description);

	command.options.forEach((option) => {
		if (option.type === "SUB_COMMAND") {
			let value = option.description;

			if (option.options != null) {
				value += "\nOptionen:";

				option.options.forEach((subOption) => {
					value += `\n${subOption.name}: ${subOption.description}`;
				});
			}

			embed.addField(option.name, value);
		}
	});

	return embed;
}
