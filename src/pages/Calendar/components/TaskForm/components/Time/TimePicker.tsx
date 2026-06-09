import {
    TIME_TEXT_CLASS,
    TIME_BOX_INPUT_CLASS,
    TIME_INPUT_HEIGHT_CLASS,
    TIME_ELEMENT_GAP_CLASS,
    TIME_SECTION_GAP_CLASS,
    TIME_BORDER_CLASS,
    TIME_SEPARATOR_CLASS,
    TIME_BOX_MIN_WIDTH_CLASS,
    TIME_ROUNDED_CLASS,
} from './time-section-config';

import type { CalendarPeriod, CalendarTime, TimePickerInputs, TimePickerInputType } from '../../../../Calendar.types';

const TIME_PICKER_CONTAINER_CLASS = `flex flex-1 flex-col max-w-[450px]`;
const TIME_PICKER_LABEL_ROW_CLASS = `flex flex-row gap-[200px]`;
const TIME_PICKER_LABEL_CLASS = TIME_TEXT_CLASS;
const TIME_PICKER_INPUT_ROW_CLASS = `flex flex-row flex-1`;

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
        <div className={TIME_PICKER_CONTAINER_CLASS}>
            <div className={TIME_PICKER_LABEL_ROW_CLASS}>
                <p className={TIME_PICKER_LABEL_CLASS}>Start</p>
                <p className={TIME_PICKER_LABEL_CLASS}>End</p>
            </div>
            <div className={TIME_PICKER_INPUT_ROW_CLASS}>
                <TimeInput
                    id={startTime.id}
                    hour={timePickerInputs.startHour}
                    minutes={timePickerInputs.startMinutes}
                    period={startTime.period}
                    onTimeChange={handleStartTimeChange}
                    type={'start'}
                    onHourInputChange={onHourInputChange}
                    onMinutesInputChange={onMinutesInputChange} />
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

const TIME_INPUT_CONTAINER_CLASS = `flex flex-1 flex-row ${TIME_SECTION_GAP_CLASS}`;
const TIME_INPUT_BOX_ROW_CLASS = `flex flex-row ${TIME_ELEMENT_GAP_CLASS}`;
const TIME_INPUT_BOX_CLASS = `${TIME_BOX_INPUT_CLASS} ${TIME_BOX_MIN_WIDTH_CLASS} ${TIME_ROUNDED_CLASS} w-[40px] justify-center text-center cursor-pointer select-none`;
const TIME_INPUT_SEMICOLON_CLASS = `flex flex-row items-center ${TIME_INPUT_HEIGHT_CLASS} cursor-default select-none`;
const TIME_INPUT_PERIOD_ROW_CLASS = `flex flex-row  ${TIME_BORDER_CLASS} ${TIME_INPUT_HEIGHT_CLASS} ${TIME_ROUNDED_CLASS}`;
const TIME_INPUT_PERIOD_BOX_CLASS = `${TIME_BOX_INPUT_CLASS} border-none rounded-[0px] cursor-pointer select-none`;

const TIME_INPUT_SELECTED_AM_CLASS = `bg-gray-300 rounded-l-[5px]`;
const TIME_INPUT_SELECTED_PM_CLASS = `bg-gray-300 rounded-r-[5px]`;
const TIME_INPUT_SEPARATOR_CLASS = `${TIME_SEPARATOR_CLASS} cursor-pointer`;

interface TimeInputProps {
    id: string;
    hour: number;
    minutes: number;
    period: CalendarPeriod;
    onTimeChange: (time: CalendarTime) => void;
    type: TimePickerInputType;
    onHourInputChange: (timePickerInputType: TimePickerInputType, hour: number) => void;
    onMinutesInputChange: (timePickerInputType: TimePickerInputType, minutes: number) => void;
}

// Prompt : TimePicker component should be purely controlled by the useTaskForm hook. No more states inside this component.

const TimeInput = ({ id, hour, minutes, period, onTimeChange, type, onHourInputChange, onMinutesInputChange }: TimeInputProps) => {

    const handleHourBlur = () => {
        onTimeChange({ id, hour, minutes, period });
    };

    const handleMinutesBlur = () => {
        onTimeChange({ id, hour, minutes: minutes, period });
    };

    const handleOnHourChange = (e: any) => {
        onHourInputChange(type, e.target.value);
    }

    const handleOnMinutesChange = (e: any) => {
        onMinutesInputChange(type, e.target.value);
    }

    return (
        <div className={TIME_INPUT_CONTAINER_CLASS}>
            <div className={TIME_INPUT_BOX_ROW_CLASS}>
                <input
                    className={TIME_INPUT_BOX_CLASS}
                    value={hour}
                    onChange={handleOnHourChange}
                    onBlur={handleHourBlur}
                    onFocus={(e) => e.target.select()}
                    onMouseUp={(e) => e.preventDefault()}
                />
                <p className={TIME_INPUT_SEMICOLON_CLASS}>:</p>
                <input
                    className={TIME_INPUT_BOX_CLASS}
                    value={minutes}
                    onChange={handleOnMinutesChange}
                    onBlur={handleMinutesBlur}
                    onFocus={(e) => e.target.select()}
                    onMouseUp={(e) => e.preventDefault()}
                />
            </div>
            <div className={TIME_INPUT_PERIOD_ROW_CLASS}>
                <div className={`${TIME_INPUT_PERIOD_BOX_CLASS} ${period === 'AM' ? TIME_INPUT_SELECTED_AM_CLASS : ''}`}
                    onClick={() => onTimeChange({ id, hour, minutes, period: 'AM' })}>AM</div>
                <div className={TIME_INPUT_SEPARATOR_CLASS} />
                <div className={`${TIME_INPUT_PERIOD_BOX_CLASS} ${period === 'PM' ? TIME_INPUT_SELECTED_PM_CLASS : ''}`}
                    onClick={() => onTimeChange({ id, hour, minutes, period: 'PM' })}>PM</div>
            </div>
        </div>
    );
};