const db = require('../../db/connector.js');

exports.getRaids = getRaids;
exports.listPlayers = listPlayers;
exports.createRaid = createRaid;

async function getRaids() {
    const stmt = 'SELECT id, name, active FROM Raid ORDER BY active DESC, name';
    try {
        return await db.query(stmt);
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

async function createRaid(name) {
    const stmt = 'INSERT INTO Raid (name) VALUES (?)';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}
