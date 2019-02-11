const axios = require('axios');
const config = require('./config.json');

export default fetch;

async function fetch(endpoint, method, params, authed) {
    const environment = process.env.NODE_ENV;
    let url = config[environment] + endpoint;
    if (authed) params.auth = localStorage.session;
    if (method === 'get') {
        return (await axios({method, url, params})).data;
    } else {
        return (await axios({method, url, data: params})).data;
    }
}