import { Spieler } from 'models/Spieler';
import { query, queryV } from "../../../database/connector";
import { OkPacket } from 'mysql';

const stmt = `
	SELECT t1.id, t1.accname, t1.name, t1.lastActive, t1.comment, t1.discord, t1.role, MIN(t1.firstTermin) AS firstTermin, MAX(t1.lastTermin) AS lastTermin
	FROM (
		SELECT s.id, s.accname, s.name, s.lastActive, s.comment, s.discord, s.role, MIN(t.date) AS firstTermin, MAX(t.date) AS lastTermin
		FROM Spieler s
		LEFT JOIN Spieler_Termin st ON s.id = st.fk_spieler
		LEFT JOIN Termin t ON st.fk_termin = t.id
		WHERE s.id > 9
		AND (st.type = 0 OR st.type = 1)
		GROUP BY id, accname, NAME, lastActive
		UNION
		SELECT s.id, s.accname, s.name, s.lastActive, s.comment, s.discord, s.role, MIN(t.date) AS firstTermin, MAX(t.date) AS lastTermin
		FROM Spieler s
		LEFT JOIN Ersatzspieler es ON s.id = es.fk_spieler
		LEFT JOIN Termin t ON es.fk_termin = t.id
		WHERE s.id > 9
		GROUP BY id, accname, NAME, lastActive
		ORDER BY accname
	) AS t1
	GROUP BY id, accname, name, lastActive, comment, discord, role
	ORDER BY t1.accname;
`;

export async function getUsers(): Promise<(Spieler & { firstTermin: Date, lastTermin: Date })[]> {
	try {
		return await query(stmt);
	} catch (e) {
		throw e;
	}
}

export async function setComment(spieler: number, comment: string): Promise<OkPacket> {
	const stmt = 'UPDATE Spieler SET comment = ? WHERE id = ?';
	try {
		return await queryV(stmt, [comment, spieler]);
	} catch (e) {
		throw e;
	}
}

export async function updateSpielerRole(spielerId: number, userRole: number): Promise<OkPacket> {
	const stmt = 'UPDATE Spieler SET role = ? WHERE id = ?';
	try {
		return await queryV(stmt, [userRole, spielerId]);
	} catch (e) {
		throw e;
	}
}
