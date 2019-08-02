const db = require('../../db/connector.js');

exports.getUsers = getUsers;

async function getUsers() {
    const stmt = 'SELECT Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive, MAX(Termin.date) AS lastTermin FROM Spieler ' +
        'LEFT JOIN Spieler_Termin ON Spieler_Termin.fk_spieler = Spieler.id ' +
        'LEFT JOIN Termin ON Spieler_Termin.fk_termin = Termin.id ' +
        'WHERE (Spieler_Termin.type = 0 OR ISNULL(Spieler_Termin.type)) ' +
        'AND (Termin.date < CURDATE() OR ISNULL(Termin.date)) ' +
        'AND Spieler.id > 1 ' +
        'GROUP BY Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive ' +
        'ORDER BY Spieler.accname';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
