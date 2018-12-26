const db = require('../db/connector.js');

exports.listForPlayer = listForPlayerId;
exports.get = getForRaidId;
exports.role = getRole;

async function listForPlayerId(userId) {
    const stmt = 'SELECT Raid.id, Raid.name, Raid.icon, Spieler_Raid.role FROM Spieler JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler JOIN Raid ON Raid.id = Spieler_Raid.fk_raid WHERE Spieler.id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function getForRaidId(raidId) {
    const stmt = 'SELECT * FROM Raid WHERE id = ?';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function getRole(raidId, userId) {
    const stmt = 'SELECT role FROM Spieler_Raid WHERE fk_spieler = ? AND fk_raid = ?';
    try {
        return await db.queryV(stmt, [userId, raidId]);
    } catch(e) {
        throw e;
    }
}
