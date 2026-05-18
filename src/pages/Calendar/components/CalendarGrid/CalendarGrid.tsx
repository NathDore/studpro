import './CalendarGrid.css';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Task } from '../../../../types/Task';
import { TaskLayer } from '../TaskLayer/TaskLayer';
import { useRef } from 'react';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { CalendarRow } from '../CalendarRow/CalendarRow';
import { getTimes } from '../../utils/timeUtils';

interface CalendarGridProps {
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
    onTaskCellClick: (task: Task) => void;
    tasks: Task[];
}

export interface Time {
    id: number;
    time: string;
    hour: number;
    minutes: number;
    period: 'AM' | 'PM';
}

export const CalendarGrid = ({ onHourCellClick, tasks, onTaskCellClick }: CalendarGridProps) => {
    const times = getTimes();
    const calendarRef = useRef<HTMLDivElement>(null);

    return (
        <div className='calendar' ref={calendarRef}>
            {
                times?.map(time => <CalendarRow onHourCellClick={onHourCellClick} key={time.id} time={time} />)
            }

            <TaskLayer tasks={tasks} onTaskCellClick={onTaskCellClick} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    )
}

