const con = require('../connector');

exports.login = login;

async function login(key, id){
    return await con.fetch('users/sessions', 'post', {key, id});
}