import { client } from "../../discord/bot";
import { terminEmbed } from "../../discord/utils/embedProvider";
import { getTerminData } from "../../discord/events/Reaction";
import { DiscordClient } from "../../discord/models/DiscordClient";

import { DiscordTermin } from "../../models/Termin";

export async function updateTerminEmbed(discordTermin: DiscordTermin): Promise<void> {
	const { termin, anmeldungen, aufstellungen, raid } = await getTerminData(discordTermin.fk_termin);

	const embed = terminEmbed(client as DiscordClient, raid.name, termin, aufstellungen, anmeldungen);
	const guild = await client.guilds.fetch(process.env.GUILD_ID);
	const channel = await guild.channels.fetch(discordTermin.channelId);
	if (channel.isText()) {
		const message = await channel.messages.fetch(discordTermin.messageId);
		await message.edit({ embeds: [embed] });
	}
}