import { map } from "../termine/dateMapper";
import { terminDate } from "../../../models/Types";
import { queryV, OkPacket } from "database/src/connector";

export async function isPreviewable(termin: number): Promise<boolean[]> {
	const stmt = "SELECT preview FROM Termin WHERE id = ?";
	try {
		const response: { preview: boolean }[] = await queryV(stmt, termin);
		return response.map((r) => r.preview);
	} catch (e) {
		throw e;
	}
}

export async function setPreviewable(termin: number, able: number): Promise<OkPacket> {
	const stmt = "UPDATE Termin SET preview = ? WHERE id = ?";
	try {
		return await queryV(stmt, [able, termin]);
	} catch (e) {
		throw e;
	}
}

export async function getTerminDate(termin: number): Promise<terminDate> {
	const stmt = "SELECT date, time, endtime FROM Termin WHERE id = ?;";
	try {
		const response = await queryV<terminDate[]>(stmt, termin);
		return response.map(map)[0];
	} catch (e) {
		throw e;
	}
}
