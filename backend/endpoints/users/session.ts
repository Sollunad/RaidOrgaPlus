import { Session } from 'models/Session';
import { Spieler } from 'models/Spieler';
import { OkPacket } from 'mysql';
import * as db from '../../db/connector';

export {
	startSession as start, startDiscordSession as startDiscord, getUser, invalidateUuid as invalidate, invalidateExpired
}

async function startSession(id: number, uuid: string, agent: string): Promise<OkPacket> {
    const stmt = 'INSERT INTO Session (user, uuid, agent) VALUES (?, ?, ?)';
    try {
        return await db.queryV(stmt, [id, uuid, agent]);
    } catch(e) {
        throw e;
    }
}

async function startDiscordSession(id: number, uuid: string, agent: string): Promise<OkPacket> {
    const stmt = 'INSERT INTO Session (user, uuid, agent, created) VALUES (?, ?, ?, NOW() + INTERVAL 100 YEAR)';
    try {
        return await db.queryV(stmt, [id, uuid, agent]);
    } catch(e) {
        throw e;
    }
}

async function getUser(uuid: string): Promise<(Session & Spieler)[]> {
    const stmt = 'SELECT user, agent, role FROM Session JOIN Spieler on Session.user = Spieler.id WHERE uuid = ?';
    try {
        return await db.queryV(stmt, uuid);
    } catch(e) {
        throw e;
    }
}

async function invalidateUuid(uuid: string): Promise<OkPacket> {
    const stmt = 'DELETE FROM Session WHERE uuid = ?';
    try {
        return await db.queryV(stmt, uuid);
    } catch(e) {
        throw e;
    }
}

async function invalidateExpired(): Promise<OkPacket> {
    const stmt = 'DELETE FROM Session WHERE created < NOW() - INTERVAL 90 DAY'
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}