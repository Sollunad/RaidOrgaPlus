const config = require('./config.json');

export default { classIcon, roleIcon, encIcon, miscIcon, wingIcon };

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

function wingIcon(icon) {
    return linkBuilder('wings', icon);
}

function linkBuilder(subfolder, icon) {
    const environment = process.env.NODE_ENV;
    return `${config[environment]}icons/${subfolder}/${icon.toString().toLowerCase()}.png`;
}