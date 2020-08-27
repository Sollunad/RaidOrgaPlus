const _aufstellung = require('../aufstellungen/aufstellung');
const _element = require('../aufstellungen/element');
const _roles = require('../../authentication/role');
const _termin = require('../termine/termin');

module.exports = [
    {function: setAufstellung, path: '/aufstellung', method: 'post', authed: true},
];


async function setAufstellung(req, authentication) {
    const invalidData = "{\"error\":\"invalid data\"}";
    
    const termin = req.body.body.terminId;
    const data = req.body.body.aufstellungen;

    const role = await _roles.getRoleForTermin(authentication, termin);
    if (role <= 0) return "{\"error\":\"no permission\"}";

    for (boss of data) {
        if (boss.aufstellungId == null)
        {
            if (boss.bossId == null) continue;
            const allBosses = await _termin.addBoss(termin, boss.bossId)
            aufstellung = allBosses[allBosses.length - 1].id;
            if (boss.isCM === true || boss.isCM === false) {
                await _aufstellung.setCM(aufstellung, cm);
            }
        }
        for (player of boss.positionen) {
            if (1 <= player.position && player.position <= 10) {
                await _element.setClass(aufstellung, player.position, player.classId);
                await _element.setRole(aufstellung, player.position, player.roleId);
                await _element.setName(aufstellung, player.position, player.spielerId);
            }
        }
    }
    return "{\"status\":\"OK\"}";
}
