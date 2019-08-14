const db = require('../../db/connector.js');

exports.listForPlayer = listForPlayerId;
exports.get = getForRaidId;
exports.listPlayers = listPlayers;
exports.anmeldungStatesForUser = anmeldungStatesForUser;
exports.kickPlayer = kickPlayer;
exports.getRoleForPlayer = getRoleForPlayer;

async function listForPlayerId(userId) {
    const stmt = 'SELECT Raid.id, Raid.name, Raid.icon, Spieler_Raid.role FROM Spieler JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler JOIN Raid ON Raid.id = Spieler_Raid.fk_raid WHERE Spieler.id = ? AND Raid.active = 1 ORDER BY active DESC, id ASC';
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
    const stmt = 'SELECT Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname, Spieler_Raid.role AS role FROM Spieler_Raid JOIN Spieler ON Spieler.id = Spieler_Raid.fk_spieler WHERE fk_raid = ? ORDER BY role DESC, name';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function anmeldungStatesForUser(userId) {
    const stmt = 'SELECT Termin.fk_raid AS raid, MIN(CASE WHEN ISNULL(Spieler_Termin.type) THEN -1 ELSE Spieler_Termin.type END) AS type ' +
        'FROM Termin LEFT JOIN Spieler_Termin ON Termin.id = Spieler_Termin.fk_termin AND (Spieler_Termin.fk_spieler = ? OR ISNULL(Spieler_Termin.fk_spieler)) ' +
        'WHERE Termin.isArchived = 0 AND Termin.fk_raid IN (SELECT fk_raid FROM Spieler_Raid WHERE fk_spieler = ?) ' +
        'GROUP BY raid';
    try {
        return await db.queryV(stmt, [userId, userId]);
    } catch(e) {
        throw e;
    }
}

async function kickPlayer(raid, user) {
    const stmt = 'DELETE FROM Spieler_Raid WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [raid, user]);
    } catch(e) {
        throw e;
    }
}

async function getRoleForPlayer(raid, user) {
    const stmt = 'SELECT role FROM Spieler_Raid WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [raid, user]);
    } catch(e) {
        throw e;
    }
}
