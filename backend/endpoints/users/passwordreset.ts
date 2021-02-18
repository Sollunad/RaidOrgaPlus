import { v4 } from 'uuid';
import hash from 'password-hash';

import * as db from '../../db/connector';
import * as mailer from '../../mailer/mailer';
import { Spieler } from 'models/Spieler';
import { PasswordReset } from 'models/PasswordReset';
import { OkPacket } from 'mysql';

export async function createResetToken(accname: string): Promise<void> {
    await deleteInvalidTokens();
    const user = (await getUserByName(accname))[0];
    if (!user) return;
    const activeToken = (await activeTokens(user.id))[0];
    if (activeToken) {
        mailer.passwortReset(user, activeToken.token);
    } else {
        const token = v4();
        await writeResetToken(user.id, token);
        mailer.passwortReset(user, token);
    }
}

export async function writeResetToken(user: number, token: string): Promise<void> {
    const stmt = 'INSERT INTO PasswordReset (fk_spieler, token) VALUES (?, ?)';
    try {
        db.queryV(stmt, [user, token]);
    } catch(e) {
        throw e;
    }
}

export async function resetPassword(token: string, pwd: string): Promise<OkPacket> {
    const pwdHash = hash.generate(pwd);
    const stmt = 'UPDATE Spieler SET password = ? WHERE id IN (SELECT fk_spieler FROM PasswordReset WHERE token = ?)';
    try {
        return await db.queryV(stmt, [pwdHash, token]);
    } catch(e) {
        throw e;
    }
}

export async function getUserByName(name: string): Promise<Spieler[]> {
    const stmt = 'SELECT * FROM Spieler WHERE Spieler.accname = ?';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}

export async function tokenCreated(token: string): Promise<PasswordReset[]> {
    const stmt = 'SELECT created FROM PasswordReset WHERE token = ?';
    try {
        return await db.queryV(stmt, token);
    } catch(e) {
        throw e;
    }
}

export async function deleteToken(token: string): Promise<OkPacket> {
    const stmt = 'DELETE FROM PasswordReset WHERE token = ?';
    try {
        return await db.queryV(stmt, token);
    } catch(e) {
        throw e;
    }
}

export async function deleteInvalidTokens(): Promise<OkPacket> {
    const stmt = 'DELETE FROM PasswordReset WHERE created < NOW() - INTERVAL 1 DAY';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

export async function activeTokens(user: number): Promise<PasswordReset[]> {
    const stmt = 'SELECT token FROM PasswordReset WHERE created > NOW() - INTERVAL 1 DAY AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, user);
    } catch(e) {
        throw e;
    }
}