import { query, queryV } from "../db/connector";

async function getPlayer(nickname: string): Promise<{ id: number, accname: string }> {
	const stmt = "SELECT id, accname FROM Spieler WHERE INSTR(?, accname)";
	try {
		return await queryV(stmt, [nickname]);
	} catch (e) {
		throw e;
	}
}

async function getRaid(raidName: string, nickname: string) {
	const stmt = "SELECT * FROM Raid r";
}