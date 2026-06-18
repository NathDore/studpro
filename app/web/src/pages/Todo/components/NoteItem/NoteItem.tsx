import { Checkbox } from '../../../../components/Checkbox';
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../styles/styles-class';
import type { Note } from '../../../../types/Note'

interface NoteItem {
    note: Note;
}

export const NoteItem = ({ note }: NoteItem) => {
    return (
        <div className={`flex flex-row w-ful rounded-sm px-1.5 py-1.5 bg-gray-50/30`}>
            <div className='flex flex-85'>
                <p className={`${TEXT_COLOR_CLASS} ${TEXT_SIZE_CLASS} cursor-default select-none`}>
                    {
                        note.text
                    }
                </p>
            </div>

            <div className='flex flex-15 justify-end items-start'>
                <Checkbox checked={false} onChange={() => console.log('Has been checked')} width={15} height={15} />
            </div>
        </div>
    )
}
