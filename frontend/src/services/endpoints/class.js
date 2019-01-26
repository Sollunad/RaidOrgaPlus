import con from '../connector';

export default { getForBase };

async function getForBase(base) {
    return await con('class', 'get', {base});
}