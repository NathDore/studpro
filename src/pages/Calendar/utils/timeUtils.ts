import type { Time } from '../components/CalendarGrid/CalendarGrid';

export const getTimes = (): Time[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;

        return {
            id: i,
            time: displayHour.toString(),
            hour: displayHour,
            minutes: 0,
            period
        };
    });
}

export const getStartTime = (endTime: Time): Time | null => {
    if (!endTime?.time) return null;

    let period = endTime.period;
    let time = (parseInt(endTime.time) - 1).toString();

    if (endTime.period === 'PM' && endTime.time === '12') {
        period = 'AM';
    } else if (endTime.period === 'AM' && endTime.time === '1') {
        period = 'PM';
        time = '12';
    }

    return {
        id: endTime.id,
        time,
        hour: Number(time),
        minutes: 0,
        period
    };
}