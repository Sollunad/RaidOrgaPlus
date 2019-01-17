const _termin = require('./termin');
const _aufstellung = require('../aufstellungen/aufstellung');

module.exports = [
    {function: getTermine, path: '', method: 'get'},
    {function: postTermin, path: '', method: 'post'},
    {function: isArchived, path: '/isArchived', method: 'get'},
    {function: isLocked, path: '/isLocked', method: 'get'},
    {function: archive, path: '/archive', method: 'put'},
    {function: addBoss, path: '/bosses', method: 'post'},
    {function: putAnmeldung, path: '/anmeldungen', method: 'put'},
    {function: getAnmeldungen, path: '/anmeldungen', method: 'get'},
];

async function getTermine(req, authentication) {
    const raid = req.query.raid;
    const archive = req.query.archive;
    if (raid) {
        if (archive === "1") {
            return await _termin.listArchived(raid);
        } else {
            return await _termin.listActive(raid);
        }
    } else {
        return [];
    }
}

async function isArchived(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        return await _termin.isArchived(termin);
    } else {
        return [];
    }
}

async function isLocked(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        return await _termin.isLocked(termin);
    } else {
        return [];
    }
}

async function postTermin(req, authentication) {
    const raid = req.body.raid;
    const date = req.body.date;
    const time = req.body.time;
    if (raid && date && time) {
        return await _termin.newTermin(raid, date, time);
    } else {
        return [];
    }
}

async function archive(req, authentication) {
    const termin = req.body.termin;
    if (termin) {
        return await _termin.archive(termin);
    } else {
        return [];
    }
}

async function addBoss(req, authentication) {
    const termin = req.body.termin;
    const boss = req.body.boss;
    const wing = req.body.wing;
    if (termin) {
        if (boss) {
            return _termin.addBoss(termin, boss).then(async () => {
                return await _aufstellung.getForTermin(termin);
            })
        } else if (wing) {
            return _termin.addWing(termin, wing).then(async () => {
                return await _aufstellung.getForTermin(termin);
            })
        }
    } else {
        return [];
    }
}

async function putAnmeldung(req, authentication) {
    const spieler = req.body.spieler;
    const termin = req.body.termin;
    const type = req.body.type;
    if (spieler && termin && (type || type === 0)) {
        return await _termin.anmelden(spieler, termin, type);
    } else {
        return [];
    }
}

async function getAnmeldungen(req, authentication) {
    const spieler = req.query.spieler;
    const termin = req.query.termin;
    if (spieler && termin) {
        return await _termin.getAnmeldung(spieler, termin);
    } else {
        return [];
    }
}