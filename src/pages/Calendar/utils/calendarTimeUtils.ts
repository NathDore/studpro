import type { CalendarTime, CalendarTimeDays } from "../../../types/CalendarTime";
import type { Task } from "../../../types/Task";
import { getMonday } from "../../../utils/dateUtils";

const DAY_NAMES: CalendarTimeDays[] = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export const fillDays = (): CalendarTime[] => {
    const currentDate = new Date();
    const monday = getMonday(currentDate);

    const newDays: CalendarTime[] = [];

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);

        newDays.push({
            id: crypto.randomUUID(),
            fullDate: currentDay,
            isCurrentDay: currentDate.getDate() === currentDay.getDate(),
            date: currentDay.getDate().toString(),
            day: DAY_NAMES[i],
            period: 'AM',
            hours: 0,
            minutes: 0
        });
    }

    return newDays;
}

export const getDayFromTask = (task: Task): CalendarTime => {
    const currentDate = new Date();
    const dayIndex = task.start.getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

    return {
        id: crypto.randomUUID(),
        fullDate: task.start,
        isCurrentDay: task.start.getDate() === currentDate.getDate(),
        date: task.start.getDate().toString(),
        day: DAY_NAMES[adjustedIndex],
        period: 'AM',
        hours: 0,
        minutes: 0
    }
}
