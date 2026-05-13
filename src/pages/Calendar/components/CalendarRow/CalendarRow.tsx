import { useCalendarDay } from "../../hook/useCalendarDay";
import type { CalendarDay } from "../../types/CalendarDay";
import type { Time } from "../CalendarGrid/CalendarGrid";
import './CalendarRow.css';

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