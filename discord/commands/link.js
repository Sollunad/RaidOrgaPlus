const _raids = require('../services/endpoints/raids');
const _channels = require('../services/channels');

exports.run = async (client, message, args) => {
    const raids = await _raids.getRaids(message.auth);
    const allowedRaids = raids.filter(r => r.role > 0);
    if (args[0] && args[0] <= allowedRaids.length) {
        const chosenRaid = allowedRaids[args[0] - 1];
        _channels.setRaid(message.channel.id, chosenRaid);
        message.channel.send(`Dieser Channel gehört nun zum Raid ${chosenRaid.name}.`);
    } else if (allowedRaids.length > 0) {
        let response = 'Wähle einen Raid zum Verlinken:\n';
        for (let i = 1; i <= allowedRaids.length; i++) {
            response += `\n\`\`\`!orga link ${i} => ${allowedRaids[i - 1].name}\`\`\``;
        }
        message.channel.send(response);
    } else {
        message.channel.send('Du hast keine Raids, die du verlinken könntest.');
    }
};

exports.help = {
    usage: '!orga link',
    desc: 'Verknüpft einen Raid mit einem Discord-Channel.'
};
