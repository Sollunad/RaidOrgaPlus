const db = require('../../db/connector.js');

exports.getForBase = getForBase;

async function getForBase(base) {
    const stmt = 'SELECT * FROM Klasse WHERE fk_base = ?';
    try {
        return await db.queryV(stmt, base);
    } catch(e) {
        throw e;
    }
}