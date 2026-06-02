import type { CalendarDay } from "../../types/CalendarDay";
import type { Time } from "../../types/Time";

export interface SelectedSlot {
    calendarDay: CalendarDay;
    time: Time;
    endTime: Time;
}

export type CalendarMode = 'create' | 'update';