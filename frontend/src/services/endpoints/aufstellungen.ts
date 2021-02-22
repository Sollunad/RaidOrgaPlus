import con from '../connector';

export default { getForTermin, deleteBoss, setSuccess, setCM, getElements, setClass, setName, setRole, copyElements };

async function getForTermin(termin: any): Promise<any> {
    return await con('aufstellungen', 'get', {termin}, true);
}

async function deleteBoss(aufstellung: any, termin: any): Promise<any> {
    return await con('aufstellungen', 'delete', {aufstellung, termin}, true);
}

async function setSuccess(aufstellung: any, success: any): Promise<any> {
    return await con('aufstellungen/success', 'put', {aufstellung, success}, true);
}

async function setCM(aufstellung: any, cm: any): Promise<any> {
    return await con('aufstellungen/cm', 'put', {aufstellung, cm}, true);
}

async function getElements(termin: any): Promise<any> {
    return await con('aufstellungen/elements', 'get', {termin}, true);
}

async function setClass(aufstellung: any, position: any, value: any): Promise<any> {
    return await setElement(aufstellung, position, value, 'class');
}

async function setRole(aufstellung: any, position: any, value: any): Promise<any> {
    return await setElement(aufstellung, position, value, 'role');
}

async function setName(aufstellung: any, position: any, value: any): Promise<any> {
    return await setElement(aufstellung, position, value, 'name');
}

function setElement(aufstellung: any, position: any, value: any, type: any): Promise<any> {
    return con('aufstellungen/elements', 'post', {aufstellung, position, value, type}, true);
}

function copyElements(from: any, to: any): Promise<any> {
    return con('aufstellungen/copyElements', 'post', {from, to}, true);
}