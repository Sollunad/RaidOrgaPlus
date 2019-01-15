import con from './connector';

export default { getForTermin, setClass, setRole, setName };

async function getForTermin(termin) {
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