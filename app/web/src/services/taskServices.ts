import type { CalendarTime } from "../pages/Calendar/Calendar.types";

export function calendarTimeToHHmm(time: CalendarTime): string {
    let hour = time.hour;

    if (time.period === 'AM' && hour === 12) hour = 0;
    if (time.period === 'PM' && hour !== 12) hour += 12;

    const hh = String(hour).padStart(2, '0');
    const mm = String(time.minutes).padStart(2, '0');

    return `${hh}:${mm}`;
}