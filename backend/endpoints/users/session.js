const db = require('../../db/connector.js');

exports.start = startSession;
exports.getUser = getUserId;
exports.invalidate = invalidateUuid;

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

async function invalidateUser(id) {
    const stmt = 'DELETE FROM Session WHERE user = ?';
    try {
        return await db.queryV(stmt, id);
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