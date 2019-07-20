const apiclient = require('gw2api-client');
const achievementInfo = require('./achievementInfo');

exports.getAchievements = getAchievements;

const api = apiclient();
const RAID_GROUP = '1CAFA333-0C2B-4782-BC4C-7DA30E9CE289';
const CACHE_FOR = 1000 * 60 * 60;
let _cache = {achievements: [], cachedUntil: 0};

async function getAchievements() {
    if (_cache === null || _cache.cachedUntil < Date.now()) return await fetchAndCache();
    return _cache.achievements;
}

async function fetchAndCache() {
    const raid_group = await api.achievements().groups().get(RAID_GROUP);
    const categories = raid_group.categories;
    const raid_categories = await api.achievements().categories().many(categories);
    const wing_ids = raid_categories.map(cat => cat.id).sort();
    const wings = raid_categories.map(cat => ({wing: wing_ids.indexOf(cat.id) + 1, achievements: cat.achievements}));
    const achievements = [];
    for (let i = 0; i < wings.length; i++) {
        const wing_achievements = await api.achievements().many(wings[i].achievements);
        const mapped_achievements = wing_achievements.map(a => ({wing: wings[i].wing, id: a.id, name: a.name, req: a.requirement}));
        achievements[wings[i].wing - 1] = {wing: wings[i].wing, achievements: addAchievementInfo(wings[i].wing, mapped_achievements)};
    }
    cacheAchievements(achievements);
    return achievements;
}

function addAchievementInfo(wing, achievements) {
    const wing_info = achievementInfo.filter(w => w.wing === wing)[0];
    if (wing_info) {
        for (let achievement of achievements) {
            const achievement_info = wing_info.info.filter(a => a.id === achievement.id)[0];
            if (achievement_info) {
                achievement.boss = achievement_info.boss;
                achievement.condition = achievement_info.condition;
            } else {
                achievement.boss = 'none';
            }
        }
    }
    return achievements;
}

function cacheAchievements(achievements) {
    _cache.cachedUntil = Date.now() + CACHE_FOR;
    _cache.achievements = achievements;
}