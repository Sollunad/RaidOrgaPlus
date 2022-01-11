import { Raid } from 'models/Raid';
import { Spieler } from 'models/Spieler';
import { terminState, userRaid } from 'models/Types';
import { queryV } from "../../../database/connector";
import { OkPacket } from 'mysql';

export {
	listForPlayerId as listForPlayer, getForRaidId as get, listPlayers, anmeldungStatesForUser, kickPlayer,
	getRoleForPlayer, setLieutenantRole, setUserToken, getUserToken,
};

async function listForPlayerId(userId: number): Promise<userRaid[]> {
	const stmt = `
		SELECT Raid.id, Raid.name, Raid.icon, Raid.dpsReportToken, Spieler_Raid.role
		FROM Spieler
		JOIN Spieler_Raid ON Spieler.id = Spieler_Raid.fk_spieler
		JOIN Raid ON Raid.id = Spieler_Raid.fk_raid
		WHERE Spieler.id = ? AND Raid.active = 1
		ORDER BY active DESC, id ASC
	`;
	try {
		return await queryV(stmt, userId);
	} catch (e) {
		throw e;
	}
}

async function getForRaidId(raidId: number): Promise<Raid> {
	const stmt = 'SELECT * FROM Raid WHERE id = ?';
	try {
		const raid: Raid = (await queryV(stmt, raidId))[0];
		return raid;
	} catch (e) {
		throw e;
	}
}

async function listPlayers(raidId: number): Promise<Spieler[]> {
	const stmt = `
		SELECT Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname, Spieler_Raid.role AS role
		FROM Spieler_Raid
		JOIN Spieler ON Spieler.id = Spieler_Raid.fk_spieler
		WHERE fk_raid = ? ORDER BY role DESC, name
	`;
	try {
		return await queryV(stmt, raidId);
	} catch (e) {
		throw e;
	}
}

async function anmeldungStatesForUser(userId: number): Promise<terminState[]> {
	const stmt = `
		SELECT Termin.fk_raid AS raid, MIN(CASE WHEN ISNULL(Spieler_Termin.type) THEN -1 ELSE Spieler_Termin.type END) AS type
		FROM Termin
		LEFT JOIN Spieler_Termin ON Termin.id = Spieler_Termin.fk_termin AND (Spieler_Termin.fk_spieler = ? OR ISNULL(Spieler_Termin.fk_spieler))
		WHERE Termin.isArchived = 0 AND Termin.fk_raid IN (SELECT fk_raid FROM Spieler_Raid WHERE fk_spieler = ?)
		GROUP BY raid
	`;
	try {
		return await queryV(stmt, [userId, userId]);
	} catch (e) {
		throw e;
	}
}

async function kickPlayer(raid: number, user: number): Promise<OkPacket> {
	const stmt = 'DELETE FROM Spieler_Raid WHERE fk_raid = ? AND fk_spieler = ?';
	try {
		return await queryV(stmt, [raid, user]);
	} catch (e) {
		throw e;
	}
}

async function getRoleForPlayer(raid: number, user: number): Promise<number[]> {
	const stmt = 'SELECT role FROM Spieler_Raid WHERE fk_raid = ? AND fk_spieler = ?';
	try {
		const response: { role: number }[] = await queryV(stmt, [raid, user]);
		return response.map(r => r.role);
	} catch (e) {
		throw e;
	}
}

async function setLieutenantRole(raidId: number, user: number, role: number): Promise<OkPacket> {
	const stmt = `UPDATE Spieler_Raid SET role = ? WHERE fk_raid = ? AND fk_spieler = ?`;
	try {
		return await queryV(stmt, [role, raidId, user]);
	} catch (e) {
		throw e;
	}
}

async function setUserToken(raidId: number, token: string): Promise<OkPacket> {
	const stmt = `UPDATE Raid SET dpsReportToken = ? WHERE id = ?`;
	try {
		return await queryV(stmt, [token, raidId]);
	} catch (e) {
		throw e;
	}
}

async function getUserToken(raidId: number): Promise<string> {
	const stmt = `SELECT dpsReportToken FROM Raid WHERE id = ?`;
	try {
		const response: { dpsReportToken: string }[] = await queryV(stmt, [raidId]);
		return response[0].dpsReportToken;
	} catch (e) {
		throw e;
	}
}