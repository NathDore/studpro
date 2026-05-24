import { useRef } from 'react';
import type { Task } from '../../../../../types/Task';
import './TaskCell.css';
import type { TaskPosition } from './utils/taskUtils';
import { NotesIcon } from '../../../../../components/icons/NotesIcon';
import { fromDate, toMinutes } from '../../../utils/timeUtils';

interface TaskCellProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
    isResizing: React.RefObject<boolean>
    onResizeTop: (e: MouseEvent, task: Task, position: TaskPosition) => void;
    onResizeBottom: (e: MouseEvent, task: Task, position: TaskPosition) => void;
}

export const TaskCell = ({ position, task, onTaskCellClick, isResizing, onResizeTop, onResizeBottom }: TaskCellProps) => {
    const textRef = useRef<HTMLParagraphElement>(null);

    const durationMinutes = toMinutes(fromDate(task.end)) - toMinutes(fromDate(task.start));
    const showIcon = durationMinutes <= 60;
    return (
        <div onMouseUp={(e) => {
            if (isResizing.current) return;
            onTaskCellClick(task);
        }}
            key={task.id}
            className='task-wrapper'
            style={{ left: position.left, top: position.top, height: position.height, width: position.width }}>

            <div onMouseDown={(e) => onResizeTop(e.nativeEvent, task, position)} className='resize-bar resize-bar-top'>
                <div className='visual-resize-bar' />
            </div>
            <div style={{ backgroundColor: task.course.color }} className='task'>
                <p className='task-text task-name user-select-none'>{task.course.name}</p>
                <div style={{ height: 2 }} />
                <p
                    ref={textRef}
                    className='task-text task-description user-select-none'
                    style={{ display: showIcon ? 'none' : undefined }}
                >
                    {task.description}
                </p>
                {showIcon && <NotesIcon className='notes-icon' />}
            </div>
            <div onMouseDown={(e) => onResizeBottom(e.nativeEvent, task, position)} className='resize-bar  resize-bar-bottom'>
                <div className='visual-resize-bar' />
            </div>
        </div>
    )
}