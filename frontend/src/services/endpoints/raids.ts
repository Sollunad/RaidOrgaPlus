import con from '../connector';
import { playerInvite } from 'models/Types';

export default { listForPlayer, role, listPlayers, invitePlayer, invitablePlayers, kickPlayer,
    pendingInvitesForPlayer, pendingInvitesForRaid, acceptInvite, deleteInviteAsLead, deleteInviteAsSelf, getAnmeldungState };

async function listForPlayer(): Promise<any> {
    return await con('raids', 'get', {}, true);
}

async function role(raid: any): Promise<any> {
    return (await con<any>('raids/role', 'get', {raid: raid}, true)).role;
}

async function listPlayers(raid: any): Promise<any> {
    return await con('raids/players', 'get', {raid}, true);
}

async function kickPlayer(raid: any, user: any): Promise<any> {
    return await con('raids/players', 'delete', {raid, user}, true);
}

async function invitePlayer(raid: any, user: any): Promise<any> {
    return await con('raids/invites', 'post', {raid, user}, true);
}

async function invitablePlayers(raid: any): Promise<any> {
    return await con('raids/invitable', 'get', {raid}, true);
}

async function pendingInvitesForPlayer(): Promise<playerInvite[]> {
    return await con('raids/invites', 'get', {}, true);
}

async function pendingInvitesForRaid(raid: number): Promise<number[]> {
    return await con('raids/invites', 'get', {raid}, true);
}

async function acceptInvite(raid: number): Promise<void> {
    return await con('raids/invites/accept', 'post', {raid}, true);
}

async function deleteInviteAsLead(raid: any, user: any): Promise<any> {
    return await con('raids/invites', 'delete', {raid, user}, true);
}

async function deleteInviteAsSelf(raid: any): Promise<any> {
    return await con('raids/invites', 'delete', {raid}, true);
}

async function getAnmeldungState(): Promise<any> {
    return await con('raids/anmeldungen', 'get', {}, true);
}