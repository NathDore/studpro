import { useState } from "react";
import './TimeSection.css';
import { ClockIcon } from "../../../../../../components/icons/ClockIcon";

interface TimeSectionProps { }

interface TimePickerValue {
    hour: number;
    minutes: number;
    period: 'AM' | 'PM';
}

export const TimeSection = ({ }: TimeSectionProps) => {
    const [startTime, setStartTime] = useState<TimePickerValue>({ hour: 1, minutes: 15, period: 'AM' });
    const [endTime, setEndTime] = useState<TimePickerValue>({ hour: 5, minutes: 0, period: 'AM' });

    return (
        <div className='section-container'>
            <p className='section-label'>Time</p>
            <div style={{ height: 5 }} />
            <div className='section-row'>
                <div>
                    <p className='time-picker-label'>Start</p>
                    <TimePicker timePickerValue={startTime} setTimePickerValue={setStartTime} />
                </div>
                <div>
                    <p className='time-picker-label'>End</p>
                    <TimePicker timePickerValue={endTime} setTimePickerValue={setEndTime} />
                </div>
            </div>
        </div>
    );
}

interface TimePickerProps {
    timePickerValue: TimePickerValue;
    setTimePickerValue: React.Dispatch<React.SetStateAction<TimePickerValue>>;
}

export const TimePicker = ({ timePickerValue, setTimePickerValue }: TimePickerProps) => {
    return (
        <div className='section-input flex-row time-picker-container'>
            <div className="flex-row">
                <div className='default-cursor time-picker-commun time-picker'>
                    {String(timePickerValue.hour).padStart(2, '0')}
                </div>
                <span className='default-cursor time-picker-commun'>:</span>
                <div className='default-cursor time-picker-commun time-picker'>
                    {String(timePickerValue.minutes).padStart(2, '0')}
                </div>
                <div style={{ width: 2 }} />
                <span className="default-cursor time-picker-commun">{timePickerValue.period}</span>
            </div>

            <ClockIcon className="time-picker-commun clock-icon" />
        </div>
    )
}