import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { defaultEmbed } from "../utils/embedProvider";

const command = new SlashCommandBuilder()
	.setName("moderation")
	.setDescription("Befehle für das Leitungsteam")
	.setDefaultPermission(false)
	.addSubcommand((sub) =>
		sub.setName("shoutbox").setDescription("Generiert eine Nachricht mit Reaction für die Shoutbox.")
	);

export default {
	data: command,
	execute: executeCommand,
	production: true,
};

async function executeCommand(interaction: CommandInteraction<CacheType>): Promise<void> {
	const subCommand = interaction.options.getSubcommand();

	switch (subCommand) {
		case "shoutbox":
			await pong(interaction);
			break;
	}
}

async function pong(interaction: CommandInteraction<CacheType>): Promise<void> {
	const embedMessage =
		"Mit der Shoutbox kann ist es euch möglich, dem Leitungsteam eine anonyme Nachricht zukommen zu lassen. " +
		"Dafür müsst ihr lediglich mit dem 🎫-Emote auf diese Nachricht reagieren und der Bot schreibt euch an. " +
		"Dem Bot schreibt ihr dann dass, was ihr dem Leitungsteam mitteilen möchtet. Anschließend erhaltet ihr eine Benachrichtigung darüber, das alles geklappt hat.\n\n" +
		"Das besondere an der Shoutbox ist aber, dass das Leitungsteam die Möglichkeit hat, auf eure Mitteilungen zu Antworten. " +
		"Ihr erhaltet in solchen Fällen dann vom Bot wieder eine Nachricht, mit der Antwort des Leitungsteam. " +
		"Ihr habt dann ebenfalls die Möglichkeit, auf diese Nachricht zu antworten, was eine anonyme Kommunikation mit dem Leitungsteam und euch ermöglicht.";
	const embed = defaultEmbed().setTitle("Die Shoutbox").setDescription(embedMessage);
	const message = await interaction.channel.send({ embeds: [embed] });

	await message.react("🎫");

	await interaction.reply({ content: "Nachricht generiert.", ephemeral: true });
}
