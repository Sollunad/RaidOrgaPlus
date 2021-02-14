import { Client } from "discord.js";
import config from "./config.json";

class DiscordClient extends Client {
	config: any;
}

const client = new DiscordClient();
client.config = config;
client.login(config.token);

const RISING_LIGHT_ID = '157565117070966784';
const EVERYONE_ROLE_ID = '157565117070966784';
const AVATAR_BASE_URL = 'https://cdn.discordapp.com/avatars';

export async function getUser(id) {
    return (await getAllUsers()).find(m => m.id === id);
}

export async function getAllUsers() {
    try {
        return client.guilds.get(RISING_LIGHT_ID).members.filter(m => m.user.bot === false).map(mapMember);
    } catch (e) {
        console.log(e);
        return [];
    }
}

function mapMember(member) {
    return {
        id: member.user.id,
        username: `${member.user.username}#${member.user.discriminator}`,
        nickname: getNickname(member),
        roles: getRoles(member),
        joined: member.joinedTimestamp,
        avatar: getAvatarURL(member),
        color: member.displayHexColor
    }
}

function getNickname(member) {
    if (member.nickname === null) {
        return member.user.username;
    } else {
        return member.nickname;
    }
}

function getRoles(member) {
    return member.roles.filter(r => r.id !== EVERYONE_ROLE_ID).map(r => {
        return {id: r.id, name: r.name, color: parseColor(r.color)};
    });
}

function parseColor(number) {
    return `#${number.toString(16).padStart(6, '0')}`;
}

function getAvatarURL(member) {
    if (member.user.avatar === null) {
        return null;
    } else {
        return `${AVATAR_BASE_URL}/${member.user.id}/${member.user.avatar}`;
    }
}

export function findUser(roUser, discordUsers) {
    if (!roUser.discord) return;
    return discordUsers.find(d => {
        return d.id.toString() === roUser.discord.toString();
    });
}
