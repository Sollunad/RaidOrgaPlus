const db = require('../db/connector.js');
const api = require('../gw2api/api');

exports.get = getForId;
exports.api = getApiKey;
exports.setApi = setApiKey;
exports.hasApi = hasApiKey;

async function getForId(userId) {
    const stmt = `SELECT id, accname, name FROM Spieler WHERE id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function getApiKey(userId) {
    const stmt = `SELECT apikey FROM Spieler WHERE id = ${userId}`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

async function hasApiKey(userId) {
    const api_key = await getApiKey(userId);
    return (api_key && api_key[0].apikey !== '');
}

async function setApiKey(userId, apiKey) {
    const user = (await getForId(userId))[0];
    try {
        const keyName = await api.accName(apiKey);
        if (keyName === user.accname) {
            const stmt = `UPDATE Spieler SET apikey = '${apiKey}' WHERE id = ${userId}`;
            db.query(stmt);
            return true;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }

}