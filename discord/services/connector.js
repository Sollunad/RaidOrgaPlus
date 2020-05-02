const axios = require('axios');
const config = require('./config.json');

exports.fetch = fetch;

async function fetch(endpoint, method, params, auth) {
    try {
        let url = config.development + endpoint;
        if (auth) {
            params.auth = auth;
        }
        if (method === 'get') {
            return (await axios({method, url, params})).data;
        } else {
            return (await axios({method, url, data: params})).data;
        }
    } catch (e) {
        return null;
    }
}