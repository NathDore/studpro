import { create } from 'zustand';
import type { Note } from '../types/Note';

interface NoteStore {
    notes: Note[];
    addNote: (note: Note) => void;
    updateNote: (updatedNote: Note) => void;
    removeNote: (noteId: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    notes: [],

    addNote: (note) => set((state) => ({
        notes: [...state.notes, note]
    })),

    updateNote: (updatedNote: Note) => set((state) => ({
        notes: state.notes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
        )
    })),

    removeNote: (noteId: string) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId)
    })),
}));