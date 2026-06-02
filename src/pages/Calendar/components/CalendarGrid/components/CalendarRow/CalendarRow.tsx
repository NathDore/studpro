import type { CalendarDay } from '../../../../../../types/CalendarDay';
import type { Time } from '../../../../../../types/Time';
import './CalendarRow.css';

interface CalendarRowProps {
    days: CalendarDay[];
    time: Time;
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
}

export const CalendarRow = ({ days, time, onHourCellClick }: CalendarRowProps) => {
    return (
        <div className='row'>
            <div className='time-cell'>
                <p className='time-cell-text user-select-none'>{time.hour.toString()} {time.period}</p>
            </div>
            {days.map((day) => (
                <div onClick={() => onHourCellClick(day, time)} className='hour-cell' key={day.id} />
            ))}
        </div>
    );
};