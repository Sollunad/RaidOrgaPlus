import * as _termine from './termine';

export = [
    {function: getKalenderEntries, path: '', method: 'get', authed: false},
];

async function getKalenderEntries(req) {
    return _termine.showTermineForNext7Days();
}