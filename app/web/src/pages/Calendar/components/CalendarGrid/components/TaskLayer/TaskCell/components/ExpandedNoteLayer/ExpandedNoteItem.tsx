import type { Note } from "../../../../../../../../../types/Note";
import { useNoteTooltip } from "../NoteTooltip/useNoteTooltip";
import { NoteTooltip } from "../NoteTooltip/NoteTooltip";

const CONTAINER_CLASS = 'note-expanded-text text-[14px] leading-[1.2] font-normal text-[#d8d8d8] px-[6px] py-[3px] overflow-hidden line-clamp-1 select-none bg-[rgba(211,211,211,0.158)]';

export const ExpandedNoteItem = ({ note }: { note: Note }) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            ref={iconRef}
            className={CONTAINER_CLASS}
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