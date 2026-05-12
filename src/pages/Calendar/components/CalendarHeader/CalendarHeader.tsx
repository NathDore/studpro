import { useCalendarDay } from '../../hook/useCalendarDay';
import type { CalendarDay } from '../../types/CalendarDay';
import './CalendarHeader.css';

interface CalendarHeaderProps { }

export const CalendarHeader = ({ }: CalendarHeaderProps) => {
    const { days } = useCalendarDay();

    return (
        <div className='header grid'>
            <div className='child time'></div>
            {
                days.map(day => <CalendarDayCol key={day.id} calendarDay={day} />)
            }
        </div>
    )
}

interface CalendarDayColProps {
    calendarDay: CalendarDay;
}

export const CalendarDayCol = ({ calendarDay }: CalendarDayColProps) => {

    return (
        <div className='child'>
            <p className='day'>{calendarDay.day}</p>
            <p className={`date ${calendarDay.isCurrentDay ? 'date--current' : ''}`}>{calendarDay.date}</p>
        </div>
    );
}