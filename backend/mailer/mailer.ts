// const nodemailer = require('nodemailer');
// const config = require("./config.json");

import { Spieler } from "models/Spieler";
import nodemailer from "nodemailer";
import config from "./config.json";

export { sendPasswortResetMail as passwortReset };

function sendEmail(user: Spieler, subject: string, text: string): void {
    const transporter = nodemailer.createTransport(config);
    const to = user.email;

    const mail = {
        from: {
            name: 'RaidOrga+',
            address: 'raidorgakontakt@gmail.com',
        },
        to, subject, text
    };

    transporter.sendMail(mail);
}

function sendPasswortResetMail(user: Spieler, token: string): void {
    const subject = 'Passwort-Reset angefordert';
    const link = `https://orga.rising-light.de/#/reset/${token}`;
    const text =
        `Hallo ${user.name},` +
        `\nfür deinen Account mit dem Accountnamen ${user.accname} wurde ein Passwort-Reset angefordert. Unter folgendem Link kannst du dein Passwort neu setzen:` +
        `\n` +
        `\n${link}` +
        `\n` +
        `\nDer Link ist gültig für 24 Stunden. Falls du keinen Password-Reset angefordert hast, ignoriere diese Mail einfach.` +
        `\n` +
        `\nViele Grüße` +
        `\nDas Leitungsteam von Rising-Light.`;
    sendEmail(user, subject, text);
}