const apiclient = require('gw2api-client');

exports.getAchievements = getAchievements;

const api = apiclient();
const RAID_GROUP = '1CAFA333-0C2B-4782-BC4C-7DA30E9CE289';
const WING_IDS = {124: 1, 134: 2, 138: 3, 155: 4, 195: 5, 215: 6, 222: 7};

async function getAchievements() {
    const raid_group = await api.achievements().groups().get(RAID_GROUP);
    const categories = raid_group.categories;
    const raid_categories = await api.achievements().categories().many(categories);
    const wings = raid_categories.map(cat => ({wing: WING_IDS[cat.id], achievements: cat.achievements}));
    const achievements = [];
    for (let i = 0; i < wings.length; i++) {
        const wing_achievements = await api.achievements().many(wings[i].achievements);
        const mapped_achievements = wing_achievements.map(a => ({id: a.id, name: a.name, req: a.requirement}));
        achievements[wings[i].wing - 1] = {wing: wings[i].wing, achievements: mapped_achievements};
    }
    return achievements;
}