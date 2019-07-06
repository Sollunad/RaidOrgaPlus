const con = require('../connector');

exports.getAufstellungen = getAufstellungen;
exports.getElements = getElements;

async function getAufstellungen(message, termin){
    return await con.fetch('aufstellungen', 'get', {termin}, message.auth);
}

async function getElements(message, aufstellung){
    return await con.fetch('aufstellungen/elements', 'get', {aufstellung}, message.auth);
}