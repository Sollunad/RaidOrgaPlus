const con = require('../connector');

exports.getKalenderTermine = getKalenderTermine;

async function getKalenderTermine(){
    return await con.fetch('kalender', 'get', {});
}