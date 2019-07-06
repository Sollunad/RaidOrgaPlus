//TODO #182: Require gibt cached Result, da der Server permanent laufen soll, hier fs verwenden
// ref https://stackabuse.com/reading-and-writing-json-files-with-node-js/
const _users = require('./endpoints/users');
const _json = require('./jsonHandler');

exports.login = login;
exports.getSession = getSessionForDiscordUser;

function getSessionForDiscordUser(user) {
    const sessions = _json.read('sessions');
    const foundSession = sessions.filter(s => parseInt(s.user) === user)[0];
    if (foundSession) {
        const sessionKey = foundSession.session;
        return sessionKey;
    } else {
        //TODO #182: Verschiedene Rückgaben für "Keine Session" und "Session abgelaufen"
        //TODO #182: Wenn Session abgelaufen, Session löschen
        return false;
    }
}

async function login(user, discordKey) {
    const session = await _users.login(discordKey);
    if (session) {
        let newSessions = _json.read('sessions');
        newSessions = newSessions.filter(s => s.user !== user);
        const newUser = {user, session};
        newSessions.push(newUser);
        _json.write('sessions', newSessions);
    }
}