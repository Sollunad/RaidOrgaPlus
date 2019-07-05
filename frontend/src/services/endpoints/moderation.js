import con from '../connector';

export default { getUsers };

async function getUsers() {
    return await con('moderation/users', 'get', {}, true);
}
