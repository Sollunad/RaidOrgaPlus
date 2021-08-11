import { terminDate } from "../../../models/Types";

export { mapTerminDate as map };

function mapTerminDate<T extends terminDate>(termin: T): T {
	const newTerminObject = { ...termin };

    const dayNumber = termin.date.getDate();
	const day = (dayNumber < 10 ? '0' : '') + dayNumber.toString();
    const monthNumber = termin.date.getMonth() + 1;
	const month = (monthNumber < 10 ? '0' : '') + monthNumber.toString();
    const year = termin.date.getFullYear();
    const dateString = `${day}.${month}.${year}`;

    const weekdayId = termin.date.getDay();
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekday = days[weekdayId];

    newTerminObject.dateString = `${weekday}, ${dateString}`;
    newTerminObject.time = termin.time.slice(0,5);
    if (newTerminObject.endtime) {
        newTerminObject.endtime = termin.endtime.slice(0,5);
    }

    return newTerminObject;
}