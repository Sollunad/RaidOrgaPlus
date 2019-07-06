const con = require('../connector');

exports.getTermine = getTermine;

async function getTermine(message){
    return await con.fetch('termine', 'get', {raid: message.raid.id}, message.auth);
}