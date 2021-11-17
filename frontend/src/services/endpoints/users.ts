import con from '../connector';
import { ExtraAccount } from 'models/ExtraAccount';
import { Build } from 'models/Build';
import { Spieler } from 'models/Spieler';
import { Theme } from '../../../../models/Enums';

export default {
	get, getWithID, hasApi, setApi, changeName, register, login,
	invalidateSession, getBuilds, addBuild, deleteBuild, putPrefer, changeEmail, changePassword, createResetToken,
	resetPassword, getDiscordKey, hasProgressShared, setProgressShared, getExtraAccounts, addExtraAccount, deleteExtraAccount,
	updateTheme
};

async function get(): Promise<Spieler> {
	return (await con('users', 'get', {}, true));
}

async function getWithID(id: number | string): Promise<Spieler> {
	return (await con('users', 'get', { id }, true));
}

async function hasApi(): Promise<boolean> {
	return await con('users/api', 'get', {}, true);
}

async function setApi(apiKey: string): Promise<any> {
	return await con('users/api', 'post', { apiKey }, true);
}

async function changeName(name: string): Promise<void> {
	return await con('users/name', 'post', { name }, true);
}

async function changeEmail(email: string, pwd: string): Promise<string> {
	return (await con<string[]>('users/mail', 'post', { email, pwd }, true))[0];
}

async function changePassword(oldPwd: string, newPwd: string): Promise<string> {
	return (await con<string[]>('users/pwd', 'post', { oldPwd, newPwd }, true))[0];
}

async function register(accName: string, pwd: string, name: string, email: string): Promise<boolean> {
	return await con('users', 'post', { accName, pwd, name, email }, false);
}

async function login(accName: string, pwd: string): Promise<string> {
	return await con('users/sessions', 'post', { accName, pwd }, false)
}

async function invalidateSession(): Promise<void> {
	return await con('users/sessions', 'delete', {}, true)
}

async function getBuilds(user: number): Promise<Build[]> {
	return await con('users/builds', 'get', { user }, true);
}

async function addBuild(clss: number, role: string): Promise<void> {
	return await con('users/builds', 'post', { clss, role }, true);
}

async function deleteBuild(clss: number, role: string): Promise<void> {
	return await con('users/builds', 'delete', { clss, role }, true);
}

async function putPrefer(clss: number, role: string, pref: number): Promise<void> {
	return await con('users/builds/prefer', 'put', { clss, role, pref }, true);
}

async function createResetToken(accname: string): Promise<string[]> {
	return await con('users/pwdReset/create', 'post', { accname }, false);
}

async function resetPassword(token: string, pwd: string): Promise<string[]> {
	return await con('users/pwdReset', 'post', { token, pwd }, false);
}

async function getDiscordKey(): Promise<string[]> {
	return await con('users/discordKey', 'get', {}, true);
}

async function hasProgressShared(user: number | string | null): Promise<boolean> {
	return await con('users/shared', 'get', { user }, true);
}

async function setProgressShared(shared: boolean): Promise<void> {
	return await con('users/shared', 'put', { shared }, true);
}

async function getExtraAccounts(): Promise<ExtraAccount[]> {
	return await con('users/extraAccount', 'get', {}, true);
}

async function addExtraAccount(accName: string): Promise<{ id: number }> {
	return await con('users/extraAccount', 'put', { accName }, true);
}

async function deleteExtraAccount(accId: number): Promise<unknown> {
	return await con('users/extraAccount', 'delete', { accId }, true);
}

async function updateTheme(theme: Theme): Promise<void> {
	return await con('users/theme', 'put', { theme }, true);
}