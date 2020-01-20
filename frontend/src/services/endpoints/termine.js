import con from '../connector';

export default { isArchived, isLocked, putLocked, listActive, listArchived, newTermin, archive, anmelden, anmeldenLead, getErsatz, addErsatz, deleteErsatz,
    getAnmeldungForSpieler, getAnmeldungenForTermin, addBoss, addWing, deleteTermin, getText, saveText, getHomepageTermine };

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

async function deleteTermin(termin) {
    return await con('termine', 'delete', {termin}, true);
}

async function archive(termin) {
    return await con('termine/archive', 'put', {termin}, true);
}

async function anmelden(termin, type) {
    return await con('termine/anmeldungen', 'put', {termin, type}, true);
}

async function anmeldenLead(spieler, termin, type) {
    return await con('termine/anmeldungenLead', 'put', {termin, spieler, type}, true);
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

async function getText(termin) {
    return (await con('termine/text', 'get', {termin}, true)).text;
}

async function saveText(termin, text) {
    return await con('termine/text', 'put', {termin, text}, true);
}

async function getErsatz(termin) {
    return await con('termine/ersatz', 'get', {termin}, true);
}

async function addErsatz(termin, user) {
    return await con('termine/ersatz', 'post', {termin, user}, true);
}

async function deleteErsatz(termin, user) {
    return await con('termine/ersatz', 'delete', {termin, user}, true);
}

async function getHomepageTermine() {
    return await con('termine', 'get', {}, true);
}
