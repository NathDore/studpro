import { TimePicker } from './components/TimePicker/TimePicker';
import type { CalendarTime } from '../../../../Calendar.types';

interface TimeSectionProps {
    startTime: CalendarTime;
    endTime: CalendarTime;
    onStartTimeChange: (time: CalendarTime) => void;
    onEndTimeChange: (time: CalendarTime) => void;
}

export const TimeSection = ({ startTime, onStartTimeChange, endTime, onEndTimeChange }: TimeSectionProps) => {
    return (
        <div className='flex flex-col gap-[1px]'>
            <div className='h-[5px]' />
            <div className='flex flex-row gap-4'>
                <div>
                    <p className='text-[14px] font-medium text-[#2C2C2A] select-none cursor-default'>Start</p>
                    <TimePicker time={startTime} setTime={onStartTimeChange} type='start' />
                </div>
                <div>
                    <p className='text-[14px] font-medium text-[#2C2C2A] select-none cursor-default'>End</p>
                    <TimePicker time={endTime} setTime={onEndTimeChange} type='end' />
                </div>
            </div>
        </div>
    );
};