const user = require('../users/apikey');
const api = require('../../gw2api/api');

exports.progress = raidProgress;

async function raidProgress(userId) {
    try {
        const sf_api = await user.api(userId);
        if (!sf_api) return [];
        const key = sf_api[0].apikey;
        return await api.fetchProgress(key);
    } catch (e) {
        return [];
    }
}

