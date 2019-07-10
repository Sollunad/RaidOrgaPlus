const _roles = require('../../authentication/role');
const _users = require('./users');
const _discord = require('../../discord/users');

module.exports = [
    {function: getUsers, path: '/users', method: 'get', authed: true}
];

async function getUsers(req, authentication) {
    const role = _roles.getRole(authentication);
    if (role > 0) {
        const users = await _users.getUsers();
        const discordUsers = await _discord.getAllUsers();
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