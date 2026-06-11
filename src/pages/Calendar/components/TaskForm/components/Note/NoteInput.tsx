import type { Note } from '../../../../../../types/Note'

interface NoteInputProps {
    selectedNote?: Note;
    onAddNote: (note: Note) => void;
    onEditNote: (updatedNote: Note) => void;
    unSelectNote: () => void;
}

export const NoteInput = ({ selectedNote, onAddNote, onEditNote, unSelectNote }: NoteInputProps) => {
    return (
        <div>NoteInput</div>
    )
}
