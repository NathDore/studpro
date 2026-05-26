import type { RefObject } from "react";
import type { Note } from "../../../../../../../types/Note";
import './ExpandedNoteLayer.css';

interface ExpandedNoteLayerProps {
    notes: Note[];
    noteRefs: RefObject<Map<string, HTMLDivElement>>
}

export const ExpandedNoteLayer = ({ notes, noteRefs }: ExpandedNoteLayerProps) => {
    return (
        <div className='expanded-container'>
            {notes.map((n) => <div ref={(el) => { if (el) noteRefs.current.set(n.id, el); }} className='note-expanded-text' key={n.id}>{n.text}</div>)}
        </div>
    )
}