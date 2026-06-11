import type { Note } from '../../../../../../types/Note'
import { NoteItem } from './NoteItem';

interface NoteListProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
}

const CONTAINER_CLASS = `flex flex-1 flex-col p-2 gap-[5px]`;

export const NoteList = ({ notes, onSelectNote, onRemoveNote }: NoteListProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            {
                notes.map(n => <NoteItem note={n} onSelectNote={onSelectNote} onRemoveNote={onRemoveNote} />)
            }
        </div>
    )
}
