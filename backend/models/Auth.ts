import { UserRole } from "../../models/Spieler";

export interface Authentication {
	user: number,
	role: UserRole,
	uuid: string,
	agent: string,
	raids: { id: number, role: number }[],
	cachedUntil: number
}