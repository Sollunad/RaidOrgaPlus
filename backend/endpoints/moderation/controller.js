const _roles = require('../../authentication/role');
const _users = require('./users');

module.exports = [
    {function: getUsers, path: '/users', method: 'get', authed: true}
];

async function getUsers(req, authentication) {
    const role = _roles.getRole(authentication);
    if (role > 0) {
        return await _users.getUsers();
    }
    return [];
}