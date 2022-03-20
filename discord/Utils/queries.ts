import { RaidRole } from "../../models/Enums";
import { Raid } from "../../models/Raid";
import { Spieler, SpielerRaid, SpielerTermin } from "../../models/Spieler";
import { query, queryV } from "../../database/connector";
import { mapTerminDate } from "../../models/dateMapper";
import { DiscordTermin, Termin } from "../../models/Termin";
import { Aufstellung } from "../../models/Aufstellung";
import { Encounter } from "../../models/Encounter";
import { OkPacket } from "mysql";

export async function listRaidsForUser(nickname: string, leader?: RaidRole): Promise<(Raid & SpielerRaid)[]> {
	const stmt = `
		SELECT r.*, sr.role, sr.fk_spieler FROM Raid r
		LEFT JOIN Spieler_Raid sr ON r.id = sr.fk_raid
		LEFT JOIN Spieler s ON sr.fk_spieler = s.id
		WHERE INSTR(?, s.accname) > 0
	`;
	try {
		let result = await queryV<(Raid & SpielerRaid)[]>(stmt, [nickname]);

		if (leader != null) {
			result = result.filter((r) => r.role >= leader);
		}

		return result;
	} catch (e) {
		throw e;
	}
}

export async function listRaidsForMod(): Promise<Raid[]> {
	const stmt = "SELECT id, name, discordChannel FROM Raid";
	try {
		return await query(stmt);
	} catch (e) {
		throw e;
	}
}

export async function setChannelForRaid(raidId: number, channelId: string): Promise<void> {
	const stmt = "UPDATE Raid SET discordChannel = ? WHERE id = ?";
	try {
		return await queryV(stmt, [channelId, raidId]);
	} catch (e) {
		throw e;
	}
}

export async function removeChannelFromRaid(raidName: string): Promise<void> {
	const stmt = "UPDATE Raid SET discordChannel = '' WHERE name = ?";
	try {
		return await queryV(stmt, [raidName]);
	} catch (e) {
		throw e;
	}
}

export async function getRaidFromId(raidId: number): Promise<Raid> {
	const stmt = "SELECT * FROM Raid WHERE id = ?";
	try {
		const result: Raid[] = await queryV(stmt, [raidId]);
		return result[0];
	} catch (e) {
		throw e;
	}
}

export async function getTermine(userId: number, raidId: number): Promise<(Termin & SpielerTermin)[]> {
	const stmt = `
		SELECT Termin.id, Termin.date, Termin.time, Termin.endtime, Spieler_Termin.type
		FROM Termin
		JOIN Raid ON Termin.fk_raid = Raid.id
		LEFT JOIN Spieler_Termin ON Spieler_Termin.fk_spieler = ? AND Spieler_Termin.fk_termin = Termin.id
		WHERE Raid.id = ? AND Termin.isArchived = 0
		ORDER BY Termin.date, Termin.time
	`;
	try {
		const result: (Termin & SpielerTermin)[] = await queryV(stmt, [userId, raidId]);
		return result.map(mapTerminDate);
	} catch (e) {
		throw e;
	}
}

export async function getTerminFromId(terminId: number): Promise<Termin> {
	const stmt = "SELECT * FROM Termin WHERE id = ?";
	try {
		const result: Termin[] = await queryV(stmt, [terminId]);
		return result.map(mapTerminDate)[0];
	} catch (e) {
		throw e;
	}
}

export async function getAnmeldungenForTermin(termin: number): Promise<(Spieler & SpielerTermin)[]> {
	const stmt = `
		SELECT Spieler.id, Spieler.name, Spieler.accname, Spieler_Termin.type FROM Spieler_Termin
		JOIN Spieler ON Spieler.id = Spieler_Termin.fk_spieler
		WHERE fk_termin = ?
		UNION SELECT Spieler.id, Spieler.name, Spieler.accname, 3 FROM Spieler
		WHERE Spieler.id IN (SELECT fk_spieler FROM Spieler_Raid WHERE fk_raid = (SELECT fk_raid FROM Termin WHERE id = ?))
		AND Spieler.id NOT IN (SELECT fk_spieler FROM Spieler_Termin WHERE fk_termin = ?)
		ORDER BY name
	`;
	try {
		return await queryV(stmt, [termin, termin, termin]);
	} catch (e) {
		throw e;
	}
}

export async function getAufstellungen(termin: number): Promise<(Aufstellung & Encounter)[]> {
	const stmt = `
		SELECT Aufstellung.id, Encounter.name, Encounter.abbr, Aufstellung.success, Aufstellung.report, Encounter.has_cm, Aufstellung.is_cm
		FROM Aufstellung JOIN Encounter ON Encounter.id = Aufstellung.fk_boss
		WHERE fk_termin = ? FOR UPDATE
	`;
	try {
		return await queryV(stmt, termin);
	} catch (e) {
		throw e;
	}
}

export async function getCalenderTermine(): Promise<(Termin & Raid)[]> {
	const stmt = `
		SELECT Termin.id, Termin.date, Termin.time, Termin.endtime, Raid.name
		FROM Termin
		JOIN Raid ON Termin.fk_raid = Raid.id
		WHERE Termin.isArchived = 0 AND Termin.date >= CURDATE() AND Termin.date < DATE_ADD(CURDATE(), INTERVAL 7 DAY)
		ORDER BY Termin.date, Termin.time
	`;
	try {
		return await query(stmt);
	} catch (e) {
		throw e;
	}
}

export async function updateAnmeldung(spieler: number, termin: number, type: number): Promise<OkPacket> {
	const stmt =
		"INSERT INTO Spieler_Termin (fk_spieler, fk_termin, type) VALUES (?,?,?) ON DUPLICATE KEY UPDATE type=?";
	try {
		return await queryV(stmt, [spieler, termin, type, type]);
	} catch (e) {
		throw e;
	}
}

export async function getTerminFromMessage(messageId: string): Promise<DiscordTermin> {
	const stmt = "SELECT * FROM DiscordTermin WHERE messageId = ?";
	try {
		const response: DiscordTermin[] = await queryV(stmt, [messageId]);
		return response[0];
	} catch (e) {
		throw e;
	}
}

export async function saveTermin(messageId: string, channelId: string, terminId: number): Promise<OkPacket> {
	const stmt = "INSERT INTO DiscordTermin VALUES (?,?,?)";
	try {
		return await queryV(stmt, [messageId, channelId, terminId]);
	} catch (e) {
		throw e;
	}
}

export async function getPlayer(nickname: string): Promise<{ id: number; accname: string }> {
	const stmt = "SELECT id, accname FROM Spieler WHERE id > 9 AND INSTR(?, accname)";
	try {
		const response = await queryV(stmt, [nickname]);
		return response[0];
	} catch (e) {
		throw e;
	}
}
