import { useTaskStore } from "../../../../../store/taskStore";
import { taskExist } from "../../../../../utils/taskValidation";
import type { Task } from "../../../../../types/Task";
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

    const onSubmit = (mode: 'create' | 'update', formData: { course: Course, notes: Note[] }, task?: Task) => {
        const { course, notes } = formData;

        if (mode === 'create') {
            const newTask: Task = {
                id: crypto.randomUUID(),
                day,
                startTime,
                endTime,
                course,
                notes,
            };

            addTask(newTask);
        } else {
            if (!task) return;

            const updatedTask: Task = {
                id: task.id,
                day,
                startTime,
                endTime,
                course,
                notes,
            };

            updateTask(updatedTask);
        }

        onClose();
    };

    const onRemove = (taskId: string) => {
        if (!taskExist(tasks, taskId)) return;
        removeTask(taskId);
        onClose();
    };

    return { onSubmit, onRemove };
};