import { NotesIcon } from "../../../../../../../../../components/icons/NotesIcon";
import { useNoteTooltip } from "../NoteTooltip/hooks/useNoteTooltip";
import { NoteTooltip } from "../NoteTooltip/NoteTooltip";
import type { Note } from "../../../../../../../../../types/Note";

const CONTAINER_CLASS = 'flex justify-center items-center';
const ICON_CLASS = 'w-5 h-5 cursor-pointer stroke-[1.1px] text-[#d8d8d8] bg-[#c7c7c73a]';

interface NoteIconShipProps {
    note: Note;
}

export const NoteIconShip = ({ note }: NoteIconShipProps) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            className={CONTAINER_CLASS}
            ref={iconRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NotesIcon className={ICON_CLASS} />
            {tooltipPos && (
                <NoteTooltip
                    description={note.text}
                    top={tooltipPos.top}
                    left={tooltipPos.left}
                />
            )}
        </div>
    );
};