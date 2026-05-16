import { useState } from "react";
import './TimeSection.css';
import { TimePicker } from "./TimePicker/TimePicker";

interface TimeSectionProps { }

export interface TimePickerValue {
    hour: number;
    minutes: number;
    period: 'AM' | 'PM';
}

export const TimeSection = ({ }: TimeSectionProps) => {
    const [startTime, setStartTime] = useState<TimePickerValue>({ hour: 1, minutes: 15, period: 'AM' });
    const [endTime, setEndTime] = useState<TimePickerValue>({ hour: 5, minutes: 0, period: 'AM' });

    return (
        <div className='section-column'>
            <p className='section-label'>Time</p>
            <div style={{ height: 5 }} />
            <div className='section-row'>
                <div>
                    <p className='section-label'>Start</p>
                    <TimePicker timePickerValue={startTime} setTimePickerValue={setStartTime} />
                </div>
                <div>
                    <p className='section-label'>End</p>
                    <TimePicker timePickerValue={endTime} setTimePickerValue={setEndTime} />
                </div>
            </div>
        </div>
    );
}

