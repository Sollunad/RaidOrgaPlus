const uuidv4 = require('uuid/v4');
const hash = require('password-hash');
const sf = require('snekfetch');
const config = require('./config.json');

export default { login };

async function login(username, pwd){
    const url = config.url + 'user?name=' + username;
    const response = await sf.get(url);
    const user = response.body;
    const correctPwd = hash.verify(pwd, user.password);
    if (correctPwd){
        const url = config.url + 'login?id=' + user.id
    }
}
