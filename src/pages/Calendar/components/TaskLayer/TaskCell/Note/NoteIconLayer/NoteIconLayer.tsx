import type { Note } from "../../../../../../../types/Note";
import { NoteIconShip } from "../NoteIconShip/NoteIconShip";
import './NoteIconLayer.css';

const MAX_VISIBLE_ICONS = 3;

interface NoteIconLayerProps {
    notes: Note[];
}

export const NoteIconLayer = ({ notes }: NoteIconLayerProps) => {
    const visibleNotes = notes.slice(0, MAX_VISIBLE_ICONS);
    const hiddenCount = notes.length - visibleNotes.length;

    return (
        <div className='note-container'>
            {visibleNotes.map((n) => <NoteIconShip key={n.id} note={n} />)}
            {hiddenCount > 0 && (
                <span className='note-overflow-badge'>+{hiddenCount}</span>
            )}
        </div>
    )
}