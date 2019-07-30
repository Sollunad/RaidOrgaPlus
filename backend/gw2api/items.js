const apiclient = require('gw2api-client');
const api = apiclient();

exports.getForId = getItemForId;

async function getItemForId(id) {
    return await api.items().get(id);
}
