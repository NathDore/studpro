import { useEffect, useRef, useState } from 'react';
import type { Task } from '../../../../../types/Task';
import './TaskCell.css';
import type { TaskPosition } from './utils/taskUtils';

interface TaskCellProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
    isResizing: React.MutableRefObject<boolean>
    onResizeTop: (e: MouseEvent, task: Task, position: TaskPosition) => void;
    onResizeBottom: (e: MouseEvent, task: Task, position: TaskPosition) => void;
}

export const TaskCell = ({ position, task, onTaskCellClick, isResizing, onResizeTop, onResizeBottom }: TaskCellProps) => {

    const textRef = useRef<HTMLParagraphElement>(null);
    const [displayText, setDisplayText] = useState(true);

    useEffect(() => {
        if (!textRef.current) return;
        setDisplayText(textRef.current?.scrollHeight <= textRef.current?.clientHeight);
    }, [position]);

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
            <div ref={textRef} style={{ backgroundColor: task.course.color }} className='task'>
                <p className='task-text task-name user-select-none'>{task.course.name}</p>
                <div style={{ height: 2 }} />
                {
                    <p className='task-text user-select-none' style={{ visibility: displayText ? 'visible' : 'hidden' }}>
                        {task.description}
                    </p>
                }
            </div>
            <div onMouseDown={(e) => onResizeBottom(e.nativeEvent, task, position)} className='resize-bar  resize-bar-bottom'>
                <div className='visual-resize-bar' />
            </div>
        </div>
    )
}