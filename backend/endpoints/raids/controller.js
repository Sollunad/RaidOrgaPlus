const _raids = require('./raids');

module.exports = [
    {function: getRaids, path: '', method: 'get'},
    {function: getRole, path: '/role', method: 'get'},
    {function: listPlayers, path: '/players', method: 'get'},
];

async function getRaids(req, authentication) {
    if (authentication) {
        return await _raids.listForPlayer(authentication.user);
    } else {
        return [];
    }
}

async function getRole(req, authentication) {
    const raid = req.query.raid;
    if (authentication && raid) {
        return {role: authentication.roles[raid]};
    } else {
        return [];
    }
}

async function listPlayers(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        return await _raids.listPlayers(raid);
    } else {
        return [];
    }
}