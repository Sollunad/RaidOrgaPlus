const _progress = require('./progress');
const _insights = require('./insights');

module.exports = [
    {function: getProgress, path: '', method: 'get'},
    {function: getInsights, path: '/li', method: 'get'},
];

async function getProgress(req, res) {
    const user = req.query.user;
    if (user) {
        res.send(await _progress.progress(user));
    } else {
        res.send([]);
    }
}

async function getInsights(req, res) {
    const user = req.query.user;
    if (user) {
        const li = await _insights.insights(user);
        res.send({li: li});
    } else {
        res.send([]);
    }
}