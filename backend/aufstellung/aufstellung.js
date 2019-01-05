const db = require('../db/connector.js');

exports.getForTermin = getForTermin;

async function getForTermin(termin) {
    const stmt = 'SELECT id FROM Aufstellung WHERE fk_termin = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

