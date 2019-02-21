const axios = require('axios');
const _cookies = require('./util/cookies');
const config = require('./config.json');

export default fetch;

async function fetch(endpoint, method, params, authed) {
    const environment = process.env.NODE_ENV;
    let url = config[environment] + endpoint;
    if (authed) params.auth = _cookies.default.getCookie('session');
    if (method === 'get') {
        return (await axios({method, url, params})).data;
    } else {
        return (await axios({method, url, data: params})).data;
    }
}