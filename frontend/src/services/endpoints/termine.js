import con from '../connector';

export default { isArchived, isLocked, putLocked, listActive, listArchived, newTermin, archive, anmelden, getAnmeldung, addBoss, addWing };

async function isArchived(termin) {
    return await con('termine/isArchived', 'get', {termin: termin}, true);
}

async function isLocked(termin) {
    return await con('termine/isLocked', 'get', {termin: termin}, true);
}

async function putLocked(termin, locked) {
    return await con('termine/isLocked', 'put', {termin: termin, locked: locked}, true);
}

async function listActive(raid) {
    return await con('termine', 'get', {raid: raid}, true);
}

async function listArchived(raid) {
    return await con('termine', 'get', {raid: raid, archive: 1}, true);
}

async function newTermin(raid, date, time) {
    return await con('termine', 'post', {raid: raid, date: date, time: time}, true);
}

async function archive(termin) {
    return await con('termine/archive', 'put', {termin: termin}, true);
}

async function anmelden(spieler, termin, type) {
    return await con('termine/anmeldungen', 'put', {termin: termin, spieler: spieler, type: type}, true);
}

async function getAnmeldung(spieler, termin) {
    return (await con('termine/anmeldungen', 'get', {termin: termin, spieler: spieler}, true)).type;
}

async function addBoss(termin, boss) {
    return await con('termine/bosses', 'post', {termin: termin, boss: boss}, true);
}

async function addWing(termin, wing) {
    return await con('termine/bosses', 'post', {termin: termin, wing: wing}, true);
}