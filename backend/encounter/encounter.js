const db = require('../db/connector.js');

exports.list = list;
exports.getForAufstellung = getForAufstellung;

async function list() {
    const stmt = 'SELECT name, abbr, apiname, wing FROM Encounter';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function getForAufstellung(aufstellung) {
    const stmt = 'SELECT Encounter.name, Encounter.abbr FROM Encounter JOIN Aufstellung ON Encounter.id = Aufstellung.fk_boss WHERE Aufstellung.id = ?';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}