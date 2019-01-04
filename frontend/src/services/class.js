const sf = require('snekfetch');
const config = require('./config.json');

export default { getForBase };

async function getForBase(base) {
    const url = config.url + 'class?base=' + base;
    return (await sf.get(url)).body;
}