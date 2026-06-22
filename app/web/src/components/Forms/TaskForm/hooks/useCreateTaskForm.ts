import { useRef } from "react";
import { useTimeState } from "./useTimeState";
import { useNoteState } from "./useNoteState";
import { useCreateTask } from "../../../../hooks/task/useCreateTask";
import { useCourseState } from "./useCourseState";
import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";

export const useCreateTaskForm = (day: CalendarDay, initialStartTime: CalendarTime, initialEndTime: CalendarTime, onClose: () => void) => {
    const { submit: submitCreate } = useCreateTask();

    const taskIdRef = useRef(crypto.randomUUID());

    const timeState = useTimeState(taskIdRef.current, initialStartTime, initialEndTime, 'create');
    const noteState = useNoteState([], 'create');

    const { courses, selectedCourse, onSelectCourse } = useCourseState('create');
    const courseState = { courses, selectedCourse, onSelectCourse };

    const onSubmit = () => {
        if (!selectedCourse) return;
        submitCreate(taskIdRef.current, selectedCourse.id, day, timeState.startTime, timeState.endTime);
        noteState.flushPendingNotes();
        onClose();
    };

    const onDelete = () => { };

    return {
        taskId: taskIdRef.current,
        timeState,
        noteState,
        courseState,
        onSubmit,
        onDelete
    };
};