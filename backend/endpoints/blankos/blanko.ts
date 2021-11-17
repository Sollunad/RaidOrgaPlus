import { OkPacket } from 'mysql';
import { blankoElement } from '../../../models/Types';
import * as db from '../../db/connector';

export async function getElementsByEncounter(raid: number, enc: number): Promise<blankoElement[]> {
	const stmt = `
		SELECT BlankoElement.position AS pos, Klasse.abbr AS class, BlankoElement.roles AS roles FROM BlankoElement
		JOIN Klasse ON Klasse.id = BlankoElement.fk_class
		WHERE fk_raid = ? AND fk_boss = ?
	`;
	try {
		return await db.queryV(stmt, [raid, enc]);
	} catch (e) {
		throw e;
	}
}

export async function getAllElements(raid: number): Promise<blankoElement[]> {
	const stmt = `
		SELECT BlankoElement.position AS pos, Klasse.abbr AS class, BlankoElement.roles AS roleIds, BlankoElement.fk_boss AS enc FROM BlankoElement
		JOIN Klasse ON Klasse.id = BlankoElement.fk_class
		WHERE fk_raid = ?
	`;
	try {
		return await db.queryV(stmt, raid);
	} catch (e) {
		throw e;
	}
}

export async function setClass(raid: number, enc: number, position: number, clss: number): Promise<OkPacket> {
	const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
	try {
		return await db.queryV(stmt, [raid, enc, position, clss, clss]);
	} catch (e) {
		throw e;
	}
}

export async function setRole(raid: number, enc: number, position: number, role: string): Promise<OkPacket> {
	const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, roles) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE roles = ?';
	try {
		return await db.queryV(stmt, [raid, enc, position, role, role]);
	} catch (e) {
		throw e;
	}
}

export async function copyFromTo(raid: number, from: number, to: number): Promise<OkPacket> {
	const stmt = `
		INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class, roles)
		SELECT ?, ?, position, fk_class, roles
		FROM BlankoElement fr
		WHERE fk_raid = ? AND fk_boss = ?
		ON DUPLICATE KEY UPDATE fk_class = fr.fk_class, roles = fr.roles
	`;
	try {
		return await db.queryV(stmt, [raid, to, raid, from]);
	} catch (e) {
		throw e;
	}
}