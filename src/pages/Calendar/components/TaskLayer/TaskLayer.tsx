import type { Task } from '../../../../types/Task'
import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPosition, type TaskPosition } from './TaskCell/utils/taskUtils';
import './TaskLayer.css';
import { useCellWidth } from './hook/useCellWidth';
import { useResizeBar } from './TaskCell/hook/useResizeBar';
import type { CalendarBounds } from '../CalendarGrid/hook/useCalendarSize';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
    calendarBounds: CalendarBounds;
}

export const TaskLayer = ({ tasks, onTaskCellClick, calendarBounds }: TaskLayerProps) => {
    const { setRef, cellWidth } = useCellWidth();
    const { onResizeTop, onResizeBottom, isResizing, registerOnMouseUp } = useResizeBar({ calendarBounds });

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
                        registerOnMouseUp={registerOnMouseUp}
                    />
                })
            }
        </div>
    )
}