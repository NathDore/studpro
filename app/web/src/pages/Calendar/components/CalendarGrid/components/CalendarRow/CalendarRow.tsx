import type { CalendarDay, CalendarTime } from '../../../../Calendar.types';
import { CALENDAR_ROW_HEIGHT, TIME_CELL_WIDTH } from '../../../../../../config/calendar-configs';
import './CalendarRow.css';

const TIME_CELL_CLASS = 'flex justify-end items-end border-r border-gray-300';
const TIME_LABEL_CLASS = 'relative bottom-2 -left-1 text-[12px] font-medium text-[#4e5f69] select-none';
const HOUR_CELL_CLASS = 'hour-cell bg-[#FDFCF9] cursor-default border-r border-b border-r-[lightgray] border-b-[lightgray] border-t border-l border-t-transparent border-l-transparent hover:border hover:border-[#535557] hover:bg-[#deebf5] active:animate-flash';

interface CalendarRowProps {
    days: CalendarDay[];
    startTime: CalendarTime;
    endTime: CalendarTime;
    onHourCellClick: (calendar: CalendarDay, startTime: CalendarTime, endTime: CalendarTime) => void;
}

export const CalendarRow = ({ days, startTime, endTime, onHourCellClick }: CalendarRowProps) => {
    return (
        <div
            className='grid overflow-hidden'
            style={{
                gridTemplateColumns: `${TIME_CELL_WIDTH}px repeat(7, 1fr)`,
                height: CALENDAR_ROW_HEIGHT,
            }}
        >
            <div className={TIME_CELL_CLASS}>
                <p className={TIME_LABEL_CLASS}>
                    {startTime.hour.toString()} {startTime.period}
                </p>
            </div>
            {days.map((day) => (
                <div
                    onClick={() => onHourCellClick(day, startTime, endTime)}
                    className={HOUR_CELL_CLASS}
                    key={day.id}
                />
            ))}
        </div>
    );
};