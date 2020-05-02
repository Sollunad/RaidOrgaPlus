const db = require('../../db/connector.js');

exports.getRaids = getRaids;
exports.listPlayers = listPlayers;
exports.createRaid = createRaid;
exports.addPlayer = addPlayer;
exports.setPlayerRole = setPlayerRole;
exports.removePlayer = removePlayer;

async function getRaids() {
    const stmt = 'SELECT id, name, active FROM Raid ORDER BY active DESC, name';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function listPlayers(raidId) {
    const stmt = 'SELECT Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname, Spieler_Raid.role AS role, Spieler.discord FROM Spieler_Raid JOIN Spieler ON Spieler.id = Spieler_Raid.fk_spieler WHERE fk_raid = ? ORDER BY role DESC, name';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function createRaid(name) {
    const stmt = 'INSERT INTO Raid (name) VALUES (?)';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}

async function addPlayer(raidId, spielerId) {
    const stmt = 'INSERT INTO Spieler_Raid (fk_raid, fk_spieler) VALUES (?,?)';
    try {
        return await db.queryV(stmt, [raidId, spielerId]);
    } catch(e) {
        throw e;
    }
}

async function setPlayerRole(raidId, spielerId, role) {
    const stmt = 'UPDATE Spieler_Raid SET role = ? WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [role, raidId, spielerId]);
    } catch(e) {
        throw e;
    }
}

async function removePlayer(raidId, spielerId) {
    const stmt = 'DELETE FROM Spieler_Raid WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [raidId, spielerId]);
    } catch(e) {
        throw e;
    }
}
