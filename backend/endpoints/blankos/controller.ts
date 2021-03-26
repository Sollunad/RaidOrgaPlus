import * as _blanko from './blanko';
import * as _roles from '../../authentication/role';
import { Request } from 'express';
import { Authentication } from 'models/Auth';
import { OkPacket } from 'mysql';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

const endpoints: ControllerEndpoint[] = [
	{ function: getElements, path: '', method: 'get', authed: true },
	{ function: postElement, path: '', method: 'post', authed: true },
	{ function: copyFromTo, path: '/copy', method: 'post', authed: true },
];
export default endpoints;

async function getElements(req: Request, authentication: Authentication): Promise<any> {
	const raid = parseInt(req.query.raid as string);
	const enc = parseInt(req.query.enc as string);
	if (raid) {
		const role = _roles.forRaid(authentication, raid);
		if (role != null) {
			if (enc) {
				return await _blanko.getElementsByEncounter(raid, enc);
			} else {
				return await _blanko.getAllElements(raid);
			}
		}
	}
	return [];
}

async function postElement(req: Request, authentication: Authentication): Promise<OkPacket> {
	const raid: number = req.body.raid;
	const enc: number = req.body.enc;
	const position: number = req.body.position;
	const type: string = req.body.type;
	const value: number = req.body.value;
	if (raid && enc && position && type && (value || value === 0)) {
		const role = _roles.forRaid(authentication, raid);
		if (role > 0) {
			if (type === "class") {
				return _blanko.setClass(raid, enc, position, value);
			} else if (type === "role") {
				return _blanko.setRole(raid, enc, position, value);
			}
		}
	}
	return;
}

async function copyFromTo(req: Request, authentication: Authentication): Promise<any> {
	const raid: number = req.body.raid;
	const from: number = req.body.from;
	const to: number = req.body.to;
	if (raid && from && to) {
		const role = _roles.forRaid(authentication, raid);
		if (role > 0) {
			return _blanko.copyFromTo(raid, from, to).then(async () => {
				return await _blanko.getAllElements(raid);
			});
		}
	}
}