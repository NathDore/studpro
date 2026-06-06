import type { CalendarTime } from "../../types/CalendarTime";
import type { Time } from "../../types/Time";

export interface SelectedSlot {
    day: CalendarTime;
    time: Time;
    endTime: Time;
}

export type CalendarMode = 'create' | 'update';