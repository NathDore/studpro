import { useState, type MouseEventHandler } from "react";
import { ClockIcon } from "../../../../../../../../components/icons/ClockIcon";
import { TimeSelection } from "./components/TimeSelection";
import type { CalendarTime } from "../../../../../../Calendar.types";

interface TimePickerProps {
    time: CalendarTime;
    setTime: (time: CalendarTime) => void;
    type: 'start' | 'end';
}

export const TimePicker = ({ time, setTime, type }: TimePickerProps) => {
    const [displaySelection, setDisplaySelection] = useState<boolean>(false);

    const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setDisplaySelection(prev => !prev);
    };

    return (
        <div
            onClick={handleOnClick}
            className='relative flex flex-row items-center justify-between flex-1 p-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400'
        >
            <div className='flex flex-row items-center'>
                <span className='text-[14px] h-5 flex items-center text-[rgb(40,40,40)] font-medium w-[2ch] select-none cursor-default'>
                    {String(time.hour).padStart(2, '0')}
                </span>
                <span className='text-[14px] h-5 flex items-center text-[rgb(40,40,40)] font-medium select-none cursor-default'>:</span>
                <span className='text-[14px] h-5 flex items-center text-[rgb(40,40,40)] font-medium w-[2ch] select-none cursor-default'>
                    {String(time.minutes).padStart(2, '0')}
                </span>
                <div className='w-[2px]' />
                <span className='text-[14px] h-5 flex items-center text-[rgb(40,40,40)] font-medium select-none cursor-default'>
                    {time.period}
                </span>
            </div>

            <ClockIcon className='w-5 stroke-[1.1px] text-[#2C2C2A] cursor-pointer' />

            <TimeSelection displaySelection={displaySelection} time={time} setTime={setTime} type={type} />
        </div>
    );
};