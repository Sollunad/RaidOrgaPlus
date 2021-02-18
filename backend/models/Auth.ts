export interface Authentication {
	user: number,
	role: number,
	uuid: string,
	agent: string,
	raids: { id: number, role: number }[],
	cachedUntil: number
}