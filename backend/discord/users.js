const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.login(config.token);

const RISING_LIGHT_ID = '157565117070966784';
const EVERYONE_ROLE_ID = '157565117070966784';
const AVATAR_BASE_URL = 'https://cdn.discordapp.com/avatars';

exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.findUser = findUser;

async function getUser(id) {
    return (await getAllUsers()).find(m => m.id === id);
}

async function getAllUsers() {
    return client.guilds.get(RISING_LIGHT_ID).members.filter(m => m.user.bot === false).map(mapMember);
}

function mapMember(member) {
    return {
        id: member.user.id,
        username: `${member.user.username}#${member.user.discriminator}`,
        nickname: getNickname(member),
        roles: getRoles(member),
        joined: new Date(member.joinedTimestamp),
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

function findUser(roUser, discordUsers) {
    return discordUsers.find(d => d.nickname.includes(roUser.accname));
}

async function test() {
    console.log(await getUser('137276621508837376'));
}
