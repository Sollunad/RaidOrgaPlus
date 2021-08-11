import { OkPacket } from 'mysql';
import { map } from '../termine/dateMapper';
import { terminDate } from '../../../models/Types';
import * as db from '../../db/connector';

export async function isPreviewable(termin: number): Promise<boolean[]> {
    const stmt = 'SELECT preview FROM Termin WHERE id = ?';
    try {
		const response: { preview: boolean }[] = await db.queryV(stmt, termin);
		return response.map(r => r.preview);
    } catch(e) {
        throw e;
    }
}

export async function setPreviewable(termin: number, able: number): Promise<OkPacket> {
    const stmt = 'UPDATE Termin SET preview = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [able, termin]);
    } catch(e) {
        throw e;
    }
}

export async function getTerminDate(termin: number): Promise<terminDate> {
	const stmt = `
		SELECT date, time, endtime
		FROM Termin
		WHERE id = ?;
	`;
	try {
		const response = await db.queryV<terminDate[]>(stmt, termin);
		return response.map(map)[0];
	} catch (e) {
		throw e;
	}
}