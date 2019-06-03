//TODO #182: Require gibt cached Result, da der Server permanent laufen soll, hier fs verwenden
// ref https://stackabuse.com/reading-and-writing-json-files-with-node-js/
const sessions = require('../stores/sessions.json');
const _users = require('./endpoints/users');

exports.getSession = getSessionForDiscordUser;

function getSessionForDiscordUser(user) {
    const foundSession = sessions.filter(s => s.user === user)[0];
    if (foundSession) {
        const sessionKey = foundSession.session;
        return sessionKey;
    } else {
        //TODO #182: Verschiedene Rückgaben für "Keine Session" und "Session abgelaufen"
        //TODO #182: Wenn Session abgelaufen, Session löschen
    }
}

async function login(user, discordKey) {
    const session = await _users.login(discordKey);
    if (session) {
        const newSessions = sessions;
        const newUser = {user, session};
        newSessions.push(newUser);
        //TODO #182: Neue sessions.json speichern
    }
}

console.log(getSessionForDiscordUser(1234567890));