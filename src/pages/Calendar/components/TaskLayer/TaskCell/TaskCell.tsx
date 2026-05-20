import { useEffect, useRef, useState } from 'react';
import type { Task } from '../../../../../types/Task';
import './TaskCell.css';
import { useTaskCell } from './hook/useTaskCell';
import type { TaskPosition } from './utils/taskUtils';

interface TaskCellProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
}

export const TaskCell = ({ position, task, onTaskCellClick }: TaskCellProps) => {
    const { getDarkerColor, cellHeight, setCellHeight, onResizeTop, onResizeBottom, cellTopPosition, setCellTopPosition, wasResizing } = useTaskCell({ initialHeight: position.height, initialTopPosition: position.top });

    const textRef = useRef<HTMLParagraphElement>(null);
    const [displayText, setDisplayText] = useState(true);

    useEffect(() => {
        if (!textRef.current) return;
        setDisplayText(textRef.current?.scrollHeight <= textRef.current?.clientHeight);
        setCellHeight(position.height);
        setCellTopPosition(position.top);
    }, [position]);

    return (
        <div onClick={(e) => {
            if (wasResizing.current) {
                wasResizing.current = false;
                return;
            }
            onTaskCellClick(task);
        }}
            key={task.id}
            className='task-wrapper'
            style={{ left: position.left, top: cellTopPosition, height: cellHeight, width: position.width }}>

            <div onMouseDown={(e) => onResizeTop(e.nativeEvent, task)} style={{ backgroundColor: getDarkerColor(task.course.color) }} className='resize-bar resize-bar-top'></div>
            <div ref={textRef} style={{ backgroundColor: task.course.color }} className='task'>
                <p className='task-text task-name user-select-none'>{task.course.name}</p>
                <div style={{ height: 2 }} />
                {
                    <p className='task-text user-select-none' style={{ visibility: displayText ? 'visible' : 'hidden' }}>
                        {task.description}
                    </p>
                }
            </div>
            <div onMouseDown={(e) => onResizeBottom(e.nativeEvent)} style={{ backgroundColor: getDarkerColor(task.course.color) }} className='resize-bar  resize-bar-bottom'></div>
        </div>
    )
}