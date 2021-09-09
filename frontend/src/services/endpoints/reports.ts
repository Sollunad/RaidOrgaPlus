import { Response } from '../../../../models/Types';
import con from '../connector';

export default { uploadReport };

async function uploadReport(file: File, aufstellung: number, token?: string): Promise<Response<string>> {
	return await con('reports', 'form', { aufstellung, token, file }, true);
}