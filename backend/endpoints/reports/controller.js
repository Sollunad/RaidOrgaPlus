const _roles = require('../../authentication/role');
const _reports = require('./reports');

module.exports = [
    {function: upload, path: '', method: 'post', authed: false},
];

async function upload(req, authentication) {
    const evtc = req.files.file;
    const aufstellung = req.body.aufstellung;

    if (evtc && aufstellung) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role > 0) {
            return await _reports.addReport(aufstellung, evtc);
        }
    }
    return [];
}