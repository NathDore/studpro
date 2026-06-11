import { MyButton } from '../../../../../../components/buttons/MyButton';
import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../../../styles/styles-class';
import type { Note } from '../../../../../../types/Note'

interface NoteInputProps {
    selectedNote?: Note;
    onAddNote: (note: Note) => void;
    onEditNote: (updatedNote: Note) => void;
    unSelectNote: () => void;
    noteText: string;
    onNoteTextChanged: (text: string) => void;
}

export const NoteInput = ({ selectedNote, onAddNote, onEditNote, unSelectNote, noteText, onNoteTextChanged }: NoteInputProps) => {

    const handleAddNote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (selectedNote) {
            onEditNote({ id: selectedNote.id, text: noteText });
            unSelectNote();
        } else
            onAddNote({ id: crypto.randomUUID(), text: noteText });

        unSelectNote();
        onNoteTextChanged('');
    }

    const handleOnNoteTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onNoteTextChanged(e.target.value);
    }

    return (
        <div className={`flex-30 flex flex-row gap-1.5`}>
            <textarea className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} ${BORDER_CLASS} rounded-md flex-1 p-3 outline-none focus:border-gray-500`}
                value={noteText}
                onChange={handleOnNoteTextChanged}
            />
            <div className={`flex flex-col justify-end`}>
                <MyButton className={`w-30 h-10 flex justify-center items-center`} onClick={handleAddNote}>
                    <p className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS}`}>{selectedNote ? 'Modify' : 'Add'}</p>
                </MyButton>
            </div>
        </div>
    )
}