import con from '../connector';

export default { progress, insights };

async function progress(user) {
    return await con('progress', 'get', {user: user});
}

async function insights(user) {
    return await con('progress/li', 'get', {user: user});
}
