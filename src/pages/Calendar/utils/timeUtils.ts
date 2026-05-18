import type { Time } from '../types/Time';

export const getTimes = (): Time[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;

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

    if (endTime.period === 'PM' && endTime.hour === 12) {
        period = 'AM';
    } else if (endTime.period === 'AM' && endTime.hour === 1) {
        period = 'PM';
        time = '12';
    }

    return {
        id: endTime.id,
        hour: Number(time),
        minutes: 0,
        period
    };
}