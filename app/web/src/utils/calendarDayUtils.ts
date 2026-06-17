import type { Task } from "../types/Task";
import { getMonday } from "./dateUtils";
import type { CalendarDay, CalendarTimeDays } from "../pages/Calendar/Calendar.types";

const DAY_NAMES: CalendarTimeDays[] = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export const getDays = (): CalendarDay[] => {
    const currentDate = new Date();
    const monday = getMonday(currentDate);

    const newDays: CalendarDay[] = [];

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);

        newDays.push({
            id: crypto.randomUUID(),
            fullDate: currentDay,
            isCurrentDay: currentDate.getDate() === currentDay.getDate(),
            date: currentDay.getDate().toString(),
            day: DAY_NAMES[i]
        });
    }

    return newDays;
}

export const getDayFromTask = (task: Task): CalendarDay => {
    return task.day;
}