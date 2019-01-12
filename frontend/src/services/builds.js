const sf = require('snekfetch');
const config = require('./config.json');

export default { getBuilds, addBuild, deleteBuild };

async function getBuilds(user) {
    const url = config.url + 'users/builds?user=' + user;
    const response = await sf.get(url);
    return response.body.map(classRoleMapper);
}

async function addBuild(user, clss, role){
    const url = config.url + 'users/builds';
    const response = await sf.post(url).send({"user": user, "clss": clss, "role": role});
    return response.body.map(classRoleMapper);
}

async function deleteBuild(user, clss, role){
    const url = config.url + 'users/builds';
    const response = await sf.delete(url).send({"user": user, "clss": clss, "role": role});
    return response.body.map(classRoleMapper);
}

function classRoleMapper(element) {
    return {class: {abbr: element.classAbbr, id: element.classId, color: element.classColor}, role: {abbr: element.roleAbbr, id: element.roleId}};
}