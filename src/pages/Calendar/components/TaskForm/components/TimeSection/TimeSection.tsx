import './TimeSection.css';
import { TimePicker } from './components/TimePicker/TimePicker';
import type { Time } from '../../../../../../types/Time';

interface TimeSectionProps {
    startTime: Time;
    endTime: Time;
    onStartTimeChange: (time: Time) => void;
    onEndTimeChange: (time: Time) => void;
}

export const TimeSection = ({ startTime, onStartTimeChange, endTime, onEndTimeChange }: TimeSectionProps) => {
    return (
        <div className='section-column'>
            <div style={{ height: 5 }} />
            <div className='section-row'>
                <div>
                    <p className='section-label'>Start</p>
                    <TimePicker time={startTime} setTime={onStartTimeChange} type='start' />
                </div>
                <div>
                    <p className='section-label'>End</p>
                    <TimePicker time={endTime} setTime={onEndTimeChange} type='end' />
                </div>
            </div>
        </div>
    );
}

