import './CalendarPage.css';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import type { CalendarDay } from './types/CalendarDay';
import type { Time } from './types/Time';
import type { Task } from '../../types/Task';
import { useCalendarDay } from './hook/useCalendarDay';
import { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm/TaskForm';
import { fromDate, getStartTime } from './utils/timeUtils';
import { useTaskStore } from '../../store/taskStore';

interface CalendarPageProps { }

interface SelectedSlot {
    calendarDay: CalendarDay;
    time: Time;
    endTime: Time;
}

export const CalendarPage = ({ }: CalendarPageProps) => {
    const { convertDateToCalendarDay } = useCalendarDay();
    const { tasks } = useTaskStore();

    const [displayForm, setDisplayForm] = useState<SelectedSlot | null>(null);
    const [mode, setMode] = useState<'create' | 'update'>('create');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

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

        setMode('create');
        setSelectedTask(undefined);
        setDisplayForm({ calendarDay, time: startTime, endTime });
    }

    const onTaskCellClick = (task: Task) => {
        const calendarDay: CalendarDay = convertDateToCalendarDay(task.start);
        const startTime: Time = fromDate(task.start);
        const endTime: Time = fromDate(task.end);

        setMode('update');
        setSelectedTask(task);
        setDisplayForm({ calendarDay, time: startTime, endTime });
    }

    return (
        <div className='page-container'>
            <CalendarHeader />
            <CalendarGrid onHourCellClick={onHourCellClick} tasks={tasks} onTaskCellClick={onTaskCellClick} />
            {
                displayForm && <TaskForm mode={mode} task={selectedTask} calendarDay={displayForm.calendarDay} initialStartTime={displayForm.time} initialEndTime={displayForm.endTime} onClose={() => setDisplayForm(null)} />
            }
        </div>
    )
}
