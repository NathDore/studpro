import type { CalendarDay, CalendarTime } from '../../Calendar.types';
import type { Task } from '../../../../types/Task';
import { TaskLayer } from './components/TaskLayer/TaskLayer';
import { Scrollbar } from './components/Scrollbar/Scrollbar';
import { CalendarRow } from './components/CalendarRow/CalendarRow';
import { useCalendarGrid } from './hooks/useCalendarGrid';

interface CalendarGridProps {
    days: CalendarDay[];
    tasks: Task[];
    day_times: CalendarTime[];
    onHourCellClick: (calendar: CalendarDay, startTime: CalendarTime, endTime: CalendarTime) => void;
    onTaskCellClick: (task: Task) => void;
}

const CONTAINER_CLASS = 'relative flex-1 overflow-y-auto leading-none scrollbar-none [&::-webkit-scrollbar]:hidden';

export const CalendarGrid = ({ days, tasks, day_times, onHourCellClick, onTaskCellClick }: CalendarGridProps) => {
    const { calendarRef, calendarBounds } = useCalendarGrid();

    return (
        <div className={CONTAINER_CLASS} ref={calendarRef}>
            {day_times.map((time, index) => (
                <CalendarRow days={days} onHourCellClick={onHourCellClick} key={time.id} startTime={day_times[index]} endTime={index === day_times.length - 1 ? day_times[0] : day_times[index + 1]} />
            ))}
            <TaskLayer tasks={tasks} onTaskCellClick={onTaskCellClick} calendarBounds={calendarBounds} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    );
};