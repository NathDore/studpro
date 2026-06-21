import type { CalendarDay, CalendarTime } from "../pages/Calendar/Calendar.types";

export interface Task {
    id: string;
    day: CalendarDay;
    startTime: CalendarTime;
    endTime: CalendarTime;
    courseId: string;
    isCompleted: boolean;
}