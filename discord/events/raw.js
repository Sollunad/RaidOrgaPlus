const { reactionHandler } = require('../reactions/main');

module.exports = async (client, event) => {
    const eventType = event.t;
    if (eventType === 'MESSAGE_REACTION_ADD') {
        await reactionHandler(client, event.d);
    }
};