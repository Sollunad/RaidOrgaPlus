const con = require('../connector');

exports.getAufstellungen = getAufstellungen;
exports.getElements = getElements;

async function getAufstellungen(session, termin){
    return await con.fetch('aufstellungen', 'get', {termin}, session);
}

async function getElements(session, aufstellung){
    return await con.fetch('aufstellungen/elements', 'get', {aufstellung}, session);
}