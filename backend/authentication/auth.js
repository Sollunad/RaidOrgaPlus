const _users = require('../endpoints/users/session');
const _raids = require('../endpoints/raids/raids');

exports.auth = authenticate;

async function authenticate(uuid) {
    if (!uuid) return;
    const response = (await _users.getUser(uuid))[0];
    if (!response) return;
    let authObject = { user: response.user };
    const raids = await _raids.listForPlayer(authObject.user);
    let roles = [];
    raids.forEach(r => {
        roles[r.id] = r.role;
    });
    authObject.roles = roles;
    return authObject;
}