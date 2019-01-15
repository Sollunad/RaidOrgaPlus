const apiclient = require('gw2api-client');
const sf = require('snekfetch');

exports.fetchProgress = fetchProgress;
exports.accName = getAccname;
exports.permissions = getPermissions;

async function fetchProgress(key) {
    return apiclient().authenticate(key).account().raids().get().then(res => {return res});
}

async function getAccname(key) {
    return apiclient().authenticate(key).account().get().then(res => {return res.name});
}

async function getPermissions(key){
    return apiclient().authenticate(key).tokeninfo().get().then(res => {return res.permissions});
}