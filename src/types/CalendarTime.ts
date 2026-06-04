export interface CalendarTime {
    id: string;
    fullDate: Date;
    isCurrentDay: boolean;
    date: string;
    day: 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';
    period: 'AM' | 'PM';
    hours: number;
    minutes: number;
}