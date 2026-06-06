export type CalendarTimeDays = 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';

export interface CalendarTime {
    id: string;
    fullDate: Date;
    isCurrentDay: boolean;
    date: string;
    day: CalendarTimeDays;
    period: 'AM' | 'PM';
    hours: number;
    minutes: number;
}