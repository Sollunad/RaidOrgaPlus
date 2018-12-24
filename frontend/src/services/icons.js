export default { classIcon, roleIcon, encIcon };

function classIcon(icon) {
    return linkBuilder('class', icon);
}

function roleIcon(icon) {
    return linkBuilder('role', icon);
}

function encIcon(icon) {
    return linkBuilder('encounter', icon);
}

function linkBuilder(subfolder, icon) {
    return `http://sollunad.de/roplus/icons/${subfolder}/${icon.toLowerCase()}.png`;
}