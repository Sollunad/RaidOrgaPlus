const _raids = require('../services/endpoints/raids');
const _channels = require('../services/channels');

exports.run = async (client, message, args) => {
    const raids = await _raids.getRaids(message.author.id);
    const allowedRaids = raids.filter(r => r.role > 0);
    if (args[0] && args[0] <= allowedRaids.length) {
        const chosenRaid = allowedRaids[args[0] - 1];
        _channels.setRaid(message.channel.id, chosenRaid.id);
        message.channel.send(`Dieser Channel gehört nun zum Raid ${chosenRaid.name}.`);
    } else {
        let response = 'Wähle einen Raid zum Verlinken:\n';
        for (let i = 1; i <= allowedRaids.length; i++) {
            response += `\n!orga link ${i} für den Raid ${allowedRaids[i - 1].name}`;
        }
        message.channel.send(response);
    }
};

exports.help = {
    usage: '!orga link',
    desc: 'Verknüpft einen Raid mit einem Discord-Channel.'
};
