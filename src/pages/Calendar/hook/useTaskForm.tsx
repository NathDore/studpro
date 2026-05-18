import { useState } from "react";
import type { Course } from "../../../types/Course";
import { COURSE_DATA } from "../data/Task_data";
import type { CalendarDay } from "../types/CalendarDay";
import type { Time } from "../types/Time";

const courses: Course[] = COURSE_DATA;

interface useTaskFormProps {
    calendarDay: CalendarDay;
    initialStartTime: Time;
    initialEndTime: Time;
}

export const useTaskForm = ({ calendarDay, initialStartTime, initialEndTime }: useTaskFormProps) => {
    const [description, setDescription] = useState<string>('');
    const [course, setCourse] = useState<Course>(courses[0]);
    const [date, setDate] = useState<Date>(calendarDay.fullDate);
    const [startTime, setStartTime] = useState<Time>(initialStartTime);
    const [endTime, setEndTime] = useState<Time>(initialEndTime);

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
    }

    const onEndTimeChange = (time: Time) => {
        setEndTime(time);
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
        onEndTimeChange
    };
}