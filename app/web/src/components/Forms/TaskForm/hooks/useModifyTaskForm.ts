import { useTimeState } from "./useTimeState";
import { useCourseStore } from "../../../../store/courseStore";
import { useNoteState } from "./useNoteState";
import { useModifyTask } from "../../../../hooks/task/useModifyTask";
import { useTaskWithRelations } from "../../../../hooks/useTaskWithRelations";
import { useRemoveTask } from "../../../../hooks/task/useRemoveTask";
import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";
import type { Task } from "../../../../types/Task";

export const useModifyTaskForm = (day: CalendarDay, initialStartTime: CalendarTime, initialEndTime: CalendarTime, onClose: () => void, selectedTask: Task | undefined) => {
    const { courses, selectedCourse, selectCourse } = useCourseStore();
    const { submit: submitModify } = useModifyTask();
    const { submit: submitRemove } = useRemoveTask();

    const task = useTaskWithRelations(selectedTask?.id ?? '');
    const timeState = useTimeState({ initialStartTime, initialEndTime, selectedTask: undefined });
    const noteState = useNoteState(task?.notes ?? [], 'update');

    const courseState = { courses, selectedCourse, selectCourse };

    const onSubmit = () => {
        if (!selectedCourse || !task || !selectedTask) return;
        submitModify(selectedTask.id, selectedCourse.id, day, timeState.startTime, timeState.endTime, selectedTask.isCompleted);
        onClose();
    };

    const onDelete = () => {
        if (!selectedTask) return;
        submitRemove(selectedTask.id);
        onClose();
    };

    return {
        timeState,
        noteState,
        courseState,
        onSubmit,
        onDelete
    };
};