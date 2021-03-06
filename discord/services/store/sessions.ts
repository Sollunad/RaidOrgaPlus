import { User } from "discord.js";
import * as _users from "../endpoints/users";
import * as _json from "./jsonHandler";

export { login, getSessionForDiscordUser as getSession };

function getSessionForDiscordUser(user) {
    const sessions = _json.read('sessions');
    const foundSession = sessions.find(s => s.user === user);
    if (foundSession) {
        return foundSession.session;
    } else {
        return 'Keine Session';
    }
}

async function login(user: User, discordKey: string) {
    const session = await _users.login(discordKey, user.id);
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