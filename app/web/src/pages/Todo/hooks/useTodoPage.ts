import { useMemo } from "react";
import { useTaskStore } from "../../../store/taskStore"
import { getDays } from "../../../utils/calendarDayUtils";
import type { Task } from "../../../types/Task";
import type { CalendarDay } from "../../Calendar/Calendar.types";
import type { TodoDay } from "../Todo.types";

const DAYS = getDays();

const getTodoDays = (days: CalendarDay[], tasks: Task[]): TodoDay[] => {
    const tasksByDate = new Map<string, Task[]>();

    for (const task of tasks) {
        const dateKey = task.day.date;
        const dayTasks = tasksByDate.get(dateKey) ?? [];
        dayTasks.push(task);
        tasksByDate.set(dateKey, dayTasks);
    }

    return days.map(day => {
        const dayTasks = tasksByDate.get(day.date) ?? [];

        return {
            id: day.id,
            day,
            tasks: dayTasks,
            isCompleted: dayTasks.length > 0 && dayTasks.every(t => t.isCompleted),
        };
    });
};

export const useTodoPage = () => {
    const { tasks } = useTaskStore();

    const todoDays = useMemo(() => getTodoDays(DAYS, tasks), [tasks]);

    return { todoDays };
}