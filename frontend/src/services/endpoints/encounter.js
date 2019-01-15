import con from '../connector';

export default { list, listForWing };

async function list() {
    return await con('encounter', 'get', {});

}

async function listForWing(wing) {
    return await con('encounter', 'get', {wing: wing});
}