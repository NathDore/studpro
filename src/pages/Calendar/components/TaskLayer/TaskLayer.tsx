import { useEffect, useRef, useState } from 'react';
import type { Task } from '../../../../types/Task'
import { TIME_CELL_WIDTH, CELL_HEIGHT } from '../../constants';
import './TaskLayer.css';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
}

interface TaskPosition {
    left: number;
    top: number;
    height: number;
    width: number;
}

const getTaskPosition = (task: Task, cellWidth: number): TaskPosition => {
    const dayIndex = task.start.getDay() === 0 ? 6 : task.start.getDay() - 1;

    const left = TIME_CELL_WIDTH + dayIndex * cellWidth;
    const top = task.start.getHours() * CELL_HEIGHT;

    const durationInHours = (task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60);
    const height = durationInHours * CELL_HEIGHT;
    const width = cellWidth;

    return { left, top, height, width }
}

export const TaskLayer = ({ tasks, onTaskCellClick }: TaskLayerProps) => {
    if (tasks.length <= 0) return null;
    const layerRef = useRef<HTMLDivElement>(null);
    const [cellWidth, setCellWidth] = useState<number>(0);

    useEffect(() => {
        if (!layerRef.current) return;

        const observer = new ResizeObserver(() => {
            const { width } = layerRef.current!.getBoundingClientRect();
            setCellWidth(
                (width - TIME_CELL_WIDTH) / 7,
            );
        });

        observer.observe(layerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={layerRef} className='task-layer'>
            {
                tasks.map(task => {
                    const position: TaskPosition = getTaskPosition(task, cellWidth);

                    return <TaskWrapper key={task.id} task={task} position={position} onTaskCellClick={onTaskCellClick} />
                })
            }
        </div>
    )
}

interface TaskWrapperProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
}

export const TaskWrapper = ({ position, task, onTaskCellClick }: TaskWrapperProps) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [displayText, setDisplayText] = useState(true);

    useEffect(() => {
        if (!textRef.current) return;
        setDisplayText(textRef.current?.scrollHeight <= textRef.current?.clientHeight);
    }, [position])

    return (
        <div onClick={() => onTaskCellClick(task)} key={task.id} className='task-wrapper' style={{ left: position.left, top: position.top, height: position.height, width: position.width }}>
            <div ref={textRef} style={{ backgroundColor: task.course.color }} className='task'>
                <p className='task-text task-name'>{task.course.name}</p>
                <div style={{ height: 2 }} />
                {
                    <p className='task-text' style={{ visibility: displayText ? 'visible' : 'hidden' }}>
                        {task.description}
                    </p>
                }
            </div>
        </div>
    )
}