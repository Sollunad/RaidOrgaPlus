import con from './connector';

export default { get, hasApi, setApi, changeName, register, login, invalidateSession };

async function get(uuid) {
    return (await con('users', 'get', {uuid: uuid}))[0];
}

async function hasApi(user) {
    return await con('users/api', 'get', {user: user});
}

async function setApi(userId, apiKey) {
    return await con('users/api', 'post', {user: user, apiKey: apiKey});
}

async function changeName(userId, name) {
    return await con('users/name', 'post', {user: user, name: name});
}

async function register(accName, pwd, name){
    return await con('users', 'post', {accName: accName, pwd: pwd, name: name});
}

async function login(accName, pwd){
    return await con('users/sessions', 'post', {"accName": accName, "pwd": pwd})
}

async function invalidateSession(uuid) {
    return await con('users/sessions', 'delete', {uuid: uuid})
}