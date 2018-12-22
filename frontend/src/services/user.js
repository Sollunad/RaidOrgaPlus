const sf = require('snekfetch');
const config = require('./config.json');

export default { get };

async function get(userId) {
    const url = config.url + 'user?id=' + userId;
    const response = await sf.get(url);
    return response.body[0];
}