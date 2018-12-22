const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const db = require('../db/connector.js');
const session = require('./session.js');

exports.login = login;

async function login(username, pwd){
    const response = await getUserByName(username);
    const user = response[0];
    if (user) {
        const correctPwd = hash.verify(pwd, user.password);
        if (correctPwd){
            const uuid = uuidv4();
            session.start(user.id, uuid);
            return [uuid];
        }
    }
}

async function getUserByName(name) {
    const stmt = `SELECT * FROM Spieler WHERE Spieler.accname = '${name}'`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}



