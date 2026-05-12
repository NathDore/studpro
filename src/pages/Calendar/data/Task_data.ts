import type { Task } from "../../../types/Task";

export const TASKS_DATA: Task[] = [
    {
        id: "1",
        description: "Standup équipe",
        color: "#4A90D9",
        start: new Date(2026, 4, 12, 9, 0),
        end: new Date(2026, 4, 12, 9, 30),
    },
    {
        id: "2",
        description: "Review PR backend",
        color: "#E67E22",
        start: new Date(2026, 4, 12, 14, 0),
        end: new Date(2026, 4, 12, 16, 0),
    },
    {
        id: "3",
        description: "Réunion design system",
        color: "#9B59B6",
        start: new Date(2026, 4, 13, 10, 0),
        end: new Date(2026, 4, 13, 11, 30),
    },
    {
        id: "4",
        description: "Déjeuner client",
        color: "#2ECC71",
        start: new Date(2026, 4, 13, 12, 0),
        end: new Date(2026, 4, 13, 14, 0),
    },
    {
        id: "5",
        description: "Sprint planning",
        color: "#E74C3C",
        start: new Date(2026, 4, 14, 9, 0),
        end: new Date(2026, 4, 14, 12, 0),
    },
    {
        id: "6",
        description: "Formation TypeScript",
        color: "#1ABC9C",
        start: new Date(2026, 4, 15, 14, 0),
        end: new Date(2026, 4, 15, 17, 0),
    },
    {
        id: "7",
        description: "Retrospective",
        color: "#F39C12",
        start: new Date(2026, 4, 16, 10, 0),
        end: new Date(2026, 4, 16, 11, 0),
    },
];