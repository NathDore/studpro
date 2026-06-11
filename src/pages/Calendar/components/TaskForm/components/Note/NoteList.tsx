import type { Note } from '../../../../../../types/Note'
import { NoteItem } from './NoteItem';

interface NoteListProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
    selectedNote?: Note;
}

export const NoteList = ({ notes, onSelectNote, onRemoveNote, selectedNote }: NoteListProps) => {
    return (
        <div className={`flex flex-col gap-1.25 rounded-lg h-50 overflow-y-auto`}>
            {
                notes.map(n => <NoteItem key={n.id} note={n} onSelectNote={onSelectNote} onRemoveNote={onRemoveNote} isSelected={selectedNote ? selectedNote.id === n.id : false} />)
            }
        </div>
    )
}
