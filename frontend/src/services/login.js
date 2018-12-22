const sf = require('snekfetch');
const config = require('./config.json');

export default { login };

async function login(username, pwd){
    const url = config.url + 'login';
    const response = await sf.post(url).send({"accName": username, "pwd": pwd});
    const session = response.body;
    return session[0];
}