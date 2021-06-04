import { Client } from "discord.js";
import config from "./config.json";
import { checkDiscordUsers } from '../timer';

export class DiscordClient extends Client {
	config: any;
}

const client = new DiscordClient();
client.config = config;
client.login(config.token);

client.on('ready', () => {
	checkDiscordUsers();
});

export { client };

export const RISING_LIGHT_ID = '157565117070966784';
export const EVERYONE_ROLE_ID = '157565117070966784';
export const AVATAR_BASE_URL = 'https://cdn.discordapp.com/avatars';

export * from "./users";
export * from "./roles";