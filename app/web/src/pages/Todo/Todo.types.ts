import type { Task } from "../../types/Task";
import type { CalendarDay } from "../Calendar/Calendar.types";

export interface TodoDay {
    id: string;
    day: CalendarDay;
    tasks?: Task[];
    isCompleted: boolean;
}