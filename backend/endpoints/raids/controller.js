const _raids = require('./raids');

module.exports = [
    {function: getRaid, path: '', method: 'get'},
    {function: getRole, path: '/role', method: 'get'},
    {function: listPlayers, path: '/players', method: 'get'},
];

async function getRaid(req, res) {
    const user = req.query.user;
    const raid = req.query.raid;
    if (user) {
        res.send(await _raids.listForPlayer(user));
    } else if (raid) {
        res.send(await _raids.get(raid));
    } else {
        res.send([]);
    }
}

async function getRole(req, res) {
    const user = req.query.user;
    const raid = req.query.raid;
    if (user && raid) {
        res.send(await _raids.role(raid, user));
    } else {
        res.send([]);
    }
}

async function listPlayers(req, res) {
    const raid = req.query.raid;
    if (raid) {
        res.send(await _raids.listPlayers(raid));
    } else {
        res.send([]);
    }
}