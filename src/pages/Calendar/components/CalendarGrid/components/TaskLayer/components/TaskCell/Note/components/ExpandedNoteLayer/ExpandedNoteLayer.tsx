import type { RefObject } from "react";
import type { Note } from "../../../../../../../../../../../types/Note";
import { ExpandedNoteItem } from "./components/ExpandedNoteItem";

interface ExpandedNoteLayerProps {
    notes: Note[];
    noteRefs: RefObject<Map<string, HTMLDivElement>>;
}

export const ExpandedNoteLayer = ({ notes, noteRefs }: ExpandedNoteLayerProps) => {
    return (
        <div className='flex flex-col gap-[5px]'>
            {notes.map((n) => <ExpandedNoteItem key={n.id} note={n} noteRefs={noteRefs} />)}
        </div>
    );
};