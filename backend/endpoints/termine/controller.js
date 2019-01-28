const _termin = require('./termin');
const _aufstellung = require('../aufstellungen/aufstellung');
const _roles = require('../../authentication/role');

module.exports = [
    {function: getTermine, path: '', method: 'get'},
    {function: postTermin, path: '', method: 'post'},
    {function: deleteTermin, path: '', method: 'delete'},
    {function: isArchived, path: '/isArchived', method: 'get'},
    {function: isLocked, path: '/isLocked', method: 'get'},
    {function: putLocked, path: '/isLocked', method: 'put'},
    {function: archive, path: '/archive', method: 'put'},
    {function: addBoss, path: '/bosses', method: 'post'},
    {function: putAnmeldung, path: '/anmeldungen', method: 'put'},
    {function: getAnmeldungen, path: '/anmeldungen', method: 'get'},
];

async function getTermine(req, authentication) {
    const raid = req.query.raid;
    const archive = req.query.archive;
    if (raid) {
        const role = await _roles.forRaid(authentication, raid);
        if (role >= 0) {
            if (archive === "1") {
                return await _termin.listArchived(raid);
            } else {
                return await _termin.listActive(raid);
            }
        }
    }
    return [];
}

async function isArchived(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _termin.isArchived(termin);
    }
    return [];
}

async function isLocked(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _termin.isLocked(termin);
    }
    return [];
}

async function putLocked(req, authentication) {
    const termin = req.body.termin;
    const locked = req.body.locked;
    if (termin && (locked === true || locked === false)) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            const lockId = locked? 1 : 0;
            return await _termin.setLocked(termin, lockId);
        }
    }
    return [];
}

async function postTermin(req, authentication) {
    const raid = req.body.raid;
    const date = req.body.date;
    const time = req.body.time;
    if (raid && date && time) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) return await _termin.newTermin(raid, date, time);
    }
    return [];
}

async function archive(req, authentication) {
    const termin = req.body.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) return await _termin.archive(termin);
    }
    return [];
}

async function addBoss(req, authentication) {
    const termin = req.body.termin;
    const boss = req.body.boss;
    const wing = req.body.wing;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            if (boss) {
                return _termin.addBoss(termin, boss).then(async () => {
                    return await _aufstellung.getForTermin(termin);
                })
            } else if (wing) {
                return _termin.addWing(termin, wing).then(async () => {
                    return await _aufstellung.getForTermin(termin);
                })
            }
        }
    }
    return [];
}

async function putAnmeldung(req, authentication) {
    const termin = req.body.termin;
    const type = req.body.type;
    if (termin && (type || type === 0)) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _termin.anmelden(authentication.user, termin, type);
    }
    return [];
}

async function getAnmeldungen(req, authentication) {
    const spieler = req.query.spieler;
    const termin = req.query.termin;
    if (termin) {
        if (spieler) {
            if (authentication.user === parseInt(spieler)) return await _termin.getAnmeldungForSpieler(spieler, termin);
        } else {
            const role = await _roles.forTermin(authentication, termin);
            if (role >= 0) return await _termin.getAnmeldungenForTermin(termin);
        }
    }
    return [];
}

async function deleteTermin(req, authentication) {
    const termin = req.body.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) return await _termin.delete(termin);
    }
}