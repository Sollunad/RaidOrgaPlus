const config = require('./config.json');

export default { classIcon, roleIcon, encIcon, miscIcon };

function classIcon(icon) {
    return linkBuilder('class', icon);
}

function roleIcon(icon) {
    return linkBuilder('role', icon);
}

function encIcon(icon) {
    return linkBuilder('encounter', icon);
}

function miscIcon(icon) {
    return linkBuilder('misc', icon);
}

function linkBuilder(subfolder, icon) {
    return `${config.url}icons/${subfolder}/${icon.toLowerCase()}.png`;
}