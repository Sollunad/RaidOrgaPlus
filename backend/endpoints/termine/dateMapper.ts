export { mapTerminDate as map };

function mapTerminDate(termin) {
    const newTerminObject = termin;

    let day = termin.date.getDate();
    if (day < 10) day = '0' + day;
    let month = termin.date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = termin.date.getFullYear();
    const dateString = `${day}.${month}.${year}`;

    const weekdayId = termin.date.getDay();
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekday = days[weekdayId];

    newTerminObject.date = `${weekday}, ${dateString}`;
    newTerminObject.time = termin.time.slice(0,5);
    if (newTerminObject.endtime) {
        newTerminObject.endtime = termin.endtime.slice(0,5);
    }
    return newTerminObject;
}