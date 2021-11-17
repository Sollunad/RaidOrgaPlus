import * as _classes from './classes';
import * as _encounter from './encounter';
import * as _achievements from './achievements';
import { Request } from 'express';
import { Class } from 'models/Klasse';
import { Encounter } from 'models/Encounter';
import { Wing } from 'models/Wing';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

const endpoints: ControllerEndpoint[] = [
	{ function: getForBase, path: '/classes', method: 'get', authed: false },
	{ function: getEncounter, path: '/encounter', method: 'get', authed: false },
	{ function: getWings, path: '/wings', method: 'get', authed: false },
	{ function: getAchievements, path: '/achievements', method: 'get', authed: false },
];
export default endpoints;

async function getForBase(req: Request): Promise<Class[]> {
	const base = Number(req.query.base);
	if (base) {
		return await _classes.getForBase(base);
	} else {
		return [];
	}
}

async function getEncounter(req: Request): Promise<Encounter[] | Encounter[][]> {
	const wing = Number(req.query.wing);
	const grouped = req.query.grouped;
	if (wing) {
		return await _encounter.listForWing(wing);
	} else {
		if (grouped) {
			return await _encounter.listByWing();
		} else {
			return await _encounter.list();
		}

	}
}

async function getWings(): Promise<Wing[]> {
	return await _encounter.getWings();
}

async function getAchievements(): Promise<any[]> {
	return await _achievements.getAchievements();
}