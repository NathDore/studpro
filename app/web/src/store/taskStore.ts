import { create } from 'zustand';
import type { Task } from '../types/Task';

interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    removeTask: (taskId: string) => void;
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
}));