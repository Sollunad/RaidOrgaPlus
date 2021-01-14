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

    const stmt = 'SELECT count(*) AS count FROM Termin WHERE id = ?';
    const terminExists = await _db.queryV(stmt, [termin]);
    if (terminExists[0].count === 0) return [];

    const role = await _roles.getRoleForTermin(authentication, termin);
    if (role <= 0) return [];

    for (boss of data) {
        let aufstellung = boss.aufstellungId;
        if (boss.aufstellungId == null)
        {
            if (boss.bossId == null) continue;
            try {
                let res = await _termin.addBoss(termin, boss.bossId);
                aufstellung = res.insertId;
            }
            catch (e) {
                //Unable to insert, next boss
                continue;
            }
            if (boss.isCM === true || boss.isCM === false) {
                try {
                    await _aufstellung.setCM(aufstellung, boss.isCM);
                }
                catch (e) {
                    //Ignore not possible to set CM.
                }
            }
        }
        else
        {
            const stmt2 = 'SELECT count(*) AS count FROM Aufstellung WHERE (id = ?) and (fk_termin = ?)';
            const aufstellungTerminExists = await _db.queryV(stmt2, [aufstellung, termin]);
            if (aufstellungTerminExists[0].count === 0) continue;
        }
        if (aufstellung == null) continue;

        if (boss.success === true || boss.success === false) {
            await _aufstellung.setSuccess(aufstellung, boss.success);
        }
        for (player of boss.positionen) {
            if (1 <= player.position && player.position <= 10) {
                const pos = player.position;
                const classId = player.classId;
                const roleId = player.roleId;
                const playerId = player.spielerId;

                const stmt3 = 'INSERT INTO AufstellungElement (fk_aufstellung, position, fk_class, fk_role, fk_spieler) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE fk_class = ?, fk_role = ?, fk_spieler = ?';
                try {
                    await _db.queryV(stmt3, [aufstellung, pos, classId, roleId, playerId, classId, roleId, playerId]);
                }
                catch (e) {
                    // Ignore, next element
                    continue;
                }
            }
        }
    }

    return await _aufstellung.getForTermin(termin);
}
