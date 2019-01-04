const sf = require('snekfetch');
const config = require('./config.json');

export default { getForTermin };

async function getForTermin(termin) {
    const url = config.url + 'aufstellungen?termin=' + termin;
    return (await sf.get(url)).body.map(e => e.id);
}