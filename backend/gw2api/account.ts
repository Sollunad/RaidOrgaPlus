import apiclient from 'gw2api-client';

export { fetchProgress, getAccname as accName, getPermissions as permissions, getItemCount as itemCount, getDoneAchievements };

const api = apiclient();

async function getDoneAchievements(key) {
    const achievements = await api.authenticate(key).account().achievements().get();
    return achievements.filter(a => a.done === true).map(a => a.id);
}

async function fetchProgress(key) {
    return api.authenticate(key).account().raids().get().then(res => {return res});
}

async function getAccname(key) {
    return api.authenticate(key).account().get().then(res => {return res.name});
}

async function getPermissions(key){
    return api.authenticate(key).tokeninfo().get().then(res => {return res.permissions});
}

async function getItemCount(key) {
    let items = [];
    items = items.concat(await getBankItems(key));
    items = items.concat(await getStorageItems(key));
    items = items.concat(await getSharedItems(key));
    items = items.concat(await getCharacterItems(key));

    let count = [];
    items.forEach(item => {
        let searchItem = count.filter(e => e.id === item.id);
        if (searchItem.length > 0) {
            searchItem[0].count = searchItem[0].count + item.count;
        } else {
            count.push({id: item.id, count: item.count});
        }
    });
    return count;
}

async function getBankItems(key){
    return api.authenticate(key).account().bank().get().then(res => {
        return res.filter(e => e !== null);
    });
}

async function getStorageItems(key){
    return api.authenticate(key).account().materials().get().then(res => {
        return res.filter(e => e !== null);
    });
}

async function getSharedItems(key){
    return api.authenticate(key).account().inventory().get().then(res => {
        return res.filter(e => e !== null);
    });
}

async function getCharacterItems(key){
    return api.authenticate(key).characters().all().then(res => {
        const equipByChar = res.map(e => e.equipment);
        let equip = [];
        equipByChar.forEach(e => {
           equip = equip.concat(e);
        });
        equip = equip.map(e => {return {id: e.id, count: 1}});

        const characterBags = res.map(e => e.bags.filter(e => e !== null).map(e => e.inventory.filter(e => e !== null)));
        let inventory = [];
        characterBags.forEach(c => {
           c.forEach(b => {
               b.forEach(item => {
                   inventory.push(item);
               })
           })
        });
        return equip.concat(inventory);
    });
}