import { useCreateTaskForm } from "./useCreateTaskForm";
import { useModifyTaskForm } from "./useModifyTaskForm";
import type { Task } from "../../../../types/Task";
import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";

export const useTaskForm = (
    mode: 'create' | 'update',
    selectedTask: Task | undefined,
    day: CalendarDay,
    initialStartTime: CalendarTime,
    initialEndTime: CalendarTime,
    onClose: () => void
) => {
    const createState = useCreateTaskForm(day, initialStartTime, initialEndTime, onClose);
    const modifyState = useModifyTaskForm(day, initialStartTime, initialEndTime, onClose, selectedTask);

    const isUpdate = mode === 'update' && !!selectedTask;
    const { timeState, noteState, courseState, onSubmit, onDelete } = isUpdate ? modifyState : createState;

    const taskId = isUpdate ? selectedTask!.id : createState.taskId;

    return {
        taskId,
        timeState,
        noteState,
        courseState,
        onSubmit,
        onDelete
    };
};