import * as db from '../../db/connector';
import * as parser from '../../reports/parser';
import glob from 'glob';
import fs from 'fs';
import uuid from 'uuid/v4';

export async function addReport(aufstellung, file) {
    const extension = file.name.split('.').slice(-1)[0];
    if (!(extension === 'evtc' || extension === 'zevtc')) return;
    const filepath = `reports/working/${aufstellung}.${extension}`;
    file.mv(filepath);
    await parser.parse(filepath);

    const oldPath = glob.sync(`reports/working/${aufstellung}_*`)[0];
    const fileName = uuid();
    const newPath = `reports/parsed/${fileName}.html`;

    await fs.rename(oldPath, newPath, function(err) {
        if (err) throw err;
    });

    const oldReportName = await getReport(aufstellung);
    if (oldReportName) {
        const oldReportPath = `reports/parsed/${oldReportName}.html`;
        try {
            fs.unlinkSync(oldReportPath);
        } catch(e) {

        }
    }

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

async function getReport(aufstellung) {
    const stmt = 'SELECT report FROM Aufstellung WHERE id = ?';
    try {
        const response = (await db.queryV(stmt, aufstellung))[0];
        if (response) {
            return response.report;
        } else {
            return null;
        }
    } catch(e) {
        throw e;
    }
}