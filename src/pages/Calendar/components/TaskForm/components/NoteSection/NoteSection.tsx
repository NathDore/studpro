import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useNoteSection } from './hook/useNoteSection';
import type { Note } from '../../../../../../types/Note';
import { TrashIcon } from '../../../../../../components/icons/TrashIcon';

const CONTAINER_CLASS = 'flex flex-col gap-[6px]';
const LABEL_CLASS = 'text-[14px] font-medium text-[#2C2C2A] select-none cursor-default';
const NOTE_LIST_CLASS = 'flex flex-col gap-[6px] max-h-[200px] overflow-y-auto';
const NOTE_ITEM_BASE_CLASS = 'flex items-start justify-between gap-2 border rounded-[6px] px-[10px] py-2 cursor-pointer';
const NOTE_ITEM_SELECTED_CLASS = 'border-[#8FACBD] bg-[#ddeaf1]';
const NOTE_ITEM_DEFAULT_CLASS = 'border-[#D3D1C7] bg-[#F1EFE8]';
const NOTE_TEXT_CLASS = 'text-[14px] font-normal text-[#2C2C2A] leading-[1.4] flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0';
const NOTE_REMOVE_BUTTON_CLASS = 'shrink-0 cursor-pointer text-[#888780] hover:text-[#C0392B]';
const TRASH_ICON_CLASS = 'w-[15px] h-[15px] block';
const INPUT_ROW_CLASS = 'flex gap-2 items-end';
const TEXTAREA_CLASS = 'flex-1 min-h-[64px] resize-y px-[10px] py-[9px] border border-gray-300 rounded-[5px] font-[inherit] text-[14px] text-[#2C2C2A] leading-[1.4] hover:border-gray-400 focus:outline-none';
const BUTTON_COL_CLASS = 'flex flex-col gap-[6px]';
const MODIFY_BUTTON_CLASS = 'shrink-0 px-3 py-[7px] border border-[#8FACBD] rounded-[5px] bg-white cursor-pointer text-[14px] font-medium text-[#2C2C2A] hover:border-[#4A7C99]';
const ADD_BUTTON_CLASS = 'shrink-0 px-3 py-[7px] border border-gray-300 rounded-[5px] bg-white cursor-pointer text-[14px] font-medium text-[#2C2C2A] hover:border-gray-400';

interface NoteSectionProps {
    initialNotes?: Note[];
}

export interface NoteSectionHandle {
    confirm: () => Note[];
}

export const NoteSection = forwardRef<NoteSectionHandle, NoteSectionProps>(
    ({ initialNotes }, ref) => {
        const { notes, selectedNoteId, onAddNote, onRemoveNote, onSelectNote, onModifyNote, onCancelEdit } = useNoteSection({ initialNotes });

        useImperativeHandle(ref, () => ({
            confirm: () => notes
        }));

        const textareaRef = useRef<HTMLTextAreaElement>(null);

        const handleSelectNote = (note: Note) => {
            onSelectNote(note.id);
            if (textareaRef.current) {
                textareaRef.current.value = note.text;
            }
        };

        const handleModify = () => {
            if (!textareaRef.current) return;
            onModifyNote(textareaRef.current.value);
            textareaRef.current.value = '';
        };

        const handleAdd = () => {
            if (selectedNoteId) {
                onCancelEdit();
                if (textareaRef.current) textareaRef.current.value = '';
                return;
            }
            if (!textareaRef.current) return;
            onAddNote(textareaRef.current.value);
            textareaRef.current.value = '';
        };

        return (
            <div className={CONTAINER_CLASS}>
                <p className={LABEL_CLASS}>Notes</p>

                {/* Note list */}
                <div className={NOTE_LIST_CLASS}>
                    {notes.map(n => (
                        <div
                            key={n.id}
                            className={`${NOTE_ITEM_BASE_CLASS} ${selectedNoteId === n.id ? NOTE_ITEM_SELECTED_CLASS : NOTE_ITEM_DEFAULT_CLASS}`}
                            onClick={() => handleSelectNote(n)}
                        >
                            <p className={NOTE_TEXT_CLASS}>{n.text}</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveNote(n.id); }}
                                className={NOTE_REMOVE_BUTTON_CLASS}
                            >
                                <TrashIcon className={TRASH_ICON_CLASS} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className={INPUT_ROW_CLASS}>
                    <textarea ref={textareaRef} className={TEXTAREA_CLASS} />
                    <div className={BUTTON_COL_CLASS}>
                        {selectedNoteId && (
                            <button onClick={handleModify} className={MODIFY_BUTTON_CLASS}>
                                Modify note
                            </button>
                        )}
                        <button onClick={handleAdd} className={ADD_BUTTON_CLASS}>
                            {selectedNoteId ? 'Cancel' : 'Add note'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);