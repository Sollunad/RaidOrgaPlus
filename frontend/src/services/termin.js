const sf = require('snekfetch');
const config = require('./config.json');

export default { listActive, listArchived, anmelden, getAnmeldung };

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

async function anmelden(spieler, termin, type) {
    const url = config.url + 'termin/anmelden';
    const response = await sf.post(url).send({"spieler": spieler, "termin": termin, "type": type});
    return response.body;
}

async function getAnmeldung(spieler, termin) {
    const url = config.url + 'termin/anmeldung?spieler=' + spieler + '&termin=' + termin;
    const response = (await sf.get(url)).body;
    if (response.length === 0) {
        return null;
    } else {
        return response[0].type;
    }
}