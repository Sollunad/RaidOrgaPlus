import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Authentication } from 'models/Auth';
import { ControllerEndpoint } from 'models/ControllerEndpoint';
import * as _roles from '../../authentication/role';
import * as _reports from './reports';

const endpoints: ControllerEndpoint[] = [
	{ function: upload, path: '', method: 'post', authed: true },
];
export default endpoints;

async function upload(req: Request, authentication: Authentication): Promise<string[]> {
	const evtc = req.files.file as UploadedFile;
	const aufstellung = Number(req.body.aufstellung);

	if (evtc && aufstellung) {
		const role = await _roles.forAufstellung(authentication, aufstellung);
		if (role > 0) {
			return await _reports.addReport(aufstellung, evtc);
		}
	}
	return [];
}