import * as _json from "./jsonHandler";

export function setRaid(channel, raid) {
    let newChannels = _json.read('channels');
    newChannels = newChannels.filter(c => c.channel !== channel);
    newChannels.push({channel, raid});
    _json.write('channels', newChannels);
}

export function getRaid(channel) {
    const channels = _json.read('channels');
    const foundChannel = channels.find(c => c.channel === channel);
    if (foundChannel) return foundChannel.raid;
}

export function getAllChannels() {
    return _json.read('channels');
}