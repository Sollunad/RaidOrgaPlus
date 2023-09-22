import {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	MessageContextMenuCommandInteraction,
	CacheType,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
} from "discord.js";
import { defaultEmbed } from "../Utils/embedProvider";
import { checkAccountName } from "../Utils/misc";
import { getPlayer, upgradePlayer } from "../Utils/queries";

const command = new ContextMenuCommandBuilder().setName("Bewerbung prüfen").setType(ApplicationCommandType.Message);

const executeCommand = async (interaction: MessageContextMenuCommandInteraction<CacheType>): Promise<void> => {
	const message = interaction.targetMessage;

	if (!message.embeds || message.embeds.length <= 0) {
		await interaction.reply({ content: "Bei der Message konnte kein Embed gefunden werden.", ephemeral: true });
		return;
	}

	const embed = message.embeds[0];
	const field = embed.fields.find((f) => f.name === "Account Name");
	if (!field) {
		await interaction.reply({
			content: "Es wurde kein Feld mit dem Namen 'Account Name' gefunden.",
			ephemeral: true,
		});
		return;
	}

	const accountName = field.value;
	const isNameCorrect = checkAccountName(accountName);

	const userString = embed.description;
	const userId = /\d+/.exec(userString)[0];

	const guildMember = await interaction.guild.members.fetch(userId);
	const nickname = guildMember.nickname ?? "-";
	const isNicknameCorrect =
		guildMember.nickname != null && guildMember.nickname.trim() != null
			? guildMember.nickname.includes(accountName)
			: false;

	let hasOrgaAccount = false;
	let orgaAccount: { id: number; accname: string };
	try {
		orgaAccount = await getPlayer(accountName);
		hasOrgaAccount = !!orgaAccount;
	} catch (e) {
		console.error(e);
	}

	const resultEmbed = defaultEmbed()
		.setDescription(userString)
		.setTitle("Ergebnis der Überprüfung")
		.addFields([
			{ name: "Account Name korrekt?", value: boolToAnswer(isNameCorrect) + "\n" + accountName },
			{ name: "Nickname korrekt?", value: boolToAnswer(isNicknameCorrect) + "\n" + nickname },
			{ name: "RO+ Account vorhanden?", value: boolToAnswer(hasOrgaAccount) },
		]);

	const finishButton = new ButtonBuilder()
		.setCustomId("finishBewerbung")
		.setLabel("Bewerbung abschließen")
		.setStyle(ButtonStyle.Success)
		.setDisabled(!(isNameCorrect && isNicknameCorrect && hasOrgaAccount));

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(finishButton);

	const reply = await interaction.reply({ embeds: [resultEmbed], components: [row], ephemeral: true });

	try {
		const response = await reply.awaitMessageComponent({ time: 60_000 });

		if (response.customId === "finishBewerbung") {
			guildMember.roles.remove(process.env.OPEN_ROLE, "Bewerbung abgeschlossen");
			guildMember.roles.add(process.env.TRIAL_ROLE, "Bewerbung abgeschlossen");
			await upgradePlayer(orgaAccount.id);

			await response.update({ content: "Die Bewerbung wurde erfolgreich abgeschlossen!", components: [] });
		}
	} catch (e) {
		await interaction.editReply({ components: [] });
	}
};

const boolToAnswer = (value: boolean) => {
	return value ? "Ja" : "Nein";
};

export default {
	data: command,
	execute: executeCommand,
	production: true,
	global: false,
};
