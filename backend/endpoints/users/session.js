const db = require('../../db/connector.js');

exports.start = startSession;
exports.getUser = getUserId;
exports.invalidate = invalidateUuid;
exports.invalidateExpired = invalidateExpired;

async function startSession(id, uuid) {
    const stmt = 'INSERT INTO Session (user, uuid) VALUES (?, ?)';
    try {
        return await db.queryV(stmt, [id, uuid]);
    } catch(e) {
        throw e;
    }
}

async function getUserId(uuid) {
    const stmt = 'SELECT user FROM Session WHERE uuid = ?';
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
    const stmt = 'DELETE FROM Session WHERE created < NOW() - INTERVAL 30 DAY'
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}