const sf = require('snekfetch');
const config = require('./config.json');

export default { progress };

async function progress(userId) {
    const url = config.url + 'progress?user=' + userId;
    const response = await sf.get(url);
    return response.body;
}
