const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const db = require('../db/connector.js');
const session = require('./session.js');

exports.register = register;

async function register(accName, pwd, name){
    const response = await userExists(accName);
    const count = response[0].count;
    if (count > 0) return;
    const pwdHash = hash.generate(pwd);
    await registerUser(accName, pwdHash, name);
}

async function registerUser(accName, pwdHash, name) {
    const stmt = `INSERT INTO Spieler (accname, password, name) VALUES ('${accName}', '${pwdHash}', '${name}')`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function userExists(accName) {
    const stmt = `SELECT COUNT(*) AS count FROM Spieler WHERE Spieler.accname = '${accName}'`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}