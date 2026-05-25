import type { Note } from "../../../../../../../types/Note";
import { NoteIconShip } from "../NoteIconShip/NoteIconShip";
import './NoteIconLayer.css';

interface NoteIconLayerProps {
    notes: Note[];
}

export const NoteIconLayer = ({ notes }: NoteIconLayerProps) => {
    return (
        <div
            className='note-container'
        >
            {
                notes.length > 0 && notes.map((n) => <NoteIconShip key={n.id} note={n} />)
            }

        </div>
    )
}