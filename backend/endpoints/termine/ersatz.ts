import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export async function addErsatz(user: number, termin: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO Ersatzspieler (fk_termin, fk_spieler) VALUES (?, ?)';
    try {
        return await db.queryV(stmt, [termin, user]);
    } catch(e) {
        throw e;
    }
}

export async function getErsatz(termin: number): Promise<any> {
    const stmt = 'SELECT fk_spieler as id, accname, name FROM Ersatzspieler JOIN Spieler ON Spieler.id = Ersatzspieler.fk_spieler WHERE fk_termin = ?';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

export async function deleteErsatz(user: number, termin: number): Promise<OkPacket> {
    const stmt = 'DELETE FROM Ersatzspieler WHERE fk_termin = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [termin, user]);
    } catch(e) {
        throw e;
    }
}