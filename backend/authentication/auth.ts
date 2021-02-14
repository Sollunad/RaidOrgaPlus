import * as _session from '../endpoints/users/session';
import * as _raids from '../endpoints/raids/raids';
import * as _activity from '../endpoints/users/activity';

export {
	authenticate as auth, deleteFromCache as deleteCache
};

const CACHE_FOR = 1000 * 60;
let _cache = {};

async function authenticate(uuid, agent) {
    if (!uuid) return;

    const cached = searchCache(uuid, agent);
    if (cached) return cached;

    return await addCache(uuid, agent);
}

function searchCache(uuid, agent) {
    const cached = _cache[uuid];
    if (!cached || cached.cachedUntil < Date.now()) return null;
    if (cached.agent !== agent) return null;
    return cached;
}

async function addCache(uuid, agent) {
    await _session.invalidateExpired();
    const response = (await _session.getUser(uuid))[0];
    if (!response) return;
    if (response.agent !== agent) return;

    let authObject = { user: response.user, role: response.role, uuid, agent, raids: [], cachedUntil: undefined };
    const raids: any = await _raids.listForPlayer(authObject.user);

    raids.forEach(r => {
        authObject.raids.push({id: r.id, role: r.role});
    });

    authObject.cachedUntil = Date.now() + CACHE_FOR;
    _cache[uuid] = authObject;
    await _activity.updateLastActivity(response.user);
    return authObject;
}

function deleteFromCache(uuid) {
    _cache[uuid] = null;
}