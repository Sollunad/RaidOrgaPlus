const db = require('../db/connector.js');
const api = require('../gw2api/api');
const users = require('./user');

exports.api = getApiKey;
exports.setApi = setApiKey;
exports.hasApi = hasApiKey;

async function getApiKey(userId) {
    const stmt = 'SELECT apikey FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function hasApiKey(userId) {
    const api_key = await getApiKey(userId);
    return (api_key && api_key[0].apikey !== '' && api_key[0].apikey !== null);
}

async function setApiKey(userId, apiKey) {
    try {
        const user = (await users.get(userId))[0];
        const keyName = await api.accName(apiKey);
        if (keyName === user.accname) {
            if (await enoughPermissions(apiKey)) {
                const stmt = 'UPDATE Spieler SET apikey = ? WHERE id = ?';
                db.queryV(stmt, [apiKey, userId]);
                return 'Success';
            } else {
                return 'Permissions';
            }
        } else {
            return 'Wrong account';
        }
    } catch(e) {
        return '';
    }

}

async function enoughPermissions(apiKey){
    try {
        const permissions = await api.permissions(apiKey);
        const required = ['progression'];
        for (req of required) {
            if (!permissions.includes(req)) return false;
        }
        return true;
    } catch(e) {
        return false;
    }
}

