import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Command } from "models/Commands";

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".ts"));

commandFiles.forEach(async file => {
	const command: Command = await import(`./commands/${file}`);
	commands.push(command.data.toJSON());
});

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const applicationCommands: any = Routes.applicationGuildCommands(clientId, guildId);

rest.put(applicationCommands, { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
