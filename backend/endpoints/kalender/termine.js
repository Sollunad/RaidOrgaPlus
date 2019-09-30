const db = require('../../db/connector.js');

exports.showTermineForNext7Days = showTermineForNext7Days;

async function showTermineForNext7Days() {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time, Raid.name ' +
        'FROM Termin ' +
        'JOIN Raid ON Termin.fk_raid = Raid.id ' +
        'WHERE Termin.date >= CURDATE() AND Termin.date < DATE_ADD(CURDATE(), INTERVAL 7 DAY)';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}