const _feedback = require('./feedback');

module.exports = [
    {function: postFeedback, path: '/', method: 'post'},
];

async function postFeedback(req, authentication) {
    const text = req.body.text;
    const user = req.body.accname;
    if (text) {
        _feedback.new(text, user);
    }
    return [];
}