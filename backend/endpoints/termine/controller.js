const _termin = require('./termin');
const _ersatz = require('../termine/ersatz');
const _aufstellung = require('../aufstellungen/aufstellung');
const _roles = require('../../authentication/role');
const _anmeldungen = require('./anmeldungen');
const _homepage = require('./homepage');

module.exports = [
    {function: getTermine, path: '', method: 'get', authed: true},
    {function: postTermin, path: '', method: 'post', authed: true},
    {function: deleteTermin, path: '', method: 'delete', authed: true},
    {function: isArchived, path: '/isArchived', method: 'get', authed: true},
    {function: isLocked, path: '/isLocked', method: 'get', authed: true},
    {function: putLocked, path: '/isLocked', method: 'put', authed: true},
    {function: archive, path: '/archive', method: 'put', authed: true},
    {function: addBoss, path: '/bosses', method: 'post', authed: true},
    {function: putAnmeldung, path: '/anmeldungen', method: 'put', authed: true},
    {function: putAnmeldungLead, path: '/anmeldungenLead', method: 'put', authed: true},
    {function: getAnmeldung, path: '/anmeldungen', method: 'get', authed: true},
    {function: getAnmeldungenAll, path: '/anmeldungenAll', method: 'get', authed: true},
    {function: getText, path: '/text', method: 'get', authed: true},
    {function: saveText, path: '/text', method: 'put', authed: true},
    {function: getErsatz, path: '/ersatz', method: 'get', authed: true},
    {function: addErsatz, path: '/ersatz', method: 'post', authed: true},
    {function: deleteErsatz, path: '/ersatz', method: 'delete', authed: true},
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
                return await _termin.listActive(authentication.user, raid);
            }
        }
    } else {
        return await _homepage.getHomepageTermine(authentication.user);
    }
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
    const endtime = req.body.endtime;
    if (raid && date && time) {
        const role = await _roles.forRaid(authentication, raid);
        if (role > 0) {
            if (endtime) {
                return await _termin.newTerminWithEndTime(raid, date, time, endtime);
            } else {
                return await _termin.newTermin(raid, date, time);
            }
        }
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
                return _termin.addBoss(termin, boss).then(async (res) => {
                    await _aufstellung.loadBlanko(res.insertId);
                    return await _aufstellung.getForTermin(termin);
                })
            } else if (wing) {
                return _termin.addWing(termin, wing).then(async (res) => {
                    const minId = res.insertId;
                    const maxId = minId + res.affectedRows - 1;
                    for (let i = minId; i <= maxId; i++) {
                        await _aufstellung.loadBlanko(i);
                    }
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
        if (role >= 0) return await _anmeldungen.anmelden(authentication.user, termin, type);
    }
    return [];
}

async function putAnmeldungLead(req, authentication) {
    const termin = req.body.termin;
    const type = req.body.type;
    const spieler = req.body.spieler;
    if (termin && spieler && (type || type === 0)) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) return await _anmeldungen.anmelden(spieler, termin, type);
    }
    return [];
}

async function getAnmeldung(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        return await _anmeldungen.getAnmeldungForSpieler(authentication.user, termin)
    }
    return [];
}

async function getAnmeldungenAll(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return await _anmeldungen.getAnmeldungenForTermin(termin);
    }
    return [];
}

async function deleteTermin(req, authentication) {
    const termin = req.body.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) return await _termin.delete(termin);
    }
    return [];
}

async function getText(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) return (await _termin.getText(termin))[0];
    }
    return [];
}

async function saveText(req, authentication) {
    const termin = req.body.termin;
    const text = req.body.text;
    if (termin && (text || text === '')) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) return await _termin.saveText(termin, text);
    }
    return [];
}

async function getErsatz(req, authentication) {
    const termin = req.query.termin;
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role >= 0) {
            return await _ersatz.getErsatz(termin);
        }
    }
}

async function addErsatz(req, authentication) {
    const termin = req.body.termin;
    const user = req.body.user;
    if (termin && user) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            return await _ersatz.addErsatz(user, termin);
        }
    }
}

async function deleteErsatz(req, authentication) {
    const termin = req.body.termin;
    const user = req.body.user;
    if (termin && user) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            return await _ersatz.deleteErsatz(user, termin);
        }
    }
}
