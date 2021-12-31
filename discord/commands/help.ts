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

// import { DiscordClient, DiscordMessage } from "../models/DiscordClient";

// exports.run = (client: DiscordClient, message: DiscordMessage, args: string[]) => {
//     const commands = client.commands.array();
//     let helpString = "";
//     commands.forEach(function(command) {
//         const help = command.help;
//         if (!help) return;
//         helpString = helpString.concat(`**${help.usage}**\n${help.desc}\n\n`);
//     });
//     message.channel.send(helpString);
// };

// exports.help = {
//     usage: '!orga help',
//     desc: 'Zeigt diese Info an'
// };