import type { Time } from '../types/Time';

export const getTimes = (): Time[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const displayHour = hour === 24 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour === 24 ? 'AM' : hour < 12 ? 'AM' : 'PM';

        return {
            id: i,
            hour: displayHour,
            minutes: 0,
            period
        };
    });
}

export const getStartTime = (time: Time): Time => {
    let period = time.period;
    let hour = time.hour - 1;

    if (time.hour === 1 && period === 'PM') {
        hour = 12;
    } else if (time.hour === 12 && period === 'PM') {
        period = 'AM';
    } else if (time.hour === 1 && period === 'AM') {
        hour = 12;
    } else if (time.hour === 12 && period === 'AM') {
        period = 'PM';
    }

    return {
        id: time.id,
        hour,
        minutes: time.minutes,
        period
    };
}

export const getNextHour = (time: Time): Time => {
    let period = time.period;
    let hour = time.hour + 1;

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

export const toMinutes = (time: Time): number => {
    if (time.hour === 12 && time.period === 'AM') return time.minutes;
    if (time.hour === 12 && time.period === 'PM') return 720 + time.minutes;

    if (time.period === 'AM') {
        return ((time.hour) * 60) + time.minutes;
    } else {
        return ((time.hour + 12) * 60) + time.minutes;
    }
}

export const toHours24 = (time: Time): number => {
    if (time.hour === 12 && time.period === 'AM') return 0;
    if (time.hour === 12 && time.period === 'PM') return 12;
    if (time.period === 'AM') return time.hour;
    return time.hour + 12;
}

export const getDuration = (start: Date, end: Date): number => {
    const startTime = fromDate(start);
    const endTime = fromDate(end);

    let startMinutes = toMinutes(startTime);
    let endMinutes = toMinutes(endTime);

    if (endTime.period === 'AM' && endTime.hour === 12) {
        endMinutes = 24 * 60;
    }

    return endMinutes - startMinutes;
}

export const getTaskDuration = (start: Date, end: Date): number => {
    const startMinutes = toMinutes(fromDate(start));
    let endMinutes = toMinutes(fromDate(end));


    if (end.getHours() === 0) {
        endMinutes = 24 * 60;
    }

    return endMinutes - startMinutes;
}

export const fromDate = (date: Date): Time => {
    const hours24 = date.getHours();
    const minutes = date.getMinutes();

    const period = hours24 < 12 ? 'AM' : 'PM';
    const hour = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;

    return {
        id: 0,
        hour,
        minutes,
        period
    };
}