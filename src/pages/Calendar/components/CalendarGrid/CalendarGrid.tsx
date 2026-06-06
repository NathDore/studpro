import type { CalendarTime } from '../../../../types/CalendarTime';
import type { Task } from '../../../../types/Task';
import type { Time } from '../../../../types/Time';
import { TaskLayer } from './components/TaskLayer/TaskLayer';
import { Scrollbar } from './components/Scrollbar/Scrollbar';
import { CalendarRow } from './components/CalendarRow/CalendarRow';
import { useCalendarGrid } from './hooks/useCalendarGrid';

interface CalendarGridProps {
    days: CalendarTime[];
    onHourCellClick: (calendar: CalendarTime, time: Time) => void;
    onTaskCellClick: (task: Task) => void;
    tasks: Task[];
}

const CONTAINER_CLASS = 'relative flex-1 overflow-y-auto leading-none scrollbar-none [&::-webkit-scrollbar]:hidden';

export const CalendarGrid = ({ days, onHourCellClick, tasks, onTaskCellClick }: CalendarGridProps) => {
    const { TIMES, calendarRef, calendarBounds } = useCalendarGrid();

    return (
        <div className={CONTAINER_CLASS} ref={calendarRef}>
            {TIMES.map(time => (
                <CalendarRow days={days} onHourCellClick={onHourCellClick} key={time.id} time={time} />
            ))}
            <TaskLayer tasks={tasks} onTaskCellClick={onTaskCellClick} calendarBounds={calendarBounds} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    );
};