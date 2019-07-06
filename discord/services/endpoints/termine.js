const con = require('../connector');

exports.getTermine = getTermine;
exports.getAnmeldungen = getAnmeldungen;
exports.putAnmeldung = putAnmeldung;

async function getTermine(message){
    return await con.fetch('termine', 'get', {raid: message.raid.id}, message.auth);
}

async function getAnmeldungen(message, termin){
    return await con.fetch('termine/anmeldungen', 'get', {termin}, message.auth);
}

async function putAnmeldung(session, termin, type) {
    return await con.fetch('termine/anmeldungen', 'put', {termin, type}, session);
}