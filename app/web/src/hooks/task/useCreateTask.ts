import type { CalendarDay, CalendarTime } from "../../pages/Calendar/Calendar.types";
import { useTaskStore } from "../../store/taskStore";

export const useCreateTask = () => {
    const { addTask } = useTaskStore();

    const submit = (
        id: string,
        courseId: string,
        day: CalendarDay,
        startTime: CalendarTime,
        endTime: CalendarTime
    ) => {
        addTask({ id, day, courseId, startTime, endTime, isCompleted: false });
    };

    return { submit };
};