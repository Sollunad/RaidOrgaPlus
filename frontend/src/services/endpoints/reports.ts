import con from '../connector';

export default { uploadReport };

async function uploadReport(file: any, aufstellung: any): Promise<any> {
    return await con('reports', 'form', {aufstellung, file}, true);
}