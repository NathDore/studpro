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
        <div className='grid grid-cols-[40px_repeat(7,1fr)] h-[30px] overflow-hidden'>
            <div className='flex justify-end items-end border-r border-gray-300'>
                <p className='relative bottom-2 -left-1 text-[12px] font-medium text-[#4e5f69] select-none'>
                    {time.hour.toString()} {time.period}
                </p>
            </div>
            {days.map((day) => (
                <div
                    onClick={() => onHourCellClick(day, time)}
                    className='hour-cell bg-[#FDFCF9] cursor-default'
                    key={day.id}
                />
            ))}
        </div>
    );
};