const termin = require('./termin');
const aufstellung = require('../aufstellungen/aufstellung');

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
    const raid_id = req.query.raid;
    const archive = req.query.archive;
    if (raid_id) {
        if (archive === "1") {
            res.send(await termin.listArchived(raid_id));
        } else {
            res.send(await termin.listActive(raid_id));
        }
    } else {
        res.send([]);
    }
}

async function isArchived(req, res) {
    const termin_id = req.query.termin;
    if (termin_id) {
        res.send(await termin.isArchived(termin_id));
    } else {
        res.send([]);
    }
}

async function postTermin(req, res) {
    const raid = req.body.raid;
    const date = req.body.date;
    const time = req.body.time;
    if (raid && date && time) {
        res.send(await termin.newTermin(raid, date, time));
    } else {
        res.send([]);
    }
}

async function archive(req, res) {
    const termin_id = req.body.termin;
    if (termin_id) {
        res.send(await termin.archive(termin_id));
    } else {
        res.send([]);
    }
}

async function addBoss(req, res) {
    const termin_id = req.body.termin;
    const boss = req.body.boss;
    const wing = req.body.wing;
    if (termin_id) {
        if (boss) {
            termin.addBoss(termin_id, boss).then(async () => {
                res.send(await aufstellung.getForTermin(termin_id));
            })
        } else if (wing) {
            termin.addWing(termin_id, wing).then(async () => {
                res.send(await aufstellung.getForTermin(termin_id));
            })
        }
    } else {
        res.send([]);
    }
}

async function putAnmeldung(req, res) {
    const spieler = req.body.spieler;
    const termin_id = req.body.termin;
    const type = req.body.type;
    if (spieler && termin_id && (type || type === 0)) {
        res.send(await termin.anmelden(spieler, termin_id, type));
    } else {
        res.send([]);
    }
}

async function getAnmeldungen(req, res) {
    const spieler = req.query.spieler;
    const termin_id = req.query.termin;
    if (spieler && termin_id) {
        res.send(await termin.getAnmeldung(spieler, termin_id));
    } else {
        res.send([]);
    }
}