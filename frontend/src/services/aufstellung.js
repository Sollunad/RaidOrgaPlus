import con from './connector';

export default { getForTermin, deleteBoss, getSuccess, setSuccess };

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