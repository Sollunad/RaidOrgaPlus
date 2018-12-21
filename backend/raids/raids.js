const db = require('../db/connector.js');

exports.listForPlayer = listForPlayer;

async function listForPlayer(userId) {
    const stmt = `SELECT Raid.id, Raid.name, Raid.icon FROM Spieler JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler JOIN Raid ON Raid.id = Spieler_Raid.fk_raid WHERE Spieler.id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
