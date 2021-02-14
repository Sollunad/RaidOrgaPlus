import { Client, Message } from 'discord.js';

import Enmap = require("enmap");

export class DiscordClient extends Client {
	config: any;
	commands: Enmap;
	userdata: Enmap;
};

export class DiscordMessage extends Message {
	auth: any;
	raid: any;
}