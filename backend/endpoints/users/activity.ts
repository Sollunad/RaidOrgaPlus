import * as db from '../../db/connector';

export async function getLastActivity(userId) {
    const stmt = 'SELECT lastActive FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

export async function updateLastActivity(userId) {
    const stmt = 'UPDATE Spieler SET lastActive = CURRENT_TIMESTAMP WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}