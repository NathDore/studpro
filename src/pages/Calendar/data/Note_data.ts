import type { Note } from "../../../types/Note";

export const notes = [
    { id: crypto.randomUUID(), text: 'Review the lecture slides from week 6. Write a short summary (1-2 paragraphs) on the main differences between supervised and unsupervised learning. Make sure to include at least 2 examples for each.' },
    {
        id: crypto.randomUUID(), text: 'Complete exercises 3.1 to 3.5. Show all steps and calculations. Due before next Thursday class.'
    },
    { id: crypto.randomUUID(), text: 'Read chapter 4 and take notes on the key concepts.' },
    { id: crypto.randomUUID(), text: 'Fifth note to test.' },
]

export const DEFAULT_NOTES: Note[] = [
    {
        id: "default-note-1",
        text: "Review the lecture slides from week 6. Write a short summary (1-2 paragraphs) on the main differences between supervised and unsupervised learning. Make sure to include at least 2 examples for each.",
    },
    {
        id: "default-note-2",
        text: "Complete exercises 3.1 to 3.5. Show all steps and calculations. Due before next Thursday's class.",
    },
    {
        id: "default-note-3",
        text: "Read chapter 4 and take notes on the key concepts.",
    },
];