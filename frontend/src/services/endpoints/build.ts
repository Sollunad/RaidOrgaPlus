import con from '../connector';

export default { checkBuild };

async function checkBuild(build: any): Promise<any> {
    return await con('build', 'get', {build}, false);
}