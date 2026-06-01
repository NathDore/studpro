import { NotesIcon } from "../../../../../../../../components/icons/NotesIcon";
import type { Note } from "../../../../../../../../types/Note";
import { useNoteTooltip } from "../NoteTooltip/hook/useNoteTooltip";
import { NoteTooltip } from "../NoteTooltip/NoteTooltip";
import './NoteIconShip.css';

interface NoteIconShipProps {
    note: Note;
}

export const NoteIconShip = ({ note }: NoteIconShipProps) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            className="note-icon"
            ref={iconRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <NotesIcon className='note-icon' />

            {
                tooltipPos && (
                    <NoteTooltip
                        description={note.text}
                        top={tooltipPos.top}
                        left={tooltipPos.left}
                    />
                )}
        </div>
    )
}