import { useState } from "react";
import './TimeSection.css';
import { TimePicker } from "./TimePicker/TimePicker";
import type { Time } from "../../../CalendarGrid/CalendarGrid";

interface TimeSectionProps {
    startTime: Time;
    endTime: Time;
}

export interface TimePickerValue {
    hour: number;
    minutes: number;
    period: 'AM' | 'PM';
}

export const TimeSection = ({ startTime, endTime }: TimeSectionProps) => {
    const [currentStartTime, setStartTime] = useState<TimePickerValue>({ hour: startTime.hour, minutes: startTime.minutes, period: startTime.period });
    const [currentEndTime, setEndTime] = useState<TimePickerValue>({ hour: endTime.hour, minutes: endTime.minutes, period: endTime.period });

    return (
        <div className='section-column'>
            <p className='section-label'>Time</p>
            <div style={{ height: 5 }} />
            <div className='section-row'>
                <div>
                    <p className='section-label'>Start</p>
                    <TimePicker timePickerValue={currentStartTime} setTimePickerValue={setStartTime} />
                </div>
                <div>
                    <p className='section-label'>End</p>
                    <TimePicker timePickerValue={currentEndTime} setTimePickerValue={setEndTime} />
                </div>
            </div>
        </div>
    );
}

