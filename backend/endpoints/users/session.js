const db = require('../../db/connector.js');

exports.start = startSession;
exports.startDiscord = startDiscordSession;
exports.getUser = getUser;
exports.invalidate = invalidateUuid;
exports.invalidateExpired = invalidateExpired;

async function startSession(id, uuid, agent) {
    const stmt = 'INSERT INTO Session (user, uuid, agent) VALUES (?, ?, ?)';
    try {
        return await db.queryV(stmt, [id, uuid, agent]);
    } catch(e) {
        throw e;
    }
}

async function startDiscordSession(id, uuid, agent) {
    const stmt = 'INSERT INTO Session (user, uuid, agent, created) VALUES (?, ?, ?, NOW() + INTERVAL 100 YEAR)';
    try {
        return await db.queryV(stmt, [id, uuid, agent]);
    } catch(e) {
        throw e;
    }
}

async function getUser(uuid) {
    const stmt = 'SELECT user, agent, role FROM Session JOIN Spieler on Session.user = Spieler.id WHERE uuid = ?';
    try {
        return await db.queryV(stmt, uuid);
    } catch(e) {
        throw e;
    }
}

async function invalidateUuid(uuid) {
    const stmt = 'DELETE FROM Session WHERE uuid = ?';
    try {
        return await db.queryV(stmt, uuid);
    } catch(e) {
        throw e;
    }
}

async function invalidateExpired() {
    const stmt = 'DELETE FROM Session WHERE created < NOW() - INTERVAL 90 DAY'
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}