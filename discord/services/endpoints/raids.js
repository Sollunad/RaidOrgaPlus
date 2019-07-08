const con = require('../connector');

exports.getRaids = getRaids;

async function getRaids(session){
    return await con.fetch('raids', 'get', {}, session);
}