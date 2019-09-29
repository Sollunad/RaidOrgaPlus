const _sessions = require('../services/store/sessions.js');

exports.run = async (client, message, args) => {
    const key = args[0];
    if (key) {
        const loggedIn = await _sessions.login(message.author, key);
        if (loggedIn) {
            message.channel.send('Du bist jetzt eingeloggt!');
        } else {
            message.channel.send('Der Einmalschlüssel war nicht gültig. Bitte melde dich erneut an.');
        }
    } else {
        message.channel.send('Bitte gebe einen Einmalschlüssel an.');
    }
};

exports.help = {
    usage: '!orga login [Einmalschlüssel]',
    desc: 'Verknüpft RO+-Account mit Discord-Account. Das Einmalpasswort kann in den Einstellungen von RO+ generiert werden.'
};
