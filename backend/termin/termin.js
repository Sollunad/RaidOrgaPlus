const db = require('../db/connector.js');

exports.listActive = listActive;
exports.listArchived = listArchived;
exports.anmelden = anmelden;
exports.getAnmeldung = getAnmeldung;
exports.addBoss = addBoss;
exports.addWing = addWing;

async function listActive(raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ? AND Termin.isArchived = 0';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function listArchived(raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ? AND Termin.isArchived = 1';
    try {
        return await db.queryV(stmt, raidId);
    } catch(e) {
        throw e;
    }
}

async function anmelden(spieler, termin, type) {
    const stmt = 'INSERT INTO Spieler_Termin (fk_spieler, fk_termin, type) VALUES (?,?,?) ON DUPLICATE KEY UPDATE type=?';
    try {
        return await db.queryV(stmt, [spieler, termin, type, type]);
    } catch(e) {
        throw e;
    }
}

async function getAnmeldung(spieler, termin) {
    const stmt = 'SELECT type FROM Spieler_Termin WHERE fk_spieler = ? AND fk_termin = ?';
    try {
        return await db.queryV(stmt, [spieler, termin]);
    } catch(e) {
        throw e;
    }
}

async function addBoss(termin, boss) {
    const stmt = 'INSERT INTO Aufstellung (fk_termin, fk_boss) VALUES (?,?)';
    try {
        return await db.queryV(stmt, [termin, boss]);
    } catch(e) {
        throw e;
    }
}

async function addWing(termin, wing) {
    const stmt = 'INSERT INTO Aufstellung (fk_termin, fk_boss) SELECT ?, id FROM Encounter WHERE wing = ? AND main = 1';
    try {
        return await db.queryV(stmt, [termin, wing]);
    } catch(e) {
        throw e;
    }
}