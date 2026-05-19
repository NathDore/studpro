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

export const getStartTime = (endTime: Time): Time | null => {
    if (!endTime?.hour) return null;

    let period = endTime.period;
    let time = (endTime.hour - 1).toString();

    if (endTime.hour === 1 && endTime.period === 'PM') {
        return {
            id: endTime.id,
            hour: 12,
            minutes: 0,
            period: 'PM'
        };
    } else if (endTime.period === 'PM' && endTime.hour === 12) {
        period = 'AM';
    } else if (endTime.period === 'AM' && endTime.hour === 1) {
        period = 'AM';
        time = '12';
    }

    return {
        id: endTime.id,
        hour: Number(time),
        minutes: 0,
        period
    };
}

export const getEndTime = (startTime: Time): Time | null => {
    if (!startTime?.hour) return null;

    let newHour = startTime.hour + 1;
    let newPeriod = startTime.period;

    if (startTime.hour === 11 && startTime.period === 'PM') {
        return {
            id: startTime.id,
            hour: 12,
            minutes: 0,
            period: 'AM'
        };
    }
    else if (startTime.hour === 11 && startTime.period === 'AM') {
        newPeriod = 'PM';
    } else if (startTime.hour === 12 && startTime.period === 'PM') {
        newHour = 1;
        newPeriod = 'AM';
    } else if (startTime.hour === 12 && startTime.period === 'AM') {
        newHour = 1;
    }

    return {
        id: startTime.id,
        hour: newHour,
        minutes: 0,
        period: newPeriod
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