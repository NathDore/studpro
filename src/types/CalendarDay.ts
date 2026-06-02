export interface CalendarDay {
    id: string,
    day: 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';
    date: string;
    fullDate: Date;
    isCurrentDay: boolean;
}