import type { Task } from '../../../../types/Task'
import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPosition, type TaskPosition } from './TaskCell/utils/taskUtils';
import './TaskLayer.css';
import { useCellWidth } from './hook/useCellWidth';
import { useTaskCell } from './TaskCell/hook/useTaskCell';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
}

export const TaskLayer = ({ tasks, onTaskCellClick }: TaskLayerProps) => {
    const { setRef, cellWidth } = useCellWidth();
    const { onResizeTop, onResizeBottom, isResizing } = useTaskCell();

    if (tasks.length <= 0) return null;

    return (
        <div ref={setRef} className='task-layer'>
            {
                tasks.map(task => {
                    const position: TaskPosition = getTaskPosition(task, cellWidth);

                    return <TaskCell
                        key={task.id}
                        task={task}
                        position={position}
                        onTaskCellClick={onTaskCellClick}
                        isResizing={isResizing}
                        onResizeTop={onResizeTop}
                        onResizeBottom={onResizeBottom}
                    />
                })
            }
        </div>
    )
}