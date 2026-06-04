import type { CalendarDay } from '../../../../../../types/CalendarDay';
import type { Time } from '../../../../../../types/Time';
import './CalendarRow.css';

const CONTAINER_CLASS = 'grid grid-cols-[40px_repeat(7,1fr)] h-[30px] overflow-hidden';
const TIME_CELL_CLASS = 'flex justify-end items-end border-r border-gray-300';
const TIME_LABEL_CLASS = 'relative bottom-2 -left-1 text-[12px] font-medium text-[#4e5f69] select-none';
const HOUR_CELL_CLASS = 'hour-cell bg-[#FDFCF9] cursor-default border-r border-b border-r-[lightgray] border-b-[lightgray] border-t border-l border-t-transparent border-l-transparent hover:border hover:border-[#535557] hover:bg-[#deebf5] active:animate-flash';

interface CalendarRowProps {
    days: CalendarDay[];
    time: Time;
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
}

export const CalendarRow = ({ days, time, onHourCellClick }: CalendarRowProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            <div className={TIME_CELL_CLASS}>
                <p className={TIME_LABEL_CLASS}>
                    {time.hour.toString()} {time.period}
                </p>
            </div>
            {days.map((day) => (
                <div
                    onClick={() => onHourCellClick(day, time)}
                    className={HOUR_CELL_CLASS}
                    key={day.id}
                />
            ))}
        </div>
    );
};