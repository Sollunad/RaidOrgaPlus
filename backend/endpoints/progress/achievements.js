const user = require('../users/apikey');
const api = require('../../gw2api/account');

exports.achievementsDone = achievementsDone;

async function achievementsDone(userId) {
    try {
        const sf_api = await user.api(userId);
        if (!sf_api) return [];
        const key = sf_api[0].apikey;
        if (!key) return [];
        return await api.getDoneAchievements(key);
    } catch (e) {
        return [];
    }
}

