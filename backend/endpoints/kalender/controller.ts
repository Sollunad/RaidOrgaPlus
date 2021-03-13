import { Request } from 'express';
import { ControllerEndpoint } from 'models/ControllerEndpoint';
import { Raid } from 'models/Raid';
import { Termin } from 'models/Termin';
import * as _termine from './termine';

const endpoints: ControllerEndpoint[] = [
    {function: getKalenderEntries, path: '', method: 'get', authed: false},
];
export default endpoints;

async function getKalenderEntries(req: Request): Promise<(Termin & Raid)[]> {
    return _termine.showTermineForNext7Days();
}