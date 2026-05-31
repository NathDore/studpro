import { useState } from "react";
import type { Note } from "../../../../../../../types/Note";

export const useNoteSection = (onConfirmNotes: (notes: Note[]) => void) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const onAddNote = (content: string) => {
        if (!content.trim()) return;
        const note: Note = {
            id: crypto.randomUUID(),
            text: content.trim(),
        };
        setNotes(prev => [...prev, note]);
    };

    const onRemoveNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const onConfirm = () => {
        onConfirmNotes(notes);
    };

    const onCancel = () => {
        setNotes([]);
    };

    return {
        notes,
        onAddNote,
        onRemoveNote,
        onConfirm,
        onCancel,
    };
};