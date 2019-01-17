import con from '../connector';

export default { listForPlayer, role, listPlayers };

async function listForPlayer() {
    return await con('raids', 'get', {});
}

async function role(raid) {
    return (await con('raids/role', 'get', {raid: raid})).role;
}

async function listPlayers(raid) {
    return await con('raids/players', 'get', {raid: raid});
}