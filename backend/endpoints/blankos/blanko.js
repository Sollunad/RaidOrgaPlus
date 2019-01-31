const db = require('../../db/connector.js');

exports.getRaidId = getRaidId;
exports.getForEncounter = getForEncounter;
exports.getForRaid = getForRaid;
exports.postDefaultBlanko = postDefaultBlanko;
exports.postBlanko = postBlanko;
exports.getElements = getElements;
exports.setClass = setClass;
exports.setRole = setRole;

async function getRaidId(blanko) {
    const stmt = 'SELECT Raid.id FROM Blanko JOIN Raid ON Raid.id = Blanko.fk_raid WHERE Blanko.id = ?';
    try {
        return await db.queryV(stmt, blanko);
    } catch(e) {
        throw e;
    }
}

async function getForEncounter(raid, enc) {
    const stmt = 'SELECT id FROM Blanko WHERE fk_raid = ? AND fk_boss = ?';
    try {
        return await db.queryV(stmt, [raid, enc]);
    } catch(e) {
        throw e;
    }
}

async function getForRaid(raid) {
    const stmt = 'SELECT id FROM Blanko WHERE fk_raid = ?';
    try {
        return await db.queryV(stmt, raid);
    } catch(e) {
        throw e;
    }
}

async function postDefaultBlanko(raid, enc) {
    const stmt = 'INSERT INTO Blanko (fk_raid, fk_boss, def) VALUES (?, ?, 1)';
    try {
        return await db.queryV(stmt, [raid, enc]);
    } catch(e) {
        throw e;
    }
}

async function postBlanko(raid, enc) {
    const stmt = 'INSERT INTO Blanko (fk_raid, fk_boss, def) VALUES (?, ?, 0)';
    try {
        return await db.queryV(stmt, [raid, enc]);
    } catch(e) {
        throw e;
    }
}

async function getElements(blanko) {
    const stmt = 'SELECT position, fk_class AS class, fk_role AS role FROM BlankoElement WHERE fk_blanko = ?';
    try {
        return await db.queryV(stmt, blanko);
    } catch(e) {
        throw e;
    }
}

async function setClass(blanko, position, clss) {
    const stmt = 'INSERT INTO BlankoElement (fk_blanko, position, fk_class) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
    try {
        return await db.queryV(stmt, [blanko, position, clss, clss]);
    } catch(e) {
        throw e;
    }
}

async function setRole(blanko, position, role) {
    const stmt = 'INSERT INTO BlankoElement (fk_blanko, position, fk_role) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_role = ?';
    try {
        return await db.queryV(stmt, [blanko, position, role, role]);
    } catch(e) {
        throw e;
    }
}