const db = require('../../db/connector.js');

exports.addBuild = addBuild;
exports.deleteBuild = deleteBuild;
exports.getBuilds = getBuilds;

async function getBuilds(user) {
    const stmt = 'SELECT fk_class AS classId, sub.abbr AS classAbbr, base.color AS classColor, fk_role AS roleId, Rolle.abbr AS roleAbbr FROM Spieler_Build' +
        ' JOIN Klasse sub ON sub.id = Spieler_Build.fk_class' +
        ' JOIN Klasse base ON base.id = sub.fk_base' +
        ' JOIN Rolle ON Rolle.id = Spieler_Build.fk_role' +
        ' WHERE fk_spieler = ? ORDER BY base.id, sub.id FOR UPDATE';
    try {
        return (await db.queryV(stmt, user)).map(classRoleMapper);
    } catch(e) {
        throw e;
    }
}

async function addBuild(user, clss, role) {
    const stmt = 'INSERT INTO Spieler_Build (fk_spieler, fk_class, fk_role) VALUES (?,?,?) ';
    try {
        return await db.queryV(stmt, [user, clss, role]);
    } catch(e) {
        throw e;
    }
}

async function deleteBuild(user, clss, role) {
    const stmt = 'DELETE FROM Spieler_Build WHERE fk_spieler = ? AND fk_class = ? AND fk_role = ?';
    try {
        return await db.queryV(stmt, [user, clss, role]);
    } catch(e) {
        throw e;
    }
}

function classRoleMapper(element) {
    return {class: {abbr: element.classAbbr, id: element.classId, color: element.classColor}, role: {abbr: element.roleAbbr, id: element.roleId}};
}