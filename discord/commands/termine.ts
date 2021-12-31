import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
	.setName("termine")
	.setDescription("Zeigt die Termine und Aufstellungen des Raides an.");

export default {
	data: command,
	execute: (interaction: CommandInteraction<CacheType>): Promise<void> => pong(interaction),
};

async function pong(interaction: CommandInteraction<CacheType>) {
	await interaction.reply("Pong!");
}


// import { DiscordClient, DiscordMessage } from "../models/DiscordClient";
// import * as _termine from "../services/endpoints/termine";
// import * as _aufstellungen from "../services/endpoints/aufstellungen";
// import * as _embeds from "../services/util/embedProvider";
// import * as _icons from "../services/icons";
// import * as _messages from "../services/store/messages";
// import { GuildEmoji } from "discord.js";

// exports.run = async (client: DiscordClient, message: DiscordMessage, args: number[]) => {
// 	if (!message.raid) {
// 		message.channel.send('Verbinde zuerst einen Raid mit diesem Channel mit "!orga link".');
// 		return;
// 	}
// 	const pickedTermin = args[0];
// 	const pickedAufstellung = args[1];

// 	message.channel.startTyping();
// 	const termine = await _termine.getTermine(message.auth, message.raid.id);
// 	if (termine.length === 0) {
// 		message.channel.send('Es gibt keine kommenden Termine oder dir fehlt die Berechtigung, diese anzuzeigen.');
// 	} else {
// 		if (pickedTermin && pickedTermin <= termine.length) {
// 			const termin = termine[pickedTermin - 1];
// 			const aufstellungen = await _aufstellungen.getAufstellungen(message.auth, termin.id);
// 			if (pickedAufstellung && pickedAufstellung <= aufstellungen.length) {
// 				/*
// 					Embed: 1 Aufstellung
// 				 */
// 				const aufstellung = aufstellungen[pickedAufstellung - 1];
// 				const elements = await _aufstellungen.getElements(message.auth, aufstellung.id);
// 				let aufstellungString = '';
// 				const empty = client.emojis.cache.find(emoji => emoji.name === 'empty');
// 				for (let i = 0; i < elements.length; i++) {
// 					const element = elements[i];
// 					const clss = client.emojis.cache.find(emoji => emoji.name === element.class.toLowerCase());
// 					const role = client.emojis.cache.find(emoji => emoji.name === element.role.toLowerCase() + '_');
// 					aufstellungString += `${clss ? clss : empty} ${role ? role : empty} - ${element.name}\n`
// 				}
// 				let embed = _embeds.defaultEmbed().setTitle(`${message.raid.name} - Aufstellung`)
// 					.addField('Datum', termin.dateString)
// 					.addField('Uhrzeit', termin.time)
// 					.addField('Boss', `(${pickedAufstellung}) ${aufstellung.name}`)
// 					.addField('Aufstellung', aufstellungString)
// 					.setThumbnail(_icons.encIcon(aufstellung.abbr));
// 				await message.channel.send(embed);
// 			} else {
// 				/*
// 					Embed: 1 Termin
// 				 */
// 				const anmeldungen = await _termine.getAnmeldungen(message.auth, termin.id);
// 				let emojiYes: string | GuildEmoji = client.emojis.cache.find(emoji => emoji.name === 'yes');
// 				let emojiMaybe: string | GuildEmoji = client.emojis.cache.find(emoji => emoji.name === 'maybe');
// 				let emojiNo: string | GuildEmoji = client.emojis.cache.find(emoji => emoji.name === 'no');

// 				if (emojiYes == null) {
// 					emojiYes = "🟢"
// 				}

// 				if (emojiMaybe == null) {
// 					emojiMaybe = "🟡"
// 				}

// 				if (emojiNo == null) {
// 					emojiNo = "🔴"
// 				}

// 				const embed = _embeds.terminEmbed(client, message.raid.name, termin, aufstellungen, anmeldungen);
// 				message.channel.send(embed)
// 					.then(msg => msg.react(emojiYes))
// 					.then(r => r.message.react(emojiMaybe))
// 					.then(r => r.message.react(emojiNo))
// 					.then(r => {
// 						_messages.newMessageTermin(r.message.id, r.message.channel.id, termin, message.auth, message.raid.name);
// 					});


// 			}
// 		} else {
// 			/*
// 				Embed: Alle Termine
// 			 */
// 			let embed = _embeds.defaultEmbed().setTitle(`${message.raid.name} - Alle Termine`);
// 			for (let i = 0; i < termine.length; i++) {
// 				const termin = termine[i];
// 				if (termin.endtime) {
// 					embed = embed.addField(`(${i + 1}) ${termin.dateString}`, `${termin.time} - ${termin.endtime}`);
// 				} else {
// 					embed = embed.addField(`(${i + 1}) ${termin.dateString}`, termin.time);
// 				}
// 			}
// 			await message.channel.send(embed);
// 		}
// 	}
// 	message.channel.stopTyping();
// };

// exports.help = {
// 	usage: '!orga termine <termin> <aufstellung>',
// 	desc: 'Zeigt Termine und Aufstellungen an.'
// };
