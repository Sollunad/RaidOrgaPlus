import { queryV } from "../../../database/connector";
import { OkPacket } from "mysql";
import type { element } from "models/Types";

export async function getForTermin(termin: number): Promise<element[]> {
	const stmt = `
		SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, AufstellungElement.roles AS roleIds, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung
		JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id
		JOIN Klasse ON Klasse.id = AufstellungElement.fk_class
		JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler
		WHERE Aufstellung.fk_termin = ? FOR UPDATE
	`;
	try {
		return await queryV(stmt, termin);
	} catch (e) {
		throw e;
	}
}

export async function getForAufstellung(aufstellung: number): Promise<element[]> {
	const stmt = `
		SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, AufstellungElement.roles AS roleIds, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung
		JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id
		JOIN Klasse ON Klasse.id = AufstellungElement.fk_class
		JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler
		WHERE Aufstellung.id = ? FOR UPDATE
	`;
	try {
		return await queryV(stmt, aufstellung);
	} catch (e) {
		throw e;
	}
}

export async function setClass(aufstellung: number, position: number, clss: number): Promise<OkPacket> {
	const stmt =
		"INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?";
	try {
		return await queryV(stmt, [aufstellung, position, clss, clss]);
	} catch (e) {
		throw e;
	}
}

export async function setRole(aufstellung: number, position: number, role: string): Promise<OkPacket> {
	const stmt =
		"INSERT INTO AufstellungElement (fk_aufstellung, position, roles) VALUES (?,?,?) ON DUPLICATE KEY UPDATE roles = ?";
	try {
		return await queryV(stmt, [aufstellung, position, role, role]);
	} catch (e) {
		throw e;
	}
}

export async function setName(aufstellung: number, position: number, name: number): Promise<OkPacket> {
	const stmt =
		"INSERT INTO AufstellungElement (fk_aufstellung, position, fk_spieler) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_spieler = ?";
	try {
		return await queryV(stmt, [aufstellung, position, name, name]);
	} catch (e) {
		throw e;
	}
}

export async function setCompleteElement(
	aufstellung: number,
	position: number,
	classId: number,
	roles: string,
	playerId: number
): Promise<OkPacket> {
	const stmt = `
		INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class, roles, fk_spieler)
		VALUES (?,?,?,?,?)
		ON DUPLICATE KEY UPDATE fk_class = ?, roles = ?, fk_spieler = ?
	`;
	try {
		return await queryV(stmt, [aufstellung, position, classId, roles, playerId, classId, roles, playerId]);
	} catch (e) {
		throw e;
	}
}
