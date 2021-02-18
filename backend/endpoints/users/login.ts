import { v4 } from 'uuid';
import hash from 'password-hash';
import * as db from '../../db/connector';
import * as session from './session';
import { Spieler } from 'models/Spieler';

export async function login(username: string, pwd: string, agent: string): Promise<string> {
    const response = await getUserByName(username);
    const user = response[0];
    if (user) {
        const correctPwd = hash.verify(pwd, user.password);
        if (correctPwd){
            const uuid = v4();
            await session.start(user.id, uuid, agent);
            return uuid;
        }
    }
}

async function getUserByName(name: string): Promise<Spieler[]> {
    const stmt = 'SELECT * FROM Spieler WHERE Spieler.accname = ?';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}



