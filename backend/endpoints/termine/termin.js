const db = require('../../db/connector.js');
const dateMapper = require('./dateMapper');

exports.isArchived = isArchived;
exports.listActive = listActive;
exports.listArchived = listArchived;
exports.listAllIds = listAllIds;
exports.getRaidId = getRaidId;
exports.newTermin = newTermin;
exports.newTerminWithEndTime = newTerminWithEndTime;
exports.archive = archive;
exports.addBoss = addBoss;
exports.addWing = addWing;
exports.isLocked = isLocked;
exports.setLocked = setLocked;
exports.delete = deleteTermin;
exports.getText = getText;
exports.saveText = saveText;

async function isArchived(terminId) {
    const stmt = 'SELECT isArchived FROM Termin WHERE id = ?';
    try {
        const response = await db.queryV(stmt, terminId);
        return (response[0] && response[0].isArchived === 1);
    } catch(e) {
        throw e;
    }
}

async function isLocked(terminId) {
    const stmt = 'SELECT isLocked FROM Termin WHERE id = ?';
    try {
        const response = await db.queryV(stmt, terminId);
        return (response[0] && response[0].isLocked === 1);
    } catch(e) {
        throw e;
    }
}

async function setLocked(terminId, locked) {
    const stmt = 'UPDATE Termin SET isLocked = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [locked, terminId]);
    } catch(e) {
        throw e;
    }
}

async function getRaidId(terminId) {
    const stmt = 'SELECT Raid.id FROM Raid JOIN Termin ON Termin.fk_raid = Raid.id WHERE Termin.id = ?';
    try {
        return (await db.queryV(stmt, terminId));
    } catch(e) {
        throw e;
    }
}

async function listAllIds(raidId) {
    const stmt = 'SELECT Termin.id FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ?';
    try {
        return (await db.queryV(stmt, raidId));
    } catch(e) {
        throw e;
    }
}

async function listActive(userId, raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time, Termin.endtime, Spieler_Termin.type ' +
        'FROM Termin ' +
        'JOIN Raid ON Termin.fk_raid = Raid.id ' +
        'LEFT JOIN Spieler_Termin ON Spieler_Termin.fk_spieler = ? AND Spieler_Termin.fk_termin = Termin.id ' +
        'WHERE Raid.id = ? AND Termin.isArchived = 0 ' +
        'ORDER BY Termin.date, Termin.time';
    try {
        return (await db.queryV(stmt, [userId, raidId])).map(dateMapper.map);
    } catch(e) {
        throw e;
    }
}

async function listArchived(raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time, Termin.endtime FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ? AND Termin.isArchived = 1 ORDER BY Termin.date DESC, Termin.time DESC';
    try {
        return (await db.queryV(stmt, raidId)).map(dateMapper.map);
    } catch(e) {
        throw e;
    }
}

async function newTermin(raid, date, time) {
    const stmt = 'INSERT INTO Termin (fk_raid, date, time) VALUES (?,?,?)';
    try {
        return await db.queryV(stmt, [raid, date, time]);
    } catch(e) {
        throw e;
    }
}

async function newTerminWithEndTime(raid, date, time, endtime) {
    const stmt = 'INSERT INTO Termin (fk_raid, date, time, endtime) VALUES (?,?,?,?)';
    try {
        return await db.queryV(stmt, [raid, date, time, endtime]);
    } catch(e) {
        throw e;
    }
}


async function archive(termin) {
    const stmt = 'UPDATE Termin SET isArchived = 1, isLocked = 0, preview = 0 WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
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
    const stmt = 'INSERT INTO Aufstellung (fk_termin, fk_boss) SELECT ?, id FROM Encounter WHERE wing = ?';
    try {
        return await db.queryV(stmt, [termin, wing]);
    } catch(e) {
        throw e;
    }
}

async function deleteTermin(termin) {
    const stmt = 'DELETE FROM Termin WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function getText(termin) {
    const stmt = 'SELECT text FROM Termin WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function saveText(termin, text) {
    const stmt = 'UPDATE Termin SET text = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [text, termin]);
    } catch(e) {
        throw e;
    }
}