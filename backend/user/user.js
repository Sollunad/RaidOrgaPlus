const db = require('../db/connector.js');

exports.get = getForId;
exports.api = getApiKey;

async function getForId(userId) {
    const stmt = `SELECT id, accname, name FROM Spieler WHERE id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function getApiKey(userId) {
    const stmt = `SELECT apikey FROM Spieler WHERE id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}