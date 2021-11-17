export interface Class {
	id: number;
	name: string;
	abbr: string;
	color: string;
	isBase: boolean;
	fk_base: number;
}

export const CLASSES: Class[] = [
	{ id: 1, name: "Elementalist", abbr: "Ele", color: "", isBase: true, fk_base: 1 },
	{ id: 2, name: "Mesmer", abbr: "Mes", color: "", isBase: true, fk_base: 2 },
	{ id: 3, name: "Necromancer", abbr: "Nec", color: "", isBase: true, fk_base: 3 },
	{ id: 4, name: "Renegade", abbr: "Rgr", color: "", isBase: true, fk_base: 4 },
	{ id: 5, name: "Engineer", abbr: "Eng", color: "", isBase: true, fk_base: 5 },
	{ id: 6, name: "Thief", abbr: "Thf", color: "", isBase: true, fk_base: 6 },
	{ id: 7, name: "Warrior", abbr: "War", color: "", isBase: true, fk_base: 7 },
	{ id: 8, name: "Guardian", abbr: "Gdn", color: "", isBase: true, fk_base: 8 },
	{ id: 9, name: "Revenant", abbr: "Rev", color: "", isBase: true, fk_base: 9 },
];