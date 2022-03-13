import { client } from "../../discord/bot";
import config from "./config.json";

export async function addRaidRole(raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	await guild.roles.fetch();

	await guild.roles.create({ name: raidName, position: guild.roles.cache.size + 1, reason: `Raid ${raidName} was added to RO+` });
}

export async function removeRaidRole(raidName: string): Promise<void> {
	const guild = client.guilds.cache.get(config.server);
	await guild.roles.fetch();

	const role = guild.roles.cache.find(r => r.name === raidName);
	if (role) {
		role.delete(`Raid ${raidName} was removed from RO+`);
	}
}