import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export async function getLastActivity(userId: number): Promise<boolean[]> {
    const stmt = 'SELECT lastActive FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

export async function updateLastActivity(userId: number): Promise<OkPacket> {
    const stmt = 'UPDATE Spieler SET lastActive = CURRENT_TIMESTAMP WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}