export interface Aufstellung {
	id: number;
	fk_termin: number;
	fk_boss: number;
	is_cm: boolean;
	success: boolean;
	report: string;
}