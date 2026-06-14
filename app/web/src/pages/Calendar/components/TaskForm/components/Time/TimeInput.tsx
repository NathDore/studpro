import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from "../../../../../../styles/styles-class";
import type { CalendarPeriod, CalendarTime, TimePickerInputType } from "../../../../Calendar.types";
import { TIME_BOX_INPUT_CLASS } from "./styles-time-section";

const TIME_INPUT_PERIOD_ROW_CLASS = `flex flex-row ${BORDER_CLASS} h-7 rounded-[5px]`;
const TIME_INPUT_PERIOD_BOX_CLASS = `${TIME_BOX_INPUT_CLASS} border-none rounded-[0px] cursor-pointer select-none`;
const TIME_INPUT_SELECTED_AM_CLASS = `bg-gray-300 rounded-l-[5px]`;
const TIME_INPUT_SELECTED_PM_CLASS = `bg-gray-300 rounded-r-[5px]`;

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

export const TimeInput = ({ id, hour, minutes, period, onTimeChange, type, onHourInputChange, onMinutesInputChange }: TimeInputProps) => {

    const handleHourBlur = () => {
        onTimeChange({ id, hour, minutes, period });
    };

    const handleMinutesBlur = () => {
        onTimeChange({ id, hour, minutes, period });
    };

    const handleOnHourChange = (e: any) => {
        onHourInputChange(type, e.target.value);
    };

    const handleOnMinutesChange = (e: any) => {
        onMinutesInputChange(type, e.target.value);
    };

    return (
        <div className={`flex flex-1 flex-row gap-1.25`}>
            <div className={`flex flex-row gap-0.5`}>
                <input
                    className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium text-center ${BORDER_CLASS} h-7 p-1.25 w-7.5 outline-none focus:border-gray-500`}
                    value={hour}
                    onChange={handleOnHourChange}
                    onBlur={handleHourBlur}
                    onFocus={(e) => e.target.select()}
                    onMouseUp={(e) => e.preventDefault()}
                />
                <p className={`flex flex-row items-center h-7 cursor-default select-none`}>:</p>
                <input
                    className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium text-center ${BORDER_CLASS} h-7 p-1.25 w-7.5 outline-none focus:border-gray-500`}
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
                <div className={`w-[0.5px] bg-gray-300 cursor-pointer`} />
                <div className={`${TIME_INPUT_PERIOD_BOX_CLASS} ${period === 'PM' ? TIME_INPUT_SELECTED_PM_CLASS : ''}`}
                    onClick={() => onTimeChange({ id, hour, minutes, period: 'PM' })}>PM</div>
            </div>
        </div>
    );
};