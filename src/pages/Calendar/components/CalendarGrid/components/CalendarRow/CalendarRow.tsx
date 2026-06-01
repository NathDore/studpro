import { useCalendarDay } from "../../../../hook/useCalendarDay";
import type { CalendarDay } from "../../../../types/CalendarDay";
import type { Time } from "../../../../types/Time";
import './CalendarRow.css';

interface CalendarRowProps {
    time: Time;
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
}

export const CalendarRow = ({ time, onHourCellClick }: CalendarRowProps) => {

    const { days } = useCalendarDay();

    return (
        <div className='row'>
            <div className='time-cell'> <p className='time-cell-text user-select-none'>{time.hour.toString()} {time.period}</p></div>
            {
                days.map((day) => <div onClick={() => onHourCellClick(day, time)} className='hour-cell' key={day.id}></div>)
            }
        </div>
    )
}