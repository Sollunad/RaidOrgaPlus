import { Spieler } from "./Spieler";

export interface Raid {
	id: number;
	name: string;
	icon: string;
	active: boolean;
	dpsReportToken?: string;
	discordChannel?: string;
}

export interface ModRaid extends Raid {
	spieler: Spieler[];
}