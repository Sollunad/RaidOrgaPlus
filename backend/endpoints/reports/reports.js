const db = require('../../db/connector.js');
const uploader = require('../../reports/uploader');

exports.addReport = addReport;

async function addReport(aufstellung, evtc) {
    const response = await uploader.upload(evtc);
    return await writeReport(aufstellung, response.id);
}

async function writeReport(aufstellung, reportId) {
    const stmt = 'UPDATE Aufstellung SET report = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [reportId, aufstellung]);
    } catch(e) {
        throw e;
    }
}