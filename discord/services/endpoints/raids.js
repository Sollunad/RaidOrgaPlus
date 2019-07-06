const con = require('../connector');

exports.getRaids = getRaids;

async function getRaids(user){
    return await con.fetch('raids', 'get', {}, user);
}