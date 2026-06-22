import type { Task } from "../types/Task";

export const taskExist = (tasks: Task[], taskId: string) => {
    if (tasks.length === 0) return false;
    return tasks.some((task) => task.id === taskId);
}