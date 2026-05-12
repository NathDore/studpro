import './CalendarGrid.css';
import { useCalendarDay } from '../../hook/useCalendarDay';
import type { CalendarDay } from '../../types/CalendarDay';

interface CalendarGridProps {
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
}

export interface Time {
    id: number;
    time: string;
    period: 'AM' | 'PM';
}

const getTimes = (): Time[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;

        return {
            id: i,
            time: displayHour.toString(),
            period
        };
    });
}

export const CalendarGrid = ({ onHourCellClick }: CalendarGridProps) => {
    const times = getTimes();

    return (
        <div className='calendar'>
            {
                times?.map(time => <CalendarRow onHourCellClick={onHourCellClick} key={time.id} time={time} />)
            }
        </div>
    )
}

interface CalendarRowProps {
    time: Time;
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
}

export const CalendarRow = ({ time, onHourCellClick }: CalendarRowProps) => {

    const { days } = useCalendarDay();

    return (
        <div className='row'>
            <div className='time-cell'> <p className='time-cell-text'>{time.time} {time.period}</p></div>
            {
                days.map((day) => <div onClick={() => onHourCellClick(day, time)} className='hour-cell' key={day.id}></div>)
            }
        </div>
    )
}