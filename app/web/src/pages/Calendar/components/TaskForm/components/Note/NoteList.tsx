import type { Note } from '../../../../../../types/Note'
import { NoteItem } from './NoteItem';

interface NoteListProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
    selectedNote?: Note;
}

const FLEX_CLASS = `flex flex-col flex-90 sm:flex-90 md:flex-90 lg:flex-90 xl:flex-90 2xl:flex-90`;

export const NoteList = ({ notes, onSelectNote, onRemoveNote, selectedNote }: NoteListProps) => {
    return (
        <div className={`f${FLEX_CLASS} gap-1.25 rounded-lg overflow-y-auto bg-gray-100 p-0.5`}>
            {
                notes.map(n => <NoteItem key={n.id} note={n} onSelectNote={onSelectNote} onRemoveNote={onRemoveNote} isSelected={selectedNote ? selectedNote.id === n.id : false} />)
            }
        </div>
    )
}
