import { queryV, OkPacket } from "database/src/connector";

export async function getLastActivity(userId: number): Promise<boolean[]> {
    const stmt = 'SELECT lastActive FROM Spieler WHERE id = ?';
    try {
		const response: { lastActive: boolean }[] = await queryV(stmt, userId);
		return response.map(r => r.lastActive);
    } catch(e) {
        throw e;
    }
}

export async function updateLastActivity(userId: number): Promise<OkPacket> {
    const stmt = 'UPDATE Spieler SET lastActive = CURRENT_TIMESTAMP WHERE id = ?';
    try {
        return await queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}