const apiclient = require('gw2api-client');
const apiKey = require('./key.json');

const api = apiclient();
const API_KEY = apiKey.keyRL;
const RL_ID = '7D6A1444-3C91-E911-81A8-CD1049069AE5';

exports.getUsers = getUsers;
exports.findUser = findUser;

async function getUsers() {
    return await api.authenticate(API_KEY).guild(RL_ID).members().get();
}

function findUser(roUser, guildUsers) {
    return guildUsers.find(g => g.name === roUser.accname);
}