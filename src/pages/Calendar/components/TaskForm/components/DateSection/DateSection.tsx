import './DateSection.css';
import { DatePicker } from './DatePicker/DatePicker';
import type { CalendarDay } from '../../../../types/CalendarDay';

interface DateSectionProps {
    calendarDay: CalendarDay
}

export const DateSection = ({ calendarDay }: DateSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Date</p>
            <DatePicker calendarDay={calendarDay} />
        </div>
    );
}