export interface CalendarDay {
    day: 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';
    date: string;
    isCurrentDay: boolean;
}