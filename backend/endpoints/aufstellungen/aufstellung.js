const db = require('../../db/connector.js');

exports.getForTermin = getForTermin;
exports.getRaidId = getRaidId;
exports.delete = deleteBoss;
exports.getSuccess = getSuccess;
exports.setSuccess = setSuccess;

async function getForTermin(termin) {
    const stmt = 'SELECT Aufstellung.id, Encounter.name, Encounter.abbr FROM Aufstellung JOIN Encounter ON Encounter.id = Aufstellung.fk_boss WHERE fk_termin = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function getRaidId(aufstellung) {
    const stmt = 'SELECT Raid.id FROM Aufstellung JOIN Termin ON Termin.id = Aufstellung.fk_termin JOIN Raid ON Raid.id = Termin.fk_raid WHERE Aufstellung.id = ?';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}

async function deleteBoss(aufstellung) {
    const stmt = 'DELETE FROM Aufstellung WHERE id = ?';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}

async function getSuccess(aufstellung) {
    const stmt = 'SELECT success FROM Aufstellung WHERE id = ?';
    try {
        const response = await db.queryV(stmt, aufstellung);
        return response[0].success === 1;
    } catch(e) {
        throw e;
    }
}

async function setSuccess(aufstellung, success) {
    const stmt = 'UPDATE Aufstellung SET success = ? WHERE id = ?';
    try {
        const successValue = success? 1 : 0;
        return await db.queryV(stmt, [successValue, aufstellung]);
    } catch(e) {
        throw e;
    }
}

