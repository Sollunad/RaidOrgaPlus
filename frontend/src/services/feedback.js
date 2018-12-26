const sf = require('snekfetch');
const config = require('./config.json');

export default { feedback };

async function feedback(text, accname){
    const url = config.url + 'feedback';
    console.log(url);
    const response = await sf.post(url).send({"text": text, "accname": accname});
}