const db = require('../../db/connector.js');

exports.getForTermin = getForTermin;
exports.getForAufstellung = getForAufstellung;
exports.setClass = setClass;
exports.setRole = setRole;
exports.setName = setName;

async function getForTermin(termin) {
    const stmt = 'SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung ' +
        ' JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id' +
        ' JOIN Klasse ON Klasse.id = AufstellungElement.fk_class' +
        ' JOIN Rolle ON Rolle.id = AufstellungElement.fk_role' +
        ' JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler' +
        ' WHERE Aufstellung.fk_termin = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function getForAufstellung(aufstellung) {
    const stmt = 'SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung ' +
        ' JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id' +
        ' JOIN Klasse ON Klasse.id = AufstellungElement.fk_class' +
        ' JOIN Rolle ON Rolle.id = AufstellungElement.fk_role' +
        ' JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler' +
        ' WHERE Aufstellung.id = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}

async function setClass(aufstellung, position, clss){
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, clss, clss]);
    } catch(e) {
        throw e;
    }
}

async function setRole(aufstellung, position, role){
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_role) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_role = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, role, role]);
    } catch(e) {
        throw e;
    }
}

async function setName(aufstellung, position, name){
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_spieler) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_spieler = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, name, name]);
    } catch(e) {
        throw e;
    }
}