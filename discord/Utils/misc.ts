import { RaidRole } from "../../models/Enums";
import { Raid } from "../../models/Raid";
import { Spieler, SpielerRaid, SpielerTermin } from "../../models/Spieler";
import { queryV } from "../../database/connector";
import { mapTerminDate } from "../../models/dateMapper";
import { Termin } from "../../models/Termin";
import { Aufstellung } from "../../models/Aufstellung";
import { Encounter } from "../../models/Encounter";

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
			result = result.filter(r => r.role >= leader);
		}

		return result;
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

async function getPlayer(nickname: string): Promise<{ id: number; accname: string }> {
	const stmt = "SELECT id, accname FROM Spieler WHERE INSTR(?, accname)";
	try {
		return await queryV(stmt, [nickname]);
	} catch (e) {
		throw e;
	}
}
