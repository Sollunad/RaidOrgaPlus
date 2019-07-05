const db = require('../../db/connector.js');

exports.getUsers = getUsers;

async function getUsers() {
    const stmt = 'SELECT accname, name FROM Spieler WHERE id > 1 ORDER BY accname';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}