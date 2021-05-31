import { Request } from 'express';
import { OkPacket } from 'mysql';

import * as _roles from '../../authentication/role';
import * as _users from './users';
import * as _raids from './raids';
import * as _invites from '../raids/invites';
import * as _discord from '../../discord/users';
import * as _guild from '../../gw2api/guilds';
import { getAllExtraAccounts } from '../users/user';
import { Authentication } from 'models/Auth';
import { Spieler } from 'models/Spieler';
import { ControllerEndpoint } from 'models/ControllerEndpoint';
import { ExtraAccount } from '../../../models/ExtraAccount';

type Users = (Spieler & { firstTermin: Date, lastTermin: Date, guild: any, guildLog: any, extraAccounts: ExtraAccount[] })[];

const endpoints: ControllerEndpoint[] = [
	{ function: getUsers, path: '/users', method: 'get', authed: true },
	{ function: getRaids, path: '/raids', method: 'get', authed: true },
	{ function: createRaid, path: '/raids', method: 'post', authed: true },
	{ function: invitablePlayers, path: '/raids/invitable', method: 'get', authed: true },
	{ function: addPlayer, path: '/raids/spieler', method: 'post', authed: true },
	{ function: getPlayersForRaid, path: '/raids/spieler', method: 'get', authed: true },
	{ function: setPlayerRole, path: '/raids/role', method: 'put', authed: true },
	{ function: removePlayer, path: '/raids/spieler', method: 'delete', authed: true },
	{ function: setComment, path: '/users/comment', method: 'put', authed: true },
];
export default endpoints;

async function getUsers(req: Request, authentication: Authentication): Promise<Users> {
	const role = _roles.getRole(authentication);
	if (role > 0) {
		const users: Users = await _users.getUsers() as Users;
		const discordUsers = await _discord.getAllUsers();
		const guildUsers = await _guild.getUsers();
		const guildLog = await _guild.getGuildLog();
		const allExtraAccounts = await getAllExtraAccounts();
		for (const user of users) {
			const discordUser = _discord.findUser(user, discordUsers);
			const guildUser = _guild.findUser(user, guildUsers);
			const extraAccounts = allExtraAccounts.filter(e => e.fk_spieler === user.id);

			// TODO: the property discord of the user needs to be of type 'string | DiscordMember'.
			if (discordUser) {
				user.discord = discordUser;
			} else {
				user.discord = null;
			}

			if (guildUser) {
				user.guild = guildUser;
				user.guildLog = _guild.filterLogByUser(user, guildLog);
			}

			if (extraAccounts && extraAccounts.length > 0) {
				user.extraAccounts = extraAccounts;
			}
		}
		return users;
	}
	return [];
}

async function getRaids(req: Request, authentication: Authentication): Promise<any> {
	const role = _roles.getRole(authentication);
	if (role > 0) {
		// TODO adjust the type
		const raids: any = await _raids.getRaids();
		const discordUsers = await _discord.getAllUsers();
		for (const raid of raids) {
			const users = await _raids.listPlayers(raid.id);
			for (const user of users) {
				const discordUser = _discord.findUser(user, discordUsers);
				if (discordUser) {
					user.discord = discordUser;
				} else {
					user.discord = null;
				}
			}
			raid.spieler = users;
		}
		return raids;
	}
	return [];
}

async function getPlayersForRaid(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raid = Number(req.query.raid);
	const role = _roles.getRole(authentication);
	if (role > 0 && raid) {
		const discordUsers = await _discord.getAllUsers();
		const users = await _raids.listPlayers(raid);
		for (const user of users) {
			const discordUser = _discord.findUser(user, discordUsers);
			if (discordUser) {
				user.discord = discordUser;
			}
		}
		return users;
	}
	return [];
}

async function createRaid(req: Request, authentication: Authentication): Promise<OkPacket> {
	const name = req.body.name;
	const role = _roles.getRole(authentication);
	if (role > 0 && name) {
		await _raids.createRaid(name);
	}
	return;
}

async function invitablePlayers(req: Request, authentication: Authentication): Promise<Spieler[]> {
	const raid = Number(req.query.raid);
	const role = _roles.getRole(authentication);
	if (role > 0 && raid) {
		return await _invites.invitable(raid);
	}
	return [];
}

async function addPlayer(req: Request, authentication: Authentication): Promise<OkPacket> {
	const raid = Number(req.body.raid);
	const spieler = Number(req.body.spieler);
	const role = _roles.getRole(authentication);
	if (role > 0 && raid && spieler) {
		await _raids.addPlayer(raid, spieler);
	}
	return;
}

async function removePlayer(req: Request, authentication: Authentication): Promise<OkPacket> {
	const raid = Number(req.body.raid);
	const spieler = Number(req.body.spieler);
	const role = _roles.getRole(authentication);
	if (role > 0 && raid && spieler) {
		await _raids.removePlayer(raid, spieler);
	}
	return;
}

async function setPlayerRole(req: Request, authentication: Authentication): Promise<void> {
	const raid = Number(req.body.raid);
	const spieler = Number(req.body.spieler);
	const role_to_set = Number(req.body.role);
	const role = _roles.getRole(authentication);
	if (role > 0 && raid && spieler && (role_to_set || role_to_set === 0)) {
		await _raids.setPlayerRole(raid, spieler, role_to_set);
	}
}

async function setComment(req: Request, authentication: Authentication): Promise<void> {
	const spieler = Number(req.body.spieler);
	const comment = req.body.comment;
	if (spieler && comment) {
		const role = _roles.getRole(authentication);
		if (role > 0) await _users.setComment(spieler, comment);
	}
}
