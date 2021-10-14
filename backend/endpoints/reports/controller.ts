import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import axios from "axios";
import FormData from 'form-data';
import { Authentication } from 'models/Auth';
import { ControllerEndpoint } from 'models/ControllerEndpoint';
import * as _roles from '../../authentication/role';
import * as _reports from './reports';
import { Response } from '../../../models/Types';

const endpoints: ControllerEndpoint[] = [
	{ function: upload, path: '', method: 'post', authed: true },
];
export default endpoints;

type dpsReportType = {
	id: string;
	permalink: string;
	error: any;
};

async function upload(req: Request, authentication: Authentication): Promise<Response<string>> {
	const logFile = req.files.file as UploadedFile;
	const aufstellung = Number(req.body.aufstellung);
	const token = req.body.token;

	if (logFile != null && aufstellung != null) {
		const role = await _roles.forAufstellung(authentication, aufstellung);
		if (role > 0) {
			let url = "https://dps.report/uploadContent?json=1&generator=ei";
			if (token != null && token.trim() != null) {
				url += `&userToken=${token}`;
			}

			const form = new FormData();
			form.append('file', logFile.data, { filename: logFile.name });

			const formHeaders = form.getHeaders();

			const response = await axios.post<dpsReportType>(url, form, {
				headers: {
					...formHeaders
				}
			});

			if (response.status < 400) {
				await _reports.writeReport(aufstellung, response.data.permalink);
				return { success: true, data: response.data.permalink };
			}
		}
	}

	return { success: false };
}