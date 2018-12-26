const db = require('../db/connector.js');

exports.get = getForId;
exports.changeName = changeName;

async function getForId(userId) {
    const stmt = 'SELECT id, accname, name FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function changeName(userId, name) {
    try {
        const stmt = 'UPDATE Spieler SET name = ? WHERE id = ?';
        return await db.queryV(stmt, [name, userId]);
    } catch(e) {
        throw e;
    }
}

