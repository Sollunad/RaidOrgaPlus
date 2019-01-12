const sf = require('snekfetch');
const config = require('./config.json');

export default { invalidate, login };

async function login(username, pwd){
    const url = config.url + 'users/sessions';
    const response = await sf.post(url).send({"accName": username, "pwd": pwd});
    const session = response.body;
    return session[0];
}

async function invalidate(session) {
    const url = config.url + 'users/sessions';
    const response = await sf.delete(url).send({"uuid": session});
    return response.body;
}