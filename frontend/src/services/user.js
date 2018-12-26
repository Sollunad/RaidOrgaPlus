const sf = require('snekfetch');
const config = require('./config.json');

export default { get, hasNoApi, setApi, changeName };

async function get(userId) {
    const url = config.url + 'user?id=' + userId;
    const response = await sf.get(url);
    return response.body[0];
}

async function hasNoApi(userId) {
    const url = config.url + 'api?user=' + userId;
    return !(await sf.get(url)).body;
}

async function setApi(userId, apiKey) {
    const url = config.url + 'setapi';
    const response = await sf.post(url).send({"userId": userId, "apiKey": apiKey});
    return response.body;
}

async function changeName(userId, name) {
    const url = config.url + 'changeName';
    const response = await sf.post(url).send({"userId": userId, "name": name});
    return response.body;
}