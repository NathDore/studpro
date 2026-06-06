import type { Course } from "../../../../../types/Course";
import type { Task } from "../../../../../types/Task";
import type { Note } from "../../../../../types/Note";
import type { CalendarDay, CalendarTime } from "../../../Calendar.types";
import { useState } from "react";
import { COURSE_DATA } from "../../../data/Task_data";
import { getNextHour, getDuration } from "../../../utils/calendarTimeUtils";
import { getMonday } from "../../../../../utils/dateUtils";
import { useTaskStore } from "../../../../../store/taskStore";
import { taskExist } from "../../../../../utils/taskValidation";

const courses: Course[] = COURSE_DATA;

interface useTaskFormProps {
    task?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
}

interface TaskFormError {
    description?: string;
}

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

export const useTaskForm = ({ day, initialStartTime, initialEndTime, onClose, task }: useTaskFormProps) => {
    const [course, setCourse] = useState<Course>(task?.course ?? courses[0]);
    const [date, setDate] = useState<Date>(day.fullDate);
    const [startTime, setStartTime] = useState<CalendarTime>(task?.startTime ? task.startTime : initialStartTime);
    const [endTime, setEndTime] = useState<CalendarTime>(task?.endTime ? task.endTime : initialEndTime);
    const [errors, setErrors] = useState<TaskFormError>({});

    const { addTask, updateTask, removeTask, tasks } = useTaskStore();

    const onCourseChange = (course: Course) => {
        setCourse(course);
    }

    const onDateChange = (date: Date) => {
        setDate(date);
    }

    const onStartTimeChange = (time: CalendarTime) => {
        setStartTime(time);

        if (getDuration(time, endTime) <= 0) {
            setEndTime(getNextHour(time));
        }
    }

    const onEndTimeChange = (time: CalendarTime) => {
        setEndTime(time);

        if (getDuration(startTime, time) <= 0) {
            setStartTime(time);
            setEndTime(getNextHour(time));
        }
    }

    const onSubmit = (mode: 'create' | 'update', task?: Task, notes: Note[] = []) => {
        const currentErrors: TaskFormError = {};

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        const startTimeDate = new Date(date);
        const endTimeDate = new Date(date);

        startTimeDate.setHours(startTime.hour, startTime.minutes);
        endTimeDate.setHours(endTime.hour, endTime.minutes);

        if (mode === 'create') {
            const newTask: Task = {
                id: crypto.randomUUID(),
                day,
                startTime,
                endTime,
                course,
                notes,
            }

            addTask(newTask);
        } else {
            if (!task) return;

            const updatedTask: Task = {
                id: task?.id,
                day,
                startTime,
                endTime,
                course,
                notes,
            }

            updateTask(updatedTask);
        }

        onClose();
    }

    const onRemove = (taskId: string) => {
        if (!taskExist(tasks, taskId)) return;

        removeTask(taskId);

        onClose();
    }

    return {
        course,
        onCourseChange,
        courses,
        date,
        onDateChange,
        startTime,
        onStartTimeChange,
        endTime,
        onEndTimeChange,
        minDate: monday,
        maxDate,
        errors,
        onSubmit,
        onRemove
    };
}