import type { CalendarTime } from '../../../../types/CalendarTime';

interface CalendarHeaderProps {
    days: CalendarTime[];
}

export const CalendarHeader = ({ days }: CalendarHeaderProps) => {
    return (
        <div className="sticky top-0 z-10 h-[50px] grid grid-cols-[40px_repeat(7,1fr)]">
            <div className="flex flex-col justify-center items-center bg-[#F7F5F0]" />
            {days.map(day => <DayCol key={day.id} day={day} />)}
        </div>
    );
};

interface DayColProps {
    day: CalendarTime;
}

const DayCol = ({ day }: DayColProps) => {
    return (
        <div className="flex flex-col justify-center items-center border-r border-t border-b border-gray-300 bg-[#8FAcbd]">
            <p className="select-none font-medium text-[15px] text-[#2C2C2A] sm:font-normal sm:text-[10px]">
                {day.day}
            </p>
            <p className={`select-none font-bold text-[15px] text-[#222220] sm:font-medium sm:text-[12px]
                ${day.isCurrentDay
                    ? 'bg-[#2C2C2A] text-white rounded-full w-[1.3rem] h-[1.3rem] sm:w-5 sm:h-5 flex items-center justify-center relative bottom-px'
                    : ''
                }`}>
                {day.date}
            </p>
        </div>
    );
};