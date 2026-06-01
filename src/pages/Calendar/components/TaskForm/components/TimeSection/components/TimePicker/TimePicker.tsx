import { useState, type MouseEventHandler } from "react";
import { ClockIcon } from "../../../../../../../../components/icons/ClockIcon";
import './TimePicker.css';
import { TimeSelection } from "./components/TimeSelection/TimeSelection";
import type { Time } from "../../../../../../types/Time";

interface TimePickerProps {
    time: Time;
    setTime: (time: Time) => void;
    type: 'start' | 'end';
}

export const TimePicker = ({ time, setTime, type }: TimePickerProps) => {
    const [displaySelection, setDisplaySelection] = useState<boolean>(false);

    const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setDisplaySelection(prev => !prev);
    }

    return (
        <div onClick={handleOnClick} className='section-input section-row time-picker-container pointer-cursor'>
            <div className='flex-row'>
                <div className='default-cursor section-text time-picker-commun time-picker pointer-cursor user-selection-none'>
                    {String(time.hour).padStart(2, '0')}
                </div>
                <span className='default-cursor section-text time-picker-commun pointer-cursor user-selection-none'>:</span>
                <div className='default-cursor section-text time-picker-commun time-picker pointer-cursor user-selection-none'>
                    {String(time.minutes).padStart(2, '0')}
                </div>
                <div style={{ width: 2 }} />
                <span className='default-cursor section-text time-picker-commun pointer-cursor user-selection-none'>{time.period}</span>
            </div>

            <ClockIcon className='section-icon section-text time-picker-commun pointer-cursor' />

            <TimeSelection displaySelection={displaySelection} time={time} setTime={setTime} type={type} />
        </div>
    )
}

