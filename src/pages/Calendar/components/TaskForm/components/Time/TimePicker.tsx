import { TIME_TEXT_CLASS } from './styles-time-section';
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from '../../../../Calendar.types';
import { TimeInput } from './TimeInput';

interface TimePickerProps {
    startTime: CalendarTime;
    onStartTimeChange: (time: CalendarTime) => void;
    endTime: CalendarTime;
    onEndTimeChange: (time: CalendarTime) => void;
    timePickerInputs: TimePickerInputs;
    onHourInputChange: (timePickerInputType: TimePickerInputType, hour: number) => void;
    onMinutesInputChange: (timePickerInputType: TimePickerInputType, minutes: number) => void;
}

export const TimePicker = ({ startTime, onStartTimeChange, endTime, onEndTimeChange, timePickerInputs, onHourInputChange, onMinutesInputChange }: TimePickerProps) => {

    const handleStartTimeChange = (time: CalendarTime) => {
        onStartTimeChange(time);
    };

    const handleEndTimeChange = (time: CalendarTime) => {
        onEndTimeChange(time);
    };

    return (
        <div className={`flex flex-row gap-4`}>
            <div className={`flex flex-col gap-0.5`}>
                <p className={TIME_TEXT_CLASS}>Start</p>
                <TimeInput
                    id={startTime.id}
                    hour={timePickerInputs.startHour}
                    minutes={timePickerInputs.startMinutes}
                    period={startTime.period}
                    onTimeChange={handleStartTimeChange}
                    type={'start'}
                    onHourInputChange={onHourInputChange}
                    onMinutesInputChange={onMinutesInputChange} />
            </div>
            <div className={`flex flex-col gap-0.5`}>
                <p className={TIME_TEXT_CLASS}>End</p>
                <TimeInput
                    id={endTime.id}
                    hour={timePickerInputs.endHour}
                    minutes={timePickerInputs.endMinutes}
                    period={endTime.period}
                    onTimeChange={handleEndTimeChange}
                    type={'end'}
                    onHourInputChange={onHourInputChange}
                    onMinutesInputChange={onMinutesInputChange} />
            </div>
        </div>
    );
};