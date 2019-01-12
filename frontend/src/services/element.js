const sf = require('snekfetch');
const config = require('./config.json');

export default { getForAufstellung, setClass, setRole, setName };

async function getForAufstellung(aufstellung) {
    const url = config.url + 'aufstellungen/element?aufstellung=' + aufstellung;
    const response = await sf.get(url);
    return response.body;
}

async function setClass(aufstellung, position, value){
    const url = config.url + 'aufstellungen/element';
    const response = await sf.post(url).send({"aufstellung": aufstellung, "position": position, "value": value, "type": "class"});
    return response.body;
}

async function setRole(aufstellung, position, value){
    const url = config.url + 'aufstellungen/element';
    const response = await sf.post(url).send({"aufstellung": aufstellung, "position": position, "value": value, "type": "role"});
    return response.body;
}

async function setName(aufstellung, position, value){
    const url = config.url + 'aufstellungen/element';
    const response = await sf.post(url).send({"aufstellung": aufstellung, "position": position, "value": value, "type": "name"});
    return response.body;
}