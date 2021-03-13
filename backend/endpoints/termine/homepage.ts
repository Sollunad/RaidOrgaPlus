import * as db from '../../db/connector';
import * as dateMapper from './dateMapper';

export async function getHomepageTermine(user: number): Promise<any[]> {
    const stmt = 'SELECT Termin.id, Raid.id AS raidID, Raid.name, Raid.icon, Spieler_Raid.role, Termin.date, Termin.time, Termin.endtime, Spieler_Termin.type ' +
        'FROM Termin ' +
        'JOIN Raid ON Termin.fk_raid = Raid.id ' +
        'JOIN Spieler_Raid ON Raid.id = Spieler_Raid.fk_raid ' +
        'LEFT JOIN Spieler_Termin ON fk_termin = Termin.id AND Spieler_Termin.fk_spieler = ? ' +
        'WHERE Spieler_Raid.fk_spieler = ? AND Termin.isArchived = 0 ' +
        'ORDER BY Termin.date, Termin.time';
    try {
		const response = await db.queryV<unknown[]>(stmt, [user, user]);
        return response.map(dateMapper.map);
    } catch(e) {
        throw e;
    }
}