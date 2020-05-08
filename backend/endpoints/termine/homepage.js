const db = require('../../db/connector.js');
const dateMapper = require('./dateMapper');

exports.getHomepageTermine = getHomepageTermine;

async function getHomepageTermine(user) {
    const stmt = 'SELECT Termin.id, Raid.id AS raidID, Raid.name, Raid.icon, Spieler_Raid.role, Termin.date, Termin.time, Termin.endtime, Spieler_Termin.type ' +
        'FROM Termin ' +
        'JOIN Raid ON Termin.fk_raid = Raid.id ' +
        'JOIN Spieler_Raid ON Raid.id = Spieler_Raid.fk_raid ' +
        'LEFT JOIN Spieler_Termin ON fk_termin = Termin.id AND Spieler_Termin.fk_spieler = ? ' +
        'WHERE Spieler_Raid.fk_spieler = ? AND Termin.isArchived = 0 ' +
        'ORDER BY Termin.date, Termin.time';
    try {
        return (await db.queryV(stmt, [user, user])).map(dateMapper.map);
    } catch(e) {
        throw e;
    }
}