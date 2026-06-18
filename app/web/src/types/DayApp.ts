import type { CalendarDay } from "../pages/Calendar/Calendar.types";
import type { Task } from "./Task";

export interface DayApp {
    id: string;
    day: CalendarDay;
    tasks: Task[];
    isCompleted: boolean;
}