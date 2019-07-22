const db = require('../../db/connector.js');

exports.getRaids = getRaids;

async function getRaids() {
    const stmt = 'SELECT id, name, active FROM Raid ORDER BY active DESC, name';
    try {
        return await db.query(stmt);
    } catch(e) {
        throw e;
    }
}
