const sf = require('snekfetch');
const config = require('./config.json');

export default { getForTermin, deleteBoss };

async function getForTermin(termin) {
    const url = config.url + 'aufstellungen?termin=' + termin;
    return (await sf.get(url)).body.map(e => e.id);
}

async function deleteBoss(aufstellung, termin) {
    const url = config.url + 'aufstellungen/delete?aufstellung=' + aufstellung + '&termin=' + termin;
    const response = await sf.post(url).send({"aufstellung": aufstellung, "termin": termin});
    return response.body.map(e => e.id);
}