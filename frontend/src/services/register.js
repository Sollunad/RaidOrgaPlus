const sf = require('snekfetch');
const config = require('./config.json');

//export default { login };

async function register(username, pwd, name){
    const url = config.url + 'register';
    const response = await sf.post(url).send({"accName": username, "pwd": pwd, "name": name});
    console.log(response.body);
}