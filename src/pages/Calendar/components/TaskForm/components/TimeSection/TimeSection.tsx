import { TimePicker } from './TimePicker';
import type { CalendarTime } from '../../../../Calendar.types';

const CONTAINER_CLASS = 'flex flex-col gap-[1px]';
const SPACER_CLASS = 'h-[5px]';
const ROW_CLASS = 'flex flex-row gap-4';
const LABEL_CLASS = 'text-[14px] font-medium text-[#2C2C2A] select-none cursor-default';

interface TimeSectionProps {
    startTime: CalendarTime;
    endTime: CalendarTime;
    onStartTimeChange: (time: CalendarTime) => void;
    onEndTimeChange: (time: CalendarTime) => void;
}

export const TimeSection = ({ startTime, onStartTimeChange, endTime, onEndTimeChange }: TimeSectionProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            <div className={SPACER_CLASS} />
            <div className={ROW_CLASS}>
                <div>
                    <p className={LABEL_CLASS}>Start</p>
                    <TimePicker time={startTime} setTime={onStartTimeChange} type='start' />
                </div>
                <div>
                    <p className={LABEL_CLASS}>End</p>
                    <TimePicker time={endTime} setTime={onEndTimeChange} type='end' />
                </div>
            </div>
        </div>
    );
};