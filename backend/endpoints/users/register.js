const hash = require('password-hash');
const db = require('../../db/connector.js');

exports.register = register;

async function register(accName, pwd, name, email){
    const response = await userExists(accName);
    const count = response[0].count;
    if (count > 0) return false;
    const pwdHash = hash.generate(pwd);
    registerUser(accName, pwdHash, name, email);
    return true;
}

function registerUser(accName, pwdHash, name, email) {
    const stmt = 'INSERT INTO Spieler (accname, password, name, email) VALUES (?, ?, ?, ?)';
    try {
        db.queryV(stmt, [accName, pwdHash, name, email]);
    } catch(e) {
        throw e;
    }
}

async function userExists(accName) {
    const stmt = 'SELECT COUNT(*) AS count FROM Spieler WHERE Spieler.accname = ?';
    try {
        return await db.queryV(stmt, accName);
    } catch(e) {
        throw e;
    }
}