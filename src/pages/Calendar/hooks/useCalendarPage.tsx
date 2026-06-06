import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { fromDate, getStartTime } from '../utils/timeUtils';
import { fillDays, getDayFromTask } from '../utils/calendarTimeUtils';
import type { CalendarTime } from '../../../types/CalendarTime';
import type { SelectedSlot, CalendarMode } from '../Calendar.types';
import type { Time } from '../../../types/Time';
import type { Task } from '../../../types/Task';

export const useCalendarPage = () => {
    const DAYS: CalendarTime[] = fillDays();
    const { tasks } = useTaskStore();

    const [displayForm, setDisplayForm] = useState<SelectedSlot | null>(null);
    const [mode, setMode] = useState<CalendarMode>('create');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    const onHourCellClick = (day: CalendarTime, time: Time) => {
        if (!time?.hour || !day.fullDate) return;

        const startTime = getStartTime(time);
        if (!startTime) return;

        setMode('create');
        setSelectedTask(undefined);
        setDisplayForm({ day, time: startTime, endTime: time });
    };

    const onTaskCellClick = (task: Task) => {
        const day = getDayFromTask(task);
        const startTime = fromDate(task.start);
        const endTime = fromDate(task.end);
        setMode('update');
        setSelectedTask(task);
        setDisplayForm({ day, time: startTime, endTime });
    };

    const closeForm = () => setDisplayForm(null);

    return {
        DAYS,
        tasks,
        displayForm,
        mode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeForm,
    };
};