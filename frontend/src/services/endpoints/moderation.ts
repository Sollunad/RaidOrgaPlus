import con from '../connector';
import { ModRaid } from 'models/Raid';

export default { getUsers, getRaids, createRaid, removeRaid, invitablePlayers, addSpieler, removeSpieler, setPlayerRole, getSpielerForRaid, setComment };

async function getUsers(): Promise<any> {
    return await con('moderation/users', 'get', {}, true);
}

async function getRaids(): Promise<ModRaid[]> {
    return await con('moderation/raids', 'get', {}, true);
}

async function createRaid(name: string): Promise<any> {
    return await con('moderation/raids', 'post', {name}, true);
}

async function removeRaid(id: number, name: string): Promise<void> {
	return await con('moderation/raids', 'delete', {id, name}, true);
}

async function invitablePlayers(raid: any): Promise<any> {
    return await con('moderation/raids/invitable', 'get', {raid}, true);
}

async function addSpieler(raid: any, spieler: any): Promise<any> {
    return await con('moderation/raids/spieler', 'post', {raid, spieler}, true);
}

async function removeSpieler(raid: any, spieler: any): Promise<any> {
    return await con('moderation/raids/spieler', 'delete', {raid, spieler}, true);
}

async function getSpielerForRaid(raid: any): Promise<any> {
    return await con('moderation/raids/spieler', 'get', {raid}, true);
}

async function setPlayerRole(raid: any, spieler: any, role: any): Promise<any> {
    return await con('moderation/raids/role', 'put', {raid, spieler, role}, true);
}

async function setComment(spieler: any, comment: any): Promise<any> {
    return await con('moderation/users/comment', 'put', {spieler, comment}, true);
}
