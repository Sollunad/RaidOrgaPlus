export interface Build {
	class: Class;
	role: Role;
	prefer: number;
}

interface Class {
	abbr: string;
	id: number;
	color: string;
}

interface Role {
	abbr: string;
	id: number;
}