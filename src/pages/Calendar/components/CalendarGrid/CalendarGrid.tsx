import './CalendarGrid.css';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Task } from '../../../../types/Task';
import { TaskLayer } from '../TaskLayer/TaskLayer';
import { useRef } from 'react';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { CalendarRow } from './CalendarRow/CalendarRow';
import { getTimes } from '../../utils/timeUtils';
import type { Time } from '../../types/Time';
import { useCalendarSize } from './hook/useCalendarSize';

interface CalendarGridProps {
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
    onTaskCellClick: (task: Task) => void;
    tasks: Task[];
}

export const CalendarGrid = ({ onHourCellClick, tasks, onTaskCellClick }: CalendarGridProps) => {
    const times = getTimes();
    const calendarRef = useRef<HTMLDivElement>(null);
    const { calendarBounds } = useCalendarSize({ calendarRef });

    return (
        <div className='calendar' ref={calendarRef}>
            {
                times?.map(time => <CalendarRow onHourCellClick={onHourCellClick} key={time.id} time={time} />)
            }

            <TaskLayer tasks={tasks} onTaskCellClick={onTaskCellClick} calendarBounds={calendarBounds} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    )
}

