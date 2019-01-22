import con from '../connector';

export default { progress, insights };

async function progress() {
    return await con('progress', 'get', {}, true);
}

async function insights() {
    return await con('progress/li', 'get', {}, true);
}
