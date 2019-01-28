const db = require('../../db/connector.js');

exports.listForPlayer = listForPlayerId;
exports.get = getForRaidId;
exports.listPlayers = listPlayers;
exports.anmeldungStateForRaid = anmeldungStateForRaid;

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
        return (await db.queryV(stmt, raidId))[0];
    } catch(e) {
        throw e;
    }
}

async function listPlayers(raidId) {
    const stmt = 'SELECT Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname, Spieler_Raid.role AS role FROM Spieler_Raid JOIN Spieler ON Spieler.id = Spieler_Raid.fk_spieler WHERE fk_raid = ? ORDER BY name';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function anmeldungStateForRaid(raidId, userId) {
    const stmt = 'SELECT Spieler_Termin.type ' +
        'FROM Termin LEFT JOIN Spieler_Termin ON Termin.id = Spieler_Termin.fk_termin ' +
        'WHERE Termin.isArchived = 0 AND Termin.fk_raid = ? AND (Spieler_Termin.fk_spieler = ? OR ISNULL(Spieler_Termin.fk_spieler)) ' +
        'GROUP BY Spieler_Termin.type';
    try {
        return await db.queryV(stmt, [raidId, userId]);
    } catch(e) {
        throw e;
    }
}
