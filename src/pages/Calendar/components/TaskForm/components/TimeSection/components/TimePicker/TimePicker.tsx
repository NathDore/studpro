import { useState, type MouseEventHandler } from "react";
import { ClockIcon } from "../../../../../../../../components/icons/ClockIcon";
import { TimeSelection } from "./components/TimeSelection";
import type { CalendarTime } from "../../../../../../Calendar.types";

const CONTAINER_CLASS = 'relative flex flex-row items-center justify-between flex-1 p-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400';
const TIME_ROW_CLASS = 'flex flex-row items-center';
const TIME_PART_CLASS = 'text-[14px] h-5 flex items-center text-[rgb(40,40,40)] font-medium select-none cursor-default';
const TIME_DIGIT_CLASS = `${TIME_PART_CLASS} w-[2ch]`;
const TIME_SPACER_CLASS = 'w-[2px]';
const CLOCK_ICON_CLASS = 'w-5 stroke-[1.1px] text-[#2C2C2A] cursor-pointer';

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
        <div onClick={handleOnClick} className={CONTAINER_CLASS}>
            <div className={TIME_ROW_CLASS}>
                <span className={TIME_DIGIT_CLASS}>{String(time.hour).padStart(2, '0')}</span>
                <span className={TIME_PART_CLASS}>:</span>
                <span className={TIME_DIGIT_CLASS}>{String(time.minutes).padStart(2, '0')}</span>
                <div className={TIME_SPACER_CLASS} />
                <span className={TIME_PART_CLASS}>{time.period}</span>
            </div>

            <ClockIcon className={CLOCK_ICON_CLASS} />

            <TimeSelection displaySelection={displaySelection} time={time} setTime={setTime} type={type} />
        </div>
    );
};