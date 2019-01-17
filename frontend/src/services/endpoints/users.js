import con from '../connector';

export default { get, hasApi, setApi, changeName, register, login, invalidateSession, getBuilds, addBuild, deleteBuild, putPrefer };

async function get(uuid) {
    return (await con('users', 'get', {uuid: uuid}))[0];
}

async function hasApi(user) {
    return await con('users/api', 'get', {user: user});
}

async function setApi(apiKey) {
    return await con('users/api', 'post', {apiKey: apiKey});
}

async function changeName(name) {
    return await con('users/name', 'post', {name: name});
}

async function register(accName, pwd, name){
    return await con('users', 'post', {accName: accName, pwd: pwd, name: name});
}

async function login(accName, pwd){
    return await con('users/sessions', 'post', {accName: accName, pwd: pwd})
}

async function invalidateSession(uuid) {
    return await con('users/sessions', 'delete', {uuid: uuid})
}

async function getBuilds(user) {
    return await con('users/builds', 'get', {user: user});
}

async function addBuild(clss, role){
    return await con('users/builds', 'post', {clss: clss, role: role});
}

async function deleteBuild(clss, role){
    return await con('users/builds', 'delete', {clss: clss, role: role});
}

async function putPrefer(clss, role, pref){
    return await con('users/builds/prefer', 'put', {clss: clss, role: role, pref: pref});
}