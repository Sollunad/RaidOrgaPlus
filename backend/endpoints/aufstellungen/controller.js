const _aufstellung = require('./aufstellung');
const _element = require('./element');

module.exports = [
    {function: getTermin, path: '', method: 'get'},
    {function: getSuccess, path: '/success', method: 'get'},
    {function: putSuccess, path: '/success', method: 'put'},
    {function: deleteTermin, path: '', method: 'delete'},
    {function: getElement, path: '/element', method: 'get'},
    {function: postElement, path: '/element', method: 'post'},
];

async function getTermin(req, res) {
    const termin = req.query.termin;
    if (termin) {
        res.send(await _aufstellung.getForTermin(termin));
    } else {
        res.send([]);
    }
}

async function getSuccess(req, res) {
    const aufstellung = req.query.aufstellung;
    if (aufstellung) {
        res.send(await _aufstellung.getSuccess(aufstellung));
    } else {
        res.send([]);
    }
}

async function putSuccess(req, res) {
    const aufstellung = req.body.aufstellung;
    const success = req.body.success;
    if (aufstellung && (success || success === false)) {
        res.send(await _aufstellung.setSuccess(aufstellung, success));
    } else {
        res.send([]);
    }
}

async function deleteTermin(req, res) {
    const aufstellung = req.body.aufstellung;
    const termin = req.body.termin;
    if (aufstellung && termin) {
        _aufstellung.delete(aufstellung).then(async () => {
            res.send(await _aufstellung.getForTermin(termin));
        })
    } else {
        res.send([]);
    }
}

async function getElement(req, res) {
    const termin = req.query.termin;
    if (termin) {
        res.send(await _element.getForTermin(termin));
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
            _element.setClass(aufstellung, position, value).then(async () => {
                res.send(await _element.getForAufstellung(aufstellung));
            });
        } else if (type === "role") {
            _element.setRole(aufstellung, position, value).then(async () => {
                res.send(await _element.getForAufstellung(aufstellung));
            });
        } else if (type === "name") {
            _element.setName(aufstellung, position, value).then(async () => {
                res.send(await _element.getForAufstellung(aufstellung));
            });
        } else {
            res.send([]);
        }

    } else {
        res.send([]);
    }
}