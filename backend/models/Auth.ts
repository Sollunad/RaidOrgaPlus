import { UserRole } from "../../models/Enums";

export interface Authentication {
	user: number,
	role: UserRole,
	uuid: string,
	agent: string,
	raids: { id: number, role: number }[],
	cachedUntil: number
}