import { NotesIcon } from "../../../../../../../../../../../../components/icons/NotesIcon";
import { useNoteTooltip } from "../../NoteTooltip/hook/useNoteTooltip";
import { NoteTooltip } from "../../NoteTooltip/NoteTooltip";
import type { Note } from "../../../../../../../../../../../../types/Note";

interface NoteIconShipProps {
    note: Note;
}

export const NoteIconShip = ({ note }: NoteIconShipProps) => {
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    return (
        <div
            className="flex justify-center items-center"
            ref={iconRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NotesIcon className='w-5 h-5 cursor-pointer stroke-[1.1px] text-[#d8d8d8] bg-[#c7c7c73a]' />
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