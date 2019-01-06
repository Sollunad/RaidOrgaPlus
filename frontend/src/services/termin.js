const sf = require('snekfetch');
const config = require('./config.json');

export default { isArchived, listActive, listArchived, newTermin, anmelden, getAnmeldung, addBoss, addWing };

async function isArchived(termin) {
    const url = config.url + 'termin/isArchived?termin=' + termin;
    const response = await sf.get(url);
    return response.body[0].isArchived;
}

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

async function newTermin(raid, date, time) {
    const url = config.url + 'termin/neu';
    const response = await sf.post(url).send({"raid": raid, "date": date, "time": time});
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

async function addBoss(termin, boss) {
    const url = config.url + 'termin/addBoss';
    const response = await sf.post(url).send({"termin": termin, "boss": boss});
    return response.body.map(e => e.id);
}

async function addWing(termin, wing) {
    const url = config.url + 'termin/addWing';
    const response = await sf.post(url).send({"termin": termin, "wing": wing});
    return response.body.map(e => e.id);
}