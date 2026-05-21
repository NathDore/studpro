import { useRef, useState } from 'react';
import type { Task } from '../../../../types/Task'
import { TIME_CELL_WIDTH } from '../../constants';
import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPosition, type TaskPosition } from './TaskCell/utils/taskUtils';
import './TaskLayer.css';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
}

export const TaskLayer = ({ tasks, onTaskCellClick }: TaskLayerProps) => {
    const layerRef = useRef<HTMLDivElement>(null);
    const [cellWidth, setCellWidth] = useState<number>(0);
    const observerRef = useRef<ResizeObserver | null>(null);

    const setRef = (node: HTMLDivElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (!node) return;

        (layerRef as React.MutableRefObject<HTMLDivElement>).current = node;

        const { width } = node.getBoundingClientRect();
        setCellWidth((width - TIME_CELL_WIDTH) / 7);

        const observer = new ResizeObserver(() => {
            const { width } = node.getBoundingClientRect();
            setCellWidth((width - TIME_CELL_WIDTH) / 7);
        });

        observer.observe(node);
        observerRef.current = observer;
    };

    if (tasks.length <= 0) return null;

    return (
        <div ref={setRef} className='task-layer'>
            {
                tasks.map(task => {
                    const position: TaskPosition = getTaskPosition(task, cellWidth);

                    return <TaskCell key={task.id} task={task} position={position} onTaskCellClick={onTaskCellClick} />
                })
            }
        </div>
    )
}