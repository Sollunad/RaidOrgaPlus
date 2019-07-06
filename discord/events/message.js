const _sessions = require('../services/sessions');

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  const session = _sessions.getSession(message.author.id);
  console.log(session);

  if (command !== 'login' && command !== 'help') {
    if (session === 'Keine Session') {
      message.channel.send('Bitte melde dich zuerst an.');
      return;
    } else if (session === 'Abgelaufen') {
      message.channel.send('Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.');
      return;
    }
  }

  // Run the command
  cmd.run(client, message, args);
};
