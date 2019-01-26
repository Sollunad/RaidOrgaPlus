import con from '../connector';

export default { listEncounter, listEncounterForWing, getClassesForBase };

async function listEncounter() {
    return await con('gamedata/encounter', 'get', {});

}

async function listEncounterForWing(wing) {
    return await con('gamedata/encounter', 'get', {wing});
}

async function getClassesForBase(base) {
    return await con('gamedata/classes', 'get', {base});
}