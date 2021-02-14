import * as db from '../../db/connector';

export async function listByWing() {
    const stmt = 'SELECT * FROM Encounter';
    try {
        const response: any = await db.query(stmt);
        let ret = [];
        for (const enc of response) {
            const wing = enc.wing;
            if (!ret[wing-1]) ret[wing-1] = [];
            ret[wing-1].push(enc);
        }
        return ret;
    } catch(e) {
        throw e;
    }
}

export async function list() {
    const stmt = 'SELECT * FROM Encounter';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}

export async function listForWing(wing) {
    const stmt = 'SELECT * FROM Encounter WHERE wing = ?';
    try {
        return await db.queryV(stmt, wing);
    } catch(e) {
        throw e;
    }
}

export async function getWings() {
    const stmt = 'SELECT * FROM Wing';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}