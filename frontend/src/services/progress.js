const sf = require('snekfetch');
const config = require('./config.json');

export default { progress };

async function progress(userId) {
    const url = config.url + 'progress?user=' + userId;
    return (await sf.get(url)).body;
}
