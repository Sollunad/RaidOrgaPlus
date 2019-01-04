const db = require('../db/connector.js');

exports.getAll = getAll;

async function getAll(aufstellung) {
    const stmt = 'SELECT AufstellungElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, Spieler.name AS spieler FROM AufstellungElement ' +
        ' JOIN Klasse ON Klasse.id = AufstellungElement.fk_class' +
        ' JOIN Rolle ON Rolle.id = AufstellungElement.fk_role' +
        ' JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler' +
        ' WHERE fk_aufstellung = ?';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}