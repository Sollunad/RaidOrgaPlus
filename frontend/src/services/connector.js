const sf = require('snekfetch');
const config = require('./config.json');

export default fetch;

async function fetch(endpoint, method, params) {
    let url = config.url + endpoint;
    params.auth = localStorage.session;
    if (method === 'get') {
        let queryParams = '';
        if (Object.keys(params).length > 0) {
            queryParams = `?${Object.entries(params).map(mapToQueryParam).join('&')}`;
            url = url + queryParams;
        }
        return (await sf.get(url)).body;
    } else if (method === 'post') {
        return (await sf.post(url).send(params)).body;
    } else if (method === 'put') {
        return (await sf.put(url).send(params)).body;
    } else if (method === 'delete') {
        return (await sf.delete(url).send(params)).body;
    }
}

function mapToQueryParam(param) {
    return param[0] + "=" + param[1];
}