import { reactionHandler } from "../reactions/main";
import { DiscordClient } from "../models/DiscordClient";

module.exports = async (client: DiscordClient, event: any) => {
    const eventType = event.t;
    if (eventType === 'MESSAGE_REACTION_ADD') {
        await reactionHandler(client, event.d);
    }
};