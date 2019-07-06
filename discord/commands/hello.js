exports.run = (client, message, args) => {
    message.channel.send('Hello World!');
};

exports.help = {
    usage: '!orga hello',
    desc: 'Hello World'
};
