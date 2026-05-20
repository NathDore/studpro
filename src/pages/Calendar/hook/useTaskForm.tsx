import { useState } from "react";
import type { Course } from "../../../types/Course";
import { COURSE_DATA } from "../data/Task_data";
import type { CalendarDay } from "../types/CalendarDay";
import type { Time } from "../types/Time";
import { getEndTime, getStartTime, toHours24, toMinutes, fromDate } from "../utils/timeUtils";
import { getMonday } from "../utils/dateUtils";
import type { Task } from "../../../types/Task";
import { useTaskStore } from "../../../store/taskStore";
import { taskExist } from "../utils/taskValidation";

const courses: Course[] = COURSE_DATA;

interface useTaskFormProps {
    task?: Task;
    calendarDay: CalendarDay;
    initialStartTime: Time;
    initialEndTime: Time;
    onClose: () => void;
}

interface TaskFormError {
    description?: string;
}

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

export const useTaskForm = ({ calendarDay, initialStartTime, initialEndTime, onClose, task }: useTaskFormProps) => {
    const [description, setDescription] = useState<string>(task?.description ?? '');
    const [course, setCourse] = useState<Course>(task?.course ?? courses[0]);
    const [date, setDate] = useState<Date>(calendarDay.fullDate);
    const [startTime, setStartTime] = useState<Time>(task?.start ? fromDate(task.start) : initialStartTime);
    const [endTime, setEndTime] = useState<Time>(task?.end ? fromDate(task.end) : initialEndTime);
    const [errors, setErrors] = useState<TaskFormError>({});

    const { addTask, updateTask, removeTask, tasks } = useTaskStore();

    const onDescriptionChange = (description: string) => {
        setDescription(description);
        if (errors.description) {
            setErrors(prev => ({ ...prev, description: undefined }));
        }
    }

    const onCourseChange = (course: Course) => {
        setCourse(course);
    }

    const onDateChange = (date: Date) => {
        setDate(date);
    }

    const onStartTimeChange = (time: Time) => {
        setStartTime(time);

        if (toMinutes(time) >= toMinutes(endTime)) {
            const newEndTime = getEndTime(time);
            if (newEndTime) setEndTime(newEndTime);
        }
    }

    const onEndTimeChange = (time: Time) => {
        setEndTime(time);

        if (toMinutes(time) <= toMinutes(startTime)) {
            const newStartTime = getStartTime(time);
            if (newStartTime) setStartTime(newStartTime);
        }
    }

    const onSubmit = (mode: 'create' | 'update', task?: Task) => {
        const currentErrors: TaskFormError = {};

        if (!description.trim()) {
            currentErrors.description = "A description is required.";
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        const startTimeDate = new Date(date);
        const endTimeDate = new Date(date);

        startTimeDate.setHours(toHours24(startTime), startTime.minutes);
        endTimeDate.setHours(toHours24(endTime), endTime.minutes);

        if (mode === 'create') {
            const newTask: Task = {
                id: crypto.randomUUID(),
                course,
                description,
                start: startTimeDate,
                end: endTimeDate
            }

            addTask(newTask);
        } else {
            if (!task) return;

            const updatedTask: Task = {
                id: task?.id,
                course,
                description,
                start: startTimeDate,
                end: endTimeDate
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
        description,
        onDescriptionChange,
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