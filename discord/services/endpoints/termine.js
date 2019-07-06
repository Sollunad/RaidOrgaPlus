const con = require('../connector');

exports.getTermine = getTermine;
exports.getAnmeldungen = getAnmeldungen;

async function getTermine(message){
    return await con.fetch('termine', 'get', {raid: message.raid.id}, message.auth);
}

async function getAnmeldungen(message, termin){
    return await con.fetch('termine/anmeldungen', 'get', {termin}, message.auth);
}