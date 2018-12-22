const sf = require('snekfetch');
const config = require('./config.json');

export default { getUser };

async function getUser(session) {
    if (!session) return 0;
    const url = config.url + 'session?uuid=' + session;
    const response = await sf.get(url);
    if (response.body.length === 0) return 0;
    else return response.body[0].user;
}