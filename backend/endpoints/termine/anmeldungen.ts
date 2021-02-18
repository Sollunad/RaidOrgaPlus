import { Spieler, SpielerTermin } from 'models/Spieler';
import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export async function anmelden(spieler: number, termin: number, type: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO Spieler_Termin (fk_spieler, fk_termin, type) VALUES (?,?,?) ON DUPLICATE KEY UPDATE type=?';
    try {
        return await db.queryV(stmt, [spieler, termin, type, type]);
    } catch(e) {
        throw e;
    }
}

export async function getAnmeldungForSpieler(spieler: number, termin: number): Promise<{ type: number }> {
    const stmt = 'SELECT type FROM Spieler_Termin WHERE fk_spieler = ? AND fk_termin = ?';
    try {
        const response: SpielerTermin[] = await db.queryV(stmt, [spieler, termin]);
        if (response.length === 0) return {type: null};
        else return {type: response[0].type};
    } catch(e) {
        throw e;
    }
}

export async function getAnmeldungenForTermin(termin: number): Promise<(Spieler & SpielerTermin)[]> {
    const stmt = 'SELECT Spieler.id, Spieler.name, Spieler.accname, Spieler_Termin.type ' +
        'FROM Spieler_Termin JOIN Spieler ON Spieler.id = Spieler_Termin.fk_spieler ' +
        'WHERE fk_termin = ? ' +
        'UNION SELECT Spieler.id, Spieler.name, Spieler.accname, 3 ' +
        'FROM Spieler ' +
        'WHERE Spieler.id IN (SELECT fk_spieler FROM Spieler_Raid WHERE fk_raid = (SELECT fk_raid FROM Termin WHERE id = ?)) ' +
        'AND Spieler.id NOT IN (SELECT fk_spieler FROM Spieler_Termin WHERE fk_termin = ?) ' +
        'ORDER BY name';
    try {
        return await db.queryV(stmt, [termin, termin, termin]);
    } catch(e) {
        throw e;
    }
}