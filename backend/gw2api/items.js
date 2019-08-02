const apiclient = require('gw2api-client');
const api = apiclient();

exports.getForId = getItemForId;

async function getItemForId(id) {
    // Kein extra Caching notwendig, macht der gw2api-client (24 Stunden Dauer)
    return await api.items().get(id);
}
