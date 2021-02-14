import * as db from '../../db/connector';

const stmt = 'SELECT Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive, Spieler.comment, Spieler.discord, MIN(Termin.date) AS firstTermin, MAX(Termin.date) AS lastTermin FROM Spieler ' +
    'JOIN Spieler_Termin ON Spieler_Termin.fk_spieler = Spieler.id ' +
    'JOIN Termin ON Spieler_Termin.fk_termin = Termin.id ' +
    'WHERE (Spieler_Termin.type = 0 OR Spieler_Termin.type = 1) ' +
    'AND Spieler.id > 9 ' +
    'GROUP BY id, accname, name, lastActive ' +
    'UNION ' +
    'SELECT Spieler.id, Spieler.accname, Spieler.name, Spieler.lastActive, Spieler.comment, Spieler.discord, NULL, NULL FROM Spieler ' +
    'WHERE Spieler.id > 9 ' +
    'AND Spieler.id NOT IN (SELECT DISTINCT fk_spieler FROM Spieler_Termin) ' +
    'ORDER BY accname';

export async function getUsers() {
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

export async function setComment(spieler, comment) {
    const stmt = 'UPDATE Spieler SET comment = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [comment, spieler]);
    } catch(e) {
        throw e;
    }
}
