import con from '../connector';

export default { isArchived, isLocked, listActive, listArchived, newTermin, archive, anmelden, getAnmeldung, addBoss, addWing };

async function isArchived(termin) {
    return await con('termine/isArchived', 'get', {termin: termin});
}

async function isLocked(termin) {
    return await con('termine/isLocked', 'get', {termin: termin});
}

async function listActive(raid) {
    return await con('termine', 'get', {raid: raid});
}

async function listArchived(raid) {
    return await con('termine', 'get', {raid: raid, archive: 1});
}

async function newTermin(raid, date, time) {
    return await con('termine', 'post', {raid: raid, date: date, time: time});
}

async function archive(termin) {
    return await con('termine/archive', 'put', {termin: termin});
}

async function anmelden(spieler, termin, type) {
    return await con('termine/anmeldungen', 'put', {termin: termin, spieler: spieler, type: type});
}

async function getAnmeldung(spieler, termin) {
    return (await con('termine/anmeldungen', 'get', {termin: termin, spieler: spieler})).type;
}

async function addBoss(termin, boss) {
    return await con('termine/bosses', 'post', {termin: termin, boss: boss});
}

async function addWing(termin, wing) {
    return await con('termine/bosses', 'post', {termin: termin, wing: wing});
}