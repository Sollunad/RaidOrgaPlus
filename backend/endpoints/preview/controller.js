const _aufstellung = require('../aufstellungen/aufstellung');
const _element = require('../aufstellungen/element');
const _preview = require('./preview');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getAufstellungen, path: '', method: 'get', authed: false},
    {function: getElements, path: '/elements', method: 'get', authed: false},
    {function: setPreviewable, path: '/able', method: 'post', authed: true},
    {function: getPreviewable, path: '/able', method: 'get', authed: true},
];

async function getAufstellungen(req) {
    const termin = req.query.termin;
    if (termin) {
        const isPreviewable = (await _preview.isPreviewable(termin))[0].preview;
        if (isPreviewable) return await _aufstellung.getForTermin(termin);
    }
    return [];
}

async function getElements(req) {
    const termin = req.query.termin;
    if (termin) {
        const isPreviewable = (await _preview.isPreviewable(termin))[0].preview;
        if (isPreviewable) return await _element.getForTermin(termin);
    }
    return [];
}

async function setPreviewable(req, authentication) {
    const termin = req.body.termin;
    const able = req.body.able;
    if (termin && (able || able === false)) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            const ableValue = able? 1 : 0;
            return await _preview.setPreviewable(termin, ableValue);
        }
    }
    return [];
}

async function getPreviewable(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            const isPreviewable = (await _preview.isPreviewable(termin))[0].preview;
            console.log(!!isPreviewable);
            return (!!isPreviewable);
        }
    }
    return [];
}