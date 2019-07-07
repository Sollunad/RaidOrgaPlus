const db = require('../../db/connector.js');
const hash = require('password-hash');

exports.get = getForId;
exports.getAllForId = getAllForId;
exports.changeName = changeName;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.hasProgressShared = hasProgressShared;
exports.setProgressShared = setProgressShared;

async function getForId(userId) {
    const stmt = 'SELECT id, accname, name, role FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function getAllForId(userId) {
    const stmt = 'SELECT * FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function changeName(userId, name) {
    try {
        const stmt = 'UPDATE Spieler SET name = ? WHERE id = ?';
        return await db.queryV(stmt, [name, userId]);
    } catch(e) {
        throw e;
    }
}

async function changeEmail(userId, email) {
    const stmt = 'UPDATE Spieler SET email = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [email, userId]);
    } catch(e) {
        throw e;
    }
}

async function changePassword(userId, pwd) {
    const pwdHash = hash.generate(pwd);
    const stmt = 'UPDATE Spieler SET password = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [pwdHash, userId]);
    } catch(e) {
        throw e;
    }
}

async function hasProgressShared(userId) {
    const stmt = 'SELECT share FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function setProgressShared(userId, value) {
    const stmt = 'UPDATE Spieler SET share = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [value, userId]);
    } catch(e) {
        throw e;
    }
}



