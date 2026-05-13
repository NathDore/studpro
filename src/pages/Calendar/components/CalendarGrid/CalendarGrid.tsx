import './CalendarGrid.css';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Task } from '../../../../types/Task';
import { TaskLayer } from '../TaskLayer/TaskLayer';
import { useRef } from 'react';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { CalendarRow } from '../CalendarRow/CalendarRow';

interface CalendarGridProps {
    onHourCellClick: (calendar: CalendarDay, time: Time) => void;
    tasks: Task[];
}

export interface Time {
    id: number;
    time: string;
    period: 'AM' | 'PM';
}

const getTimes = (): Time[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;

        return {
            id: i,
            time: displayHour.toString(),
            period
        };
    });
}

export const CalendarGrid = ({ onHourCellClick, tasks }: CalendarGridProps) => {
    const times = getTimes();
    const calendarRef = useRef<HTMLDivElement>(null);

    return (
        <div className='calendar' ref={calendarRef}>
            {
                times?.map(time => <CalendarRow onHourCellClick={onHourCellClick} key={time.id} time={time} />)
            }

            <TaskLayer tasks={tasks} />
            <Scrollbar calendarRef={calendarRef} />
        </div>
    )
}

