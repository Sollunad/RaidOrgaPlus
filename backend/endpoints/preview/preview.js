const db = require('../../db/connector.js');

exports.isPreviewable = isPreviewable;
exports.setPreviewable = setPreviewable;

async function isPreviewable(termin) {
    const stmt = 'SELECT preview FROM Termin WHERE id = ?';
    try {
        return await db.queryV(stmt, termin);
    } catch(e) {
        throw e;
    }
}

async function setPreviewable(termin, able) {
    const stmt = 'UPDATE Termin SET preview = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [able, termin]);
    } catch(e) {
        throw e;
    }
}



