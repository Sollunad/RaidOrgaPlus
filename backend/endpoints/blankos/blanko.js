const db = require('../../db/connector.js');

exports.getElementsByEncounter = getElementsByEncounter;
exports.getAllElements = getAllElements;
exports.setClass = setClass;
exports.setRole = setRole;
exports.copyFromTo = copyFromTo;

async function getElementsByEncounter(raid, enc) {
    const stmt = 'SELECT BlankoElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role FROM BlankoElement ' +
        'JOIN Klasse ON Klasse.id = BlankoElement.fk_class ' +
        'JOIN Rolle ON Rolle.id = BlankoElement.fk_role ' +
        'WHERE fk_raid = ? AND fk_boss = ?';
    try {
        return await db.queryV(stmt, [raid, enc]);
    } catch(e) {
        throw e;
    }
}

async function getAllElements(raid) {
    const stmt = 'SELECT BlankoElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, BlankoElement.fk_boss AS enc FROM BlankoElement ' +
        'JOIN Klasse ON Klasse.id = BlankoElement.fk_class ' +
        'JOIN Rolle ON Rolle.id = BlankoElement.fk_role ' +
        'WHERE fk_raid = ?';
    try {
        return await db.queryV(stmt, raid);
    } catch(e) {
        throw e;
    }
}

async function setClass(raid, enc, position, clss) {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
    try {
        return await db.queryV(stmt, [raid, enc, position, clss, clss]);
    } catch(e) {
        throw e;
    }
}

async function setRole(raid, enc, position, role) {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE fk_role = ?';
    try {
        return await db.queryV(stmt, [raid, enc, position, role, role]);
    } catch(e) {
        throw e;
    }
}

async function copyFromTo(raid, from, to) {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class, fk_role) ' +
        'SELECT ?, ?, position, fk_class, fk_role ' +
        'FROM BlankoElement fr ' +
        'WHERE fk_raid = ? AND fk_boss = ? ' +
        'ON DUPLICATE KEY UPDATE fk_class = fr.fk_class, fk_role = fr.fk_role';
    try {
        return await db.queryV(stmt, [raid, to, raid, from]);
    } catch(e) {
        throw e;
    }
}