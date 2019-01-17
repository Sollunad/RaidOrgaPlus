const _aufstellung = require('./aufstellung');
const _element = require('./element');

module.exports = [
    {function: getTermin, path: '', method: 'get'},
    {function: getSuccess, path: '/success', method: 'get'},
    {function: putSuccess, path: '/success', method: 'put'},
    {function: deleteTermin, path: '', method: 'delete'},
    {function: getElement, path: '/element', method: 'get'},
    {function: postElement, path: '/element', method: 'post'},
];

async function getTermin(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        return await _aufstellung.getForTermin(termin);
    } else {
        return [];
    }
}

async function getSuccess(req, authentication) {
    const aufstellung = req.query.aufstellung;
    if (aufstellung) {
        return await _aufstellung.getSuccess(aufstellung);
    } else {
        return [];
    }
}

async function putSuccess(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const success = req.body.success;
    if (aufstellung && (success || success === false)) {
        return await _aufstellung.setSuccess(aufstellung, success);
    } else {
        return [];
    }
}

async function deleteTermin(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const termin = req.body.termin;
    if (aufstellung && termin) {
        return _aufstellung.delete(aufstellung).then(async () => {
            return await _aufstellung.getForTermin(termin);
        })
    } else {
        return [];
    }
}

async function getElement(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        return await _element.getForTermin(termin);
    } else {
        return [];
    }
}

async function postElement(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    if (aufstellung && position && type && value) {
        if (type === "class") {
            return _element.setClass(aufstellung, position, value).then(async () => {
                return await _element.getForAufstellung(aufstellung);
            });
        } else if (type === "role") {
            return _element.setRole(aufstellung, position, value).then(async () => {
                return await _element.getForAufstellung(aufstellung);
            });
        } else if (type === "name") {
            return _element.setName(aufstellung, position, value).then(async () => {
                return await _element.getForAufstellung(aufstellung);
            });
        } else {
            return [];
        }

    } else {
        return [];
    }
}