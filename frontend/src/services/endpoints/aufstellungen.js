import con from '../connector';

export default { getForTermin, deleteBoss, getSuccess, setSuccess, getElements, setClass, setName, setRole };

async function getForTermin(termin) {
    return await con('aufstellungen', 'get', {termin}, true);
}

async function deleteBoss(aufstellung, termin) {
    return await con('aufstellungen', 'delete', {aufstellung, termin}, true);
}

async function getSuccess(aufstellung){
    return await con('aufstellungen/success', 'get', {aufstellung}, true);
}

async function setSuccess(aufstellung, success) {
    return await con('aufstellungen/success', 'put', {aufstellung, success}, true);
}

async function getElements(termin) {
    return await con('aufstellungen/elements', 'get', {termin}, true);
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
    return con('aufstellungen/elements', 'post', {aufstellung, position, value, type}, true);
}