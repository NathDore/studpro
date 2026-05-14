import type { Task } from "../../../types/Task";
import type { Course } from "../../../types/Course";

const MAT130: Course = { id: "MAT-130", name: "MAT-130", color: "#4A90D9" };
const MAT160: Course = { id: "MAT-160", name: "MAT-160", color: "#E67E22" };
const IFT2007: Course = { id: "IFT-2007", name: "IFT-2007", color: "#9B59B6" };
const IFT1003: Course = { id: "IFT-1003", name: "IFT-1003", color: "#2ECC71" };

export const TASKS_DATA: Task[] = [
    {
        id: "1",
        course: MAT130,
        description: "Standup équipe",
        start: new Date(2026, 4, 12, 9, 0),
        end: new Date(2026, 4, 12, 9, 30),
    },
    {
        id: "2",
        course: MAT160,
        description: "Review PR backend",
        start: new Date(2026, 4, 12, 14, 0),
        end: new Date(2026, 4, 12, 16, 0),
    },
    {
        id: "3",
        course: IFT2007,
        description: "Réunion design system",
        start: new Date(2026, 4, 13, 10, 0),
        end: new Date(2026, 4, 13, 11, 30),
    },
    {
        id: "4",
        course: IFT1003,
        description: "Déjeuner client",
        start: new Date(2026, 4, 13, 12, 0),
        end: new Date(2026, 4, 13, 14, 0),
    },
    {
        id: "5",
        course: MAT130,
        description: "Sprint planning",
        start: new Date(2026, 4, 14, 9, 0),
        end: new Date(2026, 4, 14, 12, 0),
    },
    {
        id: "6",
        course: IFT1003,
        description: "Formation TypeScript",
        start: new Date(2026, 4, 15, 14, 0),
        end: new Date(2026, 4, 15, 17, 0),
    },
    {
        id: "7",
        course: MAT160,
        description: "Retrospective",
        start: new Date(2026, 4, 16, 10, 0),
        end: new Date(2026, 4, 16, 11, 0),
    },
];