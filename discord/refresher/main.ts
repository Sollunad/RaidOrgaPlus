import * as _messages from "../services/store/messages";
import * as _termine from "../services/endpoints/termine";
import * as _aufstellungen from "../services/endpoints/aufstellungen";
import * as _embeds from "../services/util/embedProvider";
import * as _util from "../services/util/util";
import { DiscordClient, DiscordMessage } from "../models/DiscordClient";

export { refreshMessage, startTimer };

const REFRESH_RATE = 1000 * 60 * 10;

function startTimer(client: DiscordClient) {
    setInterval(async function() {
        refreshAll(client);
    }, REFRESH_RATE);
}

function refreshAll(client: DiscordClient) {
    const messages = _messages.getAll();
    for (const message of messages) {
        refreshMessage(client, message.messageId);
    }
}

function refreshMessage(client: DiscordClient, messageId) {
    const messageInfo = _messages.getMessage(messageId);
    const channel = client.channels.cache.get(messageInfo.channelId);

    if (channel.isText()) {
		channel.messages.fetch(messageId).then(async (messageObject: DiscordMessage) => {
			if (messageInfo.type === "termin") {
				if (_util.isTerminInPast(messageInfo.termin)) {
					_messages.deleteMessage(messageId);
				} else {
					await resendTerminEmbed(client, messageObject, messageInfo.session, messageInfo.termin, messageInfo.raidName);
				}
			} else if (messageInfo.type === "kalender") {
				await resendKalenderEmbed(messageObject);
			}
		}).catch((error) => {
			_messages.deleteMessage(messageId)
		});
	}
}

async function resendTerminEmbed(client: DiscordClient, message: DiscordMessage, session, termin, raidName) {
    const aufstellungen = await _aufstellungen.getAufstellungen(session, termin.id);
    const anmeldungen = await _termine.getAnmeldungen(session, termin.id);
    const embed = _embeds.terminEmbed(client, raidName, termin, aufstellungen, anmeldungen);
    await message.edit(embed);
}

async function resendKalenderEmbed(message: DiscordMessage) {
    const embed = await _embeds.kalenderEmbed();
    await message.edit(embed);
}