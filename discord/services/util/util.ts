export function isTerminInPast(termin) {
    const dateArray = termin.dateString.slice(4).split('.');
    const timeArray = termin.time.split(':');
    const dateObject = {year: dateArray[2], month: dateArray[1] - 1, day: dateArray[0], hour: timeArray[0], minute: timeArray[1]};
    const date = new Date(dateObject.year, dateObject.month, dateObject.day, dateObject.hour, dateObject.minute);
    const now = new Date();
    return date < now;
}