const axios = require('axios');
const config = require('./config.json');
const _sessions = require('./session.js');

export default fetch;

async function fetch(endpoint, method, params, user) {
    let url = config.development + endpoint;
    if (user) {
        const session = _sessions.getSession(user);
        if (session) params.auth = session;
        else {
            //TODO: Fehlermeldung "Bitte einloggen"
            //TODO: Fehlermeldung "Session abgelaufen, bitte neu anmelden" bei erstem Mal
        }
    }
    if (method === 'get') {
        return (await axios({method, url, params})).data;
    } else {
        return (await axios({method, url, data: params})).data;
    }
}