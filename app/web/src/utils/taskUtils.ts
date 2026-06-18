import { CELL_HEIGHT, TIME_CELL_WIDTH } from "../constants/calendar-grid-constant";
import type { CalendarTime, TaskPosition } from "../pages/Calendar/Calendar.types";
import type { Task } from "../types/Task";

export const timeDuration = (time: CalendarTime): number => {
    const hour12 = time.hour % 12;

    if (time.period === 'AM') {
        return (hour12 * 60) + time.minutes;
    } else {
        return ((hour12 + 12) * 60) + time.minutes;
    }
}

export const getTaskDuration = (startTime: CalendarTime, endTime: CalendarTime): number => {
    let startDurationMinutes = timeDuration(startTime);
    let endDurationMinutes = timeDuration(endTime);
    return endDurationMinutes - startDurationMinutes;
}

export const getTaskHours = (startTime: CalendarTime, endTime: CalendarTime): number => {
    return Math.floor(getTaskDuration(startTime, endTime) / 60);
}

export const getTaskPositionInCalendar = (task: Task, cellWidth: number): TaskPosition => {
    const dayIndex = task.day.fullDate.getDay() === 0 ? 6 : task.day.fullDate.getDay() - 1;



    const left = TIME_CELL_WIDTH + dayIndex * cellWidth;
    const top = (timeDuration(task.startTime) / 60) * CELL_HEIGHT;

    const endHour = task.endTime.hour === 0 && task.endTime.minutes === 0
        ? 24
        : task.endTime.hour;
    const adjustedEndTime: CalendarTime = { id: task.endTime.id, period: task.endTime.period, hour: endHour, minutes: task.endTime.minutes };

    const durationInMinutes = getTaskDuration(task.startTime, adjustedEndTime);
    const height = (durationInMinutes / 60) * CELL_HEIGHT;
    const width = cellWidth;

    return { left, top, height, width };
};

export const getPeriodFromHour = (hour: number): 'AM' | 'PM' => {
    return hour < 12 ? 'AM' : 'PM';
}