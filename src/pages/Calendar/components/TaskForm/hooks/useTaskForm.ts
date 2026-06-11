import type { Course } from "../../../../../types/Course";
import type { CalendarDay, CalendarTime } from "../../../Calendar.types";
import type { Task } from "../../../../../types/Task";
import { useState } from "react";
import { COURSE_DATA } from "../../../data/Task_data";
import { getMonday } from "../../../../../utils/dateUtils";
import { useTimeState } from "./useTimeState";
import { useTaskActions } from "./useTaskAction";
import { useNoteState } from "./useNoteState";

const courses: Course[] = COURSE_DATA;

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

interface UseTaskFormProps {
    task?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
}

export const useTaskForm = ({ day, initialStartTime, initialEndTime, onClose, task }: UseTaskFormProps) => {
    const [course, setCourse] = useState<Course>(task?.course ?? courses[0]);
    const [date, setDate] = useState<Date>(day.fullDate);

    const timeState = useTimeState({ initialStartTime, initialEndTime, task });
    const noteState = useNoteState({ initialNotes: task?.notes });
    const actions = useTaskActions({ day, startTime: timeState.startTime, endTime: timeState.endTime, onClose });

    const onCourseChange = (course: Course) => setCourse(course);
    const onDateChange = (date: Date) => setDate(date);

    return {
        course,
        onCourseChange,
        courses,
        date,
        onDateChange,
        ...timeState,
        ...noteState,
        ...actions,
        minDate: monday,
        maxDate,
    };
};