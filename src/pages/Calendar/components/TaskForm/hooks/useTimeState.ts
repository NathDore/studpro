import { useState } from "react";
import { getNextHour } from "../../../utils/calendarTimeUtils";
import { validateTimePickerInput } from "../../../utils/calendarTimeUtils";
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from "../../../Calendar.types";
import type { Task } from "../../../../../types/Task";

interface UseTimeStateProps {
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    task?: Task;
}

export const useTimeState = ({ initialStartTime, initialEndTime, task }: UseTimeStateProps) => {
    const [startTime, setStartTime] = useState<CalendarTime>(
        task?.startTime ?? initialStartTime
    );
    const [endTime, setEndTime] = useState<CalendarTime>(
        task?.endTime ?? initialEndTime
    );
    const [timePickerInputs, setTimePickerInputs] = useState<TimePickerInputs>({
        startHour: task?.startTime?.hour ?? initialStartTime.hour,
        endHour: task?.endTime?.hour ?? initialEndTime.hour,
        startMinutes: task?.startTime?.minutes ?? initialStartTime.minutes,
        endMinutes: task?.endTime?.minutes ?? initialEndTime.minutes,
    });

    const onStartTimeChange = (time: CalendarTime) => {
        const { isValidHour, isValidMinutes, invalidInterval } = validateTimePickerInput(time, time, endTime);

        if (isValidHour && isValidMinutes) {
            setStartTime(time);

            if (invalidInterval) {
                const validEndTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, startHour: startTime.hour, startMinutes: startTime.minutes }));
        }
    };

    const onEndTimeChange = (time: CalendarTime) => {
        const { isValidHour, isValidMinutes, invalidInterval } = validateTimePickerInput(time, startTime, time);

        if (isValidHour && isValidMinutes) {
            setEndTime(time);

            if (invalidInterval) {
                setStartTime(time);
                setTimePickerInputs(prev => ({ ...prev, startHour: time.hour }));

                const validEndTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, endHour: endTime.hour, endMinutes: endTime.minutes }));
        }
    };

    const onHourInputChange = (type: TimePickerInputType, hour: number) => {
        if (type === 'start') {
            setTimePickerInputs(prev => ({ ...prev, startHour: hour }));
        } else {
            setTimePickerInputs(prev => ({ ...prev, endHour: hour }));
        }
    };

    const onMinutesInputChange = (type: TimePickerInputType, minutes: number) => {
        if (type === 'start') {
            setTimePickerInputs(prev => ({ ...prev, startMinutes: minutes }));
        } else {
            setTimePickerInputs(prev => ({ ...prev, endMinutes: minutes }));
        }
    };

    return {
        startTime,
        endTime,
        timePickerInputs,
        onStartTimeChange,
        onEndTimeChange,
        onHourInputChange,
        onMinutesInputChange,
    };
};