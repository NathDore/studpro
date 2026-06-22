import type { CalendarDay, CalendarTime } from "../../pages/Calendar/Calendar.types";
import { useTaskStore } from "../../store/taskStore";

export const useModifyTask = () => {
    const { updateTask } = useTaskStore();

    const submit = (
        id: string,
        courseId: string,
        day: CalendarDay,
        startTime: CalendarTime,
        endTime: CalendarTime,
        isCompleted: boolean
    ) => {
        updateTask({ id, day, courseId, startTime, endTime, isCompleted: isCompleted || false });
    };

    return { submit };
};