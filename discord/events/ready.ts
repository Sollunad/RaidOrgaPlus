import * as _refresher from "../refresher/main";
import { DiscordClient } from "../models/DiscordClient";

module.exports = (client: DiscordClient) => {
  console.log("RO+ Bot gestartet");
  _refresher.startTimer(client);
};
