import { homepageTermin } from '../../../models/Types';
import { queryV } from "database/src/connector";
import * as dateMapper from './dateMapper';

export async function getHomepageTermine(user: number): Promise<homepageTermin[]> {
	const stmt = `
		SELECT Termin.id, Raid.id as raidID, Raid.name, Raid.icon, Spieler_Raid.role, Termin.date, Termin.time, Termin.endtime, Spieler_Termin.type
		FROM Termin
		JOIN Raid ON Termin.fk_raid = Raid.id
		JOIN Spieler_Raid ON Raid.id = Spieler_Raid.fk_raid
		LEFT JOIN Spieler_Termin ON fk_termin = Termin.id AND Spieler_Termin.fk_spieler = ?
		WHERE Spieler_Raid.fk_spieler = ? AND Termin.isArchived = 0
		ORDER BY Termin.date, Termin.time
	`;
    try {
		const response = await queryV<homepageTermin[]>(stmt, [user, user]);
        return response.map(dateMapper.map);
    } catch(e) {
        throw e;
    }
}