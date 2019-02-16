const db = require('../../db/connector.js');
const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const mailer = require('../../mailer/mailer');

exports.createResetToken = createResetToken;
exports.resetPassword = resetPassword;
exports.tokenCreated = tokenCreated;
exports.deleteToken = deleteToken;
exports.deleteInvalidTokens = deleteInvalidTokens;

async function createResetToken(accname) {
    await deleteInvalidTokens();
    const user = (await getUserByName(accname))[0];
    if (!user) return;
    const activeToken = (await activeTokens(user.id))[0];
    if (activeToken) {
        mailer.passwortReset(user, activeToken.token);
    } else {
        const token = uuidv4();
        await writeResetToken(user.id, token);
        mailer.passwortReset(user, token);
    }
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

async function deleteInvalidTokens() {
    const stmt = 'DELETE FROM PasswordReset WHERE created < NOW() - INTERVAL 1 DAY';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function activeTokens(user) {
    const stmt = 'SELECT token FROM PasswordReset WHERE created > NOW() - INTERVAL 1 DAY AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, user);
    } catch(e) {
        throw e;
    }
}