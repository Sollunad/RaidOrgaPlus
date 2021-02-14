import uuidv4 from 'uuid/v4';
import hash from 'password-hash';
import * as db from '../../db/connector';
import * as session from './session';

export async function login(username, pwd, agent){
    const response = await getUserByName(username);
    const user = response[0];
    if (user) {
        const correctPwd = hash.verify(pwd, user.password);
        if (correctPwd){
            const uuid = uuidv4();
            await session.start(user.id, uuid, agent);
            return uuid;
        }
    }
}

async function getUserByName(name) {
    const stmt = 'SELECT * FROM Spieler WHERE Spieler.accname = ?';
    try {
        return await db.queryV(stmt, name);
    } catch(e) {
        throw e;
    }
}



