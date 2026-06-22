import { Checkbox } from '../../../components/Checkbox'
import { useTaskWithRelations } from '../../../hooks/useTaskWithRelations';
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../styles/styles-class'
import { NoteItem } from './NoteItem/NoteItem'

interface TaskCardProps {
    taskId: string;
}

const USE_CHECKBOX = false;

export const TaskCard = ({ taskId }: TaskCardProps) => {

    const task = useTaskWithRelations(taskId);
    if (!task) return null;

    const { isCompleted, course } = task;

    if (!course) return null;

    return (
        <div className={`flex flex-col w-full rounded-sm px-1.5 py-1.5 gap-2.5`} style={{ backgroundColor: isCompleted ? '#5edc8a' : course.color }}>

            <div className='flex flex-row w-full justify-between'>
                <p className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium text-[15px] cursor-default select-none`}>{course.name}</p>
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
