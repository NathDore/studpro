import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../styles/styles-class'
import { NoteItem } from './NoteItem/NoteItem'
import type { Note } from '../../../types/Note';
import { MyButton } from '../../../components/MyButton';
import { useTaskCard } from './hook/useTaskCard';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { CollapseIcon } from '../../../components/icons/CollapseIcon';
import { ExpandIcon } from '../../../components/icons/ExpandIcon';
import { NoteIconShip } from '../../Calendar/components/CalendarGrid/components/TaskLayer/TaskCell/components/NoteIconLayer/NoteIconShip';

interface TaskCardProps {
    taskId: string;
}

export const TaskCard = ({ taskId }: TaskCardProps) => {
    const data = useTaskCard(taskId);
    if (!data) return null;

    const {
        task,
        isCompleted,
        course,
        isExpanded,
        onExpand,
        onRemove
    } = data;

    return (
        <div className={`flex flex-col w-full rounded-sm px-1.5 py-1.5 gap-2.5`} style={{ backgroundColor: isCompleted ? '#5edc8a' : course.color }}>

            <div className='flex flex-row w-full justify-between'>
                <p className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium text-[15px] cursor-default select-none`}>{course.name}</p>
                {
                    isCompleted && <ButtonLayout isExpanded={isExpanded} onExpand={onExpand} onRemove={onRemove} />
                }
            </div>

            {
                isExpanded ? <ExpandedLayout notes={task.notes} taskId={task.id} /> : <CollapsedLayout notes={task.notes} />
            }

        </div >
    )
}

interface ExpandedLayoutProps {
    notes: Note[];
    taskId: string;
}

export const ExpandedLayout = ({ notes, taskId }: ExpandedLayoutProps) => {
    return (
        <div className='flex flex-1 flex-col gap-1.5'>
            {
                notes.map(n => <NoteItem key={n.id} note={n} taskId={taskId} />)
            }
        </div>
    )
}

interface CollapsedLayoutProps {
    notes: Note[];
}

const MAX_VISIBLE_ICONS = 7;

export const CollapsedLayout = ({ notes }: CollapsedLayoutProps) => {
    const visibleNotes = notes.slice(0, MAX_VISIBLE_ICONS);

    return (
        <div className='flex flex-1 flex-row gap-1.5'>
            {visibleNotes.map((n) => <NoteIconShip key={n.id} note={n} />)}
        </div>
    )
}

interface ButtonLayoutProps {
    isExpanded: boolean;
    onExpand: (value: boolean) => void;
    onRemove: () => void;
}

export const ButtonLayout = ({ isExpanded, onExpand, onRemove }: ButtonLayoutProps) => {

    const handleClick = () => {
        if (isExpanded) {
            onExpand(false);
        } else onExpand(true);
    }

    return (
        <div className='flex flex-row'>
            <MyButton onClick={handleClick}>{isExpanded ? <CollapseIcon className='w-2 h-2' /> : <ExpandIcon className='w-2 h-2' />}</MyButton>
            <MyButton className='border-none' onClick={onRemove}><TrashIcon className='w-4 h-4 text-red-500' /></MyButton>
        </div>
    )
}