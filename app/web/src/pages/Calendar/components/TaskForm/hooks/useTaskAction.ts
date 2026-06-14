import { useTaskStore } from "../../../../../store/taskStore";
import { taskExist } from "../../../../../utils/taskValidation";
import type { Note } from "../../../../../types/Note";
import type { Course } from "../../../../../types/Course";
import type { CalendarDay, CalendarTime } from "../../../Calendar.types";

interface UseTaskActionsProps {
    day: CalendarDay;
    startTime: CalendarTime;
    endTime: CalendarTime;
    onClose: () => void;
}

export const useTaskActions = ({ day, startTime, endTime, onClose }: UseTaskActionsProps) => {
    const { addTask, updateTask, removeTask, tasks } = useTaskStore();

    const onSubmit = (mode: 'create' | 'update', course: Course, notes: Note[], id: string) => {
        if (mode === 'create') {
            addTask({
                id,
                day,
                startTime,
                endTime,
                course,
                notes,
            });
        } else {
            updateTask({
                id,
                day,
                startTime,
                endTime,
                course,
                notes,
            });
        }

        onClose();
    }

    const onRemove = (taskId: string) => {
        if (!taskExist(tasks, taskId)) return;
        removeTask(taskId);
        onClose();
    };

    return { onSubmit, onRemove };
};