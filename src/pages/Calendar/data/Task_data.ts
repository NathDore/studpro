import type { Task } from "../../../types/Task";
import type { Course } from "../../../types/Course";
import { useTaskStore } from "../../../store/taskStore";

const MAT130: Course = { id: "MAT-130", name: "MAT-130", color: "#5B8DB8" };
const MAT160: Course = { id: "MAT-160", name: "MAT-160", color: "#C97A3E" };
const IFT2007: Course = { id: "IFT-2007", name: "IFT-2007", color: "#8B6AAF" };
const IFT1003: Course = { id: "IFT-1003", name: "IFT-1003", color: "#4DA57A" };

export const add_fake_data = () => {
    const { addTask } = useTaskStore.getState();
    TASKS_DATA.forEach(t => addTask(t));
}

export const COURSE_DATA: Course[] = [
    MAT130, MAT160, IFT2007, IFT1003
];

export const TASKS_DATA: Task[] = [
    {
        id: crypto.randomUUID(),
        course: MAT130,
        description: "Standup équipe",
        start: new Date(2026, 4, 12, 9, 0),
        end: new Date(2026, 4, 12, 9, 30),
    },
    {
        id: crypto.randomUUID(),
        course: MAT160,
        description: "Review PR backend",
        start: new Date(2026, 4, 12, 14, 0),
        end: new Date(2026, 4, 12, 16, 0),
    },
    {
        id: crypto.randomUUID(),
        course: IFT2007,
        description: "Réunion design system",
        start: new Date(2026, 4, 13, 10, 0),
        end: new Date(2026, 4, 13, 11, 30),
    },
    {
        id: crypto.randomUUID(),
        course: IFT1003,
        description: "Déjeuner client",
        start: new Date(2026, 4, 13, 12, 0),
        end: new Date(2026, 4, 13, 14, 0),
    },
    {
        id: crypto.randomUUID(),
        course: MAT130,
        description: "Sprint planning",
        start: new Date(2026, 4, 14, 9, 0),
        end: new Date(2026, 4, 14, 12, 0),
    },
    {
        id: crypto.randomUUID(),
        course: IFT1003,
        description: "Formation TypeScript",
        start: new Date(2026, 4, 15, 14, 0),
        end: new Date(2026, 4, 15, 17, 0),
    },
    {
        id: crypto.randomUUID(),
        course: MAT160,
        description: "Retrospective",
        start: new Date(2026, 4, 16, 10, 0),
        end: new Date(2026, 4, 16, 11, 0),
    },
];