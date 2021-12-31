import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v9";
import { Command } from "models/Commands";
import { defaultExport } from "../../models/Types";

async function getCommands(): Promise<RESTPostAPIApplicationCommandsJSONBody[]> {
	const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
	const commandFiles = fs.readdirSync(path.resolve(__dirname, "./commands")).filter((file) => file.endsWith(".ts"));

	for (const file of commandFiles) {
		const command: defaultExport<Command> = await import(`./commands/${file}`);
		commands.push(command.default.data.toJSON());
	}

	return commands;
}

(async (): Promise<void> => {
	const commands = await getCommands();

	const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

	const clientId = process.env.CLIENT_ID;
	const guildId = process.env.GUILD_ID;

	const applicationCommands = Routes.applicationGuildCommands(clientId, guildId);

	try {
		await rest.put(applicationCommands, { body: commands });
		console.log("Successfully registered application commands.")
	} catch (e) {
		console.error(e);
	}
})();
