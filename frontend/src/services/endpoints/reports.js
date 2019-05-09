import con from '../connector';

export default { uploadReport };

async function uploadReport(file, aufstellung) {
    return await con('reports', 'form', {aufstellung, file}, true);
}