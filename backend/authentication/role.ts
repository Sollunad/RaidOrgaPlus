import * as _termin from '../endpoints/termine/termin';
import * as _aufstellungen from '../endpoints/aufstellungen/aufstellung';

export {
	getRole, getRoleForRaid as forRaid, getRoleForTermin as forTermin, getRoleForAufstellung as forAufstellung
};

function getRole(auth) {
    return auth.role;
}

function getRoleForRaid(auth, raid) {
    const authedRaid = auth.raids.find(r => r.id === parseInt(raid));
    if (authedRaid) return authedRaid.role;
    return null;
}

async function getRoleForTermin(auth, termin) {
    const raid = (await _termin.getRaidId(termin))[0].id;
    return getRoleForRaid(auth, raid);
}

async function getRoleForAufstellung(auth, aufstellung) {
    const raid = (await _aufstellungen.getRaidId(aufstellung))[0].id;
    return getRoleForRaid(auth, raid);
}