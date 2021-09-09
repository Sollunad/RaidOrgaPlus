import con from '../connector';
import { playerInvite, Response, userRaid } from 'models/Types';
import { Spieler } from 'models/Spieler';

export default {
	listForPlayer, role, listPlayers, invitePlayer, invitablePlayers, kickPlayer,
	pendingInvitesForPlayer, pendingInvitesForRaid, acceptInvite, deleteInviteAsLead, deleteInviteAsSelf,
	getAnmeldungState, setLieutenantRole, generateUserToken, setUserToken, getUserToken
};

async function listForPlayer(): Promise<userRaid[]> {
	return await con('raids', 'get', {}, true);
}

async function role(raid: any): Promise<any> {
	return (await con<any>('raids/role', 'get', { raid: raid }, true)).role;
}

async function listPlayers(raid: number): Promise<Spieler[]> {
	return await con('raids/players', 'get', { raid }, true);
}

async function kickPlayer(raid: any, user: any): Promise<any> {
	return await con('raids/players', 'delete', { raid, user }, true);
}

async function invitePlayer(raid: any, user: any): Promise<any> {
	return await con('raids/invites', 'post', { raid, user }, true);
}

async function invitablePlayers(raid: any): Promise<Spieler[]> {
	return await con('raids/invitable', 'get', { raid }, true);
}

async function pendingInvitesForPlayer(): Promise<playerInvite[]> {
	return await con('raids/invites', 'get', {}, true);
}

async function pendingInvitesForRaid(raid: number): Promise<number[]> {
	return await con('raids/invites', 'get', { raid }, true);
}

async function acceptInvite(raid: number): Promise<void> {
	return await con('raids/invites/accept', 'post', { raid }, true);
}

async function deleteInviteAsLead(raid: any, user: any): Promise<any> {
	return await con('raids/invites', 'delete', { raid, user }, true);
}

async function deleteInviteAsSelf(raid: any): Promise<any> {
	return await con('raids/invites', 'delete', { raid }, true);
}

async function getAnmeldungState(): Promise<any> {
	return await con('raids/anmeldungen', 'get', {}, true);
}

async function setLieutenantRole(raidId: number, user: number, role: number): Promise<void> {
	return await con('raids/lieutenant', 'post', { raidId, user, role }, true);
}

async function generateUserToken(raidId: number): Promise<{ token: string, success: boolean }> {
	return await con('raids/generateUserToken', 'post', { raidId }, true);
}

async function setUserToken(raidId: number, token: string): Promise<Response> {
	return await con('raids/setUserToken', 'post', { raidId, token }, true);
}

async function getUserToken(raidId: number): Promise<Response<string>> {
	return await con('raids/getUserToken', 'get', { raidId }, true);
}