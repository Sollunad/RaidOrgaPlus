import con from '../connector';

export default { getForTermin, deleteBoss, getSuccess, setSuccess, getElements, setClass, setName, setRole };

async function getForTermin(termin) {
    return await con('aufstellungen', 'get', {termin: termin});
}

async function deleteBoss(aufstellung, termin) {
    return await con('aufstellungen', 'delete', {aufstellung: aufstellung, termin: termin});
}

async function getSuccess(aufstellung){
    return await con('aufstellungen/success', 'get', {aufstellung: aufstellung});
}

async function setSuccess(aufstellung, success) {
    return await con('aufstellungen/success', 'put', {aufstellung: aufstellung, success: success});
}

async function getElements(termin) {
    return await con('aufstellungen/element', 'get', {termin: termin});
}

async function setClass(aufstellung, position, value){
    return await setElement(aufstellung, position, value, 'class');
}

async function setRole(aufstellung, position, value){
    return await setElement(aufstellung, position, value, 'role');
}

async function setName(aufstellung, position, value){
    return await setElement(aufstellung, position, value, 'name');
}

function setElement(aufstellung, position, value, type) {
    return con('aufstellungen/element', 'post', {aufstellung: aufstellung, position: position, value: value, type: type});
}