const _kalender = require('../services/endpoints/kalender');
const _embeds = require('../services/util/embedProvider');
const _icons = require('../services/icons');

const REFRESH_RATE = 1000 * 60 * 10;

exports.run = async (client, message, args) => {
    message.channel.send(await getEmbed())
        .then(m => {
            const timer = setInterval(async () => {
                m.edit(await getEmbed());
            }, REFRESH_RATE);
        });

};

async function getEmbed() {
    const week = await getTermine();
    let embed = _embeds.defaultEmbed().setTitle(`Rising Light Kalender`)
        .setThumbnail(_icons.miscIcon('raid'));
    for (const day of week) {
        let dayString = '';
        for (const termin of day.termine) {
            dayString += terminToString(termin);
        }
        if (dayString === '') dayString = 'Keine Termine';
        dayString = `\`\`\`${dayString}\`\`\``;
        embed.addField(day.date, dayString);
    }
    return embed;
}

async function getTermine() {
    const termine = await _kalender.getKalenderTermine();
    const mapped_termine = termine.map(mapTermin);
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
        weekdays[i] = mapped_termine.filter(t => t.date.getDay() === i);
    }
    const today_weekday = (new Date()).getDay();
    const weekdays_shifted = [];
    for (let i = 0; i < 7; i++) {
        const shifted_termine = weekdays[(today_weekday + i) % 7];
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateString = formatDate(date);
        weekdays_shifted[i] = {date: dateString, termine: shifted_termine};
    }
    return weekdays_shifted;
}

function formatDate(date) {
    let day = date.getDate();
    day = day < 10? `0${day}` : day;
    let month = date.getMonth();
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const weekday = date.getDay();
    const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return `**${weekdays[weekday]}** - ${day}. ${months[month]}`;

}

function mapTermin(termin) {
    return {
        id: termin.id,
        date: new Date(termin.date),
        time: termin.time.slice(0,5),
        raid: termin.name
    }
}

function terminToString(termin) {
    return `${termin.time} | ${termin.raid}\n`;
}

exports.help = {
    usage: '!orga kalender',
    desc: 'Zeigt die Termine der kommenden sieben Tage an. Updated automatisch alle zehn Minuten.'
};