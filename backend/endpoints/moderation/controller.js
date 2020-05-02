const _roles = require('../../authentication/role');
const _users = require('./users');
const _raids = require('./raids');
const _invites = require('../raids/invites');
const _discord = require('../../discord/users');
const _guild = require('../../gw2api/guilds');

module.exports = [
    {function: getUsers, path: '/users', method: 'get', authed: true},
    {function: getRaids, path: '/raids', method: 'get', authed: true},
    {function: createRaid, path: '/raids', method: 'post', authed: true},
    {function: invitablePlayers, path: '/raids/invitable', method: 'get', authed: true},
    {function: addPlayer, path: '/raids/spieler', method: 'post', authed: true},
    {function: getPlayersForRaid, path: '/raids/spieler', method: 'get', authed: true},
    {function: setPlayerRole, path: '/raids/role', method: 'put', authed: true},
    {function: removePlayer, path: '/raids/spieler', method: 'delete', authed: true},
    {function: setComment, path: '/users/comment', method: 'put', authed: true},
];

async function getUsers(req, authentication) {
    const role = _roles.getRole(authentication);
    if (role > 0) {
        const users = await _users.getUsers();
        const discordUsers = await _discord.getAllUsers();
        const guildUsers = await _guild.getUsers();
        const guildLog = await _guild.getGuildLog();
        for (const user of users) {
            const discordUser = _discord.findUser(user, discordUsers);
            const guildUser = _guild.findUser(user, guildUsers);
            if (discordUser) {
                user.discord = discordUser;
            } else {
                user.discord = null;
            }
            if (guildUser) {
                user.guild = guildUser;
                user.guildLog = _guild.filterLogByUser(user, guildLog);
            }
        }
        return users;
    }
    return [];
}

async function getRaids(req, authentication) {
    const role = _roles.getRole(authentication);
    if (role > 0) {
        const raids = await _raids.getRaids();
        const discordUsers = await _discord.getAllUsers();
        for (const raid of raids) {
            const users = await _raids.listPlayers(raid.id);
            for (const user of users) {
                const discordUser = _discord.findUser(user, discordUsers);
                if (discordUser) {
                    user.discord = discordUser;
                } else {
                    user.discord = null;
                }
            }
            raid.spieler = users;
        }
        return raids;
    }
    return [];
}

async function getPlayersForRaid(req, authentication) {
    const raid = req.query.raid;
    const role = _roles.getRole(authentication);
    if (role > 0 && raid) {
        const discordUsers = await _discord.getAllUsers();
        const users = await _raids.listPlayers(raid);
        for (const user of users) {
            const discordUser = _discord.findUser(user, discordUsers);
            if (discordUser) {
                user.discord = discordUser;
            }
        }
        return users;
    }
    return [];
}

async function createRaid(req, authentication) {
    const name = req.body.name;
    const role = _roles.getRole(authentication);
    if (role > 0 && name) {
        await _raids.createRaid(name);
    }
    return [];
}

async function invitablePlayers(req, authentication) {
    const raid = req.query.raid;
    const role = _roles.getRole(authentication);
    if (role > 0 && raid) {
        return await _invites.invitable(raid);
    }
    return [];
}

async function addPlayer(req, authentication) {
    const raid = req.body.raid;
    const spieler = req.body.spieler;
    const role = _roles.getRole(authentication);
    if (role > 0 && raid && spieler) {
        await _raids.addPlayer(raid, spieler);
    }
    return [];
}

async function removePlayer(req, authentication) {
    const raid = req.body.raid;
    const spieler = req.body.spieler;
    const role = _roles.getRole(authentication);
    if (role > 0 && raid && spieler) {
        await _raids.removePlayer(raid, spieler);
    }
    return [];
}

async function setPlayerRole(req, authentication) {
    const raid = req.body.raid;
    const spieler = req.body.spieler;
    const role_to_set = req.body.role;
    const role = _roles.getRole(authentication);
    if (role > 0 && raid && spieler && (role_to_set || role_to_set === 0)) {
        await _raids.setPlayerRole(raid, spieler, role_to_set);
    }
}

async function setComment(req, authentication) {
    const spieler = req.body.spieler;
    const comment = req.body.comment;
    if (spieler && comment) {
        const role = _roles.getRole(authentication);
        if (role > 0) await _users.setComment(spieler, comment);
    }
}
