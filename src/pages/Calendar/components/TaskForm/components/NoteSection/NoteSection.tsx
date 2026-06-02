import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useNoteSection } from './hook/useNoteSection';
import './NoteSection.css';
import type { Note } from '../../../../../../types/Note';
import { TrashIcon } from '../../../../../../components/icons/TrashIcon';

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
            <div className='flex flex-col gap-[6px]'>
                <p className='text-[14px] font-medium text-[#2C2C2A] select-none cursor-default'>Notes</p>

                {/* Note list */}
                <div className='note-list flex flex-col gap-[6px] max-h-[200px] overflow-y-auto'>
                    {notes.map(n => (
                        <div
                            key={n.id}
                            className={`flex items-start justify-between gap-2 border rounded-[6px] px-[10px] py-2 cursor-pointer
                                ${selectedNoteId === n.id
                                    ? 'border-[#8FACBD] bg-[#ddeaf1]'
                                    : 'border-[#D3D1C7] bg-[#F1EFE8]'
                                }`}
                            onClick={() => handleSelectNote(n)}
                        >
                            <p className='text-[14px] font-normal text-[#2C2C2A] leading-[1.4] flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0'>
                                {n.text}
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveNote(n.id); }}
                                className='shrink-0 cursor-pointer text-[#888780] hover:text-[#C0392B]'
                            >
                                <TrashIcon className='w-[15px] h-[15px] block' />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className='flex gap-2 items-end'>
                    <textarea
                        ref={textareaRef}
                        className='flex-1 min-h-[64px] resize-y px-[10px] py-[9px] border border-gray-300 rounded-[5px] font-[inherit] text-[14px] text-[#2C2C2A] leading-[1.4] hover:border-gray-400 focus:outline-none'
                    />
                    <div className='flex flex-col gap-[6px]'>
                        {selectedNoteId && (
                            <button
                                onClick={handleModify}
                                className='shrink-0 px-3 py-[7px] border border-[#8FACBD] rounded-[5px] bg-white cursor-pointer text-[14px] font-medium text-[#2C2C2A] hover:border-[#4A7C99]'
                            >
                                Modify note
                            </button>
                        )}
                        <button
                            onClick={handleAdd}
                            className='shrink-0 px-3 py-[7px] border border-gray-300 rounded-[5px] bg-white cursor-pointer text-[14px] font-medium text-[#2C2C2A] hover:border-gray-400'
                        >
                            {selectedNoteId ? 'Cancel' : 'Add note'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);