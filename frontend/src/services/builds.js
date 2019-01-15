import con from './connector';

export default { getBuilds, addBuild, deleteBuild };

async function getBuilds(user) {
    return await con('users/builds', 'get', {user: user});
}

async function addBuild(user, clss, role){
    return await con('users/builds', 'post', {user: user, clss: clss, role: role});
}

async function deleteBuild(user, clss, role){
    return await con('users/builds', 'delete', {user: user, clss: clss, role: role});
}

