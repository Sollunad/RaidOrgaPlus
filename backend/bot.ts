import fs from "fs";
import { Intents, Collection } from "discord.js";
import { DiscordClient } from "./models/DiscordClient";
import { Command } from "./models/Commands";
import { defaultExport } from "models/Types";

const intents = [
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILDS,
];
const client = new DiscordClient({
	intents: intents,
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./discord/commands").filter((file) => file.endsWith(".ts"));

commandFiles.forEach(async (file) => {
	const command: defaultExport<Command> = await import(`./discord/commands/${file}`);
	client.commands.set(command.default.data.name, command.default);
});

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand() || interaction.member.user.bot) {
		return;
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		return;
	}

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: "There was an error while executing this command!" });
	}
});

client.login(process.env.DISCORD_TOKEN);
