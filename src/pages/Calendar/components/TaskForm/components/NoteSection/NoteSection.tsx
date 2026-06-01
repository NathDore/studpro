import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useNoteSection } from './hook/useNoteSection'
import './NoteSection.css';
import type { Note } from '../../../../../../types/Note';
import { TrashIcon } from '../../../../../../components/icons/TrashIcon';

interface NoteSectionProps { }

export interface NoteSectionHandle {
    confirm: () => Note[];
}

export const NoteSection = forwardRef<NoteSectionHandle, NoteSectionProps>(
    ({ }, ref) => {
        const { notes, selectedNoteId, onAddNote, onRemoveNote, onSelectNote, onModifyNote, onCancelEdit } = useNoteSection();

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
            <div className='note-section'>
                <p>Notes</p>
                <div className='note-list'>
                    {notes.map(n =>
                        <div
                            key={n.id}
                            className={`note-item ${selectedNoteId === n.id ? 'note-item-selected' : ''}`}
                            onClick={() => handleSelectNote(n)}
                        >
                            <p className='note-item-text'>{n.text}</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveNote(n.id); }}
                                className='note-item-remove'
                            >
                                <TrashIcon className='note-item-remove-icon' />
                            </button>
                        </div>
                    )}
                </div>
                <div className='note-input-row'>
                    <textarea ref={textareaRef} className='note-textarea' />
                    <div className='note-actions'>
                        {selectedNoteId && (
                            <button onClick={handleModify} className='note-modify-button'>Modify note</button>
                        )}
                        <button onClick={handleAdd} className='note-add-button'>{selectedNoteId ? 'Cancel' : 'Add note'}</button>
                    </div>
                </div>
            </div>
        );
    }
);