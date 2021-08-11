import { OkPacket } from 'mysql';
import { Build } from 'models/Build';
import * as db from '../../db/connector';

export async function getBuilds(user: number): Promise<Build[]> {
	const stmt = `
		SELECT fk_class AS classId, sub.abbr AS classAbbr, base.color AS classColor, fk_role AS roleId, Rolle.abbr AS roleAbbr, prefer
		FROM Spieler_Build
		JOIN Klasse sub ON sub.id = Spieler_Build.fk_class
		JOIN Klasse base ON base.id = sub.fk_base
		JOIN Rolle ON Rolle.id = Spieler_Build.fk_role
		WHERE fk_spieler = ? ORDER BY prefer DESC, base.id, sub.id, Rolle.id
	`;
	try {
		return ((await db.queryV<Build[]>(stmt, user))).map(classRoleMapper);
	} catch (e) {
		throw e;
	}
}

export async function addBuild(user: number, clss: number, role: number): Promise<OkPacket> {
	const stmt = 'INSERT INTO Spieler_Build (fk_spieler, fk_class, fk_role) VALUES (?,?,?) ';
	try {
		return await db.queryV(stmt, [user, clss, role]);
	} catch (e) {
		throw e;
	}
}

export async function deleteBuild(user: number, clss: number, role: number): Promise<OkPacket> {
	const stmt = 'DELETE FROM Spieler_Build WHERE fk_spieler = ? AND fk_class = ? AND fk_role = ?';
	try {
		return await db.queryV(stmt, [user, clss, role]);
	} catch (e) {
		throw e;
	}
}

export async function putPrefer(user: number, clss: number, role: number, pref: number): Promise<OkPacket> {
	const stmt = 'UPDATE Spieler_Build SET prefer = ? WHERE fk_spieler = ? AND fk_class = ? AND fk_role = ?';
	try {
		return await db.queryV(stmt, [pref, user, clss, role]);
	} catch (e) {
		throw e;
	}
}

function classRoleMapper(element): Build {
	return {
		class: {
			abbr: element.classAbbr, id: element.classId, color: element.classColor
		},
		role: {
			abbr: element.roleAbbr, id: element.roleId
		},
		prefer: element.prefer
	};
}