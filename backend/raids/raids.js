const db = require('../db/connector.js');

exports.listForPlayer = listForPlayerId;
exports.get = getForRaidId;

async function listForPlayerId(userId) {
    const stmt = `SELECT Raid.id, Raid.name, Raid.icon, Spieler_Raid.role FROM Spieler JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler JOIN Raid ON Raid.id = Spieler_Raid.fk_raid WHERE Spieler.id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function getForRaidId(raidId) {
    const stmt = `SELECT * FROM Raid WHERE id = ${raidId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
