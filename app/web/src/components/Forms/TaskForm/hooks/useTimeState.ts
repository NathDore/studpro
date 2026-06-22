import { useState } from "react";
import { getNextHour } from "../../../../pages/Calendar/utils/calendarTimeUtils";
import { validateTimePickerInput } from "../../../../pages/Calendar/utils/calendarTimeUtils";
import { useModifyTaskStartTime } from "../../../../hooks/task/useModifyTaskStartTime";
import { useModifyTaskEndtime } from "../../../../hooks/task/useModifyTaskEndtime";
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from "../../../../pages/Calendar/Calendar.types";

export const useTimeState = (taskId: string, initialStartTime: CalendarTime, initialEndTime: CalendarTime, mode: 'create' | 'update') => {
    const [startTime, setStartTime] = useState<CalendarTime>(initialStartTime);
    const [endTime, setEndTime] = useState<CalendarTime>(initialEndTime);
    const [timePickerInputs, setTimePickerInputs] = useState<TimePickerInputs>({
        startHour: initialStartTime.hour,
        endHour: initialEndTime.hour,
        startMinutes: initialStartTime.minutes,
        endMinutes: initialEndTime.minutes,
    });

    const { submit: submitModifyStartTime } = useModifyTaskStartTime();
    const { submit: submitModifyEndTime } = useModifyTaskEndtime();

    const canPersist = mode === 'update' && !!taskId;

    // On blur functions
    const onStartTimeChange = (time: CalendarTime) => {
        const { isValidHour, isValidMinutes, invalidInterval } = validateTimePickerInput(time, time, endTime);

        if (isValidHour && isValidMinutes) {
            setStartTime(time);

            if (canPersist) {
                submitModifyStartTime(taskId, time);
            }

            if (invalidInterval) {
                const validEndTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));

                if (canPersist) {
                    submitModifyEndTime(taskId, validEndTime);
                }
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, startHour: startTime.hour, startMinutes: startTime.minutes }));
        }
    };

    const onEndTimeChange = (time: CalendarTime) => {
        const { isValidHour, isValidMinutes, invalidInterval } = validateTimePickerInput(time, startTime, time);

        if (isValidHour && isValidMinutes) {
            setEndTime(time);

            if (canPersist) {
                submitModifyEndTime(taskId, time);
            }

            if (invalidInterval) {
                setStartTime(time);
                setTimePickerInputs(prev => ({ ...prev, startHour: time.hour }));

                if (canPersist) {
                    submitModifyStartTime(taskId, time);
                }

                const validEndTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));

                if (canPersist) {
                    submitModifyEndTime(taskId, validEndTime);
                }
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, endHour: endTime.hour, endMinutes: endTime.minutes }));
        }
    };

    // States
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
        // actions
        startTime,
        endTime,
        onStartTimeChange,
        onEndTimeChange,

        // states
        timePickerInputs,
        onHourInputChange,
        onMinutesInputChange,
    }
}