const _classes = require('./classes');
const _encounter = require('./encounter');

module.exports = [
    {function: getForBase, path: '/classes', method: 'get'},
    {function: getEncounter, path: '/encounter', method: 'get'},
];

async function getForBase(req) {
    const base = req.query.base;
    if (base) {
        return await _classes.getForBase(base);
    } else {
        return [];
    }
}

async function getEncounter(req) {
    const wing = req.query.wing;
    if (wing) {
        return await _encounter.listForWing(wing);
    } else {
        return await _encounter.list();
    }
}