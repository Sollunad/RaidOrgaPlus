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

async function getUser(req, authentication) {
    const uuid = req.query.uuid;
    if (uuid) {
        const response = (await _session.getUser(uuid))[0];
        if (response) {
            const user = response.user;
            return await _user.get(user);
        }
        else {
            return [];
        }
    } else {
        return [];
    }
}

async function invalidateSession(req, authentication) {
    const uuid = req.body.uuid;
    if (uuid) {
        return await _session.invalidate(uuid);
    } else {
        return [];
    }
}

async function registerUser(req, authentication) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    if (accName && pwd && name) {
        return await _register.register(accName, pwd, name);
    }
}

async function loginUser(req, authentication) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    if (accName && pwd) {
        return await _login.login(accName, pwd);
    } else {
        return [];
    }
}


async function setApi(req, authentication) {
    const apiKey = req.body.apiKey;
    if (authentication && apiKey) {
        return await _api.setApi(authentication.user, apiKey);
    } else {
        return false;
    }
}

async function hasApi(req, authentication) {
    const user = req.query.user;
    if (user) {
        return await _api.hasApi(user);
    } else {
        return false;
    }
}

async function setName(req, authentication) {
    const name = req.body.name;
    const user = req.body.user;
    if (name && user) {
        _user.changeName(user, name);
    }
    return [];
}

async function getBuilds(req, authentication) {
    const user = req.query.user;
    if (user) {
        return await _builds.getBuilds(user);
    } else {
        return [];
    }
}

async function addBuild(req, authentication) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    if (user && clss && role) {
        return _builds.addBuild(user, clss, role).then(async () => {
            return await _builds.getBuilds(user);
        });
    } else {
        return [];
    }
}

async function deleteBuild(req, authentication) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    if (user && clss && role) {
        return _builds.deleteBuild(user, clss, role).then(async () => {
            return await _builds.getBuilds(user);
        });
    } else {
        return [];
    }
}

async function putPrefer(req, authentication) {
    const user = req.body.user;
    const clss = req.body.clss;
    const role = req.body.role;
    const pref = req.body.pref;
    if (user && clss && role) {
        return await _builds.putPrefer(user, clss, role, pref);
    } else {
        return [];
    }
}