const _aufstellung = require('../aufstellungen/aufstellung');
const _element = require('../aufstellungen/element');
const _roles = require('../../authentication/role');
const _termin = require('../termine/termin');

module.exports = [
    {function: setAufstellung, path: '/aufstellungen', method: 'post', authed: true},
];

async function setAufstellung(req, authentication) {
    const termin = req.body.body.terminId;
    const data = req.body.body.aufstellungen;

    if (!(await _termin.doesTerminExist(termin))) {
        return [];
    }

    const role = await _roles.forTermin(authentication, termin);
    if (!role || role <= 0) {
        return [];
    }

    for (boss of data) {
        let aufstellung = boss.aufstellungId;
        if (boss.aufstellungId == null)
        {
            if (boss.bossId == null) {
                continue;
            }
            try {
                let res = await _termin.addBoss(termin, boss.bossId);
                aufstellung = res.insertId;
            } catch (e) {
                //Unable to insert, next boss
                continue;
            }
            if (boss.isCM === true || boss.isCM === false) {
                try {
                    await _aufstellung.setCM(aufstellung, boss.isCM);
                } catch (e) {
                    //Ignore not possible to set CM.
                }
            }
        }
        else
        {
            if (!(await _aufstellung.getForTermin(termin)).some(e => e.id === aufstellung)) {
                continue;
            }
        }

        if (boss.success === true || boss.success === false) {
            try {
                await _aufstellung.setSuccess(aufstellung, boss.success);
            } catch (e) {
                //Ignore not possible to set success.
            }
        }
        for (player of boss.positionen) {
            if (1 <= player.position && player.position <= 10) {
                
                try {
                    await _element.setCompleteElement(aufstellung, player.position, player.classId, player.roleId, player.spielerId)
                } catch (e) {
                    // Ignore, next element
                }
            }
        }
    }

    return await _aufstellung.getForTermin(termin);
}
