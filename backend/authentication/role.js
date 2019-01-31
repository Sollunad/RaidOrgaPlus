const _termin = require('../endpoints/termine/termin');
const _aufstellungen = require('../endpoints/aufstellungen/aufstellung');

exports.forRaid = getRoleForRaid;
exports.forTermin = getRoleForTermin;
exports.forAufstellung = getRoleForAufstellung;

function getRoleForRaid(auth, raid) {
    const authedRaid = auth.raids.filter(r => r.id === parseInt(raid))[0];
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