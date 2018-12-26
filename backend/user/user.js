const db = require('../db/connector.js');
const api = require('../gw2api/api');

exports.get = getForId;

async function getForId(userId) {
    const stmt = 'SELECT id, accname, name FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

