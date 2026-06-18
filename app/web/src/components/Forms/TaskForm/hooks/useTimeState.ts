import { useState } from "react";
import { getNextHour } from "../../../../pages/Calendar/utils/calendarTimeUtils";
import { validateTimePickerInput } from "../../../../pages/Calendar/utils/calendarTimeUtils";
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from "../../../../pages/Calendar/Calendar.types";
import type { Task } from "../../../../types/Task";

interface UseTimeStateProps {
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    selectedTask?: Task;
}

export const useTimeState = ({ initialStartTime, initialEndTime, selectedTask }: UseTimeStateProps) => {
    const [startTime, setStartTime] = useState<CalendarTime>(
        selectedTask?.startTime ?? initialStartTime
    );
    const [endTime, setEndTime] = useState<CalendarTime>(
        selectedTask?.endTime ?? initialEndTime
    );
    const [timePickerInputs, setTimePickerInputs] = useState<TimePickerInputs>({
        startHour: selectedTask?.startTime?.hour ?? initialStartTime.hour,
        endHour: selectedTask?.endTime?.hour ?? initialEndTime.hour,
        startMinutes: selectedTask?.startTime?.minutes ?? initialStartTime.minutes,
        endMinutes: selectedTask?.endTime?.minutes ?? initialEndTime.minutes,
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