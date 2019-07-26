import con from '../connector';

export default { getUsers, getRaids };

async function getUsers() {
    return await con('moderation/users', 'get', {}, true);
}

async function getRaids() {
    return await con('moderation/raids', 'get', {}, true);
}
