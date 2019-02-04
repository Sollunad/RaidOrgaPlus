import con from '../connector';

export default { listEncounter, listEncounterGrouped, listEncounterForWing, getClassesForBase, getWings };

async function listEncounter() {
    return await con('gamedata/encounter', 'get', {});
}

async function listEncounterGrouped() {
    return await con('gamedata/encounter', 'get', {grouped: 1});
}

async function listEncounterForWing(wing) {
    return await con('gamedata/encounter', 'get', {wing});
}

async function getClassesForBase(base) {
    return await con('gamedata/classes', 'get', {base});
}

async function getWings() {
    return await con('gamedata/wings', 'get', {});
}