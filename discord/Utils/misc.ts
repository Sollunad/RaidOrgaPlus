import { RaidRole } from "../../models/Enums";
import { Raid } from "../../models/Raid";
import { SpielerRaid } from "../../models/Spieler";
import { queryV } from "../db/connector";

export async function listRaidsForUser(nickname: string, leader?: RaidRole): Promise<(Raid & SpielerRaid)[]> {
	const stmt = `
		SELECT r.*, sr.role FROM Raid r
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

async function getPlayer(nickname: string): Promise<{ id: number; accname: string }> {
	const stmt = "SELECT id, accname FROM Spieler WHERE INSTR(?, accname)";
	try {
		return await queryV(stmt, [nickname]);
	} catch (e) {
		throw e;
	}
}
