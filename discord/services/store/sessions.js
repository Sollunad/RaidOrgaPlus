const _users = require('../endpoints/users');
const _json = require('./jsonHandler');

exports.login = login;
exports.getSession = getSessionForDiscordUser;

function getSessionForDiscordUser(user) {
    const sessions = _json.read('sessions');
    const foundSession = sessions.find(s => s.user === user);
    if (foundSession) {
        return foundSession.session;
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
        const newUser = {user: userId, session};
        newSessions.push(newUser);
        _json.write('sessions', newSessions);
        return true;
    }
    return false;
}