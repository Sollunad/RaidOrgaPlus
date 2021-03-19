import hash from 'password-hash';
import * as db from '../../db/connector';

export async function register(accName: string, pwd: string, name: string, email: string): Promise<boolean> {
    const response = await userExists(accName);
    const count = response[0];
    if (count > 0) return false;
    const pwdHash = hash.generate(pwd);
    registerUser(accName, pwdHash, name, email);
    return true;
}

function registerUser(accName: string, pwdHash: string, name: string, email: string): void {
    const stmt = 'INSERT INTO Spieler (accname, password, name, email) VALUES (?, ?, ?, ?)';
    try {
        db.queryV(stmt, [accName, pwdHash, name, email]);
    } catch(e) {
        throw e;
    }
}

async function userExists(accName): Promise<number[]> {
    const stmt = 'SELECT COUNT(*) AS count FROM Spieler WHERE Spieler.accname = ?';
    try {
		const response: { count: number }[] = await db.queryV(stmt, accName);
		return response.map(r => r.count);
    } catch(e) {
        throw e;
    }
}