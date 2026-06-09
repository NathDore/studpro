import { timeDuration } from "../../../utils/taskUtils";
import type { CalendarTime } from "../Calendar.types";

export const getDayTimes = (): CalendarTime[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const displayHour = hour === 24 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour === 24 ? 'AM' : hour < 12 ? 'AM' : 'PM';

        return {
            id: crypto.randomUUID(),
            period,
            hour: displayHour,
            minutes: 0,
        };
    });
}

export const getNextHour = (time: CalendarTime): CalendarTime => {
    let period = time.period;
    let hour = Number(time.hour) + 1;

    if (time.hour === 11 && period === 'PM') {
        hour = 12;
        period = 'PM';
    } else if (time.hour === 11 && period === 'AM') {
        hour = 12;
        period = 'PM';
    } else if (time.hour === 12 && period === 'PM') {
        hour = 1;
        period = 'PM';
    } else if (time.hour === 12 && period === 'AM') {
        hour = 1;
    }

    return {
        id: time.id,
        hour,
        minutes: time.minutes,
        period: period
    };
}

export const getDuration = (startTime: CalendarTime, endTime: CalendarTime): number => {
    let startDurationMinutes = timeDuration(startTime);
    let endDurationMinutes = timeDuration(endTime);

    if (endTime.period === 'AM' && endTime.hour === 12) {
        endDurationMinutes = 24 * 60;
    }



    return endDurationMinutes - startDurationMinutes;
}