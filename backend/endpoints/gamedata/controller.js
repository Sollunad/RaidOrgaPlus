const _classes = require('./classes');
const _encounter = require('./encounter');
const _achievements = require('./achievements');

module.exports = [
    {function: getForBase, path: '/classes', method: 'get', authed: false},
    {function: getEncounter, path: '/encounter', method: 'get', authed: false},
    {function: getWings, path: '/wings', method: 'get', authed: false},
    {function: getAchievements, path: '/achievements', method: 'get', authed: false},
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
    const grouped = req.query.grouped;
    if (wing) {
        return await _encounter.listForWing(wing);
    } else {
        if (grouped) {
            return await _encounter.listByWing();
        } else {
            return await _encounter.list();
        }

    }
}

async function getWings() {
    return await _encounter.getWings();
}

async function getAchievements() {
    return await _achievements.getAchievements();
}