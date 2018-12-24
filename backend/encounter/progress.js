const sf = require('snekfetch');
const user = require('../user/user');

exports.progress = raidProgress;

async function raidProgress(userId) {
    try {
        const sf_api = await user.api(userId);
        if (!sf_api) return [];
        const key = sf_api[0].apikey;
        const sf_progress = await fetchProgress(key);
        return sf_progress.body;
    } catch (e) {
        return [];
    }
}

async function fetchProgress(key) {
    const options = {
        "headers": {
            "Authorization": "Bearer " + key
        }
    };
    const url = 'https://api.guildwars2.com/v2/account/raids';
    return await sf.get(url, options);
}