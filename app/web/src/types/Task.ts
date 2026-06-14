import type { CalendarDay, CalendarTime } from "../pages/Calendar/Calendar.types";
import type { Course } from "./Course";
import type { Note } from "./Note";

export interface Task {
    id: string;
    day: CalendarDay;
    startTime: CalendarTime;
    endTime: CalendarTime;
    course: Course,
    notes: Note[];
}