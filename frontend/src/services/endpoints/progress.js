import con from '../connector';

export default { progress, insights, achievements };

async function progress() {
    return await con('progress', 'get', {}, true);
}

async function insights() {
    return await con('progress/li', 'get', {}, true);
}

async function achievements() {
    return await con('progress/achievements', 'get', {}, true);
}
