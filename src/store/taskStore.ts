import { create } from 'zustand';
import type { Task } from '../types/Task';

interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
    }))
}));