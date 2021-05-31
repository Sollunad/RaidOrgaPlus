import * as _raids from './raids';
import * as _invites from './invites';
import * as _roles from '../../authentication/role';
import { Request } from 'express';
import { Authentication } from 'models/Auth';
import { Spieler, SpielerRaid } from 'models/Spieler';
import { Raid } from 'models/Raid';
import { OkPacket } from 'mysql';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

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
];
export default endpoints;

async function getRaids(req: Request, authentication: Authentication): Promise<(Raid & SpielerRaid)[]> {
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

async function getPendingInvites(req: Request, authentication: Authentication): Promise<any[]> {
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
	const raid = Number(req.body.raid);
	if (raid) {
		if (await _invites.isInvited(raid, authentication.user)) {
			return await _invites.accept(raid, authentication.user);
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

async function anmeldungStatesForUser(req: Request, authentication: Authentication): Promise<any> {
	return (await _raids.anmeldungStatesForUser(authentication.user));
}

async function kickPlayer(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raid = Number(req.body.raid);
	const user = Number(req.body.user);
	if (raid && user) {
		const role = _roles.forRaid(authentication, raid);
		const kickRole = (await _raids.getRoleForPlayer(raid, user))[0];
		if (role > 0 && role > kickRole) {
			return _raids.kickPlayer(raid, user).then(async () => {
				return await _raids.listPlayers(raid);
			});
		}
	}
}