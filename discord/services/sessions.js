const _users = require('./endpoints/users');
const _json = require('./jsonHandler');

exports.login = login;
exports.getSession = getSessionForDiscordUser;

function getSessionForDiscordUser(user) {
    const sessions = _json.read('sessions');
    const foundSession = sessions.filter(s => s.user === user)[0];
    if (foundSession) {
        const validTo = foundSession.validTo;
        if ((new Date()).getTime() < validTo) {
            const sessionKey = foundSession.session;
            return sessionKey;
        } else {
            let newSessions = _json.read('sessions');
            newSessions = newSessions.filter(s => s.user !== user);
            _json.write('sessions', newSessions);
            return 'Abgelaufen'
        }
    } else {
        return 'Keine Session';
    }
}

async function login(user, discordKey) {
    const session = await _users.login(discordKey);
    if (session) {
        let newSessions = _json.read('sessions');
        newSessions = newSessions.filter(s => s.user !== user);
        const date = new Date();
        date.setDate(date.getDate() + 30);
        const newUser = {user, session, validTo: date.getTime()};
        newSessions.push(newUser);
        _json.write('sessions', newSessions);
    }
}