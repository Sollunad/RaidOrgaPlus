export interface Spieler {
	id: number;
	accname: string;
	password: string;
	name: string;
	email: string;
	role: number;
	apikey: string;
	discord: string;
	share: boolean;
	sec_rl: boolean;
	sec_gcg: boolean;
	comment: string;
	lastActive: Date;
}

export interface SpielerBuild {
	fk_spieler: number;
	fk_class: number;
	fk_role: number;
	prefer: boolean;
}

export interface SpielerRaid {
	fk_spieler: number;
	fk_raid: number;
	role: number;
}

export interface SpielerTermin {
	fk_spieler: number;
	fk_termin: number;
	type: number;
}