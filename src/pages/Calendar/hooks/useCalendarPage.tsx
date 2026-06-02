import { useState } from 'react';
import type { SelectedSlot, CalendarMode } from '../Calendar.types';
import type { CalendarDay } from '../../../types/CalendarDay';
import type { Time } from '../../../types/Time';
import type { Task } from '../../../types/Task';
import { useCalendarDay } from './useCalendarDay';
import { useTaskStore } from '../../../store/taskStore';
import { fromDate, getStartTime } from '../utils/timeUtils';

export const useCalendarPage = () => {
    const { days, convertDateToCalendarDay } = useCalendarDay();
    const { tasks } = useTaskStore();

    const [displayForm, setDisplayForm] = useState<SelectedSlot | null>(null);
    const [mode, setMode] = useState<CalendarMode>('create');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    const onHourCellClick = (calendarDay: CalendarDay, time: Time) => {
        if (!time?.hour || !calendarDay.fullDate) return;

        const startTime = getStartTime(time);
        if (!startTime) return;

        setMode('create');
        setSelectedTask(undefined);
        setDisplayForm({ calendarDay, time: startTime, endTime: time });
    };

    const onTaskCellClick = (task: Task) => {
        const calendarDay = convertDateToCalendarDay(task.start);
        const startTime = fromDate(task.start);
        const endTime = fromDate(task.end);

        setMode('update');
        setSelectedTask(task);
        setDisplayForm({ calendarDay, time: startTime, endTime });
    };

    const closeForm = () => setDisplayForm(null);

    return {
        days,
        tasks,
        displayForm,
        mode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeForm,
    };
};