import type { RefObject } from "react";
import type { Note } from "../../../../../../../../../../../../types/Note";
import { useNoteTooltip } from "../../NoteTooltip/hook/useNoteTooltip";
import { NoteTooltip } from "../../NoteTooltip/NoteTooltip";

export const ExpandedNoteItem = ({ note, noteRefs }: { note: Note; noteRefs: RefObject<Map<string, HTMLDivElement>> }) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            ref={(el) => {
                if (el) {
                    noteRefs.current.set(note.id, el);
                    (iconRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                }
            }}
            className='note-expanded-text text-[14px] leading-[1.1] font-normal text-[#d8d8d8] px-[6px] py-[3px] overflow-hidden line-clamp-5 select-none bg-[rgba(211,211,211,0.158)]'
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
