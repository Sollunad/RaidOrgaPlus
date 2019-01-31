const db = require('../../db/connector.js');

exports.isArchived = isArchived;
exports.listActive = listActive;
exports.listArchived = listArchived;
exports.listAllIds = listAllIds;
exports.getRaidId = getRaidId;
exports.newTermin = newTermin;
exports.archive = archive;
exports.anmelden = anmelden;
exports.getAnmeldungForSpieler = getAnmeldungForSpieler;
exports.getAnmeldungenForTermin = getAnmeldungenForTermin;
exports.addBoss = addBoss;
exports.addWing = addWing;
exports.isLocked = isLocked;
exports.setLocked = setLocked;
exports.delete = deleteTermin;

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

async function listActive(raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ? AND Termin.isArchived = 0 ORDER BY Termin.date, Termin.time';
    try {
        return (await db.queryV(stmt, raidId)).map(mapTerminDate);
    } catch(e) {
        throw e;
    }
}

async function listArchived(raidId) {
    const stmt = 'SELECT Termin.id, Termin.date, Termin.time FROM Termin JOIN Raid ON Termin.fk_raid = Raid.id WHERE Raid.id = ? AND Termin.isArchived = 1 ORDER BY Termin.date DESC, Termin.time DESC';
    try {
        return (await db.queryV(stmt, raidId)).map(mapTerminDate);
    } catch(e) {
        throw e;
    }
}

function mapTerminDate(termin) {
    let newTerminObject = {id: termin.id};

    let day = termin.date.getDate();
    if (day < 10) day = '0' + day;
    let month = termin.date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = termin.date.getFullYear();
    const dateString = `${day}.${month}.${year}`;

    const weekdayId = termin.date.getDay();
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekday = days[weekdayId];

    newTerminObject.date = `${weekday}, ${dateString}`;
    newTerminObject.time = termin.time.slice(0,5);
    return newTerminObject;
}

async function newTermin(raid, date, time) {
    const stmt = 'INSERT INTO Termin (fk_raid, date, time) VALUES (?,?,?)';
    try {
        return await db.queryV(stmt, [raid, date, time]);
    } catch(e) {
        throw e;
    }
}

async function archive(termin) {
    const stmt = 'UPDATE Termin SET isArchived = 1 WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
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

async function getAnmeldungForSpieler(spieler, termin) {
    const stmt = 'SELECT type FROM Spieler_Termin WHERE fk_spieler = ? AND fk_termin = ?';
    try {
        const response = await db.queryV(stmt, [spieler, termin]);
        if (response.length === 0) return {type: null};
        else return {type: response[0].type};
    } catch(e) {
        throw e;
    }
}

async function getAnmeldungenForTermin(termin) {
    const stmt = 'SELECT Spieler.id, Spieler.name, Spieler.accname, Spieler_Termin.type FROM Spieler_Termin JOIN Spieler ON Spieler.id = Spieler_Termin.fk_spieler WHERE fk_termin = ? ORDER BY Spieler.name';
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
    const stmt = 'INSERT INTO Aufstellung (fk_termin, fk_boss) SELECT ?, id FROM Encounter WHERE wing = ? AND main = 1';
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