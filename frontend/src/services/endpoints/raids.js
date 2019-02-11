import con from '../connector';

export default { listForPlayer, role, listPlayers, invitePlayer, invitablePlayers, kickPlayer,
    pendingInvitesForPlayer, pendingInvitesForRaid, acceptInvite, deleteInviteAsLead, deleteInviteAsSelf, getAnmeldungState };

async function listForPlayer() {
    return await con('raids', 'get', {}, true);
}

async function role(raid) {
    return (await con('raids/role', 'get', {raid: raid}, true)).role;
}

async function listPlayers(raid) {
    return await con('raids/players', 'get', {raid}, true);
}

async function kickPlayer(raid, user) {
    return await con('raids/players', 'delete', {raid, user}, true);
}

async function invitePlayer(raid, user) {
    return await con('raids/invites', 'post', {raid, user}, true);
}

async function invitablePlayers(raid) {
    return await con('raids/invitable', 'get', {raid}, true);
}

async function pendingInvitesForPlayer() {
    return await con('raids/invites', 'get', {}, true);
}

async function pendingInvitesForRaid(raid) {
    return await con('raids/invites', 'get', {raid}, true);
}

async function acceptInvite(raid) {
    return await con('raids/invites/accept', 'post', {raid}, true);
}

async function deleteInviteAsLead(raid, user) {
    return await con('raids/invites', 'delete', {raid, user}, true);
}

async function deleteInviteAsSelf(raid) {
    return await con('raids/invites', 'delete', {raid}, true);
}

async function getAnmeldungState(raid) {
    return (await con('raids/anmeldungen', 'get', {raid}, true)).type;
}