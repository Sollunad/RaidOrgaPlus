const db = require('./db/connector.js');

exports.listPlayer = listRaidsByPlayerId;

async function listRaidsByPlayerId(userId) {
    const stmt = `SELECT Raid.name FROM Spieler JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler JOIN Raid ON Raid.id = Spieler_Raid.fk_raid WHERE Spieler.id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        console.log(e);
    }
}
