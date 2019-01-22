const _raids = require('./raids');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getRaids, path: '', method: 'get', authed: true},
    {function: getRole, path: '/role', method: 'get', authed: true},
    {function: listPlayers, path: '/players', method: 'get', authed: true},
];

async function getRaids(req, authentication) {
    return await _raids.listForPlayer(authentication.user);
}

async function getRole(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        return {role: role};
    } else {
        return [];
    }
}

async function listPlayers(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role >= 0) return await _raids.listPlayers(raid);
    }
    return [];
}