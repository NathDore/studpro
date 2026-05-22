import { useRef, useState } from 'react';
import type { Task } from '../../../../types/Task'
import { TIME_CELL_WIDTH } from '../../constants';
import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPosition, type TaskPosition } from './TaskCell/utils/taskUtils';
import './TaskLayer.css';
import { useCellWidth } from './hook/useCellWidth';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
}

export const TaskLayer = ({ tasks, onTaskCellClick }: TaskLayerProps) => {
    const { setRef, cellWidth } = useCellWidth();

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