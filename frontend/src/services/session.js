const sf = require('snekfetch');
const config = require('./config.json');

export default { invalidate };

async function invalidate(session) {
    const url = config.url + 'users/sessions';
    const response = await sf.delete(url).send({"uuid": session});
    return response.body;
}