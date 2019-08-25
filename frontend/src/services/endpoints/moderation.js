import con from '../connector';

export default { getUsers, getRaids, createRaid };

async function getUsers() {
    return await con('moderation/users', 'get', {}, true);
}

async function getRaids() {
    return await con('moderation/raids', 'get', {}, true);
}

async function createRaid(name) {
    return await con('moderation/raids', 'post', {name}, true);
}
