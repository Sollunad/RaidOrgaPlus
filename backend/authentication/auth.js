const _session = require('../endpoints/users/session');
const _raids = require('../endpoints/raids/raids');
const _activity = require('../endpoints/users/activity');

exports.auth = authenticate;
exports.deleteCache = deleteFromCache;

const CACHE_FOR = 1000 * 60;
let _cache = {};

async function authenticate(uuid) {
    if (!uuid) return;

    const cached = searchCache(uuid);
    if (cached) return cached;

    return await addCache(uuid);
}

function searchCache(uuid) {
    const cached = _cache[uuid];
    if (!cached || cached.cachedUntil < Date.now()) return null;
    return cached;
}

async function addCache(uuid) {
    await _session.invalidateExpired();
    const response = (await _session.getUser(uuid))[0];
    if (!response) return;

    let authObject = { user: response.user, role: response.role, uuid: uuid };
    const raids = await _raids.listForPlayer(authObject.user);
    authObject.raids = [];

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