import { useTaskStore } from "../../../../store/taskStore";
import { taskExist } from "../../../../utils/taskValidation";
import type { Note } from "../../../../types/Note";
import type { Course } from "../../../../types/Course";
import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";

interface UseTaskActionsProps {
    day: CalendarDay;
    startTime: CalendarTime;
    endTime: CalendarTime;
    isCompleted?: boolean;
    onClose: () => void;
}

export const useTaskActions = ({ day, startTime, endTime, isCompleted, onClose }: UseTaskActionsProps) => {
    const { addTask, updateTask, removeTask, tasks } = useTaskStore();

    const onCreateTask = (mode: 'create' | 'update', course: Course | null, notes: Note[], id: string) => {
        if (course === null) {
            console.error('Course must be selected first');
            return;
        }

        if (mode === 'create') {
            addTask({
                id,
                day,
                startTime,
                endTime,
                course,
                notes,
                isCompleted: false
            });
        } else {
            updateTask({
                id,
                day,
                startTime,
                endTime,
                course,
                notes,
                isCompleted: isCompleted || false
            });
        }

        onClose();
    }

    const onRemove = (taskId: string) => {
        if (!taskExist(tasks, taskId)) return;
        removeTask(taskId);
        onClose();
    };

    return { onCreateTask, onRemove };
};