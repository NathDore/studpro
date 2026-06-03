import type { Note } from "../../../../../../../../../../../types/Note";
import { ExpandedNoteItem } from "./components/ExpandedNoteItem";

const CONTAINER_CLASS = 'flex flex-col gap-[5px]';

interface ExpandedNoteLayerProps {
    notes: Note[];
}

export const ExpandedNoteLayer = ({ notes }: ExpandedNoteLayerProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            {notes.map((n) => <ExpandedNoteItem key={n.id} note={n} />)}
        </div>
    );
};