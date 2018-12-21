const sf = require('snekfetch');

export default { listForPlayer, give };

async function listForPlayer(userId) {
    const url = 'http://localhost:3000/raids?user=' + userId;
    const response = await sf.get(url);
    return response.body;
}

async function give(raidId) {
    const url = 'http://localhost:3000/raids?raid=' + raidId;
    const response = await sf.get(url);
    return response.body[0];
}
