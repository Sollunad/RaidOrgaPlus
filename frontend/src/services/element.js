const sf = require('snekfetch');
const config = require('./config.json');

export default { getForAufstellung };

async function getForAufstellung(aufstellung) {
    const url = config.url + 'element?aufstellung=' + aufstellung;
    return (await sf.get(url)).body;
}