const raids = require('./raids');

module.exports = [
    {function: getRaid, path: '', method: 'get'},
    {function: getRole, path: '/role', method: 'get'},
    {function: listPlayers, path: '/players', method: 'get'},
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

async function getRole(req, res) {
    const user_id = req.query.user;
    const raid_id = req.query.raid;
    if (user_id && raid_id) {
        res.send(await raids.role(raid_id, user_id));
    } else {
        res.send([]);
    }
}

async function listPlayers(req, res) {
    const raid_id = req.query.raid;
    if (raid_id) {
        res.send(await raids.listPlayers(raid_id));
    } else {
        res.send([]);
    }
}