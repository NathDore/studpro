import { useState } from "react";
import type { Note } from "../../../../../types/Note"

interface UseNoteStateProps {
    initialNotes?: Note[];
}

const NOTE_MAX_LENGTH = 300;

const DEFAULT_NOTES: Note[] = [
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

export const useNoteState = ({ initialNotes }: UseNoteStateProps) => {
    const [notes, setNotes] = useState<Note[]>(initialNotes ?? DEFAULT_NOTES);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
    const [noteText, setNoteText] = useState<string>('');

    const isNoteTextEmpty = noteText.trim() === '';
    const isNoteTextTooLong = noteText.length > NOTE_MAX_LENGTH;
    const isNoteTextValid = !isNoteTextEmpty && !isNoteTextTooLong;

    const onAddNote = (note: Note) => {
        if (!isNoteTextValid) return;
        setNotes(prev => [...prev, note]);
    };

    const onRemoveNote = (noteId: string) => {
        setNotes(prev => prev.filter(n => n.id !== noteId));
    };

    const onEditNote = (updatedNote: Note) => {
        if (!isNoteTextValid) return;
        setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
    };

    const onSelectNote = (note: Note) => {
        setSelectedNote(note);
        setNoteText(note.text);
    };

    const unSelectNote = () => {
        setSelectedNote(undefined);
        setNoteText('');
    };

    const onNoteTextChanged = (text: string) => {
        setNoteText(text);
    };

    return {
        notes,
        onAddNote,
        onRemoveNote,
        onEditNote,
        selectedNote,
        onSelectNote,
        unSelectNote,
        noteText,
        onNoteTextChanged,
        isNoteTextValid,
        isNoteTextTooLong,
        NOTE_MAX_LENGTH,
    };
};