const db = require('../db/connector.js');

exports.list = list;
exports.getForAufstellung = getForAufstellung;
exports.listForWing = listMainForWing;

async function list() {
    const stmt = 'SELECT * FROM Encounter';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function listMainForWing(wing) {
    const stmt = 'SELECT * FROM Encounter WHERE main = 1 AND wing = ?';
    try {
        return await db.queryV(stmt, wing);
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