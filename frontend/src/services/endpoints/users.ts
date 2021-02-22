import con from '../connector';

export default { get, getWithID, hasApi, setApi, changeName, register, login,
    invalidateSession, getBuilds, addBuild, deleteBuild, putPrefer, changeEmail, changePassword, createResetToken,
    resetPassword, getDiscordKey, hasProgressShared, setProgressShared };

async function get(): Promise<any> {
    return (await con('users', 'get', {}, true));
}

async function getWithID(id: any): Promise<any> {
    return (await con('users', 'get', {id}, true));
}

async function hasApi(): Promise<any> {
    return await con('users/api', 'get', {}, true);
}

async function setApi(apiKey: string): Promise<any> {
    return await con('users/api', 'post', {apiKey}, true);
}

async function changeName(name: any): Promise<any> {
    return await con('users/name', 'post', {name}, true);
}

async function changeEmail(email: string, pwd: string): Promise<any> {
    return (await con<any[]>('users/mail', 'post', {email, pwd}, true))[0];
}

async function changePassword(oldPwd: string, newPwd: string): Promise<any> {
    return (await con<any[]>('users/pwd', 'post', {oldPwd, newPwd}, true))[0];
}

async function register(accName: string, pwd: string, name: string, email: string): Promise<any> {
    return await con('users', 'post', {accName, pwd, name, email}, false);
}

async function login(accName: string, pwd: string): Promise<any> {
    return await con('users/sessions', 'post', {accName, pwd}, false)
}

async function invalidateSession(): Promise<any> {
    return await con('users/sessions', 'delete', {}, true)
}

async function getBuilds(user: any): Promise<any> {
    return await con('users/builds', 'get', {user}, true);
}

async function addBuild(clss: any, role: any): Promise<any> {
    return await con('users/builds', 'post', {clss, role}, true);
}

async function deleteBuild(clss: any, role: any): Promise<any> {
    return await con('users/builds', 'delete', {clss, role}, true);
}

async function putPrefer(clss: any, role: any, pref: any): Promise<any> {
    return await con('users/builds/prefer', 'put', {clss, role, pref}, true);
}

async function createResetToken(accname: any): Promise<any> {
    return await con('users/pwdReset/create', 'post', {accname}, false);
}

async function resetPassword(token: any, pwd: any): Promise<any> {
    return await con('users/pwdReset', 'post', {token, pwd}, false);
}

async function getDiscordKey(): Promise<any> {
    return await con('users/discordKey', 'get', {}, true);
}

async function hasProgressShared(user: any): Promise<any> {
    return await con('users/shared', 'get', {user}, true);
}

async function setProgressShared(shared: any): Promise<any> {
    return await con('users/shared', 'put', {shared}, true);
}
