import { Spieler } from "./Spieler";

export interface Raid {
	id: number;
	name: string;
	icon: string;
	active: boolean;
}

export interface ModRaid extends Raid {
	spieler: Spieler[];
}