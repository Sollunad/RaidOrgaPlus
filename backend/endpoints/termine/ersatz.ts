import { queryV, OkPacket } from "database/src/connector";
import { Spieler } from '../../../models/Spieler';

export async function addErsatz(user: number, termin: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO Ersatzspieler (fk_termin, fk_spieler) VALUES (?, ?)';
    try {
        return await queryV(stmt, [termin, user]);
    } catch(e) {
        throw e;
    }
}

export async function getErsatz(termin: number): Promise<Spieler[]> {
    const stmt = 'SELECT fk_spieler as id, accname, name FROM Ersatzspieler JOIN Spieler ON Spieler.id = Ersatzspieler.fk_spieler WHERE fk_termin = ?';
    try {
        return await queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

export async function deleteErsatz(user: number, termin: number): Promise<OkPacket> {
    const stmt = 'DELETE FROM Ersatzspieler WHERE fk_termin = ? AND fk_spieler = ?';
    try {
        return await queryV(stmt, [termin, user]);
    } catch(e) {
        throw e;
    }
}