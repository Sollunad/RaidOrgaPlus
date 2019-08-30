const _users = require('../endpoints/users');
const _json = require('./jsonHandler');

exports.login = login;
exports.getSession = getSessionForDiscordUser;

function getSessionForDiscordUser(user) {
    const sessions = _json.read('sessions');
    const foundSession = sessions.find(s => s.user === user);
    if (foundSession) {
        const validTo = foundSession.validTo;
        if ((new Date()).getTime() < validTo) {
            return foundSession.session;
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
        let userId = user.id;
        let newSessions = _json.read('sessions');
        newSessions = newSessions.filter(s => s.user !== userId);
        const date = new Date();
        date.setDate(date.getDate() + 90);
        const newUser = {user: userId, session, validTo: date.getTime()};
        newSessions.push(newUser);
        _json.write('sessions', newSessions);
        return true;
    }
    return false;
}