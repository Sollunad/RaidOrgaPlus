import config from './config.json';

export default { classIcon, roleIcon, encIcon, miscIcon, wingIcon };

function classIcon(icon: any): string {
    return linkBuilder('class', icon);
}

function roleIcon(icon: any): string {
    return linkBuilder('role', icon);
}

function encIcon(icon: any): string {
    return linkBuilder('encounter', icon);
}

function miscIcon(icon: any): string {
    return linkBuilder('misc', icon);
}

function wingIcon(icon: any): string {
    return linkBuilder('wings', icon);
}

function linkBuilder(subfolder: string, icon: any): string {
    const environment = process.env.NODE_ENV as "development" | "production";
    return `${config[environment]}icons/${subfolder}/${icon.toString().toLowerCase()}.png`;
}