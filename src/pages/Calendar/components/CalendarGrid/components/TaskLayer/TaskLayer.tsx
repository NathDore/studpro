import type { Task } from '../../../../../../types/Task';
import { TaskCell } from './components/TaskCell/TaskCell';
import { getTaskPosition } from './components/TaskCell/utils/taskPositionUtils';
import type { TaskPosition } from './components/TaskCell/TaskCell.types';
import { useCellWidth } from './hooks/useCellWidth';
import { useResizeBar } from './components/TaskCell/hooks/useResizeBar';
import type { CalendarBounds } from '../../hooks/useCalendarSize';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
    calendarBounds: CalendarBounds;
}

export const TaskLayer = ({ tasks, onTaskCellClick, calendarBounds }: TaskLayerProps) => {
    const { setRef, cellWidth } = useCellWidth();
    const { onResizeTop, onResizeBottom, isResizing, registerOnMouseUp } = useResizeBar({ calendarBounds, cellWidth });

    if (tasks.length <= 0) return null;

    return (
        <div ref={setRef} className='absolute top-0 left-0 w-full h-[calc(24*30px)] pointer-events-none'>
            {tasks.map(task => {
                const position: TaskPosition = getTaskPosition(task, cellWidth);

                return (
                    <TaskCell
                        key={task.id}
                        task={task}
                        position={position}
                        onTaskCellClick={onTaskCellClick}
                        isResizing={isResizing}
                        onResizeTop={onResizeTop}
                        onResizeBottom={onResizeBottom}
                        registerOnMouseUp={registerOnMouseUp}
                    />
                );
            })}
        </div>
    );
};