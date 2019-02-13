const db = require('../../db/connector.js');
const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const mailer = require('../../mailer/mailer');

exports.createResetToken = createResetToken;
exports.resetPassword = resetPassword;
exports.tokenCreated = tokenCreated;
exports.deleteToken = deleteToken;

async function createResetToken(accname) {
    const token = uuidv4();
    const user = (await getUserByName(accname))[0];
    if (!user) return;
    await writeResetToken(user.id, token);
    mailer.passwortReset(user, token);
}

async function writeResetToken(user, token) {
    const stmt = 'INSERT INTO PasswordReset (fk_spieler, token) VALUES (?, ?)';
    try {
        db.queryV(stmt, [user, token]);
    } catch(e) {
        throw e;
    }
}

async function resetPassword(token, pwd) {
    const pwdHash = hash.generate(pwd);
    const stmt = 'UPDATE Spieler SET password = ? WHERE id IN (SELECT fk_spieler FROM PasswordReset WHERE token = ?)';
    try {
        return await db.queryV(stmt, [pwdHash, token]);
    } catch(e) {
        throw e;
    }
}

async function getUserByName(name) {
    const stmt = 'SELECT * FROM Spieler WHERE Spieler.accname = ?';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}

async function tokenCreated(token) {
    const stmt = 'SELECT created FROM PasswordReset WHERE token = ?';
    try {
        return await db.queryV(stmt, token);
    } catch(e) {
        throw e;
    }
}

async function deleteToken(token) {
    const stmt = 'DELETE FROM PasswordReset WHERE token = ?';
    try {
        return await db.queryV(stmt, token);
    } catch(e) {
        throw e;
    }
}