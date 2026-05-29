import type { RefObject } from "react";
import type { Note } from "../../../../../../../types/Note";
import { useNoteTooltip } from "../NoteTooltip/hook/useNoteTooltip";
import { NoteTooltip } from "../NoteTooltip/NoteTooltip";
import './ExpandedNoteLayer.css';

interface ExpandedNoteLayerProps {
    notes: Note[];
    noteRefs: RefObject<Map<string, HTMLDivElement>>
}

const ExpandedNoteItem = ({ note, noteRefs }: { note: Note; noteRefs: RefObject<Map<string, HTMLDivElement>> }) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            ref={(el) => {
                if (el) {
                    noteRefs.current.set(note.id, el);
                    (iconRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                }
            }}
            className='note-expanded-text'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {note.text}
            {tooltipPos && (
                <NoteTooltip description={note.text} top={tooltipPos.top} left={tooltipPos.left} />
            )}
        </div>
    );
};

export const ExpandedNoteLayer = ({ notes, noteRefs }: ExpandedNoteLayerProps) => {
    return (
        <div className='expanded-container'>
            {notes.map((n) => <ExpandedNoteItem key={n.id} note={n} noteRefs={noteRefs} />)}
        </div>
    )
}