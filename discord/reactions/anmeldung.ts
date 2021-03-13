import * as _termine from "../services/endpoints/termine";
import * as _sessions from "../services/store/sessions";
import * as _refresher from "../refresher/main";
import * as _util from "../services/util/util";
import { DiscordClient } from "../models/DiscordClient";
import { Message, MessageReaction, User } from "discord.js";

export { anmeldungHandler };

async function anmeldungHandler(client: DiscordClient, messageInfo, reaction: MessageReaction, user: User) {
    const session = _sessions.getSession(user.id);
    const termin = messageInfo.termin;
    if (_util.isTerminInPast(termin)) {
        reaction.message.channel.send(`${user} Dieser Termin liegt in der Vergangenheit!`)
            .then(msg => startDeleteReplyTimer(msg));
    } else if (session === 'Keine Session' || session === 'Abgelaufen') {
        reaction.message.channel.send(`${user} Bitte logge dich zunächst über RaidOrga+ ein: https://orga.rising-light.de/#/einstellungen`)
            .then(msg => startDeleteReplyTimer(msg));
    } else {
        const type = getAnmeldungType(reaction.emoji.name);
        await _termine.putAnmeldung(session, termin.id, type);
        _refresher.refreshMessage(client, messageInfo.messageId);
        const typeText = ['angemeldet', 'vielleicht da', 'abgemeldet'];
        reaction.message.channel.send(`${user} Du bist nun ${typeText[type]} ${reaction.emoji}`)
            .then(msg => startDeleteReplyTimer(msg));
    }
}

function startDeleteReplyTimer(reply: Message) {
    const waitTime = 1000 * 10;
    reply.delete({ timeout: waitTime });
}

function getAnmeldungType(emoji) {
    switch (emoji) {
        case 'yes':
            return 0;
        case 'maybe':
            return 1;
        case 'no':
            return 2;
        default:
            return null;
    }
}