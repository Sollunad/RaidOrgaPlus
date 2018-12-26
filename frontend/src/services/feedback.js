const sf = require('snekfetch');
const config = require('./config.json');

export default { feedback };

async function feedback(text, accname){
    const url = config.url + 'feedback';
    const response = await sf.post(url).send({"text": text, "accname": accname});
    return response.body;
}