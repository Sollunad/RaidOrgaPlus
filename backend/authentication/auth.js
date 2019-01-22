const _users = require('../endpoints/users/session');
const _raids = require('../endpoints/raids/raids');
const _termin = require('../endpoints/termine/termin');

exports.auth = authenticate;
exports.deleteCache = deleteFromCache;

const CACHE_FOR = 1000 * 60 * 5;
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
    const response = (await _users.getUser(uuid))[0];
    if (!response) return;

    let authObject = { user: response.user, uuid: uuid };
    const raids = await _raids.listForPlayer(authObject.user);
    authObject.raids = [];

    raids.forEach(r => {
        authObject.raids.push({id: r.id, role: r.role});
    });

    authObject.cachedUntil = Date.now() + CACHE_FOR;
    _cache[uuid] = authObject;
    return authObject;
}

function deleteFromCache(uuid) {
    _cache[uuid] = null;
}