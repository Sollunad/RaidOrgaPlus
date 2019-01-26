import con from '../connector';

export default { listForPlayer, role, listPlayers, invitePlayer, invitablePlayers,
    pendingInvitesForPlayer, pendingInvitesForRaid, acceptInvite, deleteInviteAsLead, deleteInviteAsSelf };

async function listForPlayer() {
    return await con('raids', 'get', {}, true);
}

async function role(raid) {
    return (await con('raids/role', 'get', {raid: raid}, true)).role;
}

async function listPlayers(raid) {
    return await con('raids/players', 'get', {raid: raid}, true);
}

async function invitePlayer(raid, user) {
    return await con('raids/invites', 'post', {raid: raid, user: user}, true);
}

async function invitablePlayers(raid) {
    return await con('raids/invitable', 'get', {raid: raid}, true);
}

async function pendingInvitesForPlayer() {
    return await con('raids/invites', 'get', {}, true);
}

async function pendingInvitesForRaid(raid) {
    return await con('raids/invites', 'get', {raid: raid}, true);
}

async function acceptInvite(raid) {
    return await con('raids/invites/accept', 'post', {raid: raid}, true);
}

async function deleteInviteAsLead(raid, user) {
    return await con('raids/invites', 'delete', {raid: raid, user: user}, true);
}

async function deleteInviteAsSelf(raid) {
    return await con('raids/invites', 'delete', {raid: raid}, true);
}