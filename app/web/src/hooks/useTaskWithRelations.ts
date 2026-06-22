import { useMemo } from "react";
import { useTaskStore } from "../store/taskStore";
import { useNoteStore } from "../store/noteStore";
import { useCourseStore } from "../store/courseStore";

/**
 * task from id
 * isCompleted is derived from notes.
 */
export function useTaskWithRelations(taskId: string) {
    const task = useTaskStore((s) => s.tasks.find((t) => t.id === taskId));
    const courses = useCourseStore((s) => s.courses);
    const notes = useNoteStore((s) => s.notes);

    return useMemo(() => {
        if (!task) return null;

        const course = courses.find((c) => c.id === task.courseId) ?? null;
        const taskNotes = notes.filter((n) => n.taskId === task.id);
        const isCompleted = taskNotes.every((n) => n.isCompleted);

        return { ...task, course, notes: taskNotes, isCompleted };
    }, [task, courses, notes]);
}

/**
 * list of task IDs.
 */
export function useTasksWithRelations(taskIds: string[]) {
    const tasks = useTaskStore((s) => s.tasks);
    const courses = useCourseStore((s) => s.courses);
    const notes = useNoteStore((s) => s.notes);

    return useMemo(() => {
        return taskIds
            .map((id) => tasks.find((t) => t.id === id))
            .filter((t): t is NonNullable<typeof t> => t !== undefined)
            .map((task) => {
                const course = courses.find((c) => c.id === task.courseId) ?? null;
                const taskNotes = notes.filter((n) => n.taskId === task.id);
                const isCompleted = taskNotes.every((n) => n.isCompleted);
                return { ...task, course, notes: taskNotes, isCompleted };
            });
    }, [taskIds, tasks, courses, notes]);
}