import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
	.setName("kalender")
	.setDescription("Zeigt die Termine der nächsten 7 Tage an.");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => pong(interaction),
};

async function pong(interaction: CommandInteraction<CacheType>) {
	await interaction.reply("Pong!");
}


// import { DiscordClient, DiscordMessage } from "../models/DiscordClient";

// const _embeds = require('../services/util/embedProvider');
// const _messages = require('../services/store/messages');

// exports.run = async (client: DiscordClient, message: DiscordMessage, args: string[]) => {
//     message.channel.startTyping();
//     message.channel.send(await _embeds.kalenderEmbed())
//         .then(m => _messages.newMessageKalender(m.id, m.channel.id));
//     message.channel.stopTyping();

// };

// exports.help = {
//     usage: '!orga kalender',
//     desc: 'Zeigt die Termine der kommenden sieben Tage an. Updated automatisch alle zehn Minuten.'
// };