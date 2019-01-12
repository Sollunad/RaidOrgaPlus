const sf = require('snekfetch');
const config = require('./config.json');

export default { getForTermin, deleteBoss, getSuccess, setSuccess, getEncounter };

async function getForTermin(termin) {
    const url = config.url + 'aufstellungen?termin=' + termin;
    return (await sf.get(url)).body;
}

async function deleteBoss(aufstellung, termin) {
    const url = config.url + 'aufstellungen';
    const response = await sf.delete(url).send({"aufstellung": aufstellung, "termin": termin});
    return response.body.map(e => e.id);
}

async function getSuccess(aufstellung){
    const url = config.url + 'aufstellungen/success?aufstellung=' + aufstellung;
    const response = await sf.get(url);
    if (response.body.length > 0) {
        const successValue = response.body[0].success;
        return successValue === 1;
    } else {
        return false;
    }
}

async function setSuccess(aufstellung, success) {
    const url = config.url + 'aufstellungen/success';
    const successValue = success? 1 : 0;
    const response = await sf.put(url).send({"aufstellung": aufstellung, "success": successValue});
    return response.body;
}

async function getEncounter(aufstellung) {
    const url = config.url + 'aufstellungen/encounter?aufstellung=' + aufstellung;
    return (await sf.get(url)).body[0];
}