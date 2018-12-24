const db = require('../db/connector.js');

exports.list = list;

async function list() {
    const stmt = `SELECT name, abbr, apiname, wing FROM Encounter`;
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}