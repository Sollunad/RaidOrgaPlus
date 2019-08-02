const _termine = require('./termine');

module.exports = [
    {function: getKalenderEntries, path: '', method: 'get', authed: false},
];

async function getKalenderEntries(req) {
    return _termine.showTermineForNext7Days();
}