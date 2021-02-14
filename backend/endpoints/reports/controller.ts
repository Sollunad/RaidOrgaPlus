import * as _roles from '../../authentication/role';
import * as _reports from './reports';

export = [
    {function: upload, path: '', method: 'post', authed: true},
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