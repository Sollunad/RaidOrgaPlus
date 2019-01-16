const _classes = require('./classes');
const _encounter = require('./encounter');

module.exports = [
    {function: getForBase, path: '/classes', method: 'get'},
    {function: getEncounter, path: '/encounter', method: 'get'},
];

async function getForBase(req, res) {
    const base = req.query.base;
    if (base) {
        res.send(await _classes.getForBase(base));
    } else {
        res.send([]);
    }
}

async function getEncounter(req, res) {
    const wing = req.query.wing;
    if (wing) {
        res.send(await _encounter.listForWing(wing));
    } else {
        res.send(await _encounter.list());
    }
}