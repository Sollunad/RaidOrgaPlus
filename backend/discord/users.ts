import { Client, GuildMember, RoleData } from "discord.js";
import { Spieler } from "models/Spieler";
import config from "./config.json";

interface DiscordRole {
	id: string;
	name: string;
	color: string;
}

interface DiscordMember {
	id: string;
	username: string;
	nickname: string;
	roles: DiscordRole[];
	joined: number;
	avatar: string;
	color: string;
}

class DiscordClient extends Client {
	config: any;
}

const client = new DiscordClient();
client.config = config;
client.login(config.token);

const RISING_LIGHT_ID = '157565117070966784';
const EVERYONE_ROLE_ID = '157565117070966784';
const AVATAR_BASE_URL = 'https://cdn.discordapp.com/avatars';

export async function getUser(id: string): Promise<DiscordMember> {
	return (await getAllUsers()).find(m => m.id === id);
}

export async function getAllUsers(): Promise<DiscordMember[]> {
	try {
		const guild = client.guilds.cache.get(config.server);
		const members = await guild.members.fetch();
		return members.filter(m => m.user.bot === false).map(mapMember);
	} catch (e) {
		console.log(e);
		return [];
	}
}

function mapMember(member: GuildMember): DiscordMember {
	return {
		id: member.user.id,
		username: `${member.user.username}#${member.user.discriminator}`,
		nickname: getNickname(member),
		roles: getRoles(member),
		joined: member.joinedTimestamp,
		avatar: getAvatarURL(member),
		color: member.displayHexColor
	}
}

function getNickname(member: GuildMember): string {
	if (member.nickname === null) {
		return member.user.username;
	} else {
		return member.nickname;
	}
}

function getRoles(member: GuildMember): DiscordRole[] {
	return member.roles.cache.filter(r => r.id !== config.server).map(r => {
		return { id: r.id, name: r.name, color: parseColor(r.color) };
	});
}

function parseColor(number: number): string {
	return `#${number.toString(16).padStart(6, '0')}`;
}

function getAvatarURL(member: GuildMember): string {
	if (member.user.avatar === null) {
		return null;
	} else {
		return `${AVATAR_BASE_URL}/${member.user.id}/${member.user.avatar}`;
	}
}

export function findUser(roUser, discordUsers) {
	if (!roUser.discord) return;
	return discordUsers.find(d => {
		return d.id.toString() === roUser.discord.toString();
	});
}

export async function addRole(accName: string, raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	const members = await guild.members.fetch();
	const user = members.find(m => m.nickname.toLocaleUpperCase().includes(accName.toLocaleUpperCase()));
	
	let role = guild.roles.cache.find(r => r.name === raidName);
	if (!role) {
		await guild.roles.fetch();
		role = guild.roles.cache.find(r => r.name === raidName);
	}

	if (user && role) {
		user.roles.add(role);
	}
}

export async function removeRole(accName: string, raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	const members = await guild.members.fetch();
	const user = members.find(m => m.nickname.toLocaleUpperCase().includes(accName.toLocaleUpperCase()));

	let role = guild.roles.cache.find(r => r.name === raidName);
	if (!role) {
		await guild.roles.fetch();
		role = guild.roles.cache.find(r => r.name === raidName);
	}

	if (user && role) {
		user.roles.remove(role);
	}
}

export async function addRaidRole(raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	await guild.roles.fetch();

	const roleData: RoleData = { name: raidName, position: guild.roles.cache.size + 1 };
	await guild.roles.create({ data: roleData, reason: `Raid ${raidName} was added to RO+` });
}

export async function removeRaidRole(raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	await guild.roles.fetch();

	const role = guild.roles.cache.find(r => r.name === raidName);
	if (role) {
		role.delete(`Raid ${raidName} was removed from RO+`);
	}
}