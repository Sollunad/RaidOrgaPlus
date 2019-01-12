const sf = require('snekfetch');
const config = require('./config.json');

export default { get, hasNoApi, setApi, changeName, register };

async function get(uuid) {
    const url = config.url + 'users?uuid=' + uuid;
    const response = await sf.get(url);
    return response.body[0];
}

async function hasNoApi(userId) {
    const url = config.url + 'users/api?user=' + userId;
    return !(await sf.get(url)).body;
}

async function setApi(userId, apiKey) {
    const url = config.url + 'users/api';
    const response = await sf.post(url).send({"userId": userId, "apiKey": apiKey});
    return response.body;
}

async function changeName(userId, name) {
    const url = config.url + 'users/name';
    const response = await sf.post(url).send({"userId": userId, "name": name});
    return response.body;
}

async function register(username, pwd, name){
    const url = config.url + 'users';
    const response = await sf.post(url).send({"accName": username, "pwd": pwd, "name": name});
    return response.body;
}