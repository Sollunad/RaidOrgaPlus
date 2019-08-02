const _channels = require('../services/store/channels');


module.exports = (client) => {
  console.log("RO+ Bot gestartet");
  const channels = _channels.getAll();
  for (const linkedChannel of channels) {
    const channel = client.channels.get(linkedChannel.channel);
    if (channel) {
      channel.send('Der Bot wurde geupdated. Reaktionen auf ältere Nachrichten werden nicht mehr bearbeitet.');
    }
  }
};
