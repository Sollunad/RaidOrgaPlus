const raids = require('./raids');

module.exports = [
    {function: getRaid, path: '', method: 'get'},
];

async function getRaid(req, res) {
    const user_id = req.query.user;
    const raid_id = req.query.raid;
    if (user_id) {
        res.send(await raids.listForPlayer(user_id));
    } else if (raid_id) {
        res.send(await raids.get(raid_id));
    } else {
        res.send([]);
    }
}