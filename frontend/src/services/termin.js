const sf = require('snekfetch');
const config = require('./config.json');

export default { listActive, listArchived };

async function listActive(raidId) {
    const url = config.url + 'termin?raid=' + raidId;
    const response = await sf.get(url);
    return response.body;
}

async function listArchived(raidId) {
    const url = config.url + 'termin?raid=' + raidId + '&archive=1';
    const response = await sf.get(url);
    return response.body;
}