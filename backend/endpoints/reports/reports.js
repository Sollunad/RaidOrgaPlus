const db = require('../../db/connector.js');
const uploader = require('../../reports/uploader');

exports.addReport = addReport;

async function addReport(aufstellung, evtc) {
    const timestamp = Date.now().toString();
    const filepath = `./reports/working/${timestamp}.evtc`;
    evtc.mv(filepath);
    const response = await uploader.upload(filepath);
    if (response && response.permalink) {
        const id = response.permalink.split('/').slice(-1)[0];
        await writeReport(aufstellung, id);
        return ['success'];
    } else {
        return ['error'];
    }
}

async function writeReport(aufstellung, reportId) {
    const stmt = 'UPDATE Aufstellung SET report = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [reportId, aufstellung]);
    } catch(e) {
        throw e;
    }
}