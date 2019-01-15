const db = require('../../db/connector.js');

exports.list = list;
exports.listForWing = listMainForWing;

async function list() {
    const stmt = 'SELECT * FROM Encounter';
    try {
        const response = await db.query(stmt);
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

async function listMainForWing(wing) {
    const stmt = 'SELECT * FROM Encounter WHERE main = 1 AND wing = ?';
    try {
        return await db.queryV(stmt, wing);
    } catch(e) {
        throw e;
    }
}