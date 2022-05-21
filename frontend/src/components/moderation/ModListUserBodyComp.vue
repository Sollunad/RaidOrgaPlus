<template>
	<div>
		<div class="textLine"><span class="font-weight-bold">Account Name: </span>{{ user.accname }}</div>
		<div class="textLine"><span class="font-weight-bold">Anzeige Name: </span>{{ user.name }}</div>
		<div class="subheading textLine"><span class="font-weight-bold">Zuletzt online:</span> {{ lastActive }}</div>
		<div class="subheading textLine">
			<span class="font-weight-bold">Erste Raid-Anmeldung:</span> {{ firstTermin }}
		</div>
		<div class="subheading textLine">
			<span class="font-weight-bold">Letzte Raid-Anmeldung:</span> {{ lastTermin }}
		</div>
		<div class="subheading textLine" v-if="user.archived">
			<span class="font-weight-bold">Archivierungs Datum:</span> {{ user.archiveDate }}
		</div>
		<v-divider class="divider" v-if="hasExtraAccounts || hasDiscord || isInGuild"></v-divider>
		<div v-if="hasExtraAccounts">
			<div class="headline heading">Extra Accounts</div>
			<span v-for="(account, i) in user.extraAccounts" :key="i">
				<div class="subheading textLine">
					<span class="font-weight-bold">Account {{ i + 1 }}:</span> {{ account.accName }}
				</div>
			</span>
		</div>
		<v-divider class="divider" v-if="hasExtraAccounts && (hasDiscord || isInGuild)"></v-divider>
		<div v-if="hasDiscord">
			<div class="headline heading">Discord</div>
			<ModListUserBodyRolesComp v-bind:roles="user.discord.roles" class="roles"></ModListUserBodyRolesComp>
			<div class="subheading textLine">
				<span class="font-weight-bold">Accountname:</span> {{ user.discord.username }}
			</div>
			<div class="subheading textLine">
				<span class="font-weight-bold">Nickname:</span> {{ user.discord.nickname }}
			</div>
			<div class="subheading textLine">
				<span class="font-weight-bold">Discord beigetreten:</span> {{ discordJoinDate }}
			</div>
		</div>
		<v-divider class="divider" v-if="hasDiscord && isInGuild"></v-divider>
		<div v-if="isInGuild">
			<div class="headline heading">
				Gilde
			</div>
			<div class="subheading textLine">
				<span class="font-weight-bold">Gildenrang:</span> {{ user.guild.rank }}
			</div>
			<div class="subheading textLine">
				<span class="font-weight-bold">Gilde beigetreten:</span> {{ guildJoinDate }}
			</div>
		</div>
		<v-btn class="openProfileButton" @click="openLink" rounded>Profil</v-btn>
		<v-dialog width="600">
			<template v-slot:activator="{ on }">
				<v-btn class="openProfileButton" v-on="on" rounded>Bearbeiten</v-btn>
			</template>
			<ModListUserEditComp :user="user"></ModListUserEditComp>
		</v-dialog>
		<v-dialog width="600" v-if="isInGuild">
			<template v-slot:activator="{ on }">
				<v-btn class="openProfileButton" v-on="on" rounded>Gildenhistorie</v-btn>
			</template>
			<ModListUserGuildLogComp :log="user.guildLog"></ModListUserGuildLogComp>
		</v-dialog>
		<v-dialog width="600" v-model="archiveDialog">
			<template v-slot:activator="{ on }">
				<v-btn class="openProfileButton" v-on="on" rounded>Archivieren</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span>Spieler {{ user.accname }} Archivieren</span>
				</v-card-title>

				<v-divider style="margin-top: -4px" />

				<v-card-text>
					Möchtest du den/die Spieler*in <span style="font-weight: bold">{{ user.accname }}</span> wirklich
					archivieren?
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn @click="closeDialog">Nein</v-btn>
					<v-btn @click="archive">Ja</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import ModListUserBodyRolesComp from "./ModListUserBodyRolesComp.vue";
	import ModListUserGuildLogComp from "./ModListUserGuildLogComp.vue";
	import ModListUserEditComp from "./ModListUserEditComp.vue";
	import moderation from "../../services/endpoints/moderation";
	import { User } from "models/Types";
	import { DiscordMember } from "models/Discord";

	export default Vue.extend({
		name: "ModListUserBodyComp",
		components: { ModListUserEditComp, ModListUserGuildLogComp, ModListUserBodyRolesComp },
		data: () => ({
			archiveDialog: false,
		}),
		props: {
			user: Object as PropType<User>,
		},
		computed: {
			hasDiscord: function(): boolean {
				return !!this.user.discord;
			},
			isInGuild: function(): boolean {
				return !!this.user.guild;
			},
			discordJoinDate: function(): string {
				if (this.hasDiscord) {
					const date = new Date((this.user.discord as DiscordMember).joined);
					const dateOptions: any = {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					};
					return date.toLocaleDateString("de-DE", dateOptions);
				} else {
					return "";
				}
			},
			guildJoinDate: function(): string {
				if (this.isInGuild) {
					const date = new Date(this.user.guild.joined);
					const dateOptions: any = {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					};
					return date.toLocaleDateString("de-DE", dateOptions);
				} else {
					return "";
				}
			},
			lastActive: function(): string {
				if (!this.user.lastActive) return "Keine Aufzeichnung";
				const date = Number(new Date(this.user.lastActive));
				const diff = Number(new Date()) - date;
				const minutes = Math.ceil(diff / (1000 * 60));
				if (minutes === 1) return "gerade eben";
				else if (minutes < 60) return `vor ${minutes} Minuten`;
				const hours = Math.floor(minutes / 60);
				if (hours === 1) return "vor 1 Stunde";
				else if (hours < 24) return `vor ${hours} Stunden`;
				const days = Math.floor(hours / 24);
				if (days === 1) return "vor 1 Tag";
				else return `vor ${days} Tagen`;
			},
			firstTermin: function(): string {
				return this.parseDate(this.user.firstTermin);
			},
			lastTermin: function(): string {
				return this.parseDate(this.user.lastTermin);
			},
			hasExtraAccounts: function(): boolean {
				return !!this.user.extraAccounts && this.user.extraAccounts.length > 0;
			},
		},
		methods: {
			openLink: function(): void {
				this.$router.push(`/profil/${this.user.id}`);
			},
			parseDate: function(dateString: any): string {
				if (dateString) {
					const date = new Date(dateString);
					const dateOptions: any = { day: "2-digit", month: "2-digit", year: "numeric" };
					return date.toLocaleDateString("de-DE", dateOptions);
				} else {
					return "Nie";
				}
			},
			closeDialog: function(): void {
				this.archiveDialog = false;
			},
			archive: async function(): Promise<void> {
				console.log(this.user);
				const archiveDate = await moderation.archiveSpieler(this.user.id);
				this.$emit("archive", this.user.id, archiveDate);
				this.archiveDialog = false;
			},
		},
	});
</script>

<style scoped>
	.roles {
		margin: 0 0 10px 5px;
	}

	.textLine {
		margin: 5px 0 0 9px;
		user-select: text;
	}

	.openProfileButton {
		margin-top: 15px;
		margin-right: 10px;
	}

	.heading {
		margin: 10px 0;
	}

	.divider {
		margin: 10px 0;
	}
</style>
