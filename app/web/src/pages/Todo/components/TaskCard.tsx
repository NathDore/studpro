import { Checkbox } from '../../../components/Checkbox'
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../styles/styles-class'
import type { Task } from '../../../types/Task'
import { NoteItem } from './NoteItem/NoteItem'

interface TaskCardProps {
    task: Task
}

const USE_CHECKBOX = false;

export const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <div className={`flex flex-col w-full rounded-sm px-1.5 py-1.5 gap-2.5`} style={{ backgroundColor: task.isCompleted ? '#5edc8a' : task.course.color }}>

            <div className='flex flex-row w-full justify-between'>
                <p className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium text-[15px] cursor-default select-none`}>{task.course.name}</p>
                {
                    USE_CHECKBOX && <Checkbox checked={false} onChange={() => console.log('Has been checked')} />
                }
            </div>

            <div className='flex flex-1 flex-col gap-1.5'>
                {
                    task.notes.map(n => <NoteItem key={n.id} note={n} taskId={task.id} />)
                }
            </div>
        </div >
    )
}
