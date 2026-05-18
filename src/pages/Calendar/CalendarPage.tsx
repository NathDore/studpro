import './CalendarPage.css';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import type { CalendarDay } from './types/CalendarDay';
import type { Time } from './types/Time';
import { TASKS_DATA } from './data/Task_data';
import type { Task } from '../../types/Task';
import { useCalendarDay } from './hook/useCalendarDay';
import { useState } from 'react';
import { TaskForm } from './components/TaskForm/TaskForm';
import { getStartTime } from './utils/timeUtils';

interface CalendarPageProps { }

interface SelectedSlot {
    calendarDay: CalendarDay;
    time: Time;
    endTime: Time;
}

export const CalendarPage = ({ }: CalendarPageProps) => {
    const { convertDateToCalendarDay } = useCalendarDay();
    const [displayForm, setDisplayForm] = useState<SelectedSlot | null>(null);

    const onHourCellClick = (calendarDay: CalendarDay, time: Time) => {
        if (!time?.hour || !calendarDay.fullDate) return;

        const startTime = getStartTime(time);
        if (!startTime) return;

        const endTime: Time = {
            id: time.id,
            hour: time.hour,
            minutes: 0,
            period: time.period
        };

        setDisplayForm({ calendarDay, time: startTime, endTime });
    }

    const onTaskCellClick = (task: Task) => {
        const calendarDay: CalendarDay = convertDateToCalendarDay(task.start);
        console.log(
            `[Calendar] Hour task click | Time: ${task.start.getHours} | Day: ${calendarDay.day} | Date: ${calendarDay.date}`
        );
    }

    return (
        <div className='page-container'>
            <CalendarHeader />
            <CalendarGrid onHourCellClick={onHourCellClick} tasks={TASKS_DATA} onTaskCellClick={onTaskCellClick} />
            {
                displayForm && <TaskForm calendarDay={displayForm.calendarDay} initialStartTime={displayForm.time} initialEndTime={displayForm.endTime} onClose={() => setDisplayForm(null)} />
            }
        </div>
    )
}
