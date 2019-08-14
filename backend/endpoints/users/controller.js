const _login = require('./login');
const _register = require('./register');
const _session = require('./session');
const _user = require('./user');
const _api = require('./apikey');
const _builds = require('./builds');
const _reset = require('./passwordreset');
const _auth = require('../../authentication/auth');
const _roles = require('../../authentication/role');
const _discord = require('./discord');
const _discordUsers = require('../../discord/users');
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
    {function: resetPassword, path: '/pwdReset', method: 'post'},
    {function: createResetToken, path: '/pwdReset/create', method: 'post'},
    {function: getDiscordKey, path: '/discordKey', method: 'get', authed: true},
    {function: hasProgressShared, path: '/shared', method: 'get', authed: true},
    {function: setProgressShared, path: '/shared', method: 'put', authed: true},
];

async function getUser(req, authentication) {
    const id = req.query.id;
    let user = null;
    if (id) {
        const role = _roles.getRole(authentication);
        if (role >= 0) user = (await _user.get(id))[0];
    } else {
        user = (await _user.get(authentication.user))[0];
    }
    if (user) {
        const discordUsers = await _discordUsers.getAllUsers();
        const discordUser = _discordUsers.findUser(user, discordUsers);
        if (discordUser) {
            user.discord = discordUser;
        }
        return user;
    }
    return [];
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
    const key = req.body.key;
    const user_agent = req.header('user-agent');
    if (accName && pwd) {
        return await _login.login(accName, pwd, user_agent);
    } else if (key) {
        return await _discord.login(key, user_agent);
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
        const correctPwd = (await _user.getAllForId(authentication.user))[0].password;
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
        const correctPwd = (await _user.getAllForId(authentication.user))[0].password;
        const isCorrect = hash.verify(oldPwd, correctPwd);
        if (isCorrect) {
            await _user.changePassword(authentication.user, newPwd);
            return 'Success';
        }
    }
    return [];
}

async function createResetToken(req) {
    const accname = req.body.accname;
    if (accname) {
        await _reset.createResetToken(accname);
        return ['Success'];
    }
    return [];
}

async function resetPassword(req) {
    await _reset.deleteInvalidTokens();
    const token = req.body.token;
    const pwd = req.body.pwd;
    if (token && pwd) {
        const tokenExists = (await _reset.tokenCreated(token))[0];
        if (!tokenExists) return [];
        const tokenCreated = tokenExists.created;
        const tokenAge = Date.now() - tokenCreated;
        const tokenAgeAllowed = 1000 * 60 * 60 * 24;
        if (tokenAge < tokenAgeAllowed) {
            await _reset.resetPassword(token, pwd);
            await _reset.deleteToken(token);
            return ['Success'];
        }
    }
    return [];
}

async function getDiscordKey(req, authentication) {
    await _discord.delete(authentication.user);
    return await _discord.create(authentication.user);
}

async function hasProgressShared(req, authentication) {
    const user = req.query.user;
    let response = null;
    if (user) {
        response = await _user.hasProgressShared(user);
    } else {
        response = await _user.hasProgressShared(authentication.user);
    }
    if (response.length > 0) {
        const sharedValue = response[0].share;
        return (!!sharedValue)
    }
    return false;
}

async function setProgressShared(req, authentication) {
    const shared = req.body.shared;
    if (shared === true || shared === false) {
        const sharedValue = shared? 1 : 0;
        return await _user.setProgressShared(authentication.user, sharedValue);
    }
    return [];
}