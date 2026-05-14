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

                    return <div onClick={() => onTaskCellClick(task)} key={task.id} className='task' style={{ backgroundColor: task.color, left: position.left, top: position.top, height: position.height, width: position.width }}>{task.description}</div>
                })
            }
        </div>
    )
}
