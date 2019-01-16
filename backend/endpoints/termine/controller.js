const _termin = require('./termin');
const _aufstellung = require('../aufstellungen/aufstellung');

module.exports = [
    {function: getTermine, path: '', method: 'get'},
    {function: postTermin, path: '', method: 'post'},
    {function: isArchived, path: '/isArchived', method: 'get'},
    {function: archive, path: '/archive', method: 'put'},
    {function: addBoss, path: '/bosses', method: 'post'},
    {function: putAnmeldung, path: '/anmeldungen', method: 'put'},
    {function: getAnmeldungen, path: '/anmeldungen', method: 'get'},
];

async function getTermine(req, res) {
    const raid = req.query.raid;
    const archive = req.query.archive;
    if (raid) {
        if (archive === "1") {
            res.send(await _termin.listArchived(raid));
        } else {
            res.send(await _termin.listActive(raid));
        }
    } else {
        res.send([]);
    }
}

async function isArchived(req, res) {
    const termin = req.query.termin;
    if (termin) {
        res.send(await _termin.isArchived(termin));
    } else {
        res.send([]);
    }
}

async function postTermin(req, res) {
    const raid = req.body.raid;
    const date = req.body.date;
    const time = req.body.time;
    if (raid && date && time) {
        res.send(await _termin.newTermin(raid, date, time));
    } else {
        res.send([]);
    }
}

async function archive(req, res) {
    const termin = req.body.termin;
    if (termin) {
        res.send(await _termin.archive(termin));
    } else {
        res.send([]);
    }
}

async function addBoss(req, res) {
    const termin = req.body.termin;
    const boss = req.body.boss;
    const wing = req.body.wing;
    if (termin) {
        if (boss) {
            _termin.addBoss(termin, boss).then(async () => {
                res.send(await _aufstellung.getForTermin(termin));
            })
        } else if (wing) {
            _termin.addWing(termin, wing).then(async () => {
                res.send(await _aufstellung.getForTermin(termin));
            })
        }
    } else {
        res.send([]);
    }
}

async function putAnmeldung(req, res) {
    const spieler = req.body.spieler;
    const termin = req.body.termin;
    const type = req.body.type;
    if (spieler && termin && (type || type === 0)) {
        res.send(await _termin.anmelden(spieler, termin, type));
    } else {
        res.send([]);
    }
}

async function getAnmeldungen(req, res) {
    const spieler = req.query.spieler;
    const termin = req.query.termin;
    if (spieler && termin) {
        res.send(await _termin.getAnmeldung(spieler, termin));
    } else {
        res.send([]);
    }
}