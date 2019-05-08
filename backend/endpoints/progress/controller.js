const _progress = require('./progress');
const _insights = require('./insights');
const _achievements = require('./achievements');

module.exports = [
    {function: getProgress, path: '', method: 'get', authed: true},
    {function: getInsights, path: '/li', method: 'get', authed: true},
    {function: getAchievements, path: '/achievements', method: 'get', authed: true},
];

async function getProgress(req, authentication) {
    return await _progress.progress(authentication.user);
}

async function getInsights(req, authentication) {
    return await _insights.insights(authentication.user);
}

async function getAchievements(req, authentication) {
    return await _achievements.achievementsDone(authentication.user);
}