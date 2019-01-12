const progress = require('./progress');

module.exports = [
    {function: getProgress, path: '', method: 'get'},
];

async function getProgress(req, res) {
    const user_id = req.query.user;
    if (user_id) {
        res.send(await progress.progress(user_id));
    } else {
        res.send([]);
    }
}