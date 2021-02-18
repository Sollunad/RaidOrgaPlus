import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export async function getElementsByEncounter(raid: number, enc: number): Promise<any> {
    const stmt = 'SELECT BlankoElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role FROM BlankoElement ' +
        'JOIN Klasse ON Klasse.id = BlankoElement.fk_class ' +
        'JOIN Rolle ON Rolle.id = BlankoElement.fk_role ' +
        'WHERE fk_raid = ? AND fk_boss = ?';
    try {
        return await db.queryV(stmt, [raid, enc]);
    } catch(e) {
        throw e;
    }
}

export async function getAllElements(raid: number): Promise<any> {
    const stmt = 'SELECT BlankoElement.position AS pos, Klasse.abbr AS class, Rolle.abbr AS role, BlankoElement.fk_boss AS enc FROM BlankoElement ' +
        'JOIN Klasse ON Klasse.id = BlankoElement.fk_class ' +
        'JOIN Rolle ON Rolle.id = BlankoElement.fk_role ' +
        'WHERE fk_raid = ?';
    try {
        return await db.queryV(stmt, raid);
    } catch(e) {
        throw e;
    }
}

export async function setClass(raid: number, enc: number, position: number, clss: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?';
    try {
        return await db.queryV(stmt, [raid, enc, position, clss, clss]);
    } catch(e) {
        throw e;
    }
}

export async function setRole(raid: number, enc: number, position: number, role: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE fk_role = ?';
    try {
        return await db.queryV(stmt, [raid, enc, position, role, role]);
    } catch(e) {
        throw e;
    }
}

export async function copyFromTo(raid: number, from: number, to: number): Promise<OkPacket> {
    const stmt = 'INSERT INTO BlankoElement (fk_raid, fk_boss, position, fk_class, fk_role) ' +
        'SELECT ?, ?, position, fk_class, fk_role ' +
        'FROM BlankoElement fr ' +
        'WHERE fk_raid = ? AND fk_boss = ? ' +
        'ON DUPLICATE KEY UPDATE fk_class = fr.fk_class, fk_role = fr.fk_role';
    try {
        return await db.queryV(stmt, [raid, to, raid, from]);
    } catch(e) {
        throw e;
    }
}