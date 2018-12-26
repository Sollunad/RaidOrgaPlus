const db = require('../db/connector.js');

exports.new = newFeedback;

function newFeedback(text, user) {
    const stmt = 'INSERT INTO Feedback (text, user) VALUES (?, ?)';
    try {
        db.queryV(stmt, [text, user]);
    } catch(e) {
        throw e;
    }
}