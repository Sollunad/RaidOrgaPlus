import con from '../connector';

export default { isArchived, isLocked, putLocked, listActive, listArchived, newTermin, archive, anmelden, getAnmeldungForSpieler, getAnmeldungenForTermin, addBoss, addWing };

async function isArchived(termin) {
    return await con('termine/isArchived', 'get', {termin}, true);
}

async function isLocked(termin) {
    return await con('termine/isLocked', 'get', {termin}, true);
}

async function putLocked(termin, locked) {
    return await con('termine/isLocked', 'put', {termin, locked}, true);
}

async function listActive(raid) {
    return await con('termine', 'get', {raid}, true);
}

async function listArchived(raid) {
    return await con('termine', 'get', {raid, archive: 1}, true);
}

async function newTermin(raid, date, time) {
    return await con('termine', 'post', {raid, date, time}, true);
}

async function archive(termin) {
    return await con('termine/archive', 'put', {termin}, true);
}

async function anmelden(spieler, termin, type) {
    return await con('termine/anmeldungen', 'put', {termin, spieler, type}, true);
}

async function getAnmeldungForSpieler(spieler, termin) {
    return (await con('termine/anmeldungen', 'get', {termin, spieler}, true)).type;
}

async function getAnmeldungenForTermin(termin) {
    return (await con('termine/anmeldungen', 'get', {termin}, true));
}

async function addBoss(termin, boss) {
    return await con('termine/bosses', 'post', {termin, boss}, true);
}

async function addWing(termin, wing) {
    return await con('termine/bosses', 'post', {termin, wing}, true);
}