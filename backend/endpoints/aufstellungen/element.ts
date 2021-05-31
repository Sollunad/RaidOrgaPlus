import { OkPacket } from 'mysql';
import * as db from '../../db/connector';
import type { element } from "models/Types";

export async function getForTermin(termin: number): Promise<element[]> {
    const stmt = 'SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung ' +
        ' JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id' +
        ' JOIN Klasse ON Klasse.id = AufstellungElement.fk_class' +
        ' JOIN Rolle ON Rolle.id = AufstellungElement.fk_role' +
        ' JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler' +
        ' WHERE Aufstellung.fk_termin = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

export async function getForAufstellung(aufstellung: number): Promise<element[]> {
    const stmt = 'SELECT Aufstellung.id AS aufstellung, AufstellungElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, Spieler.id AS id, Spieler.name AS name, Spieler.accname AS accname FROM Aufstellung ' +
        ' JOIN AufstellungElement ON AufstellungElement.fk_aufstellung = Aufstellung.id' +
        ' JOIN Klasse ON Klasse.id = AufstellungElement.fk_class' +
        ' JOIN Rolle ON Rolle.id = AufstellungElement.fk_role' +
        ' JOIN Spieler ON Spieler.id = AufstellungElement.fk_spieler' +
        ' WHERE Aufstellung.id = ? FOR UPDATE';
    try {
        return await db.queryV(stmt, aufstellung);
    } catch(e) {
        throw e;
    }
}

export async function setClass(aufstellung: number, position: number, clss: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, clss, clss]);
    } catch(e) {
        throw e;
    }
}

export async function setRole(aufstellung: number, position: number, role: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_role) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_role = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, role, role]);
    } catch(e) {
        throw e;
    }
}

export async function setName(aufstellung: number, position: number, name: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_spieler) VALUES (?,?,?) ON DUPLICATE KEY UPDATE fk_spieler = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, name, name]);
    } catch(e) {
        throw e;
    }
}

export async function setCompleteElement(aufstellung: number, position: number, classId: number, roleId: number, playerId: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class, fk_role, fk_spieler) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?, fk_role = ?, fk_spieler = ?';
    try {
        return await db.queryV(stmt, [aufstellung, position, classId, roleId, playerId, classId, roleId, playerId]);
    }
    catch (e) {
        throw e;
    }
}