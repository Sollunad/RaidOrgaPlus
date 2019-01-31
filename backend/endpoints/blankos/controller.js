const _blanko = require('./blanko');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getElements, path: '', method: 'get', authed: true},
    {function: postElement, path: '', method: 'post', authed: true},
];

async function getElements(req, authentication) {
    const raid = req.query.raid;
    const enc = req.query.enc;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role >= 0) {
            if (enc) {
                return await _blanko.getElementsByEncounter(raid, enc);
            } else {
                return await _blanko.getAllElements(raid);
            }
        }
    }
    return [];
}

async function postElement(req, authentication) {
    const raid = req.body.raid;
    const enc = req.body.enc;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    console.log(value);
    if (raid && enc && position && type && (value || value === 0)) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) {
            if (type === "class") {
                return _blanko.setClass(raid, enc, position, value);
            } else if (type === "role") {
                return _blanko.setRole(raid, enc, position, value);
            }
        }
    }
    return [];
}