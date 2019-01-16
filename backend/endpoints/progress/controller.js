const _progress = require('./progress');

module.exports = [
    {function: getProgress, path: '', method: 'get'},
];

async function getProgress(req, res) {
    const user = req.query.user;
    if (user) {
        res.send(await _progress.progress(user));
    } else {
        res.send([]);
    }
}