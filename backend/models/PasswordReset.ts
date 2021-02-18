export interface PasswordReset {
	id: number;
	fk_spieler: number;
	token: string;
	created: Date;
}