import con from '../connector';

export default { listForPlayer, get, role, listPlayers };

async function listForPlayer(user) {
    return await con('raids', 'get', {user: user});
}

async function get(raid) {
    return await con('raids', 'get', {raid: raid});
}

async function role(raid, user) {
    return (await con('raids/role', 'get', {raid: raid, user: user})).role;
}

async function listPlayers(raid) {
    return await con('raids/players', 'get', {raid: raid});
}