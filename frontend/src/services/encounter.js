const sf = require('snekfetch');
const config = require('./config.json');

export default { list, listForWing };

async function list() {
    const url = config.url + 'encounter';
    const response = await sf.get(url);
    const encs = response.body;
    let ret = [];
    for (const enc of encs) {
        const wing = enc.wing;
        if (!ret[wing-1]) ret[wing-1] = [];
        ret[wing-1].push(enc);
    }
    return ret;
}

async function listForWing(wing) {
    const url = config.url + 'encounter?wing=' + wing;
    return (await sf.get(url)).body;
}