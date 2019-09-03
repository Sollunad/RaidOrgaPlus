const db = require('../../db/connector.js');

exports.getUsers = getUsers;

const stmt = 'SELECT Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive, MAX(Termin.date) AS lastTermin FROM Spieler ' +
    'JOIN Spieler_Termin ON Spieler_Termin.fk_spieler = Spieler.id ' +
    'JOIN Termin ON Spieler_Termin.fk_termin = Termin.id ' +
    'WHERE (Spieler_Termin.type = 0 OR Spieler_Termin.type = 1) ' +
    'AND Spieler.id > 1 ' +
    'GROUP BY id, accname, name, lastActive ' +
    'UNION ' +
    'SELECT Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive, NULL FROM Spieler ' +
    'WHERE Spieler.id > 1 ' +
    'AND Spieler.id NOT IN (SELECT DISTINCT fk_spieler FROM Spieler_Termin) ' +
    'ORDER BY accname';
async function getUsers() {
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
