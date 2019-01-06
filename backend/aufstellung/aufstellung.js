const db = require('../db/connector.js');

exports.getForTermin = getForTermin;
exports.delete = deleteBoss;

async function getForTermin(termin) {
    const stmt = 'SELECT id FROM Aufstellung WHERE fk_termin = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function deleteBoss(aufstellung) {
    const stmt = 'DELETE FROM Aufstellung WHERE id = ?';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}

