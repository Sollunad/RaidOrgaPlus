import * as _termin from '../endpoints/termine/termin';
import * as _aufstellungen from '../endpoints/aufstellungen/aufstellung';
import { Authentication } from 'models/Auth';

export {
	getRole, getRoleForRaid as forRaid, getRoleForTermin as forTermin, getRoleForAufstellung as forAufstellung
};

function getRole(auth: Authentication): number {
    return auth.role;
}

function getRoleForRaid(auth: Authentication, raid: string | number): number | null {
	let raidId: number;

	if (typeof raid === "string") {
		raidId = parseInt(raid);
	}
	else {
		raidId = raid;
	}

    const authedRaid = auth.raids.find(r => r.id === raidId);
    if (authedRaid) return authedRaid.role;
    return null;
}

async function getRoleForTermin(auth: Authentication, termin: number): Promise<number | null> {
    const raid = (await _termin.getRaidId(termin))[0].id;
    return getRoleForRaid(auth, raid);
}

async function getRoleForAufstellung(auth: Authentication, aufstellung: number): Promise<number | null> {
    const raid = (await _aufstellungen.getRaidId(aufstellung))[0].id;
    return getRoleForRaid(auth, raid);
}