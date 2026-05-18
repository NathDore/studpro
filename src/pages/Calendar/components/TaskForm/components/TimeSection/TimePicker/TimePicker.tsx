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
        <div className='section-input section-row time-picker-container'>
            <div className='flex-row'>
                <div className='default-cursor section-text time-picker-commun time-picker '>
                    {String(timePickerValue.hour).padStart(2, '0')}
                </div>
                <span className='default-cursor section-text time-picker-commun'>:</span>
                <div className='default-cursor section-text time-picker-commun time-picker '>
                    {String(timePickerValue.minutes).padStart(2, '0')}
                </div>
                <div style={{ width: 2 }} />
                <span className='default-cursor section-text time-picker-commun '>{timePickerValue.period}</span>
            </div>

            <div onClick={handleOnClick}>
                <ClockIcon className='section-icon section-text time-picker-commun' />
            </div>

            <TimeSelection displaySelection={displaySelection} timePickerValue={timePickerValue} setTimePickerValue={setTimePickerValue} />
        </div>
    )
}

