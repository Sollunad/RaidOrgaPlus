import { Encounter } from 'models/Encounter';
import { Wing } from 'models/Wing';
import { query, queryV } from "database/src/connector";

export async function listByWing(): Promise<Encounter[][]> {
	const stmt = 'SELECT * FROM Encounter';
	try {
		const response: Encounter[] = await query(stmt);
		const ret: Encounter[][] = [];
		for (const enc of response) {
			const wing = enc.wing;
			if (!ret[wing - 1]) ret[wing - 1] = [];
			ret[wing - 1].push(enc);
		}
		return ret;
	} catch (e) {
		throw e;
	}
}

export async function list(): Promise<Encounter[]> {
	const stmt = 'SELECT * FROM Encounter';
	try {
		return await query(stmt);
	} catch (e) {
		throw e;
	}
}

export async function listForWing(wing: number): Promise<Encounter[]> {
	const stmt = 'SELECT * FROM Encounter WHERE wing = ?';
	try {
		return await queryV(stmt, wing);
	} catch (e) {
		throw e;
	}
}

export async function getWings(): Promise<Wing[]> {
	const stmt = 'SELECT * FROM Wing';
	try {
		return await query(stmt);
	} catch (e) {
		throw e;
	}
}