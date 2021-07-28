import axios from 'axios';
import _cookies from './util/cookies';
import config from './config.json';
import { getCurrentEnvironment } from '@/utils/misc';

export default fetch;

async function fetch<T>(endpoint: string, method: string, params: any, authed: boolean): Promise<T> {
	const url = config[getCurrentEnvironment()] + endpoint;
	if (authed) params.auth = _cookies.getCookie('session');
	if (method === 'get') {
		return (await axios({ method, url, params })).data;
	} else if (method === 'form') {
		const formData = new FormData();
		for (const param in params) {
			formData.append(param, params[param]);
		}
		const headers = { 'Content-Type': 'multipart/form-data' };
		return (await axios.post<T>(url, formData, { headers })).data;
	}
	else {
		return (await axios({ method, url, data: params })).data;
	}
}