import con from '../connector';

export default { getUsers, getRaids, createRaid, invitablePlayers, addSpieler };

async function getUsers() {
    return await con('moderation/users', 'get', {}, true);
}

async function getRaids() {
    return await con('moderation/raids', 'get', {}, true);
}

async function createRaid(name) {
    return await con('moderation/raids', 'post', {name}, true);
}

async function invitablePlayers(raid) {
    return await con('moderation/raids/invitable', 'get', {raid}, true);
}

async function addSpieler(raid, spieler) {
    return await con('moderation/raids/spieler', 'post', {raid, spieler}, true);
}
