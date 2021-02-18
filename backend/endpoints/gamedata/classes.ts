import { Klasse } from 'models/Klasse';
import * as db from '../../db/connector';

export async function getForBase(base: number): Promise<Klasse[]> {
    const stmt = 'SELECT sub.id, sub.name, sub.abbr, base.color FROM Klasse sub JOIN Klasse base ON sub.fk_base = base.id WHERE sub.fk_base = ?';
    try {
        return await db.queryV(stmt, base);
    } catch(e) {
        throw e;
    }
}