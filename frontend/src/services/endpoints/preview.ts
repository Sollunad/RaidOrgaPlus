import con from '../connector';
import { Aufstellung } from 'models/Aufstellung';
import { Encounter } from 'models/Encounter';
import { element, terminDate } from 'models/Types';

export default { getAufstellungen, getElements, getRaidName, setPreviewable, getPreviewable, getTerminDate };

async function getAufstellungen(termin: string | number): Promise<(Aufstellung & Encounter)[]> {
	return await con('preview', 'get', { termin }, false);
}

async function getElements(termin: string | number): Promise<element[]> {
	return await con('preview/elements', 'get', { termin }, false);
}

async function getRaidName(termin: string | number): Promise<string> {
	return await con('preview/raid', 'get', { termin }, false);
}

async function setPreviewable(termin: any, able: boolean): Promise<any> {
	return await con('preview/able', 'post', { termin, able }, true);
}

async function getPreviewable(termin: any): Promise<any> {
	return await con('preview/able', 'get', { termin }, true);
}

async function getTerminDate(termin: string | number): Promise<terminDate> {
	return await con('preview/date', 'get', { termin }, false);
}