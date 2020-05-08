const db = require('../../db/connector.js');
const _session = require('./session.js');
const _user = require('./user.js');
const _discord = require('../../discord/users');
const pw = require('generate-password');
const uuidv4 = require('uuid/v4');

exports.login = loginDiscord;
exports.delete = deleteDiscordKeyForUser;
exports.create = createDiscordKey;

async function loginDiscord(key, discordId, agent) {
    await deleteInvalidKeys();
    const response = await getUserByDiscordKey(key);
    await deleteDiscordKey(key);
    const user = response[0];
    if (user) {
        const discordUser = await _discord.getUser(discordId);
        const discordName = discordUser.nickname;
        const userId = user.fk_spieler;
        const userObject = (await _user.get(userId))[0];
        if (discordName.includes(userObject.accname)) {
            const uuid = uuidv4();
            await _session.startDiscord(userId, uuid, agent);
            await saveDiscordId(userId, discordId);
            return uuid;
        }
    }
}

async function createDiscordKey(user) {
    const randomKey = pw.generate({length: 10, number: true});
    const stmt = 'INSERT INTO DiscordKey (discord_key, fk_spieler) VALUES (?, ?)';
    try {
        await db.queryV(stmt, [randomKey, user]);
        return [randomKey];
    } catch(e) {
        throw e;
    }
}

async function getUserByDiscordKey(key) {
    const stmt = 'SELECT * FROM DiscordKey WHERE discord_key = ? AND created > NOW() - INTERVAL 1 HOUR';
    try {
        return await db.queryV(stmt, key);
    } catch(e) {
        throw e;
    }
}

async function deleteDiscordKey(key) {
    const stmt = 'DELETE FROM DiscordKey WHERE discord_key = ?';
    try {
        return await db.queryV(stmt, key);
    } catch(e) {
        throw e;
    }
}

async function deleteDiscordKeyForUser(user) {
    const stmt = 'DELETE FROM DiscordKey WHERE fk_spieler = ?';
    try {
        return await db.queryV(stmt, user);
    } catch(e) {
        throw e;
    }
}

async function deleteInvalidKeys() {
    const stmt = 'DELETE FROM DiscordKey WHERE created < NOW() - INTERVAL 1 HOUR';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function saveDiscordId(user, id) {
    const stmt = 'UPDATE Spieler SET discord = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [id, user]);
    } catch(e) {
        throw e;
    }
}