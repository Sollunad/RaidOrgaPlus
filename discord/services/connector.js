const axios = require('axios');
const config = require('./config.json');
const _sessions = require('./sessions.js');

exports.fetch = fetch;

async function fetch(endpoint, method, params, user) {
    let url = config.development + endpoint;
    if (user) {
        const session = _sessions.getSession(user);
        if (session) params.auth = session;
    }
    if (method === 'get') {
        return (await axios({method, url, params})).data;
    } else {
        return (await axios({method, url, data: params})).data;
    }
}