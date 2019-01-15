import con from '../connector';

export default { progress };

async function progress(userId) {
    return await con('progress', 'get', {user: userId});
}
