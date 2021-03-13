import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export async function isPreviewable(termin: number): Promise<boolean[]> {
    const stmt = 'SELECT preview FROM Termin WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
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



