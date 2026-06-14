import type { Note } from "../../../../../../../../../types/Note";
import { NoteIconShip } from "./NoteIconShip";

const MAX_VISIBLE_ICONS = 1;

const CONTAINER_CLASS = 'flex flex-row gap-[2px] text-[#d8d8d8]';
const HIDDEN_COUNT_CLASS = 'text-[10px] font-semibold text-inherit opacity-80 self-center px-[2px] whitespace-nowrap';

interface NoteIconLayerProps {
    notes: Note[];
}

export const NoteIconLayer = ({ notes }: NoteIconLayerProps) => {
    const visibleNotes = notes.slice(0, MAX_VISIBLE_ICONS);
    const hiddenCount = notes.length - visibleNotes.length;

    return (
        <div className={CONTAINER_CLASS}>
            {visibleNotes.map((n) => <NoteIconShip key={n.id} note={n} />)}
            {hiddenCount > 0 && (
                <span className={HIDDEN_COUNT_CLASS}>
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};