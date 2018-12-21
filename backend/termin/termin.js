const db = require('../db/connector.js');

exports.listActive = listActive;
exports.listArchived = listArchived;

async function listActive(raidId) {
    const stmt = `SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ${raidId} AND Termin.isArchived = 0`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function listArchived(raidId) {
    const stmt = `SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ${raidId} AND Termin.isArchived = 1`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
