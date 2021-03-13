import con from '../connector';

export default { listEncounter, listEncounterGrouped, listEncounterForWing, getClassesForBase, getWings, getAchievements };

async function listEncounter(): Promise<any> {
    return await con('gamedata/encounter', 'get', {}, false);
}

async function listEncounterGrouped(): Promise<any> {
    return await con('gamedata/encounter', 'get', {grouped: 1}, false);
}

async function listEncounterForWing(wing: any): Promise<any> {
    return await con('gamedata/encounter', 'get', {wing}, false);
}

async function getClassesForBase(base: any): Promise<any> {
    return await con('gamedata/classes', 'get', {base}, false);
}

async function getWings(): Promise<any> {
    return await con('gamedata/wings', 'get', {}, false);
}

async function getAchievements(): Promise<any> {
    return await con('gamedata/achievements', 'get', {}, false);
}