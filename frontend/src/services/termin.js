const sf = require('snekfetch');
const config = require('./config.json');

export default { isArchived, listActive, listArchived, newTermin, archive, anmelden, getAnmeldung, addBoss, addWing };

async function isArchived(termin) {
    const url = config.url + 'termine/isArchived?termin=' + termin;
    const response = await sf.get(url);
    return response.body[0].isArchived;
}

async function listActive(raidId) {
    const url = config.url + 'termine?raid=' + raidId;
    const response = await sf.get(url);
    return response.body;
}

async function listArchived(raidId) {
    const url = config.url + 'termine?raid=' + raidId + '&archive=1';
    const response = await sf.get(url);
    return response.body;
}

async function newTermin(raid, date, time) {
    const url = config.url + 'termine';
    const response = await sf.post(url).send({"raid": raid, "date": date, "time": time});
    return response.body;
}

async function archive(termin) {
    const url = config.url + 'termine/' + termin + '/archive';
    const response = await sf.put(url);
    return response.body;
}

async function anmelden(spieler, termin, type) {
    const url = config.url + 'termine/' + termin + '/anmeldungen';
    const response = await sf.put(url).send({"spieler": spieler, "type": type});
    return response.body;
}

async function getAnmeldung(spieler, termin) {
    const url = config.url + 'termine/' + termin + '/anmeldungen?spieler=' + spieler;
    const response = (await sf.get(url)).body;
    if (response.length === 0) {
        return null;
    } else {
        return response[0].type;
    }
}

async function addBoss(termin, boss) {
    const url = config.url + 'termine/' + termin + '/bosses';
    const response = await sf.post(url).send({"boss": boss});
    return response.body.map(e => e.id);
}

async function addWing(termin, wing) {
    const url = config.url + 'termine/' + termin + '/bosses';
    const response = await sf.post(url).send({"wing": wing});
    return response.body.map(e => e.id);
}