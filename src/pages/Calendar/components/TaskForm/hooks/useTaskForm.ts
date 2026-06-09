import type { Course } from "../../../../../types/Course";
import type { Task } from "../../../../../types/Task";
import type { Note } from "../../../../../types/Note";
import type { CalendarDay, CalendarTime, TimePickerInputs, TimePickerInputType } from "../../../Calendar.types";
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

interface TimePickerValidation {
    isValidHour: boolean;
    isValidMinutes: boolean;
    invalidInterval: boolean;
}

const validateTimePickerInput = (time: CalendarTime, startTime: CalendarTime, endTime: CalendarTime): TimePickerValidation => {
    const hour: number = Number(time.hour);
    const minutes: number = Number(time.minutes);

    return {
        isValidHour: Number.isInteger(hour) && hour >= 1 && hour <= 12,
        isValidMinutes: Number.isInteger(minutes) && minutes >= 0 && minutes <= 59,
        invalidInterval: getDuration(startTime, endTime) <= 0
    };
}

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

export const useTaskForm = ({ day, initialStartTime, initialEndTime, onClose, task }: useTaskFormProps) => {
    const [course, setCourse] = useState<Course>(task?.course ?? courses[0]);
    const [date, setDate] = useState<Date>(day.fullDate);
    const [startTime, setStartTime] = useState<CalendarTime>(task?.startTime ? task.startTime : initialStartTime);

    const [timePickerInputs, setTimePickerInputs] = useState<TimePickerInputs>({
        startHour: task?.startTime ? task.startTime.hour : initialStartTime.hour,
        endHour: task?.endTime ? task.endTime.hour : initialEndTime.hour,
        startMinutes: task?.startTime ? task.startTime.minutes : initialStartTime.minutes,
        endMinutes: task?.endTime ? task.endTime.minutes : initialEndTime.minutes
    });

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
        const timePickerValidation: TimePickerValidation = validateTimePickerInput(time, time, endTime);

        if (timePickerValidation.isValidHour && timePickerValidation.isValidMinutes) {
            setStartTime(time);

            if (timePickerValidation.invalidInterval) {
                const validEndTime: CalendarTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, startHour: startTime.hour, startMinutes: startTime.minutes }));
        }
    }

    const onEndTimeChange = (time: CalendarTime) => {
        const timePickerValidation: TimePickerValidation = validateTimePickerInput(time, startTime, time);

        if (timePickerValidation.isValidHour && timePickerValidation.isValidMinutes) {
            setEndTime(time);

            if (timePickerValidation.invalidInterval) {
                setStartTime(time);
                setTimePickerInputs(prev => ({ ...prev, startHour: time.hour }));

                const validEndTime: CalendarTime = getNextHour(time);
                setEndTime(validEndTime);
                setTimePickerInputs(prev => ({ ...prev, endHour: validEndTime.hour }));
            }
        } else {
            setTimePickerInputs(prev => ({ ...prev, endHour: endTime.hour, endMinutes: endTime.minutes }));
        }
    }

    const onHourInputChange = (type: TimePickerInputType, hour: number) => {
        if (type === 'start') {
            setTimePickerInputs(prev => ({ ...prev, startHour: hour }));
        } else {
            setTimePickerInputs(prev => ({ ...prev, endHour: hour }));
        }
    }

    const onMinutesInputChange = (type: TimePickerInputType, minutes: number) => {
        if (type === 'start') {
            setTimePickerInputs(prev => ({ ...prev, startMinutes: minutes }));
        } else {
            setTimePickerInputs(prev => ({ ...prev, endMinutes: minutes }));
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
        timePickerInputs,
        onHourInputChange,
        onMinutesInputChange,
        minDate: monday,
        maxDate,
        errors,
        onSubmit,
        onRemove
    };
}