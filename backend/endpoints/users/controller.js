const login = require('./login');
const register = require('./register');
const session = require('./session');
const user = require('./user');
const api = require('./apikey');
const builds = require('./builds');

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
];

async function getUser(req, res) {
    const uuid = req.query.uuid;
    if (uuid) {
        const response = (await session.getUser(uuid))[0];
        if (response) {
            const user_id = response.user;
            res.send(await user.get(user_id));
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
        res.send(await session.invalidate(uuid));
    } else {
        res.send([]);
    }
}

async function registerUser(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    if (accName && pwd && name) {
        res.send(await register.register(accName, pwd, name));
    }
}

async function loginUser(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    if (accName && pwd) {
        res.send(await login.login(accName, pwd));
    } else {
        res.send([]);
    }
}


async function setApi(req, res) {
    const user_id = req.body.userId;
    const apiKey = req.body.apiKey;
    if (user_id && apiKey) {
        res.send(await api.setApi(user_id, apiKey));
    } else {
        res.send(false);
    }
}

async function hasApi(req, res) {
    const user_id = req.query.user;
    if (user_id) {
        res.send(await api.hasApi(user_id));
    } else {
        res.send(false);
    }
}

async function setName(req, res) {
    const name = req.body.name;
    const user_id = req.body.userId;
    if (name && user_id) {
        user.changeName(user_id, name);
    }
    res.send([]);
}

async function getBuilds(req, res) {
    const user = req.query.user;
    if (user) {
        res.send(await builds.getBuilds(user));
    } else {
        res.send([]);
    }
}

async function addBuild(req, res) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    if (user && clss && role) {
        builds.addBuild(user, clss, role).then(async () => {
            res.send(await builds.getBuilds(user));
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
        builds.deleteBuild(user, clss, role).then(async () => {
            res.send(await builds.getBuilds(user));
        });
    } else {
        res.send([]);
    }
}