import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { getDays, getDayFromTask } from '../utils/calendarDayUtils';
import type { SelectedSlot, CalendarMode, CalendarDay, CalendarTime } from '../Calendar.types';
import type { Task } from '../../../types/Task';
import { getDayTimes } from '../utils/calendarTimeUtils';

const DAYS: CalendarDay[] = getDays();
const DAY_TIMES: CalendarTime[] = getDayTimes();

export const useCalendarPage = () => {
    const { tasks } = useTaskStore();

    const [displayForm, setDisplayForm] = useState<SelectedSlot | null>(null);
    const [mode, setMode] = useState<CalendarMode>('create');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    const onHourCellClick = (day: CalendarDay, startTime: CalendarTime, endTime: CalendarTime) => {
        setMode('create');
        setSelectedTask(undefined);
        setDisplayForm({ day, startTime, endTime });
    };

    const onTaskCellClick = (task: Task) => {
        const day = getDayFromTask(task);
        setMode('update');
        setSelectedTask(task);
        setDisplayForm({ day, startTime: task.startTime, endTime: task.endTime });
    };

    const closeForm = () => setDisplayForm(null);

    return {
        DAYS,
        DAY_TIMES,
        tasks,
        displayForm,
        mode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeForm,
    };
};