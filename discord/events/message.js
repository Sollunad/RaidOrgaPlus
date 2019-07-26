const _sessions = require('../services/sessions');
const _channels = require('../services/channels');

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  let cmd = client.commands.get(command);

  // If that command doesn't exist, use the help command
  if (!cmd) {
    command = 'help';
    cmd = client.commands.get(command);
  }

  const session = _sessions.getSession(message.author.id);

  if (command !== 'login' && command !== 'help') {
    if (session === 'Keine Session') {
      message.channel.send('Bitte logge dich zunächst über RaidOrga+ ein: https://orga.sollunad.de/#/einstellungen');
      return;
    } else if (session === 'Abgelaufen') {
      message.channel.send('Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.');
      return;
    }
  }

  message.auth = session;
  message.raid = _channels.getRaid(message.channel.id);

  // Run the command
  cmd.run(client, message, args);
};
