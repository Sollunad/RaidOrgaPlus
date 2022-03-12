import { REST } from "@discordjs/rest";
import { Routes, APIApplicationCommand } from "discord-api-types/v9";

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const permissionId = process.env.PERMISSION_ID;
const typeId = process.env.TYPE_ID;

const applicationCommands = Routes.applicationGuildCommands(clientId, guildId);

(async (): Promise<void> => {
	try {
		const commandGroups = ["test", "moderation"];
		const commands = (await rest.get(applicationCommands)) as APIApplicationCommand[];
		const commandIds = commands.filter((c) => commandGroups.includes(c.name)).map((c) => c.id);

		commandIds.forEach(async (id) => {
			const permissionRoute = Routes.applicationCommandPermissions(clientId, guildId, id);
			const json = {
				permissions: [
					{
						id: permissionId,
						type: typeId,
						permission: true,
					},
				],
			};

			await rest.put(permissionRoute, { body: json });
		});

		console.log("Succesfully updated command permissions");
	} catch (e) {
		console.error(e);
	}
})();
