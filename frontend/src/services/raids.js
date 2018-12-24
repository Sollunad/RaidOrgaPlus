const sf = require('snekfetch');
const config = require('./config.json');

export default { listForPlayer, give, role };

async function listForPlayer(userId) {
    const url = config.url + 'raids?user=' + userId;
    const response = await sf.get(url);
    return response.body;
}

async function give(raidId) {
    const url = config.url + 'raids?raid=' + raidId;
    const response = await sf.get(url);
    return response.body[0];
}

async function role(raidId, userId) {
    const url = config.url + 'role?raid=' + raidId + '&user=' + userId;
    const response = await sf.get(url);
    return response.body[0].role;
}
