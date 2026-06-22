import { TaskCell } from './TaskCell/TaskCell';
import { getTaskPositionInCalendar } from '../../../../../../utils/taskUtils';
import { useCellWidth } from './hooks/useCellWidth';
import { useResizeBar } from './hooks/useResizeBar';
import { CALENDAR_ROW_HEIGHT } from '../../../../../../config/calendar-configs';
import type { CalendarBounds } from '../../../../Calendar.types';
import type { TaskPosition } from '../../../../Calendar.types';
import type { Task } from '../../../../../../types/Task';

const HOURS_PER_DAY = 24;

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
        <div
            ref={setRef}
            className={'absolute top-0 left-0 w-full pointer-events-none'}
            style={{ height: HOURS_PER_DAY * CALENDAR_ROW_HEIGHT }}>
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