const con = require('../connector');

exports.login = login;

async function login(key){
    return await con.fetch('users/sessions', 'post', {key});
}

async function invalidateSession(user) {
    return await con.fetch('users/sessions', 'delete', {}, user);
}