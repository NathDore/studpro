import { useState } from "react";
import type { Note } from "../../../../../../../types/Note";

export const useNoteSection = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

    const onAddNote = (content: string) => {
        if (!content.trim()) return;
        const note: Note = {
            id: crypto.randomUUID(),
            text: content.trim(),
        };
        setNotes(prev => [...prev, note]);
    };

    const onRemoveNote = (id: string) => {
        if (selectedNoteId === id) setSelectedNoteId(null);
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const onSelectNote = (id: string) => {
        setSelectedNoteId(id);
    };

    const onModifyNote = (content: string) => {
        if (!selectedNoteId || !content.trim()) return;
        setNotes(prev => prev.map(note =>
            note.id === selectedNoteId ? { ...note, text: content.trim() } : note
        ));
        setSelectedNoteId(null);
    };

    const onCancelEdit = () => {
        setSelectedNoteId(null);
    };

    const onCancel = () => {
        setNotes([]);
        setSelectedNoteId(null);
    };

    return {
        notes,
        selectedNoteId,
        onAddNote,
        onRemoveNote,
        onSelectNote,
        onModifyNote,
        onCancelEdit,
        onCancel,
    };
};