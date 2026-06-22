import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPositionInCalendar } from '../../../../../../utils/taskUtils';
import { useCellWidth } from './hooks/useCellWidth';
import { useResizeBar } from './hooks/useResizeBar';
import type { CalendarBounds } from '../../../../Calendar.types';
import type { TaskPosition } from '../../../../Calendar.types';
import type { Task } from '../../../../../../types/Task';

const CONTAINER_CLASS = 'absolute top-0 left-0 w-full h-[calc(24*30px)] pointer-events-none';

interface TaskLayerProps {
    tasks: Task[];
    onTaskCellClick: (task: Task) => void;
    calendarBounds: CalendarBounds;
}

export const TaskLayer = ({ tasks, onTaskCellClick, calendarBounds }: TaskLayerProps) => {
    const { setRef, cellWidth } = useCellWidth();
    const { onResizeTop, onResizeBottom, isResizing } = useResizeBar({ calendarBounds, cellWidth });

    if (tasks.length <= 0) return null;

    return (
        <div ref={setRef} className={CONTAINER_CLASS}>
            {tasks.map(task => {
                const position: TaskPosition = getTaskPositionInCalendar(task, cellWidth);

                return (
                    <TaskCell
                        key={task.id}
                        taskId={task.id}
                        position={position}
                        onTaskCellClick={onTaskCellClick}
                        isResizing={isResizing}
                        onResizeTop={onResizeTop}
                        onResizeBottom={onResizeBottom}
                    />
                );
            })}
        </div>
    );
};