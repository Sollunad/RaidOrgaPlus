import { DiscordMember } from "./Discord";
import { ExtraAccount } from "./ExtraAccount";
import { Spieler } from "./Spieler";

export type element = {
	aufstellung: number;
	pos: number;
	class: string;
	role: string;
	id: number;
	name: string;
	accname: string;
};

export type playerInvite = {
	id: number;
	name: string;
}

export type raidInvite = {
	spieler: number;
}

export type SpielerType = Omit<Spieler, 'discord'> & {
	discord: string;
};

export type User = Omit<Spieler, 'discord'> & {
	firstTermin: Date;
	lastTermin: Date;
	guild: any;
	guildLog: any;
	extraAccounts: ExtraAccount[];
	discord: DiscordMember;
};