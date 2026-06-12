import { useState } from "react";
import type { Note } from "../../../../../types/Note"

interface UseNoteStateProps {
    initialNotes?: Note[];
}

const NOTE_MAX_LENGTH = 300;

export const useNoteState = ({ initialNotes }: UseNoteStateProps) => {
    const [notes, setNotes] = useState<Note[]>(initialNotes ?? []);
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