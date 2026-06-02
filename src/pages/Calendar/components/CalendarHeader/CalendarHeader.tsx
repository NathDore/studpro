import type { CalendarDay } from '../../../../types/CalendarDay';

interface CalendarHeaderProps {
    days: CalendarDay[];
}

export const CalendarHeader = ({ days }: CalendarHeaderProps) => {
    return (
        <div className="sticky top-0 z-10 h-[50px] grid grid-cols-[40px_repeat(7,1fr)]">
            <div className="flex flex-col justify-center items-center bg-[#F7F5F0]" />
            {days.map(day => <CalendarDayCol key={day.id} calendarDay={day} />)}
        </div>
    );
};

interface CalendarDayColProps {
    calendarDay: CalendarDay;
}

const CalendarDayCol = ({ calendarDay }: CalendarDayColProps) => {
    return (
        <div className="flex flex-col justify-center items-center border-r border-t border-b border-gray-300 bg-[#8FAcbd]">
            <p className="select-none font-medium text-[15px] text-[#2C2C2A] sm:font-normal sm:text-[10px]">
                {calendarDay.day}
            </p>
            <p className={`select-none font-bold text-[15px] text-[#222220] sm:font-medium sm:text-[12px]
                ${calendarDay.isCurrentDay
                    ? 'bg-[#2C2C2A] text-white rounded-full w-[1.3rem] h-[1.3rem] sm:w-5 sm:h-5 flex items-center justify-center relative bottom-px'
                    : ''
                }`}>
                {calendarDay.date}
            </p>
        </div>
    );
};