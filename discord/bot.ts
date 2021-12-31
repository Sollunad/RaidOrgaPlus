import fs from "fs";
import consoleStamp from "console-stamp";
import { Intents, Collection } from "discord.js";
import { DiscordClient } from "./models/DiscordClient";
import { Command } from "./models/Commands";
import { defaultExport } from "models/Types";

import { DiscordEvent } from "models/DiscordEvent";

consoleStamp(console, {
	format: ":date(dd.mm.yyyy HH:MM:ss.l) :label",
});

const intents = [
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.DIRECT_MESSAGES,
];
const client = new DiscordClient({
	intents: intents,
	partials: [ "MESSAGE", "REACTION" ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./discord/commands").filter((file) => file.endsWith(".ts"));

commandFiles.forEach(async (file) => {
	const command: defaultExport<Command> = await import(`./discord/commands/${file}`);
	client.commands.set(command.default.data.name, command.default);
});

const eventFiles = fs.readdirSync("./discord/events").filter((file) => file.endsWith(".ts"));
eventFiles.forEach(async (file) => {
	const event: defaultExport<DiscordEvent> = await import(`./discord/events/${file}`);
	if (event.default.once) {
		client.once(event.default.name, event.default.execute);
	} else {
		client.on(event.default.name, event.default.execute);
	}
});

client.login(process.env.DISCORD_TOKEN);
