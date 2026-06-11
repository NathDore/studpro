import { TrashIcon } from '../../../../../../components/icons/TrashIcon';
import type { Note } from '../../../../../../types/Note'

interface NoteItemProps {
    note: Note;
    onSelectNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
}

const CONTAINER_CLASS = `flex flex-row items-center justify-between gap-5 border rounded-[6px] px-[10px] py-2 cursor-pointer`;
const TEXT_CLASS = `text-[13px]`;
const REMOVE_BUTTON_CLASS = 'shrink-0 cursor-pointer text-[#888780] hover:text-[#C0392B]';
const TRASH_ICON_CLASS = 'w-[15px] h-[15px] block';

export const NoteItem = ({ note, onSelectNote, onRemoveNote }: NoteItemProps) => {
    return (
        <div key={note.id} className={CONTAINER_CLASS}>
            <p className={TEXT_CLASS}>{note.text}</p>
            <button
                onClick={(e) => { e.stopPropagation(); }}
                className={REMOVE_BUTTON_CLASS}
            >
                <TrashIcon className={TRASH_ICON_CLASS} />
            </button>
        </div>
    )
}
