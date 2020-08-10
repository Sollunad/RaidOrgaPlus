const _raids = require('./raids');
const _invites = require('./invites');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getRaids, path: '', method: 'get', authed: true},
    {function: getRole, path: '/role', method: 'get', authed: true},
    {function: listPlayers, path: '/players', method: 'get', authed: true},
    {function: kickPlayer, path: '/players', method: 'delete', authed: true},
    {function: getInvitablePlayers, path: '/invitable', method: 'get', authed: true},
    {function: invitePlayer, path: '/invites', method: 'post', authed: true},
    {function: getPendingInvites, path: '/invites', method: 'get', authed: true},
    {function: acceptInvite, path: '/invites/accept', method: 'post', authed: true},
    {function: deleteInvite, path: '/invites', method: 'delete', authed: true},
    {function: anmeldungStatesForUser, path: '/anmeldungen', method: 'get', authed: true},
];

async function getRaids(req, authentication) {
    return await _raids.listForPlayer(authentication.user);
}

async function getRole(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        return {role: role};
    }
    return [];
}

async function listPlayers(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role != null) return await _raids.listPlayers(raid);
    }
    return [];
}

async function invitePlayer(req, authentication) {
    const user = req.body.user;
    const raid = req.body.raid;
    if (user && raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) return await _invites.invitePlayer(user, raid);
    }
    return [];
}

async function getInvitablePlayers(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) return await _invites.invitable(raid);
    }
    return [];
}

async function getPendingInvites(req, authentication) {
    const raid = req.query.raid;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) return (await _invites.pendingForRaid(raid)).map(p => p.spieler);
    } else {
        return (await _invites.pendingForPlayer(authentication.user));
    }
    return [];
}

async function acceptInvite(req, authentication) {
    const raid = req.body.raid;
    if (raid) {
        if (await _invites.isInvited(raid, authentication.user)){
            return await _invites.accept(raid, authentication.user);
        }
    }
    return [];
}

async function deleteInvite(req, authentication) {
    const raid = req.body.raid;
    const user = req.body.user;
    if (raid) {
        if (user){
            const role = await _roles.forRaid(authentication, raid);
            if (role > 0) return await _invites.delete(raid, user);
        } else {
            return await _invites.delete(raid, authentication.user);
        }
    }
    return [];
}

async function anmeldungStatesForUser(req, authentication) {
    return (await _raids.anmeldungStatesForUser(authentication.user));
}

async function kickPlayer(req, authentication) {
    const raid = req.body.raid;
    const user = req.body.user;
    if (raid && user) {
        const role = await _roles.forRaid(authentication, raid);
        const kickRole = (await _raids.getRoleForPlayer(raid, user))[0].role;
        if (role > 0 && role > kickRole) {
            return _raids.kickPlayer(raid, user).then(async () => {
                return await _raids.listPlayers(raid);
            });
        }
    }
}