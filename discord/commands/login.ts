import { DiscordClient, DiscordMessage } from "../models/DiscordClient";
import * as _sessions from "../services/store/sessions";

exports.run = async (client: DiscordClient, message: DiscordMessage, args: string[]) => {
    const key = args[0];
    if (key) {
        message.channel.startTyping();
        const loggedIn = await _sessions.login(message.author, key);
        if (loggedIn) {
            message.channel.send('Du bist jetzt eingeloggt!');
        } else {
            message.channel.send('Das Einloggen hat nicht funktioniert. Stelle sicher, dass der Einmalschlüssel gültig ist und dein Discord-Name auf dem Rising Light-Discord deinen Accountnamen enthält.');
        }
        message.channel.stopTyping();
    } else {
        message.channel.send('Bitte gebe einen Einmalschlüssel an.');
    }
};

exports.help = {
    usage: '!orga login [Einmalschlüssel]',
    desc: 'Verknüpft RO+-Account mit Discord-Account. Das Einmalpasswort kann in den Einstellungen von RO+ generiert werden.'
};
