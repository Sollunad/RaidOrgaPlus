import con from '../connector';

export default { getAufstellungen, getElements, setPreviewable, getPreviewable };

async function getAufstellungen(termin: any): Promise<any> {
    return await con('preview', 'get', {termin}, false);
}

async function getElements(termin: any): Promise<any> {
    return await con('preview/elements', 'get', {termin}, false);
}

async function setPreviewable(termin: any, able: any): Promise<any> {
    return await con('preview/able', 'post', {termin, able}, true);
}

async function getPreviewable(termin: any): Promise<any> {
    return await con('preview/able', 'get', {termin}, true);
}