const aufstellung = require('./aufstellung');
const element = require('./element');

module.exports = [
    {function: getTermin, path: '', method: 'get'},
    {function: getSuccess, path: '/success', method: 'get'},
    {function: putSuccess, path: '/success', method: 'put'},
    {function: deleteTermin, path: '', method: 'delete'},
    {function: getEncounter, path: '/encounter', method: 'get'},
    {function: getElement, path: '/element', method: 'get'},
    {function: postElement, path: '/element', method: 'post'},
];

async function getTermin(req, res) {
    const termin_id = req.query.termin;
    if (termin_id) {
        res.send(await aufstellung.getForTermin(termin_id));
    } else {
        res.send([]);
    }
}

async function getSuccess(req, res) {
    const aufstellung_id = req.query.aufstellung;
    if (aufstellung_id) {
        res.send(await aufstellung.getSuccess(aufstellung_id));
    } else {
        res.send([]);
    }
}

async function putSuccess(req, res) {
    const aufstellung_id = req.body.aufstellung;
    const success = req.body.success;
    if (aufstellung_id && (success === 1 || success === 0)) {
        res.send(await aufstellung.setSuccess(aufstellung_id, success));
    } else {
        res.send([]);
    }
}

async function deleteTermin(req, res) {
    const aufstellung_id = req.body.aufstellung;
    const termin_id = req.body.termin;
    if (aufstellung_id && termin_id) {
        aufstellung.delete(aufstellung_id).then(async () => {
            res.send(await aufstellung.getForTermin(termin_id));
        })
    } else {
        res.send([]);
    }
}

async function getEncounter(req, res) {
    const aufstellung_id = req.query.aufstellung;
    if (aufstellung_id) {
        res.send(await aufstellung.getEncounter(aufstellung_id));
    } else {
        res.send([]);
    }
}

async function getElement(req, res) {
    const aufstellung = req.query.aufstellung;
    if (aufstellung) {
        res.send(await element.getAll(aufstellung));
    } else {
        res.send([]);
    }
}

async function postElement(req, res) {
    const aufstellung = req.body.aufstellung;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    if (aufstellung && position && type && value) {
        if (type === "class") {
            element.setClass(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else if (type === "role") {
            element.setRole(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else if (type === "name") {
            element.setName(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else {
            res.send([]);
        }

    } else {
        res.send([]);
    }
}