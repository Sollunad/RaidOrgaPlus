import con from '../connector';

export default { progress, insights, achievements };

async function progress(user: any): Promise<any> {
    return await con('progress', 'get', {user}, true);
}

async function insights(user: any): Promise<any> {
    return await con('progress/li', 'get', {user}, true);
}

async function achievements(user: any): Promise<any> {
    return await con('progress/achievements', 'get', {user}, true);
}
