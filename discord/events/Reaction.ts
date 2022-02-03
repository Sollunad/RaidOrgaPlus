import { Message, MessageEmbed, MessageReaction, PartialMessageReaction, User } from "discord.js";
import { getAnmeldungenForTermin, getAufstellungen, getPlayer, getRaidFromId, getTerminFromId, getTerminFromMessage, updateAnmeldung } from "../utils/queries";
import { DiscordEvent } from "../models/DiscordEvent";
import { encrypt } from "../utils/encyrption";
import { terminEmbed } from "../utils/embedProvider";
import { DiscordClient } from "models/DiscordClient";
import { client } from "bot";

export default {
	name: "messageReactionAdd",
	once: false,
	execute: async (reaction: MessageReaction | PartialMessageReaction): Promise<void> => {
		if (reaction.partial) {
			await reaction.fetch();
		}

		// get the user and make sure it's not a bot reaction to the message.
		const users = await reaction.users.fetch();
		const user = users.find((u) => !u.bot);

		if (user == null) {
			return;
		}

		await reaction.users.remove(user);

		if (reaction.emoji.name === "🎫") {
			await sendTicket(reaction, user);
			return;
		}

		const anmeldungEmojis = ["yes", "maybe", "no"];
		if (anmeldungEmojis.includes(reaction.emoji.name)) {
			await handleAnmeldung(reaction, user);
		}
	},
} as DiscordEvent;

async function sendTicket(reaction: MessageReaction | PartialMessageReaction, user: User) {
	const message = "Hello!\nWhat message do you want to send to the moderators?";

	// create a DM Channel with the user and send the message
	const dmChannel = await user.createDM();
	await dmChannel.send(message);

	let reply: Message<boolean> = null;

	do {
		// incase the user sends a sticker, reply with an error message and tell them to retry again without using stickers.
		if (reply != null) {
			await dmChannel.send("Sticker werden für das erstellen eines Tickets nicht untersützt. Bitte schicke eine Nachricht *ohne* sticker.");
		}

		reply = null;

		// await a reply from the user and encrypt the user id.
		const replyCollection = await dmChannel.awaitMessages({
			filter: m => !m.author.bot,
			max: 1,
			time: 900_000, // 900.000 ms = 15 Minutes.
		});

		reply = replyCollection.first();
	} while (reply != null && reply.stickers.size > 0);

	if (reply == null) {
		await dmChannel.send("Timeout! The Bot is no longer awaiting an answer.");
		return;
	}

	const userId = encrypt(reply.author.id);

	// send an embed with the message of the user to the channel named "shoutbox", with the encrypted user id in the footer.
	const embed = new MessageEmbed()
		.setColor("#0099ff")
		.setTitle("New Ticket (or something like this)")
		.setDescription("I could have a description?")
		.addField("Message", reply.content)
		.setTimestamp()
		.setFooter({ text: userId });

	const guild = reaction.message.guild;
	const channel = guild.channels.cache.find((channel) => channel.name === "shoutbox");
	if (channel && channel.isText()) {
		await channel.send({ embeds: [embed] });
		await dmChannel.send("The ticket was successfully created and send to the moderators!");
	}
}

async function handleAnmeldung(reaction: MessageReaction | PartialMessageReaction, user: User) {
	// get the guildMember to access the nickname
	const guildMember = await reaction.message.guild.members.fetch(user);

	if (guildMember == null) {
		return;
	}

	// lookup the player in the database with the nickname
	const player = await getPlayer(guildMember.nickname);

	// erorr message in case no player was found.
	if (player == null) {
		const errorMessage = await reaction.message.channel.send({
			content: `Mit dem Nicknamen **${guildMember.nickname}** konnte kein RO+ Account gefunden werden.`,
		});
		setTimeout(async () => await errorMessage.delete(), 30000);
		return;
	}

	const type = getAnmeldungType(reaction.emoji.name);
	const discordTermin = await getTerminFromMessage(reaction.message.id);

	await updateAnmeldung(player.id, discordTermin.fk_termin, type);

	const termin = await getTerminFromId(discordTermin.fk_termin);
	const anmeldungen = await getAnmeldungenForTermin(termin.id);
	const aufstellungen = await getAufstellungen(termin.id);
	const raid = await getRaidFromId(termin.fk_raid);

	const embed = terminEmbed(reaction.client as DiscordClient, raid.name, termin, aufstellungen, anmeldungen);
	await reaction.message.edit({ embeds: [embed] });

	const typeText = ['angemeldet', 'vielleicht da', 'abgemeldet'];
	const reply = await reaction.message.channel.send(`${user} Du bist nun ${typeText[type]} ${reaction.emoji}`);
	setTimeout(async () => await reply.delete(), 10000);
}

async function updateTerminEmbed(messageId: string): Promise<void> {
	const discordTermin = await getTerminFromMessage(messageId);

	const termin = await getTerminFromId(discordTermin.fk_termin);
	const anmeldungen = await getAnmeldungenForTermin(termin.id);
	const aufstellungen = await getAufstellungen(termin.id);
	const raid = await getRaidFromId(termin.fk_raid);

	// const embed = terminEmbed(reaction.client as DiscordClient, raid.name, termin, aufstellungen, anmeldungen);
	// await reaction.message.edit({ embeds: [embed] });
}

function getAnmeldungType(emoji: string) {
	switch (emoji) {
		case "yes":
			return 0;
		case "maybe":
			return 1;
		case "no":
			return 2;
		default:
			return null;
	}
}
