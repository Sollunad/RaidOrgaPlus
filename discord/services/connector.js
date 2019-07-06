const axios = require('axios');
const config = require('./config.json');
const _sessions = require('./sessions.js');

exports.fetch = fetch;

async function fetch(endpoint, method, params, auth) {
    let url = config.development + endpoint;
    if (auth) {
        params.auth = auth;
    }
    if (method === 'get') {
        return (await axios({method, url, params})).data;
    } else {
        return (await axios({method, url, data: params})).data;
    }
}