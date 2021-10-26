export interface Rolle {
	id: number;
	name: string;
	abbr: string;
}

export const ROLES: Rolle[] = [
	{ id: 1, name: 'Power', abbr: 'P' },
	{ id: 2, name: 'Condi', abbr: 'C' },
	{ id: 3, name: 'Tank', abbr: 'T' },
	{ id: 4, name: 'Healer', abbr: 'H' },
	{ id: 5, name: 'Support', abbr: 'U' },
	{ id: 6, name: 'Banner Slave', abbr: 'B' },
	{ id: 7, name: 'Special', abbr: 'S' },
	{ id: 8, name: 'Kiter', abbr: 'K' },
];