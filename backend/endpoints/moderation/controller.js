const _roles = require('../../authentication/role');
const _users = require('./users');
const _discord = require('../../discord/users');
const _guild = require('../../gw2api/guilds');

module.exports = [
    {function: getUsers, path: '/users', method: 'get', authed: true}
];

async function getUsers(req, authentication) {
    const role = _roles.getRole(authentication);
    if (role > 0) {
        const users = await _users.getUsers();
        const discordUsers = await _discord.getAllUsers();
        const guildUsers = await _guild.getUsers();
        for (const user of users) {
            const discordUser = _discord.findUser(user, discordUsers);
            const guildUser = _guild.findUser(user, guildUsers);
            if (discordUser) {
                user.discord = discordUser;
            }
            if (guildUser) {
                user.guild = guildUser;
            }
        }
        return users;
    }
    return [];
}