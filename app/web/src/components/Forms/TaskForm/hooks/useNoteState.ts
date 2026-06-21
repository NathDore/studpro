import { useState } from "react";
import { useCreateNote } from "../../../../hooks/note/useCreateNote";
import { useRemoveNote } from "../../../../hooks/note/useRemoveNote";
import { useModifyNote } from "../../../../hooks/note/useModifyNote";
import type { Note } from "../../../../types/Note";

const NOTE_MAX_LENGTH = 3000;

export const useNoteState = (initialNotes: Note[], mode: 'create' | 'update') => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
    const [noteText, setNoteText] = useState<string>('');

    const { submit: submitCreate } = useCreateNote();
    const { submit: submitRemove } = useRemoveNote();
    const { submit: submitModify } = useModifyNote();

    const isNoteTextEmpty = noteText.trim() === '';
    const isNoteTextTooLong = noteText.length > NOTE_MAX_LENGTH;
    const isNoteTextValid = !isNoteTextEmpty && !isNoteTextTooLong;

    const onSelectNote = (note: Note) => {
        setSelectedNote(note);
        setNoteText(note.text);
    };

    const unSelectNote = () => {
        setSelectedNote(undefined);
        setNoteText('');
    };

    const clearNoteInput = () => {
        setNoteText('');
    }

    const onNoteTextChanged = (text: string) => {
        setNoteText(text);
    };

    const onAddNote = (note: Note) => {
        if (!isNoteTextValid) return;
        setNotes(prev => [...prev, note]);
        if (mode === 'update') {
            submitCreate(note.id, note.taskId, note.text);
        }
    }

    const onRemoveNote = (noteId: string) => {
        setNotes(prev => prev.filter(n => n.id !== noteId));
        if (mode === 'update') {
            submitRemove(noteId);
        }
        if (selectedNote?.id === noteId) {
            unSelectNote();
        }
    };

    const onEditNote = (updatedNote: Note) => {
        if (!isNoteTextValid) return;
        setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
        if (mode === 'update') {
            submitModify(updatedNote.id, updatedNote.taskId, updatedNote.text, updatedNote.isCompleted);
        }
    };

    const flushPendingNotes = () => {
        notes.forEach(note => submitCreate(note.id, note.taskId, note.text));
    };

    return {
        onAddNote,
        onRemoveNote,
        onEditNote,
        selectedNote,
        noteText,
        onSelectNote,
        unSelectNote,
        onNoteTextChanged,
        clearNoteInput,
        notes,
        flushPendingNotes
    }
}