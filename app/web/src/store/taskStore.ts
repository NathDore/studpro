import { create } from 'zustand';
import type { Task } from '../types/Task';
import type { CalendarTime } from '../pages/Calendar/Calendar.types';

interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    removeTask: (taskId: string) => void;
    updateStartTime: (taskId: string, startTime: CalendarTime) => void;
    updateEndTime: (taskId: string, endTime: CalendarTime) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],

    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
    })),

    updateTask: (updatedTask: Task) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        )
    })),

    removeTask: (taskId: string) => set((state) => ({
        tasks: state.tasks.filter((task) =>
            task.id !== taskId
        )
    })),

    updateStartTime: (taskId: string, startTime: CalendarTime) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, startTime: startTime } : task
        )
    })),

    updateEndTime: (taskId: string, endTime: CalendarTime) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, endTime: endTime } : task
        )
    }))
}));