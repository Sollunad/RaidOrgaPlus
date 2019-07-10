const config = require('./config.json');

exports.classIcon = classIcon;
exports.roleIcon = roleIcon;
exports.encIcon = encIcon;
exports.miscIcon = miscIcon;

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
    return `${config.production}icons/${subfolder}/${icon.toLowerCase()}.png`;
}
