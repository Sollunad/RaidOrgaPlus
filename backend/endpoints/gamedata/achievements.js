const api = require('../../gw2api/achievements.js');

exports.getAchievements = getAchievements;

async function getAchievements() {
    return api.getAchievements();
}