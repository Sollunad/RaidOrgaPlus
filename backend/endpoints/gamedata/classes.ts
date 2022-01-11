import { Class } from 'models/Klasse';
import { queryV } from "database/src/connector";

export async function getForBase(base: number): Promise<Class[]> {
    const stmt = 'SELECT sub.id, sub.name, sub.abbr, base.color FROM Klasse sub JOIN Klasse base ON sub.fk_base = base.id WHERE sub.fk_base = ?';
    try {
        return await queryV(stmt, base);
    } catch(e) {
        throw e;
    }
}