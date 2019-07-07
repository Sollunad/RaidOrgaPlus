const _progress = require('./progress');
const _user = require('../users/user');
const _insights = require('./insights');
const _achievements = require('./achievements');

module.exports = [
    {function: getProgress, path: '', method: 'get', authed: true},
    {function: getInsights, path: '/li', method: 'get', authed: true},
    {function: getAchievements, path: '/achievements', method: 'get', authed: true},
];

async function getProgress(req, authentication) {
    const user = req.query.user;
    if (user) {
        const isShared = await getShareValue(user);
        console.log(isShared);
        if (isShared) return await _progress.progress(user);
        else return false;
    } else {
        return await _progress.progress(authentication.user);
    }
}

async function getInsights(req, authentication) {
    const user = req.query.user;
    if (user) {
        const isShared = await getShareValue(user);
        if (isShared) return await _insights.insights(user);
        else return false;
    } else {
        return await _insights.insights(authentication.user);
    }
}

async function getAchievements(req, authentication) {
    return await _achievements.achievementsDone(authentication.user);
}

async function getShareValue(user) {
    const response = await _user.hasProgressShared(user);
    if (response.length > 0) {
        const sharedValue = response[0].share;
        return (!!sharedValue)
    }
}