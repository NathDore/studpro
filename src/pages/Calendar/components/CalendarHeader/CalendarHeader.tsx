import type { CalendarDay } from '../../Calendar.types';

const HEADER_CLASS = 'sticky top-0 z-10 h-[50px] grid grid-cols-[40px_repeat(7,1fr)]';
const HEADER_EMPTY_CELL_CLASS = 'flex flex-col justify-center items-center bg-[#F7F5F0]';
const DAY_COL_CLASS = 'flex flex-col justify-center items-center border-r border-t border-b border-gray-300 bg-[#8FAcbd]';
const DAY_NAME_CLASS = 'select-none font-medium text-[15px] text-[#2C2C2A] sm:font-normal sm:text-[10px]';
const DAY_DATE_BASE_CLASS = 'select-none font-bold text-[15px] text-[#222220] sm:font-medium sm:text-[12px]';
const DAY_DATE_CURRENT_CLASS = 'bg-[#2C2C2A] text-white rounded-full w-[1.3rem] h-[1.3rem] sm:w-5 sm:h-5 flex items-center justify-center relative bottom-px';

interface CalendarHeaderProps {
    days: CalendarDay[];
}

export const CalendarHeader = ({ days }: CalendarHeaderProps) => {
    return (
        <div className={HEADER_CLASS}>
            <div className={HEADER_EMPTY_CELL_CLASS} />
            {days.map(day => <DayCol key={day.id} day={day} />)}
        </div>
    );
};

interface DayColProps {
    day: CalendarDay;
}

const DayCol = ({ day }: DayColProps) => {
    return (
        <div className={DAY_COL_CLASS}>
            <p className={DAY_NAME_CLASS}>
                {day.day}
            </p>
            <p className={`${DAY_DATE_BASE_CLASS} ${day.isCurrentDay ? DAY_DATE_CURRENT_CLASS : ''}`}>
                {day.date}
            </p>
        </div>
    );
};