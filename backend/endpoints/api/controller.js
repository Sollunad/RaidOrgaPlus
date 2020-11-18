const _aufstellung = require('../aufstellungen/aufstellung');
const _element = require('../aufstellungen/element');
const _roles = require('../../authentication/role');
const _termin = require('../termine/termin');
const _db = require('../../db/connector');
const { reduce } = require('../raids/controller');

module.exports = [
    {function: setAufstellung, path: '/aufstellungen', method: 'post', authed: true},
];


async function setAufstellung(req, authentication) {
    const termin = req.body.body.terminId;
    const data = req.body.body.aufstellungen;

    const stmt = 'SELECT count(*) AS count FROM termine WHERE termine.id = ?';
    const terminExists = await _db.queryV(stmt, [terminId]);
    if (terminExists[0].count === 0) return [];

    const role = await _roles.getRoleForTermin(authentication, termin);
    if (role <= 0) return [];

    for (boss of data) {
        let aufstellung = boss.aufstellungId;
        if (boss.aufstellungId == null)
        {
            if (boss.bossId == null) continue;
            await _termin.addBoss(termin, boss.bossId).then(function(res) {
                aufstellung = res.insertId;
                if (boss.isCM === true || boss.isCM === false) {
                    await _aufstellung.setCM(aufstellung, boss.isCM);
                }
            })
        }
        else
        {
            const stmt2 = 'SELECT count(*) AS count FROM Aufstellung id = ? and fk_termin = ?';
            const aufstellungTerminExists = await _db.queryV(stmt2, [aufstellung, terminId]);
            if (aufstellungTerminExists[0].count === 0) continue;
        }
        if (aufstellung == null) continue;

        if (boss.success === true || boss.success === false) {
            await _aufstellung.setSuccess(aufstellung, boss.success);
        }
        for (player of boss.positionen) {
            if (1 <= player.position && player.position <= 10) {
                await _element.setClass(aufstellung, player.position, player.classId);
                await _element.setRole(aufstellung, player.position, player.roleId);
                await _element.setName(aufstellung, player.position, player.spielerId);
            }
        }
    }

    return await _aufstellung.getForTermin(termin);
}
