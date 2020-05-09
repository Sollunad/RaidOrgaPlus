import con from '../connector';

export default { checkBuild };

async function checkBuild(build) {
    return await con('build', 'get', {build});
}