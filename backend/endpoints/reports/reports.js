const db = require('../../db/connector.js');
const parser = require('../../reports/parser');
const glob = require('glob');
const fs = require('fs');
const uuid = require('uuid/v4');

exports.addReport = addReport;

async function addReport(aufstellung, evtc) {
    const filepath = `reports/working/${aufstellung}.evtc`;
    evtc.mv(filepath);
    // TODO: Fixen, wenn es mehrere Returns geben könnte (fail und kill)
    await parser.parse(filepath);

    const oldPath = glob.sync(`reports/working/${aufstellung}_*`)[0];
    const fileName = uuid();
    const newPath = `reports/parsed/${fileName}.html`;

    await fs.rename(oldPath, newPath, function(err) {
        if (err) throw err;
    });
    await writeReport(aufstellung, fileName);
    return [fileName];
}

async function writeReport(aufstellung, fileName) {
    const stmt = 'UPDATE Aufstellung SET report = ? WHERE id = ?';
    try {
        return await db.queryV(stmt, [fileName, aufstellung]);
    } catch(e) {
        throw e;
    }
}