const _refresher = require('../refresher/main');

module.exports = (client) => {
  console.log("RO+ Bot gestartet");
  _refresher.startTimer(client);
};
