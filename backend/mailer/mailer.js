const nodemailer = require('nodemailer');
const config = require("./config.json");

exports.passwortReset = sendPasswortResetMail;

function sendEmail(user, subject, text) {
    const transporter = nodemailer.createTransport(config);
    const to = user.email;

    const mail = {
        from: {
            name: 'RaidOrga+',
            address: 'orga@sollunad.de',
        },
        to, subject, text
    };

    transporter.sendMail(mail);
}

function sendPasswortResetMail(user, token) {
    const subject = 'Passwort-Reset angefordert';
    const link = `https://orga.sollunad.de/#/reset/${token}`;
    const text =
        `Hallo ${user.name},` +
        `\nfür deinen Account mit dem Accountnamen ${user.accname} wurde ein Passwort-Reset angefordert. Unter folgendem Link kannst du dein Passwort neu setzen:` +
        `\n` +
        `\n${link}` +
        `\n` +
        `\nDer Link ist gültig für 24 Stunden. Falls du keinen Password-Reset angefordert hast, ignoriere diese Mail einfach.` +
        `\n` +
        `\nViele Grüße` +
        `\nDaniel / Sollunad.9780`;
    sendEmail(user, subject, text);
}