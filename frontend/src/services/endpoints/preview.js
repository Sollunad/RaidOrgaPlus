import con from '../connector';

export default { getAufstellungen, getElements, setPreviewable, getPreviewable };

async function getAufstellungen(termin) {
    return await con('preview', 'get', {termin});
}

async function getElements(termin) {
    return await con('preview/elements', 'get', {termin});
}

async function setPreviewable(termin, able) {
    return await con('preview/able', 'post', {termin, able}, true);
}

async function getPreviewable(termin) {
    return await con('preview/able', 'get', {termin}, true);
}