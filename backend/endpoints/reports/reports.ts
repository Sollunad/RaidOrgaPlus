import * as parser from '../../reports/parser';
import glob from 'glob';
import fs from 'fs';
import { v4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import { Aufstellung } from 'models/Aufstellung';
import { queryV, OkPacket } from "database/src/connector";

async function addReport(aufstellung: number, file: UploadedFile): Promise<string[]> {
    const extension = file.name.split('.').slice(-1)[0];
    if (!(extension === 'evtc' || extension === 'zevtc')) return;
    const filepath = `reports/working/${aufstellung}.${extension}`;
    file.mv(filepath);
    await parser.parse(filepath);

    const oldPath = glob.sync(`reports/working/${aufstellung}_*`)[0];
    const fileName = v4();
    const newPath = `reports/parsed/${fileName}.html`;

    fs.rename(oldPath, newPath, function(err) {
        if (err) throw err;
    });

    const oldReportName = await getReport(aufstellung);
    if (oldReportName) {
        const oldReportPath = `reports/parsed/${oldReportName}.html`;
        try {
            fs.unlinkSync(oldReportPath);
        } catch(e) {
			throw e;
        }
    }

    await writeReport(aufstellung, fileName);
    return [fileName];
}

export async function writeReport(aufstellung: number, fileName: string): Promise<OkPacket> {
    const stmt = 'UPDATE Aufstellung SET report = ? WHERE id = ?';
    try {
        return await queryV(stmt, [fileName, aufstellung]);
    } catch(e) {
        throw e;
    }
}

async function getReport(aufstellung: number): Promise<string> {
    const stmt = 'SELECT report FROM Aufstellung WHERE id = ?';
    try {
        const response: Aufstellung = await queryV(stmt, aufstellung)[0];
        if (response) {
            return response.report;
        } else {
            return null;
        }
    } catch(e) {
        throw e;
    }
}