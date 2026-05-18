import { useState, type MouseEventHandler } from "react";
import { ClockIcon } from "../../../../../../../components/icons/ClockIcon";
import type { TimePickerValue } from "../TimeSection";
import './TimePicker.css';
import { TimeSelection } from "./TimeSelection/TimeSelection";

interface TimePickerProps {
    timePickerValue: TimePickerValue;
    setTimePickerValue: React.Dispatch<React.SetStateAction<TimePickerValue>>;
}

export const TimePicker = ({ timePickerValue, setTimePickerValue }: TimePickerProps) => {
    const [displaySelection, setDisplaySelection] = useState<boolean>(false);

    const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setDisplaySelection(prev => !prev);
    }

    return (
        <div onClick={handleOnClick} className='section-input section-row time-picker-container pointer-cursor'>
            <div className='flex-row'>
                <div className='default-cursor section-text time-picker-commun time-picker pointer-cursor user-selection-none'>
                    {String(timePickerValue.hour).padStart(2, '0')}
                </div>
                <span className='default-cursor section-text time-picker-commun pointer-cursor user-selection-none'>:</span>
                <div className='default-cursor section-text time-picker-commun time-picker pointer-cursor user-selection-none'>
                    {String(timePickerValue.minutes).padStart(2, '0')}
                </div>
                <div style={{ width: 2 }} />
                <span className='default-cursor section-text time-picker-commun pointer-cursor user-selection-none'>{timePickerValue.period}</span>
            </div>

            <ClockIcon className='section-icon section-text time-picker-commun pointer-cursor' />

            <TimeSelection displaySelection={displaySelection} timePickerValue={timePickerValue} setTimePickerValue={setTimePickerValue} />
        </div>
    )
}

