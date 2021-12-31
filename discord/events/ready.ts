import { Client } from "discord.js";
import { DiscordEvent } from "../models/DiscordEvent";

export default {
	name: "ready",
	once: true,
	execute: async (client: Client<true>): Promise<void> => {
		console.log("Ready!");
	}
} as DiscordEvent