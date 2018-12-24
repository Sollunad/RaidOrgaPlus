const sf = require('snekfetch');
const config = require('./config.json');

export default { get, setApi };

async function get(userId) {
    const url = config.url + 'user?id=' + userId;
    const response = await sf.get(url);
    return response.body[0];
}

async function setApi(userId, apiKey) {
    const url = config.url + 'setapi';
    const response = await sf.post(url).send({"userId": userId, "apiKey": apiKey});
    return response.body;
}