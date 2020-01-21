import con from '../connector';

export default { getUsers, getRaids, createRaid, invitablePlayers, addSpieler, removeSpieler, setPlayerRole, getSpielerForRaid, setComment };

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

async function removeSpieler(raid, spieler) {
    return await con('moderation/raids/spieler', 'delete', {raid, spieler}, true);
}

async function getSpielerForRaid(raid) {
    return await con('moderation/raids/spieler', 'get', {raid}, true);
}

async function setPlayerRole(raid, spieler, role) {
    return await con('moderation/raids/role', 'put', {raid, spieler, role}, true);
}

async function setComment(spieler, comment) {
    return await con('moderation/users/comment', 'put', {spieler, comment}, true);
}
