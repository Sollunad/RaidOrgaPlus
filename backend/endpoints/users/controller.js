const _login = require('./login');
const _register = require('./register');
const _session = require('./session');
const _user = require('./user');
const _api = require('./apikey');
const _builds = require('./builds');
const _auth = require('../../authentication/auth');
const hash = require('password-hash');

module.exports = [
    {function: getUser, path: '', method: 'get', authed: true},
    {function: invalidateSession, path: '/sessions', method: 'delete', authed: true},
    {function: registerUser, path: '', method: 'post', authed: false},
    {function: loginUser, path: '/sessions', method: 'post', authed: false},
    {function: setApi, path: '/api', method: 'post', authed: true},
    {function: hasApi, path: '/api', method: 'get', authed: true},
    {function: setName, path: '/name', method: 'post', authed: true},
    {function: setEmail, path: '/mail', method: 'post', authed: true},
    {function: setPassword, path: '/pwd', method: 'post', authed: true},
    {function: getBuilds, path: '/builds', method: 'get', authed: true},
    {function: addBuild, path: '/builds', method: 'post', authed: true},
    {function: deleteBuild, path: '/builds', method: 'delete', authed: true},
    {function: putPrefer, path: '/builds/prefer', method: 'put', authed: true},
];

async function getUser(req, authentication) {
    return await _user.get(authentication.user);
}

async function invalidateSession(req, authentication) {
    _auth.deleteCache(authentication.uuid);
    return await _session.invalidate(authentication.uuid);
}

async function registerUser(req) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    const email = req.body.email;
    if (accName && pwd && name && email) {
        return await _register.register(accName, pwd, name, email);
    }
}

async function loginUser(req) {
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
    if (apiKey) {
        return await _api.setApi(authentication.user, apiKey);
    } else {
        return false;
    }
}

async function hasApi(req, authentication) {
    return await _api.hasApi(authentication.user);
}

async function setName(req, authentication) {
    const name = req.body.name;
    if (name) {
        await _user.changeName(authentication.user, name);
    }
    return [];
}

async function getBuilds(req) {
    const user = req.query.user;
    if (user) {
        return await _builds.getBuilds(user);
    }
    return [];
}

async function addBuild(req, authentication) {
    const clss = req.body.clss;
    const role = req.body.role;
    if (clss && role) {
        return _builds.addBuild(authentication.user, clss, role);
    } else {
        return [];
    }
}

async function deleteBuild(req, authentication) {
    const clss = req.body.clss;
    const role = req.body.role;
    if (clss && role) {
        return _builds.deleteBuild(authentication.user, clss, role);
    } else {
        return [];
    }
}

async function putPrefer(req, authentication) {
    const clss = req.body.clss;
    const role = req.body.role;
    const pref = req.body.pref;
    if (authentication && clss && role) {
        return await _builds.putPrefer(authentication.user, clss, role, pref);
    } else {
        return [];
    }
}

async function setEmail(req, authentication) {
    const pwd = req.body.pwd;
    const email = req.body.email;
    if (email) {
        const correctPwd = (await _user.getPwd(authentication.user))[0].password;
        console.log(correctPwd);
        const isCorrect = hash.verify(pwd, correctPwd);
        if (isCorrect) {
            await _user.changeEmail(authentication.user, email);
            return 'Success';
        }
    }
    return [];
}

async function setPassword(req, authentication) {
    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;
    if (oldPwd && newPwd) {
        const correctPwd = (await _user.getPwd(authentication.user))[0].password;
        const isCorrect = hash.verify(oldPwd, correctPwd);
        if (isCorrect) {
            await _user.changePassword(authentication.user, newPwd);
            return 'Success';
        }
    }
    return [];
}