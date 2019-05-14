const _aufstellung = require('./aufstellung');
const _element = require('./element');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getForTermin, path: '', method: 'get', authed: true},
    {function: putSuccess, path: '/success', method: 'put', authed: true},
    {function: deleteTermin, path: '', method: 'delete', authed: true},
    {function: getElement, path: '/elements', method: 'get', authed: true},
    {function: postElement, path: '/elements', method: 'post', authed: true},
    {function: copyElements, path: '/copyElements', method: 'post', authed: true},
];

async function getForTermin(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _aufstellung.getForTermin(termin);
    }
    return [];
}

async function putSuccess(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const success = req.body.success;
    if (aufstellung && (success === true || success === false)) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role > 0) return await _aufstellung.setSuccess(aufstellung, success);
    }
    return [];
}

async function deleteTermin(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const termin = req.body.termin;
    if (aufstellung && termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            return _aufstellung.delete(aufstellung).then(async () => {
                return await _aufstellung.getForTermin(termin);
            });
        } else {
            return await _aufstellung.getForTermin(termin);
        }
    }
    return [];
}

async function getElement(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _element.getForTermin(termin);
    }
    return [];
}

async function postElement(req, authentication) {
    const aufstellung = req.body.aufstellung;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    if (aufstellung && position && type && (value || value === 0)) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role >= 0) {
            if (type === "class") {
                return _element.setClass(aufstellung, position, value);
            } else if (type === "role") {
                return _element.setRole(aufstellung, position, value);
            } else if (type === "name") {
                return _element.setName(aufstellung, position, value);
            }
        }
    }
    return [];
}

async function copyElements(req, authentication) {
    const from = req.body.from;
    const to = req.body.to;
    if (from && to) {
        const role = await _roles.forAufstellung(authentication, to);
        if (role > 0) {
            return _aufstellung.copyElements(from, to);
        }
    }
}