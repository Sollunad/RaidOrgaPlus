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
    } else if (method === 'form') {
        const formData = new FormData();
        for (const param in params) {
            formData.append(param, params[param]);
        }
        const headers = {'Content-Type': 'multipart/form-data'};
        return (await axios.post(url, formData, {headers})).data;
    }
    else {
        return (await axios({method, url, data: params})).data;
    }
}