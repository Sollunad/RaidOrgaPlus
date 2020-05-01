const con = require('../connector');

exports.getTermine = getTermine;
exports.getAnmeldungen = getAnmeldungen;
exports.putAnmeldung = putAnmeldung;

async function getTermine(session, raid){
    return await con.fetch('termine', 'get', {raid}, session);
}

async function getAnmeldungen(session, termin){
    return await con.fetch('termine/anmeldungenAll', 'get', {termin}, session);
}

async function putAnmeldung(session, termin, type) {
    return await con.fetch('termine/anmeldungen', 'put', {termin, type}, session);
}