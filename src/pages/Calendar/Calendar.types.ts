export type CalendarTimeDays = 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';

export interface CalendarDay {
    id: string;
    fullDate: Date;
    isCurrentDay: boolean;
    date: string;
    day: CalendarTimeDays;
}

export type CalendarPeriod = 'AM' | 'PM';

export interface CalendarTime {
    id: string;
    period: CalendarPeriod;
    hour: number;
    minutes: number;
}

export interface CalendarBounds {
    top: number;
    bottom: number;
    height: number;
}

export type CalendarMode = 'create' | 'update';

export interface SelectedSlot {
    day: CalendarDay;
    startTime: CalendarTime;
    endTime: CalendarTime;
}

export interface TaskPosition {
    left: number;
    top: number;
    height: number;
    width: number;
}

export type TimePickerInputType = 'start' | 'end';

export interface TimePickerInputs {
    startHour: number;
    endHour: number;
    startMinutes: number;
    endMinutes: number;
}

export interface TimePickerValidation {
    isValidHour: boolean;
    isValidMinutes: boolean;
    invalidInterval: boolean;
}