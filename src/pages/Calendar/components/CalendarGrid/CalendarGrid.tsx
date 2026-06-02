import type { CalendarDay } from '../../../../types/CalendarDay';
import type { Task } from '../../../../types/Task';
import type { Time } from '../../../../types/Time';
import { TaskLayer } from './components/TaskLayer/TaskLayer';
import { Scrollbar } from './components/Scrollbar/Scrollbar';
import { CalendarRow } from './components/CalendarRow/CalendarRow';
import { useCalendarGrid } from './hooks/useCalendarGrid';
import './CalendarGrid.css';

interface CalendarGridProps {
    days: CalendarDay[];
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
    onTaskCellClick: (task: Task) => void;
    tasks: Task[];
}

export const CalendarGrid = ({ days, onHourCellClick, tasks, onTaskCellClick }: CalendarGridProps) => {
    const { times, calendarRef, calendarBounds } = useCalendarGrid();

    return (
        <div className='calendar relative flex-1 overflow-y-auto leading-none' ref={calendarRef}>
            {times.map(time => (
                <CalendarRow days={days} onHourCellClick={onHourCellClick} key={time.id} time={time} />
            ))}
            <TaskLayer tasks={tasks} onTaskCellClick={onTaskCellClick} calendarBounds={calendarBounds} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    );
};