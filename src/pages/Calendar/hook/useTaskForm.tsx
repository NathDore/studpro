import { useState } from "react";
import type { Course } from "../../../types/Course";
import { COURSE_DATA } from "../data/Task_data";
import type { CalendarDay } from "../types/CalendarDay";
import type { Time } from "../types/Time";
import { getEndTime, getStartTime, toHours24, toMinutes } from "../utils/timeUtils";
import { getMonday } from "../utils/dateUtils";
import type { Task } from "../../../types/Task";

const courses: Course[] = COURSE_DATA;

interface useTaskFormProps {
    calendarDay: CalendarDay;
    initialStartTime: Time;
    initialEndTime: Time;
}

interface TaskFormError {
    description?: string;
}

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

export const useTaskForm = ({ calendarDay, initialStartTime, initialEndTime }: useTaskFormProps) => {
    const [description, setDescription] = useState<string>('');
    const [course, setCourse] = useState<Course>(courses[0]);
    const [date, setDate] = useState<Date>(calendarDay.fullDate);
    const [startTime, setStartTime] = useState<Time>(initialStartTime);
    const [endTime, setEndTime] = useState<Time>(initialEndTime);
    const [errors, setErrors] = useState<TaskFormError>({});

    const onDescriptionChange = (description: string) => {
        setDescription(description);
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

    const onSubmit = () => {
        const currentErrors: TaskFormError = {};

        if (description.length <= 0) {
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

        const newTaks: Task = {
            id: crypto.randomUUID(),
            course,
            description,
            start: startTimeDate,
            end: endTimeDate
        }

        console.log("Submit new task", newTaks);
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
        onSubmit
    };
}