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
    {function: addPlayer, path: '/raids/spieler', method: 'post', authed: true}
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
                }
            }
            raid.spieler = users;

        }
        return raids;
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