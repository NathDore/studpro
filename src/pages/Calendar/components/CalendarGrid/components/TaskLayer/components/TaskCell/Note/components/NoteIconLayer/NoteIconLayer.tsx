import type { Note } from "../../../../../../../../../../../types/Note";
import { NoteIconShip } from "./components/NoteIconShip";

const MAX_VISIBLE_ICONS = 1;

interface NoteIconLayerProps {
    notes: Note[];
}

export const NoteIconLayer = ({ notes }: NoteIconLayerProps) => {
    const visibleNotes = notes.slice(0, MAX_VISIBLE_ICONS);
    const hiddenCount = notes.length - visibleNotes.length;

    return (
        <div className='flex flex-row gap-[2px] text-[#d8d8d8]'>
            {visibleNotes.map((n) => <NoteIconShip key={n.id} note={n} />)}
            {hiddenCount > 0 && (
                <span className='text-[10px] font-semibold text-inherit opacity-80 self-center px-[2px] whitespace-nowrap'>
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};