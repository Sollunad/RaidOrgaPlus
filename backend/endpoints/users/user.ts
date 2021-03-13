import * as db from '../../db/connector';
import hash from 'password-hash';
import { Spieler } from 'models/Spieler';
import { OkPacket } from 'mysql';

export {
	getForId as get, getAllForId, changeName, changeEmail, changePassword, hasProgressShared, setProgressShared, setIconLink
};

async function getForId(userId: number): Promise<Spieler[]> {
    const stmt = 'SELECT id, accname, name, role, discord FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function getAllForId(userId: number): Promise<Spieler[]> {
    const stmt = 'SELECT * FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function changeName(userId: number, name: string): Promise<OkPacket> {
    try {
        const stmt = 'UPDATE Spieler SET name = ? WHERE id = ?';
        return await db.queryV(stmt, [name, userId]);
    } catch(e) {
        throw e;
    }
}

async function changeEmail(userId: number, email: string): Promise<OkPacket> {
    const stmt = 'UPDATE Spieler SET email = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [email, userId]);
    } catch(e) {
        throw e;
    }
}

async function changePassword(userId: number, pwd: string): Promise<OkPacket> {
    const pwdHash = hash.generate(pwd);
    const stmt = 'UPDATE Spieler SET password = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [pwdHash, userId]);
    } catch(e) {
        throw e;
    }
}

async function hasProgressShared(userId: number): Promise<boolean[]> {
    const stmt = 'SELECT share FROM Spieler WHERE id = ?';
    try {
        return await db.queryV(stmt, userId);
    } catch(e) {
        throw e;
    }
}

async function setProgressShared(userId: number, value: boolean): Promise<OkPacket> {
    const stmt = 'UPDATE Spieler SET share = ? WHERE id = ?';
	const share = value ? 1 : 0;
    try {
        return await db.queryV(stmt, [share, userId]);
    } catch(e) {
        throw e;
    }
}

async function setIconLink(userId: number, link: string): Promise<OkPacket> {
    const stmt = 'UPDATE Spieler SET icon = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [link, userId]);
    } catch(e) {
        throw e;
    }
}

