const con = require('../connector');

exports.getRaids = getRaids;

async function getRaids(message){
    return await con.fetch('raids', 'get', {}, message.auth);
}