import { DiscordClient, DiscordMessage } from "../models/DiscordClient";

exports.run = (client: DiscordClient, message: DiscordMessage, args: string[]) => {
    const commands = client.commands.array();
    let helpString = "";
    commands.forEach(function(command) {
        const help = command.help;
        if (!help) return;
        helpString = helpString.concat(`**${help.usage}**\n${help.desc}\n\n`);
    });
    message.channel.send(helpString);
};

exports.help = {
    usage: '!orga help',
    desc: 'Zeigt diese Info an'
};