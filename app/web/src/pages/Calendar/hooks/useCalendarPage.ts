import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { getDays, getDayFromTask } from '../utils/calendarDayUtils';
import type { TaskFormSelectedSlot, CalendarMode, CalendarDay, CalendarTime } from '../Calendar.types';
import type { Task } from '../../../types/Task';
import { getDayTimes } from '../utils/calendarTimeUtils';

const DAYS: CalendarDay[] = getDays();
const DAY_TIMES: CalendarTime[] = getDayTimes();

export const useCalendarPage = () => {
    const { tasks } = useTaskStore();

    const [selectedTask, setSelectedTask] = useState<Task | undefined>();
    const [displayTaskForm, setDisplayTaskForm] = useState<TaskFormSelectedSlot | null>(null);
    const [taskFormMode, setTaskFormMode] = useState<CalendarMode>('create');
    const [displayCourseForm, setDisplayCourseForm] = useState<boolean>(false);

    const onHourCellClick = (day: CalendarDay, startTime: CalendarTime, endTime: CalendarTime) => {
        setTaskFormMode('create');
        setSelectedTask(undefined);
        setDisplayTaskForm({ day, startTime, endTime });
    };

    const onTaskCellClick = (task: Task) => {
        const day = getDayFromTask(task);
        setTaskFormMode('update');
        setSelectedTask(task);
        setDisplayTaskForm({ day, startTime: task.startTime, endTime: task.endTime });
    };

    const closeTaskForm = () => setDisplayTaskForm(null);

    const onNewCourseClick = () => setDisplayCourseForm(true);

    const closeCourseForm = () => setDisplayCourseForm(false);

    return {
        DAYS,
        DAY_TIMES,
        tasks,
        displayTaskForm,
        taskFormMode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeTaskForm,
        displayCourseForm,
        onNewCourseClick,
        closeCourseForm
    };
};