import { Checkbox } from '../../../../components/Checkbox';
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../styles/styles-class';
import type { Note } from '../../../../types/Note'
import { useNoteItem } from './useNoteItem';

interface NoteItem {
    note: Note;
    taskId: string;
}

export const NoteItem = ({ note, taskId }: NoteItem) => {

    const { isChecked, onChecked } = useNoteItem({ note, taskId });

    return (
        <div className={`flex flex-row w-ful rounded-sm px-1.5 py-1.5 ${isChecked ? 'bg-green-300/60' : 'bg-gray-50/30'}`}>
            <div className='flex flex-85'>
                <p className={`${TEXT_COLOR_CLASS} ${TEXT_SIZE_CLASS} cursor-default select-none`}>
                    {
                        note.text
                    }
                </p>
            </div>

            <div className='flex flex-15 justify-end items-start'>
                <Checkbox checked={isChecked} onChange={onChecked} width={15} height={15} />
            </div>
        </div>
    )
}
