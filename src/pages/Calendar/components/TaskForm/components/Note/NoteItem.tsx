import { MyButton } from '../../../../../../components/buttons/MyButton';
import { TrashIcon } from '../../../../../../components/icons/TrashIcon';
import { BORDER_CLASS, TEXT_SIZE_CLASS } from '../../../../../../styles/styles-class';
import type { Note } from '../../../../../../types/Note'

interface NoteItemProps {
    note: Note;
    onSelectNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
    isSelected: boolean;
}

export const NoteItem = ({ note, onSelectNote, onRemoveNote, isSelected }: NoteItemProps) => {

    const handleSelectNote = () => {
        onSelectNote(note)
    }

    const handleOnDeleteNote = (e: any) => {
        e.stopPropagation();
        onRemoveNote(note.id);
    }

    return (
        <div onClick={handleSelectNote} className={`flex flex-row items-center justify-between gap-5 ${BORDER_CLASS} rounded-md px-2.5 py-2 cursor-pointer ${isSelected ? 'border-[#8FACBD] bg-[#ddeaf1]' : ''}`}>
            <p className={`${TEXT_SIZE_CLASS} select-none`}>{note.text}</p>
            <MyButton onClick={handleOnDeleteNote} className={`border-none`}>
                <TrashIcon className={'w-3.75 h-3.75 block text-[#C0392B]'} />
            </MyButton>
        </div>
    )
}
