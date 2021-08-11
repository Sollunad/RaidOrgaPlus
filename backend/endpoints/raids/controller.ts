import * as _raids from './raids';
import * as _invites from './invites';
import * as _roles from '../../authentication/role';
import * as _users from '../users/user';
import * as _discord from '../../discord/users';
import { Request } from 'express';
import { Authentication } from 'models/Auth';
import { Spieler } from 'models/Spieler';
import { OkPacket } from 'mysql';
import { ControllerEndpoint } from 'models/ControllerEndpoint';
import { playerInvite, terminState, userRaid } from 'models/Types';

const endpoints: ControllerEndpoint[] = [
	{ function: getRaids, path: '', method: 'get', authed: true },
	{ function: getRole, path: '/role', method: 'get', authed: true },
	{ function: listPlayers, path: '/players', method: 'get', authed: true },
	{ function: kickPlayer, path: '/players', method: 'delete', authed: true },
	{ function: getInvitablePlayers, path: '/invitable', method: 'get', authed: true },
	{ function: invitePlayer, path: '/invites', method: 'post', authed: true },
	{ function: getPendingInvites, path: '/invites', method: 'get', authed: true },
	{ function: acceptInvite, path: '/invites/accept', method: 'post', authed: true },
	{ function: deleteInvite, path: '/invites', method: 'delete', authed: true },
	{ function: anmeldungStatesForUser, path: '/anmeldungen', method: 'get', authed: true },
	{ function: setLieutenantRole, path: '/lieutenant', method: 'post', authed: true },
];
export default endpoints;

async function getRaids(req: Request, authentication: Authentication): Promise<userRaid[]> {
	return await _raids.listForPlayer(authentication.user);
}

async function getRole(req: Request, authentication: Authentication): Promise<{ role: number }> {
	const raid = Number(req.query.raid);
	if (raid) {
		const role = _roles.forRaid(authentication, raid);
		return { role: role };
	}
	return;
}

async function listPlayers(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raid = Number(req.query.raid);
	if (raid) {
		const role = _roles.forRaid(authentication, raid);
		if (role != null) return await _raids.listPlayers(raid);
	}
	return [];
}

async function invitePlayer(req: Request, authentication: Authentication): Promise<OkPacket> {
	const user = Number(req.body.user);
	const raid = Number(req.body.raid);
	if (user && raid) {
		const role = _roles.forRaid(authentication, raid);
		if (role > 0) return await _invites.invitePlayer(user, raid);
	}
	return;
}

async function getInvitablePlayers(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raid = Number(req.query.raid);
	if (raid) {
		const role = _roles.forRaid(authentication, raid);
		if (role > 0) return await _invites.invitable(raid);
	}
	return [];
}

async function getPendingInvites(req: Request, authentication: Authentication): Promise<number[] | playerInvite[]> {
	const raid = Number(req.query.raid);
	if (raid) {
		const role = _roles.forRaid(authentication, raid);
		if (role > 0) return ((await _invites.pendingForRaid(raid))).map(p => p.spieler);
	} else {
		return (await _invites.pendingForPlayer(authentication.user));
	}
	return [];
}

async function acceptInvite(req: Request, authentication: Authentication): Promise<OkPacket> {
	const raidId = Number(req.body.raid);
	if (raidId) {
		if (await _invites.isInvited(raidId, authentication.user)) {
			const raid = await _raids.get(raidId);
			const spieler = await _users.get(authentication.user);

			await _discord.addRole(spieler[0].accname, raid.name);
			return await _invites.accept(raidId, authentication.user);
		}
	}
	return;
}

async function deleteInvite(req: Request, authentication: Authentication): Promise<OkPacket> {
	const raid = Number(req.body.raid);
	const user = Number(req.body.user);
	if (raid) {
		if (user) {
			const role = _roles.forRaid(authentication, raid);
			if (role > 0) return await _invites.delete(raid, user);
		} else {
			return await _invites.delete(raid, authentication.user);
		}
	}
	return;
}

async function anmeldungStatesForUser(req: Request, authentication: Authentication): Promise<terminState[]> {
	return (await _raids.anmeldungStatesForUser(authentication.user));
}

async function kickPlayer(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raidId = Number(req.body.raid);
	const user = Number(req.body.user);
	if (raidId && user) {
		const role = _roles.forRaid(authentication, raidId);
		const kickRole = (await _raids.getRoleForPlayer(raidId, user))[0];
		if (role > 1 && role > kickRole) {
			const raid = await _raids.get(raidId);
			const spieler = await _users.get(user);

			return _raids.kickPlayer(raidId, user).then(async () => {
				await _discord.removeRole(spieler[0].accname, raid.name);
				return await _raids.listPlayers(raidId);
			});
		}
	}
}

async function setLieutenantRole(req: Request, authentication: Authentication): Promise<void> {
	const raidId = Number(req.body.raidId);
	const user = Number(req.body.user);
	const role = Number(req.body.role);
	if (raidId != null && user != null) {
		const userRole = _roles.forRaid(authentication, raidId);
		if (userRole > 1) {
			await _raids.setLieutenantRole(raidId, user, role);
		}
	}
}