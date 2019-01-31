import con from '../connector';

export default { getElementsByBoss, getAllElements, setClass, setRole };

async function getElementsByBoss(raid, enc) {
    return await con('blankos', 'get', {raid, enc}, true);
}

async function getAllElements(raid) {
    return await con('blankos', 'get', {raid}, true);
}

async function setClass(raid, enc, position, value){
    return await setElement(raid, enc, position, value, 'class');
}

async function setRole(raid, enc, position, value){
    return await setElement(raid, enc, position, value, 'role');
}

function setElement(raid, enc, position, value, type) {
    return con('blankos', 'post', {raid, enc, position, value, type}, true);
}