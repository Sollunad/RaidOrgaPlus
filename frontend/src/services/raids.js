const sf = require('snekfetch');

export default { listForPlayer };

async function listForPlayer(userId) {
    const url = 'http://localhost:3000/raids?user=' + userId;
    const response = await sf.get(url);
    return response.body;
}
