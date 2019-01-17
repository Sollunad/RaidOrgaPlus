const _raids = require('./raids');

module.exports = [
    {function: getRaid, path: '', method: 'get'},
    {function: getRole, path: '/role', method: 'get'},
    {function: listPlayers, path: '/players', method: 'get'},
];

async function getRaid(req) {
    const user = req.query.user;
    const raid = req.query.raid;
    if (user) {
        return await _raids.listForPlayer(user);
    } else if (raid) {
        return await _raids.get(raid);
    } else {
        return [];
    }
}

async function getRole(req) {
    const user = req.query.user;
    const raid = req.query.raid;
    if (user && raid) {
        return await _raids.role(raid, user);
    } else {
        return [];
    }
}

async function listPlayers(req) {
    const raid = req.query.raid;
    if (raid) {
        return await _raids.listPlayers(raid);
    } else {
        return [];
    }
}