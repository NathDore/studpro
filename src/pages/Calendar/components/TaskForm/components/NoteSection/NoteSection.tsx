import { useRef } from 'react';
import { useNoteSection } from './hook/useNoteSection'
import './NoteSection.css';
import type { Note } from '../../../../../../types/Note';

interface NoteSectionProps {
    onConfirmNotes: (notes: Note[]) => void;
}

export const NoteSection = ({ onConfirmNotes }: NoteSectionProps) => {
    const {
        notes,
        onAddNote,
        onRemoveNote
    } = useNoteSection(onConfirmNotes);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleAdd = () => {
        if (!textareaRef.current) return;
        onAddNote(textareaRef.current.value);
        textareaRef.current.value = '';
    };

    return (
        <div className='note-section'>
            <p>Notes</p>
            <div className='note-list'>
                {
                    notes.map(n =>
                        <div key={n.id} className='note-item'>
                            <p className='note-item-text'>{n.text}</p>
                            <button onClick={() => onRemoveNote(n.id)} className='note-item-remove'>Delete</button>
                        </div>
                    )
                }
            </div>

            <div className='note-input-row'>
                <textarea ref={textareaRef} className='note-textarea' />
                <button onClick={handleAdd} className='note-add-button'>Add note</button>
            </div>

        </div>
    )
}