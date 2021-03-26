import * as _messages from "../services/store/messages";
import * as _termine from "../services/endpoints/termine";
import * as _aufstellungen from "../services/endpoints/aufstellungen";
import * as _embeds from "../services/util/embedProvider";
import * as _util from "../services/util/util";
import { DiscordClient, DiscordMessage } from "../models/DiscordClient";
import { Message } from "../services/store/messages";

export { refreshMessage, startTimer };

// 5 Minute timer.
const REFRESH_RATE = 1000 * 60 * 5;
let currentGroup = 0;

function startTimer(client: DiscordClient) {
	setInterval(async function () {
		refreshAll(client);
	}, REFRESH_RATE);
}

function refreshAll(client: DiscordClient) {
	const messages = _messages.getAll().filter(m => m.update == currentGroup);
	for (const message of messages) {
		refreshMessage(client, message);
	}

	switch (currentGroup) {
		case 0:
			currentGroup = 1;
			break;
		case 1:
			currentGroup = 0;
			break;
		default:
			currentGroup = 0;
			break;
	}
}

function refreshMessage(client: DiscordClient, messageInfo: Message) {
	client.channels.fetch(messageInfo.channelId).then(channel => {
		if (channel.isText()) {
			channel.messages.fetch(messageInfo.messageId).then(async (messageObject: DiscordMessage) => {
				try {
					if (messageInfo.type === "termin") {
						if (_util.isTerminInPast(messageInfo.termin)) {
							messageObject.delete();
							_messages.deleteMessage(messageInfo.messageId);
						} else {
							await resendTerminEmbed(client, messageObject, messageInfo.session, messageInfo.termin, messageInfo.raidName);
						}
					} else if (messageInfo.type === "kalender") {
						await resendKalenderEmbed(messageObject);
					}
				} catch (error) {
					console.error(error);
				}
			}).catch((error) => {
				console.error(error);
				_messages.deleteMessage(messageInfo.messageId);
			});
		}
	}).catch(error => {
		console.error(error);
	})
}

async function resendTerminEmbed(client: DiscordClient, message: DiscordMessage, session: string, termin: any, raidName: string) {
	const aufstellungen = await _aufstellungen.getAufstellungen(session, termin.id);
	const anmeldungen = await _termine.getAnmeldungen(session, termin.id);
	const embed = _embeds.terminEmbed(client, raidName, termin, aufstellungen, anmeldungen);
	await message.edit(embed);
}

async function resendKalenderEmbed(message: DiscordMessage) {
	const embed = await _embeds.kalenderEmbed();
	await message.edit(embed);
}