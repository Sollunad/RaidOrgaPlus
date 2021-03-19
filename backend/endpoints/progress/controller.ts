import * as _progress from './progress';
import * as _user from '../users/user';
import * as _insights from './insights';
import * as _achievements from './achievements';
import { Request } from 'express';
import { Authentication } from 'models/Auth';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

const endpoints: ControllerEndpoint[] = [
	{ function: getProgress, path: '', method: 'get', authed: true },
	{ function: getInsights, path: '/li', method: 'get', authed: true },
	{ function: getAchievements, path: '/achievements', method: 'get', authed: true },
];
export default endpoints;

async function getProgress(req: Request, authentication: Authentication): Promise<any> {
	const user = parseInt(req.query.user as string);
	if (user) {
		const isShared = await getShareValue(user);
		if (isShared) return await _progress.progress(user);
		else return false;
	} else {
		return await _progress.progress(authentication.user);
	}
}

async function getInsights(req: Request, authentication: Authentication): Promise<any> {
	const user = parseInt(req.query.user as string);
	if (user) {
		const isShared = await getShareValue(user);
		if (isShared) return await _insights.insights(user);
		else return false;
	} else {
		return await _insights.insights(authentication.user);
	}
}

async function getAchievements(req: Request, authentication: Authentication): Promise<any> {
	const user = parseInt(req.query.user as string);
	if (user) {
		const isShared = await getShareValue(user);
		if (isShared) return await _achievements.achievementsDone(user);
		else return false;
	} else {
		return await _achievements.achievementsDone(authentication.user);
	}
}

async function getShareValue(user: number): Promise<boolean> {
	const response = await _user.hasProgressShared(user);
	if (response.length > 0) {
		const sharedValue = response[0];
		return sharedValue;
	}
}