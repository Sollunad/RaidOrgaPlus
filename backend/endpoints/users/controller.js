const _login = require('./login');
const _register = require('./register');
const _session = require('./session');
const _user = require('./user');
const _api = require('./apikey');
const _builds = require('./builds');

module.exports = [
    {function: getUser, path: '', method: 'get'},
    {function: registerUser, path: '', method: 'post'},
    {function: invalidateSession, path: '/sessions', method: 'delete'},
    {function: loginUser, path: '/sessions', method: 'post'},
    {function: setApi, path: '/api', method: 'post'},
    {function: hasApi, path: '/api', method: 'get'},
    {function: setName, path: '/name', method: 'post'},
    {function: getBuilds, path: '/builds', method: 'get'},
    {function: addBuild, path: '/builds', method: 'post'},
    {function: deleteBuild, path: '/builds', method: 'delete'},
    {function: putPrefer, path: '/builds/prefer', method: 'put'},
];

async function getUser(req, res) {
    const uuid = req.query.uuid;
    if (uuid) {
        const response = (await _session.getUser(uuid))[0];
        if (response) {
            const user = response.user;
            res.send(await _user.get(user));
        }
        else {
            res.send([]);
        }
    } else {
        res.send([]);
    }
}

async function invalidateSession(req, res) {
    const uuid = req.body.uuid;
    if (uuid) {
        res.send(await _session.invalidate(uuid));
    } else {
        res.send([]);
    }
}

async function registerUser(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    if (accName && pwd && name) {
        res.send(await _register.register(accName, pwd, name));
    }
}

async function loginUser(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    if (accName && pwd) {
        res.send(await _login.login(accName, pwd));
    } else {
        res.send([]);
    }
}


async function setApi(req, res) {
    const user = req.body.user;
    const apiKey = req.body.apiKey;
    if (user && apiKey) {
        res.send(await _api.setApi(user, apiKey));
    } else {
        res.send(false);
    }
}

async function hasApi(req, res) {
    const user = req.query.user;
    if (user) {
        res.send(await _api.hasApi(user));
    } else {
        res.send(false);
    }
}

async function setName(req, res) {
    const name = req.body.name;
    const user = req.body.user;
    if (name && user) {
        _user.changeName(user, name);
    }
    res.send([]);
}

async function getBuilds(req, res) {
    const user = req.query.user;
    if (user) {
        res.send(await _builds.getBuilds(user));
    } else {
        res.send([]);
    }
}

async function addBuild(req, res) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    if (user && clss && role) {
        _builds.addBuild(user, clss, role).then(async () => {
            res.send(await _builds.getBuilds(user));
        });
    } else {
        res.send([]);
    }
}

async function deleteBuild(req, res) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    if (user && clss && role) {
        _builds.deleteBuild(user, clss, role).then(async () => {
            res.send(await _builds.getBuilds(user));
        });
    } else {
        res.send([]);
    }
}

async function putPrefer(req, res) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    const pref = req.body.pref;
    if (user && clss && role) {
        res.send(await _builds.putPrefer(user, clss, role, pref));
    } else {
        res.send([]);
    }
}