const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const db = require('../../db/connector.js');
const session = require('./session.js');

exports.register = register;

async function register(accName, pwd, name){
    const response = await userExists(accName);
    const count = response[0].count;
    console.log(count);
    if (count > 0) return false;
    const pwdHash = hash.generate(pwd);
    registerUser(accName, pwdHash, name);
    return true;
}

function registerUser(accName, pwdHash, name) {
    const stmt = 'INSERT INTO Spieler (accname, password, name) VALUES (?, ?, ?)';
    try {
        db.queryV(stmt, [accName, pwdHash, name]);
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