const db = require('../../db/connector.js');

exports.addErsatz = addErsatz;
exports.getErsatz = getErsatz;
exports.deleteErsatz = deleteErsatz;

async function addErsatz(user, termin) {
    const stmt = 'INSERT INTO Ersatzspieler (fk_termin, fk_spieler) VALUES (?, ?)';
    try {
        return await db.queryV(stmt, [termin, user]);
    } catch(e) {
        throw e;
    }
}

async function getErsatz(termin) {
    const stmt = 'SELECT fk_spieler as spieler FROM Ersatzspieler WHERE fk_termin = ?';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function deleteErsatz(user, termin) {
    const stmt = 'DELETE FROM Ersatzspieler WHERE fk_termin = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [termin, user]);;
    } catch(e) {
        throw e;
    }
}