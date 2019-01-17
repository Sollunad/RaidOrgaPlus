const _progress = require('./progress');
const _insights = require('./insights');

module.exports = [
    {function: getProgress, path: '', method: 'get'},
    {function: getInsights, path: '/li', method: 'get'},
];

async function getProgress(req) {
    const user = req.query.user;
    if (user) {
        return await _progress.progress(user);
    } else {
        return [];
    }
}

async function getInsights(req) {
    const user = req.query.user;
    if (user) {
        return await _insights.insights(user);
    } else {
        return [];
    }
}