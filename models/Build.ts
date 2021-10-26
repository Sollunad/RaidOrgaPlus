export interface Build {
	class: Class;
	role: Role;
	prefer: number;
}

interface Class {
	abbr: string;
	id: number;
	color?: string;
}

interface Role {
	abbr: string;
	id: number;
}

export const roles: Role[] = [
	{ id: 1, abbr: 'P' }, // Power
	{ id: 2, abbr: 'C' }, // Condi
	{ id: 3, abbr: 'T' }, // Tank
	{ id: 4, abbr: 'H' }, // Healer
	{ id: 5, abbr: 'U' }, // Utility
	{ id: 6, abbr: 'B' }, // Banner Slave
	{ id: 7, abbr: 'S' }, // Special
	{ id: 8, abbr: 'K' }, // Kiter
]

export const classes: Class[] = [
	{ id: 1, abbr: 'Ele' },
	{ id: 2, abbr: 'Mes' },
	{ id: 3, abbr: 'Nec' },
	{ id: 4, abbr: 'Rgr' },
	{ id: 5, abbr: 'Eng' },
	{ id: 6, abbr: 'Thf' },
	{ id: 7, abbr: 'War' },
	{ id: 8, abbr: 'Gdn' },
	{ id: 9, abbr: 'Rev' },
]