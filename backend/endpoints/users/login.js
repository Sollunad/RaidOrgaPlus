const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const db = require('../../db/connector.js');
const session = require('./session.js');

exports.login = login;
exports.loginDiscord = loginDiscord;

async function login(username, pwd){
    const response = await getUserByName(username);
    const user = response[0];
    if (user) {
        const correctPwd = hash.verify(pwd, user.password);
        if (correctPwd){
            const uuid = uuidv4();
            session.start(user.id, uuid);
            return uuid;
        }
    }
}

async function loginDiscord(key) {
    //TODO #182: Alle abgelaufenen Keys löschen
    const response = await getUserByDiscordKey(key);
    const user = response[0];
    if (user) {
        //TODO #182: Key löschen
        const uuid = uuidv4();
        session.start(user.fk_spieler, uuid);
        return uuid;
    }
}

async function createDiscordKey(user) {
    //TODO #182
    const stmt = '';
    try {
        return await db.queryV(stmt, user);
    } catch(e) {
        throw e;
    }
}

async function getUserByDiscordKey(key) {
    //TODO #182 Gültigkeit überprüfen
    const stmt = 'SELECT * FROM DiscordKey WHERE discord_key = ?';
    try {
        return await db.queryV(stmt, key);
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



