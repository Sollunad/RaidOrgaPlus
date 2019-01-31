const _blanko = require('./blanko');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getBlankos, path: '', method: 'get', authed: true},
    {function: postBlanko, path: '', method: 'post', authed: true},
    {function: getElements, path: '/elements', method: 'get', authed: true},
    {function: postElement, path: '/elements', method: 'post', authed: true},
];

async function getBlankos(req, authentication) {
    const raid = req.query.raid;
    const enc = req.query.encounter;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role >= 0) {
            if (enc) {
                return await _blanko.getForEncounter(raid, enc);
            } else {
                return await _blanko.getForRaid(raid);
            }
        }
    }
    return [];
}

async function postBlanko(req, authentication) {
    const raid = req.query.raid;
    const enc = req.query.encounter;
    if (raid && encounter) {
        const role = await _roles.forRaid(authentication, raid);
        if (role >= 0) {
            const existing = await _blanko.getForEncounter(raid, enc);
            if (existing.length === 0){
                return await _blanko.postDefaultBlanko(raid, enc);
            } else {
                return await _blanko.postBlanko(raid, enc);
            }
        }
    }
    return [];
}

async function getElements(req, authentication) {
    const blanko = req.query.blanko;
    if (blanko) {
        const role = await _roles.forBlanko(authentication, blanko);
        if (role >= 0) return await _blanko.getElements(blanko);
    }
    return [];
}

async function postElement(req, authentication) {
    const blanko = req.body.blanko;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    if (blanko && position && type && value) {
        const role = await _roles.forBlanko(authentication, blanko);
        if (role >= 0) {
            if (type === "class") {
                return _blanko.setClass(blanko, position, value);
            } else if (type === "role") {
                return _blanko.setRole(blanko, position, value);
            }
        }
    }
    return [];
}